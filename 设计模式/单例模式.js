class Single {
  constructor() {

  }

  init() {

  }
}

//闭包的作用域  instance会不会销毁
Single.getInstance = (function () {
  let instance = null;
  return function () {
    if (!instance) {
      instance = new Single();
    }
    return instance;
  }
})();

//instance = new Single()


//new 新的
let s1 = Single.getInstance();
let s2 = Single.getInstance();
let s3 = Single.getInstance();
let s4 = Single.getInstance();

console.log(s1 === s4);


