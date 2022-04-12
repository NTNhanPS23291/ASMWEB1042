const goodsContainer = document.querySelector('.goods-container');
const moveToCartPage = document.querySelector('.goods-cart--img');
const goodsCart = document.querySelector('.goods-cart');
const shopping = document.getElementById('shopping');
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

shopping.addEventListener('click', scrollToShop);

moveToCartPage.addEventListener('click', () => {
    window.open(`${window.location.href}giohang.html`, '_blank');
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
})

window.addEventListener('storage', e => {
    if (e.url.match(/(giohang.html)/g) === null) return;
    const changedSession = sessionStorage.getItem('cart');
    const newCart = JSON.parse(changedSession);
    cart = [...newCart];
    setCartQuantity();
})
