function Stack() {
  // 好处 : new
  // Stack.prototype.
  this.items = [];
  /*入栈*/
  Stack.prototype.push = function (element) {
    this.items.push(element);
  };

  /*出栈操作*/
  Stack.prototype.pop = function () {
    //被删除项
    return this.items.pop();
  };

  Stack.prototype.size = function () {
    return this.items.length;
  };

  /*栈顶元素*/
  Stack.prototype.peek = function () {
    return this.items[this.items.length - 1];
  };

  /*判断是否为空*/
  Stack.prototype.isEmpty = function () {
    return this.items.length === 0;
  };

  Stack.prototype.toString = function () {
    let str = '';
    for (let i = 0; i < this.items.length; i++) {
      str += this.items[i] + ' ';
    }
    return str;
    //this.items 变成字符串  a b c d  [Object Object]
  };
}
