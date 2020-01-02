class Queue {
  constructor() {
    this.items = [];
  }

  //入队
  enqueue(element) {
    this.items.push(element);
  }

  //出队
  dequeue() {
    return this.items.shift();
  }

  //队的长度
  size() {
    return this.items.length;
  }

  //队的是否为空
  isEmpty() {
    return this.items.length === 0;
  }

  //每一项 toString
  toString() {
    let str = '';

    for (let i = 0; i < this.items.length; i++) {
      str += this.items[i];
      if (this.items.length - 1 !== i) str = +" "
    }
    return str
  }

  //队中的最后一个元素
  front() {
    return this.items[this.items.length - 1];
  }
}
