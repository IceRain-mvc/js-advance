class LinkedList {

  /*
  *  append(data) : 尾部添加
  *  insert(position,data) : 任何位置 都可以添加
  *
  *  removeAt(position)根据位置删除
  * remove(data)根据数据删除
  *
  *  get(position)// 获取数据
  * let position = indexOf(data) 根据数据查找
  *
  *  update(position , newData)
  *
  *  toArray()
  *  fromArray()
  * toString()
  * size()
  *
  * */

  constructor() {
    this.head = null;

    this.tail = null;
    this.length = 0;
  }

  append(data) {
    let node = new Node(data);
    //node  data:传过来的值
    //next :null

    //this.head = node;
    //第一种情况 第一次添加 改变的是head
    if (!this.head) {
      this.head = node;
      //指向的是最后一个元素
      this.tail = node;
    } else {
      //改变tail的next指向
      this.tail.next = node;
      //改变tail 的值
      this.tail = node;
    }

    this.length += 1;
    return this;
  }

  get(position) { // node.data
    let current = this.head;// 第一个节点
    let index = 0;
    while (index++ < position) {
      current = current.next;//.优先级 > =
    }
    return current.data;
  }

  // 在哪删
  removeAt(position) {
    if (position < 0 || position > this.length - 1) return false;
    let current = this.head;
    //删除的是第一项
    if (position === 0) {
      this.head = this.head.next;
    } else {
      let index = 0;//
      let previous = null;//previous-->A:0  current-->B:1   C:2  position==1
      while (index++ < position) {
        previous = current;
        current = current.next;
      }
      previous.next = current.next;
      //如果删除的是最后一项
      if (position === this.length - 1) this.tail = previous;
    }
    this.length -= 1;
    return current.data;
  }


  /*变成数组*/
  toArray() {
    let current = this.head;
    let arr = [];
    while (current) {
      arr.push(current.data);
      current = current.next;
    }
    return arr;
  }


  update(position, newData) {
    if (position < 0 || position > this.length - 1) return false;

    let index = 0;
    let current = this.head;
    while (index++ < position) {
      current = current.next
    }
    current.data = newData;
    return true;
  }

  //把数组变成链表
  fromArray(arr) {
    if (Object.prototype.toString.call(arr) === '[object Array]') {
      for (let i = 0; i < arr.length; i++) {
        this.append(arr[i])
      }
    }
    return this;
  }


  insert(position, data) {
    let node = new Node(data);
    //插入的是不是第一个位置
    if (position === 0) {
      node.next = this.head;
      this.head = node;
      this.tail = node;
    } else {
      let current = this.head;
      let previous = null;
      let index = 0;
      while (index++ < position) {
        previous = current;
        current = current.next;
      }
      //当前插入节点的next 赋值
      node.next = current;
      previous.next = node;
      //刚才少了这步
      if (position === this.length - 1) this.tail = current;
    }
    return this;
  }
}

class Node {
  constructor(data) {
    this.data = data;
    //下一个节点
    this.next = null;
  }
}
