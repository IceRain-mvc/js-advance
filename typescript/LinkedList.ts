// interface OneNode {
//     next: ElementNode | null;
// }

class LinkedList {
  private head: ElementNode;
  private tail: ElementNode = null;
  private length: number = 0;

  public append(data: any): LinkedList {
    let node: ElementNode = new ElementNode(data);
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

  public get(position: number): any { // node.data
    let current: ElementNode = this.head;// 第一个节点
    let index: number = 0;
    while (index++ < position) {
      current = current.next;//.优先级 > =
    }
    return current.data;
  }

  // 在哪删
  public removeAt(position: number): any {
    if (position < 0 || position > this.length - 1) return false;
    let current: ElementNode = this.head;
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


  /*变成数组  any*/
  public toArray(): Array<any> {
    let current: ElementNode = this.head;
    let arr: Array<any> = [];
    while (current) {
      arr.push(current.data);
      current = current.next;
    }
    return arr;
  }


  public update(position, newData): boolean {
    if (position < 0 || position > this.length - 1) return false;

    let index: number = 0;
    let current: ElementNode = this.head;
    while (index++ < position) {
      current = current.next
    }
    current.data = newData;
    return true;
  }

  //把数组变成链表
  public fromArray(arr): LinkedList {
    if (Object.prototype.toString.call(arr) === '[object Array]') {
      for (let i = 0; i < arr.length; i++) {
        this.append(arr[i])
      }
    }
    return this;
  }


  public insert(position: number, data: any): LinkedList {
    let node: ElementNode = new ElementNode(data);
    //插入的是不是第一个位置
    if (position === 0) {
      node.next = this.head;
      this.head = node;
      this.tail = node;
    } else {
      let current: ElementNode = this.head;
      let previous: ElementNode = null;
      let index = 0;
      while (index++ < position) {
        previous = current;
        current = current.next;
      }
      //当前插入节点的next 赋值
      node.next = current;
      previous.next = node;
      if (position === this.length - 1) this.tail = current;
    }
    return this;
  }
}

class ElementNode {
  data: any;
  next: ElementNode ;

  constructor(data: any) {
    this.data = data;
    //下一个节点
    this.next = null;
  }
}


let linkedList = new LinkedList();
linkedList.append(1);
linkedList.append(2);
linkedList.append(3);
console.log(linkedList.toArray());
