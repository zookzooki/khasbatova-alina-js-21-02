export function moveLeftAnimation() {
    const div = document.createElement('div');
    div.id = 'loader';
    div.innerHTML = '<div id="loader-box"></div>';
    document.querySelector('.header').append(div);
    const loaderBox = document.getElementById('loader-box');
    let pos = Number.parseInt(getComputedStyle(loaderBox).left);
    moveRight();

    function moveRight() {
        return requestAnimationFrame(() => {
            if (pos < Number.parseInt(getComputedStyle(loaderBox.parentElement).width) - Number.parseInt(getComputedStyle(loaderBox).width)) {
                pos++;
                loaderBox.style.left = `${pos}px`
                requestAnimationFrame(moveRight)

            } else {
                requestAnimationFrame(moveLeft)
            }
        })
    }

    function moveLeft() {
        return requestAnimationFrame(() => {
            if (pos >= 0) {
                pos--;
                loaderBox.style.left = `${pos}px`
                requestAnimationFrame(moveLeft)
            } else {
                requestAnimationFrame(moveRight)
            }
        })
    }
}
