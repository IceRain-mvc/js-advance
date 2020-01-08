/*区域划分*/


//接口只定义方法
// 没有具体的实现

interface Animal {
  eat(food: string): boolean;
}

interface Dog extends Animal {
  jump(dos: number): boolean;
}

interface Cat extends Animal {
  catchMouse(dos: number): boolean;
}

//实现 接口
class MyDog implements Dog {
  eat(food: string): boolean {
    if (food === '狗粮') {
      return true;
    } else if (food === '香肠') {
      return false;
    } else if (food === '肉') {
      return true;
    } else {
      return false;
    }
  }

  jump(dos: number): boolean {
    return false;
  }
}

//实现 接口
class MyCat implements Cat {
  eat(food: string): boolean {
    if (food === '狗粮') {
      return true;
    } else if (food === '香肠') {
      return false;
    } else if (food === '肉') {
      return true;
    } else {
      return false;
    }
  }

  catchMouse(dos: number): boolean {
    return false;
  }
}


function getPet(pet: Dog | Cat): string {

  /*第一种方式*/
  // if (pet instanceof MyDog) {
  //   console.log('狗狗');
  // } else {
  //   console.log('猫咪');
  //
  // }

  //    (  <Dog>:泛型 强制转换  pet   )
  if ((<Dog>pet).jump) {
    console.log('狗狗');
  } else {
    // console.log('猫咪');
  }

  return pet.eat('肉') ? '吃饱了' : '没吃饱';
}

//只能new
let dog = new MyDog();

console.log(getPet(dog));
console.log(getPet(new MyCat()));

