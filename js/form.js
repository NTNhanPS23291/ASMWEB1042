const formSignUp = document.querySelector('.formSignup');
const btn = document.querySelector('.btn');
btn.addEventListener('click', e => {
    const hoten = formSignUp.signupName.value;
    const found = hoten.match(/\d+/g);
    if (hoten.length === 0 || found !== null) {
        console.log("Vui lòng nhập họ tên và không bao gồm ký tự số");
    }
    else {
        console.log("Nhập đúng");
    }
})