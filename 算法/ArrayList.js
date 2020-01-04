// let 你好 = '11';
//
// console.log(你好);

class ArrayList {
  constructor() {
    this.arr = [];
  }

  insert(data) {
    this.arr.push(data);
    return this;
  }

  toString() {
    return this.arr.join(' ');
  }

  swap(m, n) {
    let temp = this.arr[m];
    this.arr[m] = this.arr[n];
    this.arr[n] = temp;
  }

  /*冒泡排序*/
  bubbleSort() {
    /*
    * 大的往后放
    * */
    for (let j = this.arr.length - 1; j >= 0; j--) {
      for (let i = 0; i < j; i++) {
        if (this.arr[i] > this.arr[i + 1]) {
          /*替换位置*/
          this.swap(i, i + 1);
        }
      }
    }
    return this.arr;
  }

  /*
  * 选择排序
  * */
  selectionSort() {
    for (let j = 0; j < this.arr.length - 1; j++) {
      let min = j;
      for (let i = min + 1; i < this.arr.length; i++) {
        if (this.arr[min] > this.arr[i]) {
          min = i
        }
      }
      this.swap(min, j);
    }
    return this.arr;
  }


  quickSort() {
    return this._quickSort(this.arr)
  }

  _quickSort(arr) {
    if (arr.length === 0) {
      return arr;
    }
    /*取出一个基准点*/
    let pivotIndex = Math.ceil(arr.length / 2);
    let pivot = arr[pivotIndex];
    /*定义3个数组 left  right  center*/
    let left = [], right = [], center = [];
    /*循环*/
    for (let i = 0; i < arr.length; i++) {
      /*比较 小于 left.push  right.push */
      if (arr[i] < pivot) {
        left.push(arr[i])
      } else if (arr[i] > pivot) {
        right.push(arr[i]);
      } else {
        center.push(arr[i]);
      }
    }
    return [...this._quickSort(left), ...center, ...this._quickSort(right)]
  }

}
