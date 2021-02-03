import { utils } from "../../utils";
import { StyleRender } from "./render.js";

class DragContext {
    constructor({
        context,
        dragger,
        name,
        direction,
        initX,
        initY
    }) {
        this.context = context;
        this.dragger = dragger;
        this.name = name;
        this.direction = direction;
        this.isDragging = false;
        this.x = initX || 0;
        this.y = initY || 0;
        this.rect = this.context.getBoundingClientRect();
        this.init();
    }

    init() {
        this.addMousedown();
        this.addMousemove();
        this.addMouseup();
    }

    setDraggerStyles(e) {
        // 类似于 css 中的 clamp
        this.x = utils.getBounding(e.clientX - this.rect.left, 0, this.rect.width);
        this.y = utils.getBounding(e.clientY - this.rect.top, 0, this.rect.height);

        if (this.direction === 'horizontal') {
            this.dragger.style.transform = `translate(${this.x}px, 0)`;
        } else if (this.direction === 'vertical') {
            this.dragger.style.transform = `translate(0, ${this.y}px)`;
        } else if (this.direction === 'both') {
            // -7px，需要根据本身的大小来定。改变偏移中心，更直观
            this.dragger.style.transform = `translate(${this.x - 7}px, ${this.y - 7}px)`;
        }

        StyleRender.getInstance().evaluate();
    }

    addMousedown() {
        this.dragger.addEventListener('mousedown', (e) => {
            this.setDraggerStyles(e);
            this.isDragging = true;
        })
    }

    addMousemove() {
        document.addEventListener('mousemove', (e) => {
            if (this.isDragging) {
                this.setDraggerStyles(e);
            }
        });
    }

    addMouseup() {
        document.addEventListener('mouseup', (e) => {
            this.isDragging = false;
            document.removeEventListener('mousemove', {});
            document.removeEventListener('mouseup', {});
        });
    }

    valueOf() {
        if (this.direction === 'horizontal') {
            return this.name === 'alpha' ? this.x / this.rect.width : 1 - this.x / this.rect.width;
        } else if (this.direction === 'vertical') {
            return this.y / this.rect.height;
        } else if (this.direction === 'both') {
            return [this.x / this.rect.width, 1 - this.y / this.rect.height];
        }
    }
}

export {
    DragContext
};
