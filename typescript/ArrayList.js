// let 你好 = '11';
//
// console.log(你好);
var ArrayList = /** @class */ (function () {
    function ArrayList() {
        this.arr = [];
    }
    ArrayList.prototype.insert = function (data) {
        this.arr.push(data);
        return this;
    };
    ArrayList.prototype.toString = function () {
        return this.arr.join(' ');
    };
    ArrayList.prototype.swap = function (m, n) {
        var temp = this.arr[m];
        this.arr[m] = this.arr[n];
        this.arr[n] = temp;
    };
    /*冒泡排序*/
    ArrayList.prototype.bubbleSort = function () {
        /*
        * 大的往后放
        * */
        for (var j = this.arr.length - 1; j >= 0; j--) {
            for (var i = 0; i < j; i++) {
                if (this.arr[i] > this.arr[i + 1]) {
                    /*替换位置*/
                    this.swap(i, i + 1);
                }
            }
        }
        return this.arr;
    };
    /*
    * 选择排序
    * */
    ArrayList.prototype.selectionSort = function () {
        for (var j = 0; j < this.arr.length - 1; j++) {
            var min = j;
            for (var i = min + 1; i < this.arr.length; i++) {
                if (this.arr[min] > this.arr[i]) {
                    min = i;
                }
            }
            this.swap(min, j);
        }
        return this.arr;
    };
    ArrayList.prototype.quickSort = function () {
        return this._quickSort(this.arr);
    };
    ArrayList.prototype._quickSort = function (arr) {
        if (arr.length === 0) {
            return arr;
        }
        /*取出一个基准点*/
        var pivotIndex = Math.ceil(arr.length / 2);
        var pivot = arr[pivotIndex];
        /*定义3个数组 left  right  center*/
        var left = [], right = [], center = [];
        /*循环*/
        for (var i = 0; i < arr.length; i++) {
            /*比较 小于 left.push  right.push */
            if (arr[i] < pivot) {
                left.push(arr[i]);
            }
            else if (arr[i] > pivot) {
                right.push(arr[i]);
            }
            else {
                center.push(arr[i]);
            }
        }
        return this._quickSort(left).concat(center, this._quickSort(right));
    };
    return ArrayList;
}());
