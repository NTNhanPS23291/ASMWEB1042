const obj = {
    name: "Akito",
    age: "125",
    color: "Orange"
};
// console.log(obj.color);
const obj1 = {...obj};
obj1.name = 'Akiko';
// obj1.color = "Skyblue"
// console.log(obj1.color);
// console.log(obj.color);
// const a = window.sessionStorage;
Set.prototype.hasObject = function(name) {
    let exist = false;
    this.forEach(obj => {
        if(obj.name === name) exist = true;
    })
    return exist;
}
const set = new Set();
if(!set.hasObject(obj.name)) set.add(obj);
console.log(set);
if(!set.hasObject(obj1.name)) set.add(obj1);
console.log(set);