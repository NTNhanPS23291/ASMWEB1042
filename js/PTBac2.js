class Input {
    constructor(a, b, c) {
        this.a = a;
        this.b = b;
        this.c = c;
    }

    static solveEquation(a, b, c) {
        if (a === 0) {
            if (b === 0) return c === 0 ? 'Phương trình vô số nghiệm' : 'Phương trình vô nghiệm';
            else return -(c / b);
        }
        else {
            let delta = b * b - 4 * a * c;
            if (delta > 0) return [((-b + Math.sqrt(delta)) / (2 * a)), ((-b - Math.sqrt(delta)) / (2 * a))];
            if (delta === 0) return [-b / (2 * a)];
            if (delta < 0) return ['Phương trình vô nghiệm'];
        }
    }
}

const randomNum = () => Math.floor(Math.random() * 11);
const formContent = document.querySelector('.form-content');
const btnInsert = document.querySelector('.insert');
const btnSolve = document.querySelector('.solve');
const numberInput = document.querySelectorAll('.number-input');
const date = document.querySelector('.date');
const resultContainer = document.querySelector('.result-container');
const headingContent = document.querySelector('.heading-content');
const equation = document.querySelector('.equation');
let resultStorage = sessionStorage.getItem('rc');

const resultCount = () => {
    if (resultStorage === null) resultStorage = 0;
    headingContent.textContent = `Số lần giải: ${++resultStorage}`
}

const roundOf = function (number, precision) {
    const n1 = number * Math.pow(10, precision + 1);
    const n2 = Math.floor(n1 / 10);
    if (n1 >= (n2 * 10 + 5)) {
        return (n2 + 1) / Math.pow(10, precision);
    }
    return n2 / Math.pow(10, precision);
}

const inputDetector = (e) => {
    if (e.target.classList.contains("number-input")) {
        let count = 0;
        numberInput.forEach(i => {
            if (i.value.length === 0 || isNaN(e.target.value)) {
                count++;
            }
        })
        if (count !== 0) {
            btnSolve.classList.add('disabled');
            btnSolve.disabled = true;
        } else {
            btnSolve.classList.remove('disabled');
            btnSolve.disabled = false;
        }
    }
}

formContent.addEventListener('input', inputDetector)

formContent.addEventListener('change', e => {
    if (e.target.classList.contains("number-input")) {
        if (isNaN(e.target.value)) {
            e.target.value = 0;
        }
        inputDetector(e);
    }
})

btnInsert.addEventListener('click', function (e) {
    const input = new Input(randomNum(), randomNum(), randomNum());
    const arrInput = [input.a, input.b, input.c];
    numberInput.forEach((i, inde) => {
        document.querySelector(`.number-input-${i.dataset.input}`).value = arrInput[inde];
    });
    btnSolve.classList.remove('disabled');
    btnSolve.disabled = false;
})


const insertResult = (arr) => {
    let data;
    if (arr.length === 2) {
        resultContainer.innerHTML = '';
        data = `<p class="result-text">Phương trình có 2 nghiệm phân biệt:</p>
                <p class="result-number">X1 = ${roundOf(arr[0], 2)}</p>
                <p class="result-number">X2 = ${roundOf(arr[1], 2)}</p>`;
        resultContainer.insertAdjacentHTML('beforeend', data);
        return;
    }
    if (arr.length === 1) {
        if (isNaN(arr[0])) {
            resultContainer.innerHTML = '';
            data = `<p class="result-text">${arr[0]}</p>`;
            resultContainer.insertAdjacentHTML('beforeend', data);
        }
        else {
            resultContainer.innerHTML = '';
            data = `<p class="result-text">Phương trình có nghiệm kép:</p>
            <p class="result-number">X1 = X2 = ${roundOf(arr[0], 2)}</p>`;
            resultContainer.insertAdjacentHTML('beforeend', data);
        }
    }
}

// const showEquation = numArr => {
//     if (numArr[0] === 0) {
//         if (numArr[1] === 0) equation.innerHTML = `${numArr[2]} = 0`;
//         else {
//             equation.innerHTML = `${numArr[1] < 0 ? " - " + Math.abs(numArr[1]) + "x " : numArr[1] + "x "}\
//                                 ${numArr[2] !== 0 ? (numArr[2] < 0 ? " - " + Math.abs(numArr[2]) + "x " : " + " + numArr[2] + "x ") : ""}= 0`
//         }
//     }
//     else {
//         if (numArr[1] === 0) equation.innerHTML = `${numArr[0]}x<sup>2</sup> ${numArr[2] !== 0 ? (numArr[2] < 0 ? " - " + Math.abs(numArr[2]) + "x " : " + " + numArr[2] + "x ") : ""}= 0`;
//         else {
//             equation.innerHTML = `${numArr[0] + "x<sup>2</sup> "}\
//                                 ${numArr[1] < 0 ? " - " + Math.abs(numArr[1]) + "x " : " + " + numArr[1] + "x "}\
//                                 ${numArr[2] !== 0 ? (numArr[2] < 0 ? " - " + Math.abs(numArr[2]) + "x " : " + " + numArr[2] + "x ") : ""}= 0`
//         }
//     }
// }

const displayQuestion = function (a, b, c, htmlElement) {
    if (a === 0) {
        if (b === 0) return htmlElement.innerHTML = `${c} = 0`;
        if (Math.abs(b) !== 1 && b !== 0) {
            return htmlElement.innerHTML = `${b < 0 ? " - " + Math.abs(b) + "x " : b + "x "}\
                                ${c !== 0 ? (c < 0 ? " - " + Math.abs(c) : " + " + c) : ""}= 0`
        }
        if (Math.abs(b) === 1) {
            return htmlElement.innerHTML = `${b < 0 ? " - " + "x " : "x "}\
                                ${c !== 0 ? (c < 0 ? " - " + Math.abs(c) : " + " + c) : ""}= 0`
        }
    }
    else {
        if (Math.abs(a) === 1) {
            if (b === 0) return htmlElement.innerHTML = `${a < 0 ? " - " + "x" : "x"}<sup>2</sup> ${c !== 0 ? (c < 0 ? " - " + Math.abs(c) : " + " + c) : ""}= 0`
            if (Math.abs(b) === 1) return htmlElement.innerHTML = `${a < 0 ? " - " + "x" : "x"}<sup>2</sup> ${b < 0 ? " - " + "x " : " + " + "x "} ${c !== 0 ? (c < 0 ? " - " + Math.abs(c) : " + " + c) : ""}= 0`
            if (Math.abs(b) !== 1 && b !== 0) return htmlElement.innerHTML = `${a < 0 ? " - " + "x" : "x"}<sup>2</sup>\
                                                                            ${b < 0 ? " - " + Math.abs(b) + "x " : " + " + b + "x "}\
                                                                            ${c !== 0 ? (c < 0 ? " - " + Math.abs(c) : " + " + c) : ""}= 0`
        }
        else {
            if (b === 0) return htmlElement.innerHTML = `${a}x<sup>2</sup> ${c !== 0 ? (c < 0 ? " - " + Math.abs(c) : " + " + c) : ""}= 0`;
            if (Math.abs(b) === 1) return htmlElement.innerHTML = `${a}x<sup>2</sup> ${b < 0 ? " - " + "x " : " + " + "x "} ${c !== 0 ? (c < 0 ? " - " + Math.abs(c) : " + " + c) : ""}= 0`
            if (Math.abs(b) !== 1 && b !== 0) return htmlElement.innerHTML = `${a}x<sup>2</sup>\
                                                                            ${b < 0 ? " - " + Math.abs(b) + "x " : " + " + b + "x "}\
                                                                            ${c !== 0 ? (c < 0 ? " - " + Math.abs(c) : " + " + c) : ""}= 0`
        }
    }
}

const renderResult = function (e) {
    btnSolve.disabled = true;
    btnSolve.classList.add('disabled');
    const numArr = [];
    let result;
    numberInput.forEach(i => {
        if (!isNaN(i.value) && i.value >= -10 && i.value <= 10) {
            numArr.push(Number(i.value));
        }
    })
    if (numArr.length !== 3) {
        alert('Nhập số từ -10 đến 10.');
        numberInput.forEach(i => {
            i.value = ''
        });
        resultContainer.classList.add('hide');
        equation.innerText = '';
        return;
    }
    else result = Input.solveEquation(numArr[0], numArr[1], numArr[2]);
    resultContainer.classList.remove('hide');
    // showEquation(numArr);
    displayQuestion(numArr[0], numArr[1], numArr[2], equation)
    resultCount();
    if (Array.isArray(result)) {
        insertResult(result);
        return;
    }
    let data;
    if (isNaN(result)) {
        data = `<p class="result-text">${result}</p>`;
        resultContainer.innerHTML = '';
        resultContainer.insertAdjacentHTML('afterbegin', data);
    } else {
        data = `<p class="result-text">Phương trình có 1 nghiệm:</p>
                    <p class="result-number">X = ${roundOf(result, 2)}</p>`;
        resultContainer.innerHTML = '';
        resultContainer.insertAdjacentHTML('afterbegin', data);
    }
}
btnSolve.addEventListener('click', renderResult);
const showTime = () => {
    let now = new Date();
    date.innerText = `Bây giờ là ${now.toLocaleDateString()}, ${now.toLocaleTimeString()}`
}
setInterval(showTime, 1000);