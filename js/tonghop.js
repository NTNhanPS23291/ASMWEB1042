const goodsContainer = document.querySelector('.goods-container');
const moveToCartPage = document.querySelector('.goods-cart--img');
const goodsCart = document.querySelector('.goods-cart');
const shopping = document.getElementById('shopping');
const signupBtn = document.getElementById('signup');
class Phone {
    constructor(phoneName, price, limit, quantity) {
        this.phoneName = phoneName;
        this.price = price;
        this.limit = limit;
        this.quantity = quantity;
    }
}

let cart = [];

const setCartQuantity = function () {
    goodsCart.setAttribute('value', cart.length);
};

const addToSession = function () {
    sessionStorage.setItem('cart', JSON.stringify(cart));
    const changedLocal = localStorage.getItem('changed');
    if (changedLocal === null) localStorage.setItem('changed', 'yes');
    else localStorage.clear();
}

const addToCart = function (element) {
    const goodsContent = element.parentElement.parentElement.parentElement;
    const quantity = +goodsContent.querySelector('.goods-quantity').value;
    if (quantity === 0) return;
    const phoneName = goodsContent.querySelector('.goods-title').innerText;
    const price = +goodsContent.querySelector('.goods-price').innerText.match(/\d+/g);
    const limit = +goodsContent.querySelector('.goods-limit').innerText.match(/\d+/g);
    const phone = new Phone(phoneName, price, limit, quantity);
    if (cart.length === 0) cart.push(phone);
    let count = 0;
    for (let i = 0; i < cart.length; i++) {
        if (cart[i].phoneName === phone.phoneName) count++;
        if (cart[i].phoneName === phone.phoneName && cart[i].quantity !== phone.quantity) {
            cart[i].quantity = phone.quantity;
            break;
        }
    }
    if (count === 0) cart.push(phone);
    addToSession()
}

const checkQuantity = function (element) {
    if (+element.value < 0 || element.value.length === 0) {
        element.value = '';
        return;
    }
    const goodsContent = element.parentElement.parentElement;
    const limit = +goodsContent.querySelector('.goods-limit').innerText.match(/\d+/g);
    if (+element.value > limit) element.value = limit;
}

function scrollToShop() {
    const shopSectionCoord = document.querySelector('.goods-section').getBoundingClientRect();
    // window.scrollTo(window.scrollX + shopSectionCoord.left, window.scrollY + shopSectionCoord.top)
    window.scrollTo({
        left: window.scrollX + shopSectionCoord.left,
        top: window.scrollY + shopSectionCoord.top,
        behavior: 'smooth'
    })
}

// function showForm() {
//     if (form.classList.contains('form-hide')) form.classList.remove('form-hide');
//     document.querySelectorAll('.blurred').forEach(elm => {
//         elm.classList.add('on');
//     })
// }
const form = document.querySelector('.container');
// const input = document.querySelector('input');
// input.list
document.addEventListener('click', function (e) {
    let isClickInside = form.contains(e.target);
    if (form.classList.contains('form-hide') && e.target.id === 'signup') {
        form.classList.remove('form-hide');
        document.querySelectorAll('.blurred').forEach(elm => {
            elm.classList.add('on');
        })
        return;
    }

    if (!form.classList.contains('form-hide') && !isClickInside) {
        form.classList.add('form-hide');
        document.querySelectorAll('.blurred').forEach(elm => {
            elm.classList.remove('on');
        })
    }

})

shopping.addEventListener('click', scrollToShop);
// signupBtn.addEventListener('click', showForm);


moveToCartPage.addEventListener('click', () => {
    let url = window.location.href.match(/(index.html)/g);
    if (url === null) {
        window.open(`${window.location.href}giohang.html`, '_blank');
    }
    else {
        window.open(`../giohang.html`, '_blank');
    }
});

goodsContainer.addEventListener('input', function (e) {
    if (e.target.classList.contains('goods-quantity')) {
        checkQuantity(e.target);
    }
});

goodsContainer.addEventListener('click', e => {
    if (e.target.classList.contains('goods-prompt')) {
        addToCart(e.target);
        setCartQuantity();
    }
});

window.addEventListener('storage', e => {
    console.log(e.url);
    if (e.url.match(/(giohang.html)/g) === null) return;
    const changedSession = sessionStorage.getItem('cart');
    const newCart = JSON.parse(changedSession);
    cart = [...newCart];
    setCartQuantity();
});

// window.addEventListener('click', function (e) {
//     if (!e.target.classList.contains('container')) {
//         document.querySelectorAll('.on').forEach(elm => elm.classList.remove('on'));
//     }
// })

!function () {
    'use strict';
    angular.module('FormCheck', [])
        .controller('FormCheckController', FormCheckController);
    FormCheckController.$inject = ['$scope'];
    function FormCheckController(s) {
        s.info = {};
        s.formValid = false;

        s.switch = function () {
            s.formValid = false;
            s.blurClass = false;
        }

        s.formCheck = function ($event) {
            $event.preventDefault();
            let stdCode = s.info.mssv;
            let stdName = s.info.name;
            let stdEmail = s.info.email;
            let checkEmail = !stdEmail ? null : stdEmail.match(/\w+@\w+(\.\w+){1,2}/g);
            let stdGender = s.info.gender;
            let stdHobbies = s.info.hobby;
            let stdNation = s.info.nationality;
            if (!stdCode || !stdName || !stdGender || !stdHobbies || !stdNation || +stdNation === 0 || !stdEmail) {
                alert('Nhập thông tin chưa đúng. Mời nhập lại');
                s.formValid = false;
                return false;
            }
            if (stdEmail) {
                if (checkEmail === null || checkEmail?.length !== 1 || checkEmail[0] !== stdEmail) {
                    alert('Nhập thông tin chưa đúng. Mời nhập lại');
                    s.formValid = false;
                    return false;
                }
            }
            if (stdHobbies) {
                let hobbyArr = Object.values(stdHobbies);
                if (hobbyArr === null || !hobbyArr.includes(true)) {
                    alert('Nhập thông tin chưa đúng. Mời nhập lại');
                    s.formValid = false;
                    return false;
                }
            }
            for (let info in s.info) {
                delete s.info[info];
            }
            s.formValid = true;
            s.blurClass = "blur";
            return true;
        }
    }
}();