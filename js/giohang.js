const clone = function (deep, amount, element) {
    let array = []
    for (let i = 0; i < amount; i++) {
        array.push(element.cloneNode(deep));
    }
    return array;
}

const createTextNode = function (contents) {
    let array = [];
    for (let i = 0; i < contents.length; i++) {
        array.push(document.createTextNode(contents[i]));
    }
    return array;
}

const appendChild = function (parents, children) {
    if (Array.isArray(parents)) {
        for (let i = 0; i < parents.length; i++) {
            parents[i].appendChild(children[i]);
        }
        return;
    }
    for (let i = 0; i < children.length; i++) {
        parents.appendChild(children[i]);
    }
}

const makeHeading = function (table) {
    const tr = document.createElement('tr');
    tr.className = 'heading';
    const th1 = document.createElement('th');
    const [th2, th3, th4, th5] = clone(true, 4, th1);
    th1.colSpan = '2';
    const [th1Text, th2Text, th3Text, th4Text] = createTextNode(['Hàng hóa', 'Đơn giá', 'Số lượng', 'Thành tiền'])
    appendChild([th1, th2, th3, th4], [th1Text, th2Text, th3Text, th4Text])
    appendChild(tr, [th1, th2, th3, th4, th5]);
    table.appendChild(tr);
}

const fillResult = function (table) {
    // const table = elm.parentElement.parentElement;
    const costs = table.querySelectorAll('.last-data');
    const resultSum = table.querySelector('.sum');
    let sum = 0;
    costs.forEach(cost => {
        sum += +cost.innerText;
    })
    resultSum.innerText = sum;
};

const deleteResult = function (table) {
    const resultRow = table.querySelector('.result');
    table.removeChild(resultRow);
}

const makeResult = function (table) {
    const tr = document.createElement('tr');
    const td1 = document.createElement('td');
    const [td2] = clone(true, 1, td1);
    const [td1Text] = createTextNode(["TỔNG"]);
    appendChild(td1, [td1Text]);
    tr.className = 'result';
    td1.colSpan = '4';
    td1.className = 'sum-text';
    td2.className = 'sum';
    appendChild(tr, [td1, td2]);
    table.appendChild(tr);
    fillResult(table);
}


const insertData = function (item, ...elms) {
    const [img, td2, td3, p, td5] = elms;
    img.src = `img/goods/${item.phoneName.toLowerCase().split(' ').join('')}.jpg`;
    td2.innerText = `${item.phoneName}`;
    td3.innerText = `${item.price}`;
    p.innerText = `${item.quantity}`;
    td5.innerText = `${item.quantity * item.price}`;
}

const deleteRow = function (element, table, cart) {
    const row = element.parentElement.parentElement;
    const itemName = row.querySelector('.goods-name').innerText;
    table.removeChild(row);
    cart.forEach((item, index) => {
        if (item.phoneName === itemName) {
            cart.splice(index, 1);
        }
    });
    if (cart.length === 0) deleteResult(table);
    else fillResult(table);
    window.opener.sessionStorage.setItem('cart', JSON.stringify(cart));
    const changedLocal = localStorage.getItem('changed');
    if (changedLocal === null) localStorage.setItem('changed', 'yes');
    else localStorage.clear();
}

const makeContent = function (table, cart) {
    const tr = document.createElement('tr');
    const td1 = document.createElement('td');
    const [td2, td3, td4, td5, td6] = clone(true, 5, td1);
    const img = document.createElement('img');
    const p = document.createElement('p');
    const button = document.createElement('button');
    td1.className = 'goods-img';
    td2.className = 'goods-name';
    td4.className = 'quantity-box';
    td5.className = 'last-data';
    p.className = 'quantity';
    button.className = 'btn';
    button.type = 'button';
    button.innerText = 'Xóa';
    button.addEventListener('click', e => deleteRow(button, table, cart));
    appendChild([td1, td4, td6], [img, p, button]);
    appendChild(tr, [td1, td2, td3, td4, td5, td6]);
    appendChild(table, [tr]);
    return [img, td2, td3, p, td5];
}

const fillContent = function (cart) {
    const tableMain = document.querySelector('.table-main');
    tableMain.innerHTML = '';
    if (cart === null) {
        makeHeading(tableMain);
        return;
    }
    makeHeading(tableMain);
    cart.forEach(item => {
        insertData(item, ...makeContent(tableMain, cart));
    })
    if (cart.length !== 0) makeResult(tableMain);
}

window.addEventListener('load', e => {
    const savedSession = sessionStorage.getItem('cart');
    const cart = JSON.parse(savedSession);
    fillContent(cart);
})


window.addEventListener('storage', e => {
    if (e.url.match(/(tonghop.html)/g) === null) return;
    const savedSession = window.opener.sessionStorage.getItem('cart');
    const cart = JSON.parse(savedSession);
    fillContent(cart);
})

{/* <tr class="row-700" data-row="700">
            <td class="goods-img">
                <img src="img/goods/iphone9.jpg" alt="">
            </td>
            <td class="goods-name">Iphone 9</td>
            <td>700</td>
            <td class="quantity-box"><p class="quantity">32</p></td>
            <td class="last-data"></td>
            <td>
                <button class="btn" value="700" type="button">Xóa</button>
            </td>
</tr> */}