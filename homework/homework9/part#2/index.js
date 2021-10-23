const redirect = () => {
    let div = document.createElement('div');
    document.body.append(div);
    let recursiveTimout = setTimeout(function counter(i) {
        if (i !== 0) {
            let sec;
            if (i === 1) {
                sec = 'секунду';
            } else if (i > 1 && i < 5) {
                sec = 'секунды';
            } else if ( i>= 5) {
                sec = 'секунд';
            }
            div.innerHTML = `Вы будете перенаправлены через ${i} ${sec}`;
            i=i-1;
            recursiveTimout = setTimeout(counter, 1000, i);
        } else {
            location.assign('https://maxima.life');
        }
    }, 1000, 10);
};
redirect();
