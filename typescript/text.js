var arr = [1, 2, 3, 4, ''];
arr.push(1);
arr.push('11');
// [1,2,4,5,'']
function getName(str) {
    /*
    * void : 没有返回类型
    * */
    return '姓名:' + str;
}
getName('张三丰');
function getPerson(str) {
    /*
    * void : 没有返回类型
    * */
    console.log(str.name);
    console.log(str.age);
    return '姓名:' + str;
}
getPerson({ name: '', age: 11 });
