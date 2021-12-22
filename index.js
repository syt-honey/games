import { inspList } from "./config.js";

(function (){

    // 用于存储已经预加载过的图片
    const insContainer = document.getElementById('inspiration-list');
    const list = inspList.map(item => item.src);

    // 预加载图片完后生成图片标签并插入文档
    Promise.all(list).then(imgSrcList => {
        imgSrcList.forEach((src, index) => {
            preloadImg(src).then((imgSrc) => {
                const parentFragment = document.createDocumentFragment();
                const outerDiv = document.createElement('div');
                outerDiv.classList.add('ins-item-container');
                outerDiv.setAttribute('ins-name', inspList[index].name);

                outerDiv.style.width = `${imgSrc.naturalWidth * 200 / imgSrc.naturalHeight}px`;
                outerDiv.style.flexGrow = `${imgSrc.naturalWidth * 200 / imgSrc.naturalHeight}`;

                // 设置该元素的宽高为图片的宽高以撑起整个外围 div 的宽高
                const innerDiv = document.createElement('div');
                innerDiv.style.paddingBottom = `${imgSrc.naturalHeight / imgSrc.naturalWidth * 100}%`;

                outerDiv.appendChild(innerDiv);
                outerDiv.appendChild(imgSrc);
                parentFragment.appendChild(outerDiv);

                outerDiv.addEventListener('click', () => window.open(inspList[index].link));

                insContainer.append(parentFragment);
            });
        });
    });

    // 预加载图片，返回已经加载的图片资源
    function preloadImg (imgSrc) {
        return new Promise(resolve => {
            let img = new Image();
            img.src = imgSrc;
            if(img.complete) {
                resolve(img);
            } else {
                img.onload = function() {
                    resolve(img);
                };
            }
        });
    }
})();