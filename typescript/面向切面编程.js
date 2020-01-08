/*区域划分*/
//实现 接口
var MyDog = /** @class */ (function () {
    function MyDog() {
    }
    MyDog.prototype.eat = function (food) {
        if (food === '狗粮') {
            return true;
        }
        else if (food === '香肠') {
            return false;
        }
        else if (food === '肉') {
            return true;
        }
        else {
            return false;
        }
    };
    MyDog.prototype.jump = function (dos) {
        return false;
    };
    return MyDog;
}());
//实现 接口
var MyCat = /** @class */ (function () {
    function MyCat() {
    }
    MyCat.prototype.eat = function (food) {
        if (food === '狗粮') {
            return true;
        }
        else if (food === '香肠') {
            return false;
        }
        else if (food === '肉') {
            return true;
        }
        else {
            return false;
        }
    };
    MyCat.prototype.catchMouse = function (dos) {
        return false;
    };
    return MyCat;
}());
function getPet(pet) {
    /*第一种方式*/
    // if (pet instanceof MyDog) {
    //   console.log('狗狗');
    // } else {
    //   console.log('猫咪');
    //
    // }
    //    (  <Dog>:泛型 强制转换  pet   )
    if (pet.jump) {
        console.log('狗狗');
    }
    else {
        // console.log('猫咪');
    }
    return pet.eat('肉') ? '吃饱了' : '没吃饱';
}
//只能new
var dog = new MyDog();
console.log(getPet(dog));
console.log(getPet(new MyCat()));
