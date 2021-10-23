let recursiveTimout = setTimeout(function counter(i, j) {
    if (i<=j) {
        console.log(i);
        recursiveTimout = setTimeout(counter, 1000, i+1, j)
    }
}, 1000, 1, 5);

function printNumbers(from, to) {
    let current = from;
    let timerId = setInterval(function() {
        console.log(current);
        if (current === to) {
            clearInterval(timerId);
        }
        current++;
    }, 1000);
}
printNumbers(1, 5);
