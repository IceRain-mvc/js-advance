class Queue {
  constructor() {
    this.items = []
  }

  enqueue(data) {//人名
    this.items.push(data);
  }

  outqueue() {
    return this.items.shift();
  }

  indexData(index) {
    return this.items[index];
  }

  empty() {
    return this.items.length === 0;
  }

  sizes() {
    return this.items.length;
  }
}

let arr = ['小淘气', '小可爱', '小宝贝', '小英俊', '小花', '小机灵鬼'];

function forQueue(arr) {
  //入队
  let queue = new Queue();
  for (let i = 0; i < arr.length; i++) {
    queue.enqueue(arr[i]);
  }
  let looser = [];
  // console.log(queue);
  while (queue.sizes() > 1) {
    let index = 0;
    let randoms = Math.ceil(Math.random() * 10);//0-1
    while (index < randoms - 1) {
      queue.enqueue(queue.outqueue());
      index++;
    }
    let str = queue.outqueue();
    // console.log(randoms, str);
    looser.push(str);
  }
  return looser;
}

forQueue(arr);
// console.log(Math.ceil(Math.random() * 10));
console.log(forQueue(arr));
