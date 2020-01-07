// interface OneNode {
//     next: ElementNode | null;
// }
var LinkedList = /** @class */ (function () {
    function LinkedList() {
        this.tail = null;
        this.length = 0;
    }
    LinkedList.prototype.append = function (data) {
        var node = new ElementNode(data);
        //node  data:传过来的值
        //next :null
        //this.head = node;
        //第一种情况 第一次添加 改变的是head
        if (!this.head) {
            this.head = node;
            //指向的是最后一个元素
            this.tail = node;
        }
        else {
            //改变tail的next指向
            this.tail.next = node;
            //改变tail 的值
            this.tail = node;
        }
        this.length += 1;
        return this;
    };
    LinkedList.prototype.get = function (position) {
        var current = this.head; // 第一个节点
        var index = 0;
        while (index++ < position) {
            current = current.next; //.优先级 > =
        }
        return current.data;
    };
    // 在哪删
    LinkedList.prototype.removeAt = function (position) {
        if (position < 0 || position > this.length - 1)
            return false;
        var current = this.head;
        //删除的是第一项
        if (position === 0) {
            this.head = this.head.next;
        }
        else {
            var index = 0; //
            var previous = null; //previous-->A:0  current-->B:1   C:2  position==1
            while (index++ < position) {
                previous = current;
                current = current.next;
            }
            previous.next = current.next;
            //如果删除的是最后一项
            if (position === this.length - 1)
                this.tail = previous;
        }
        this.length -= 1;
        return current.data;
    };
    /*变成数组  any*/
    LinkedList.prototype.toArray = function () {
        var current = this.head;
        var arr = [];
        while (current) {
            arr.push(current.data);
            current = current.next;
        }
        return arr;
    };
    LinkedList.prototype.update = function (position, newData) {
        if (position < 0 || position > this.length - 1)
            return false;
        var index = 0;
        var current = this.head;
        while (index++ < position) {
            current = current.next;
        }
        current.data = newData;
        return true;
    };
    //把数组变成链表
    LinkedList.prototype.fromArray = function (arr) {
        if (Object.prototype.toString.call(arr) === '[object Array]') {
            for (var i = 0; i < arr.length; i++) {
                this.append(arr[i]);
            }
        }
        return this;
    };
    LinkedList.prototype.insert = function (position, data) {
        var node = new ElementNode(data);
        //插入的是不是第一个位置
        if (position === 0) {
            node.next = this.head;
            this.head = node;
            this.tail = node;
        }
        else {
            var current = this.head;
            var previous = null;
            var index = 0;
            while (index++ < position) {
                previous = current;
                current = current.next;
            }
            //当前插入节点的next 赋值
            node.next = current;
            previous.next = node;
            if (position === this.length - 1)
                this.tail = current;
        }
        return this;
    };
    return LinkedList;
}());
var ElementNode = /** @class */ (function () {
    function ElementNode(data) {
        this.data = data;
        //下一个节点
        this.next = null;
    }
    return ElementNode;
}());
var linkedList = new LinkedList();
linkedList.append(1);
linkedList.append(2);
linkedList.append(3);
console.log(linkedList.toArray());
