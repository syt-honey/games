let curAmount = 40673;
const minAmount = 150000;
const maxAmount = 600000;

let arrContainer = [];

const amountArr = new Array(12).fill(0);

const btn = getElement("add");
const confirm = getElement("confirm");
const arrContainerEl = getElement("arr-container");
const specialEl = getElement("special");
const specialValueEl = getElement("special-v");

setValue("max", maxAmount);

btn.addEventListener("click", () => {
  const container = document.createElement("div");
  container.classList.add('arr-item');
  genItem(container);

  arrContainerEl.appendChild(container);
});

specialEl.addEventListener("blur", (e) => {
  specialValueEl.innerHTML = getRemainMonth(e.target.value)
});

confirm.addEventListener("click", () => {
  const arr = document.getElementsByClassName("arr-item");
  let error = false;
  arrContainer = [];

  Array.from(arr).map(i => {
    Array.from(i.getElementsByTagName("input")).map(i => {
      if (!i.value) {
        error = true;
        alert("请检查表单");
        return;
      }
    })
  })

  if (!error) {
    Array.from(arr).map(i => {
      const tem = {}
      Array.from(i.getElementsByTagName("input")).map((i, idx) => {
        tem[idx === 0 ? 'amount' : 'month'] = parseInt(i.value);
      });
      arrContainer.push(tem);
    })

    curAmount = parseInt(document.getElementById("balance").value);

    setArr(arrContainer, amountArr, curAmount);

    console.log(arrContainer)

    setValue("result", getRes(getArrSum(amountArr) / 12 * 15));
    setValue("month", getRemainMonth(maxAmount));
  }
})

function getRemainMonth(max) {
  let remainMonth = 0;
  const tem = JSON.parse(JSON.stringify(amountArr));
  while(getRes(getArrSum(tem) / 12 * 15) < max) {
    ++remainMonth;
    tem.unshift(curAmount + arrContainer[0].amount * remainMonth);
    tem.pop();
  }

  return remainMonth;
}

function getRes(ave) {
  return ave < minAmount ? minAmount : ave > maxAmount ? maxAmount : ave;
}

function setArr(all, amountArr, curAmount) {
  let ms = 0; // 计算过的总月份
  all.reduce((pre, cur) => {
    let idx = 0;
    for(idx; idx < cur.month; ++idx) {
        if (ms > 12) {
            return;
        }
        amountArr[ms] = pre - idx * cur.amount;
        console.log(pre - idx * cur.amount)
        ++ms;
    }
    return pre - idx * cur.amount;
  }, curAmount);
}

function getArrSum(arr) {
  if (!arr || !arr.length) {
    return;
  }
  return arr.reduce((pre, cur) => pre + cur, 0);
}

function genItem(el) {
  const amount = genInput("每月入缴额度");
  const month = genInput("该额度持续月数");
  const remove = genNormalElement("button", "删除此项");

  remove.addEventListener("click", () => {
    el.remove();
  });

  el.appendChild(amount);
  el.appendChild(month);
  el.appendChild(remove);
}

function setValue(id, value) {
  const el = getElement(id);
  el.innerHTML = value;
}

function getElement(id) {
  return document.getElementById(id);
}

function genInput(placeholder) {
  const el = document.createElement("input");
  el.value = "";
  el.setAttribute("type", "number")
  el.placeholder = placeholder;
  return el;
}

function genNormalElement(type, innerHTML) {
  const el = document.createElement(type);
  el.innerHTML = innerHTML;
  return el;
}