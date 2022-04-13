const form = document.querySelector('.form');
const popup = document.querySelector('.popup-container');
const popupBtn = document.querySelector('.popup-correct-btn');

const formCheck = function () {
    const frm = document.forms[0];
    const elements = [...frm].filter(elm => elm.name.length > 0);
    const textCheck = new Set([showError(elements[0]), showError(elements[1]), showError(elements[2]), showError(elements[11])]);
    const allValid = [!textCheck.has(false), showError(elements[3]), showError(elements[5]), showError(elements[10])];
    if (allValid.includes(false)) {
        alert('Nhập thông tin chưa đúng');
        return false;
    }
    if (popup.classList.contains('hide')) {
        popup.classList.remove('hide');
        form.parentElement.parentElement.classList.add('blur');
    }
    return true;
}

const checkElements = function (target) {
    if (target.name === 'signupCode') return target.value.length === 7;
    if (target.name === 'signupName') return target.value.length >= 2 && target.value.length <= 30;
    if (target.name === 'signupEmail') {
        const emailPattern = target.value.match(/\w+@\w+(\.\w+){1,2}/g);
        return emailPattern !== null && emailPattern.length === 1 && emailPattern[0] === target.value;
    }
    if (target.name === "gender") {
        const genders = [...document.formSignup.gender];
        const hasChecked = [genders[0].checked, genders[1].checked];
        if (!hasChecked.includes(true)) return false;
        return true;
    }
    if (target.name === "hobby") {
        let checkedMap = [...document.formSignup.hobby].map(elm => elm.checked);
        return checkedMap.includes(true);
    }
    if (target.name === "signupNation") return +target.value !== 0;
    if (target.name === "description") return target.value.length <= 500;
}

const showError = function (target) {
    const name = target.name;
    const isValid = checkElements(target);
    if (name === "signupCode" || name === "signupName" || name === "signupEmail" || name === "signupNation" || name === "description") {
        const errorP = target.nextElementSibling;
        if (!isValid) errorP.classList.remove('hide');
        else errorP.classList.add('hide');
        return isValid;
    }
    if (name === "gender" || name === "hobby") {
        const errorP = target.parentElement.nextElementSibling;
        if (!isValid) errorP.classList.remove('hide');
        else errorP.classList.add('hide');
        return isValid;
    }
}

form.addEventListener('input', e => showError(e.target));
form.addEventListener('click', e => showError(e.target));
popupBtn.addEventListener('click', e => {
    if (!popup.classList.contains('hide')) {
        popup.classList.add('hide');
        form.parentElement.parentElement.classList.remove('blur');
    }
})