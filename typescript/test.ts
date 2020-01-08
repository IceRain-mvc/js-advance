let arr: Array<number | string> = [1, 2, 3, 4, ''];

arr.push(1);
arr.push('11');

// [1,2,4,5,'']
function getName(str: string): string {
    /*
    * void : 没有返回类型
    * */
    return '姓名:' + str;
}

getName('张三丰');


function getPerson(str: Person): string {
    /*
    * void : 没有返回类型
    * */

    console.log(str.name);
    console.log(str.age);

    return '姓名:' + str;
}

getPerson({name: '', age: 11});
// getPerson({lalala:"1"});

/*
* 接口 interface
* */

interface Person {
    name: string;
    age: number;
}

interface Person1 {
    [key: string]: string
}
