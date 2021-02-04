import { inspList } from "./config.js";

(function (){

    // 用于存储已经预加载过的图片
    let images = [];
    const insContainer = document.getElementById('inspiration-list');
    const list = inspList.map(item => item.src);

    // 预加载图片
    preloadImg(list);

    setTimeout(() => {
        inspList.forEach((insItem, index) => {
            const parentFragment = document.createDocumentFragment();
            const outerDiv = document.createElement('div');
            outerDiv.classList.add('ins-item-container');
            outerDiv.setAttribute('ins-name', insItem.name)

            const img = images[index];

            outerDiv.style.width = `${img.naturalWidth * 200 / img.naturalHeight }px`;
            outerDiv.style.flexGrow =  `${img.naturalWidth * 200 / img.naturalHeight}`;

            // 设置该元素的宽高为图片的宽高以撑起整个外围 div 的宽高
            const innerDiv = document.createElement('div');
            innerDiv.style.paddingBottom = `${img.naturalHeight / img.naturalWidth * 100}%`;

            outerDiv.appendChild(innerDiv);
            outerDiv.appendChild(img);
            parentFragment.appendChild(outerDiv);

            outerDiv.addEventListener('click', () => window.open(insItem.link));

            insContainer.append(parentFragment);
        });
    }, 200);

    // 预加载图片列表，返回已经加载的图片资源
    function preloadImg(list) {
        if(list.length === 0) {
            return images;
        }
        let img = new Image();
        img.src = list[0];
        if(img.complete) {
            images.push(img);
            list.shift();
            return new Promise((resolve => {
                preloadImg(list, images);
                resolve();
            }));
        }
        else {
            img.onload = function() {
                images.push(img);
                list.shift();
                return new Promise((resolve => {
                    preloadImg(list, images);
                    resolve();
                }));
            };
        }
    }
})();
