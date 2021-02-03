const utils = {
    /**
     * @param {*} duration
     */
    sleep(duration) {
        return new Promise((resolve) => {
            setTimeout(resolve, duration);
        });
    },
    getBounding(val, min, max) {
        return val < min ? min : (val > max ? max : val);
    },
    color: {
        hsb2hsl(h, s, b) {
            var hsl = {
                h: h
            };
            hsl.l = (2 - s) * b;
            hsl.s = s * b;
            if (hsl.l <= 1 && hsl.l > 0) {
                hsl.s /= hsl.l;
            } else {
                hsl.s = hsl.s / (2 - hsl.l) || 0;
            }
            hsl.l /= 2;
            if (hsl.s > 1) {
                hsl.s = 1;
            }
            return hsl;
        }
    },
    trimZero(str) {
        return str.replace(/.?0*$/, '');
    }
};

export {
 utils
};
