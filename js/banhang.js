const selection = document.querySelector('#prices');
const tableMain = document.querySelector('.table-main');
const heading = document.querySelector('.heading');
// const ipt = document.querySelector('input');
// ipt.t
const goods = {
    price: [90, 100, 180, 400, 450, 600, 700],
    goodsName: ['Bphone', 'Nokia', 'Motorola', 'Samsung', 'Sony Xperia', 'Oppo', 'Iphone 9'],
    index: null
}

// const data = {
//     html: `<tr class="heading">
//             <th colspan="2">Hàng hóa</th>
//             <th>Đơn giá</th>
//             <th>Số lượng</th>
//             <th>Thành tiền</th>
//         </tr>
//         <tr class="row-700" data-row="700">
//             <td>
//                 <input type="checkbox">
//             </td>
//             <td>Iphone 9</td>
//             <td>700</td>
//             <td><input class="quantity" type="text"></td>
//             <td class="last-data"></td>
//         </tr>
//         <tr class="row-400" data-row="400">
//             <td>
//                 <input type="checkbox">
//             </td>
//             <td>Samsung </td>
//             <td>400</td>
//             <td><input class="quantity" type="text"></td>
//             <td class="last-data"></td>
//         </tr>
//         <tr class="row-100" data-row="100">
//             <td>
//                 <input type="checkbox">
//             </td>
//             <td>Nokia</td>
//             <td>100</td>
//             <td><input class="quantity" type="text"></td>
//             <td class="last-data"></td>
//         </tr>
//         <tr class="row-450" data-row="450">
//             <td>
//                 <input type="checkbox">
//             </td>
//             <td>Sony Xperia</td>
//             <td>450</td>
//             <td><input class="quantity" type="text"></td>
//             <td class="last-data"></td>
//         </tr>
//         <tr class="row-180" data-row="180">
//             <td>
//                 <input type="checkbox">
//             </td>
//             <td>Motorola</td>
//             <td>180</td>
//             <td><input class="quantity" type="text"></td>
//             <td class="last-data"></td>
//         </tr>
//         <tr class="row-600" data-row="600">
//             <td>
//                 <input type="checkbox">
//             </td>
//             <td>Oppo</td>
//             <td>600</td>
//             <td><input class="quantity" type="text"></td>
//             <td class="last-data"></td>
//         </tr>
//         <tr class="row-90" data-row="90">
//             <td>
//                 <input type="checkbox">
//             </td>
//             <td>Bphone</td>
//             <td>90</td>
//             <td><input class="quantity" type="text"></td>
//             <td class="last-data"></td>
//         </tr>
//         <tr class="result">
//             <td class="sum-text" colspan="4">TỔNG</td>
//             <td class="sum"></td>
//         </tr>`
// }

const init = function (htmlElement) {
    htmlElement.innerHTML = `<tr class="heading">
            <th colspan="2">Hàng hóa</th>
            <th>Đơn giá</th>
            <th>Số lượng</th>
            <th>Thành tiền</th>
        </tr>
        <tr class="result">
            <td class="sum-text" colspan="4">TỔNG</td>
            <td class="sum"></td>
        </tr>`;
}

const displaySumMoney = function () {
    const money = document.querySelectorAll('.last-data');
    const sumMoney = document.querySelector('.sum');
    let sum = 0;
    money.forEach(m => {
        sum += +m.textContent;
    });
    sumMoney.textContent = sum;
}

tableMain.addEventListener('click', function (e) {
    if (!e.target.classList.contains('goods')) return;
    const quantity = e.target.closest(`.row-${e.target.value}`).querySelector('.quantity');
    const lastData = quantity.parentElement.nextElementSibling;
    if (quantity.disabled) {
        quantity.disabled = false;
        quantity.classList.remove('disabled');
    }
    else {
        quantity.disabled = true;
        quantity.classList.add('disabled');
        quantity.value = '';
        lastData.textContent = '';
        displaySumMoney();
    }
});
const displayMoney = function (htmlElement, prevElement, nextElement) {
    // if(!htmlElement || !prevElement || !nextElement) return;
    if (isNaN(htmlElement.value) || +htmlElement.value < 0 || htmlElement.value === '') {
        nextElement.textContent = '';
        htmlElement.value = '';
        return;
    }
    const lastValue = +htmlElement.value * +prevElement.textContent;
    // const sumMoney = document.querySelector('.sum');
    // let sum = +sumMoney.textContent;
    nextElement.textContent = lastValue;
    // if (+nextElement.textContent >= 0) {
    //     // if (lastValue >= +nextElement.textContent) {

    //     // }
    //     // if(lastValue < +nextElement.textContent) {

    //     // }
    // }
}



tableMain.addEventListener('input', function (e) {
    if (!e.target.classList.contains('quantity')) return;
    const lastData = e.target.parentElement.nextElementSibling;
    const prevSibling = e.target.parentElement.previousElementSibling;
    displayMoney(e.target, prevSibling, lastData);
    displaySumMoney();
});

selection.addEventListener('change', function (e) {
    // if (+e.target.value >= 700 || e.target.value === "default") {
    //     tableMain.innerHTML = "";
    //     tableMain.innerHTML = data.html;
    //     goods.index = null;
    //     return
    // };
    // tableMain.innerHTML = '';
    // tableMain.innerHTML = `<tr class="heading">
    //         <th colspan="2">Hàng hóa</th>
    //         <th>Đơn giá</th>
    //         <th>Số lượng</th>
    //         <th>Thành tiền</th>
    //     </tr>
    //     <tr class="result">
    //         <td class="sum-text" colspan="4">TỔNG</td>
    //         <td class="sum"></td>
    //     </tr>`;
    init(tableMain);
    goods.price.forEach((p, i) => {
        if (+e.target.value >= p) {
            return goods.index = i;
        }
        if (isNaN(e.target.value)) return goods.index = goods.price.length - 1;
        if (+e.target.value === 0) return goods.index = null;
    })

    if (goods.index !== null) {
        const result = document.querySelector('.result');
        for (let i = 0; i <= goods.index; i++) {
            let rowData = `<tr class="row-${goods.price[i]}" data-row="${goods.price[i]}">
            <td>
                <input class="goods" value="${goods.price[i]}" type="checkbox">
            </td>
            <td>${goods.goodsName[i]}</td>
            <td>${goods.price[i]}</td>
            <td><input class="quantity disabled" type="text" disabled></td>
            <td class="last-data"></td>
        </tr>`;
            result.insertAdjacentHTML('beforebegin', rowData);
        }
    }
})