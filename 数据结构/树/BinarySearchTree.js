class BinarySearchTree {

  constructor() {
    //this.head
    this.root = null;
  }

  //20
  insert(key) {
    let node = new Node(key);
    if (!this.root) {
      this.root = node;
    } else {
      this._insertNode(this.root, node);// 有根节点
    }
  }

  _insertNode(node, newNode) {// 25  22
    if (node.key > newNode.key) {
      if (!node.left) {
        node.left = newNode;
      } else {
        this._insertNode(node.left, newNode);
      }
    } else {
      if (!node.right) {
        node.right = newNode;
      } else {
        this._insertNode(node.right, newNode);
      }
    }
  }

  max() {
    let node = this.root;// 30
    while (node.right) {
      node = node.right;
    }
    return node.key;
  }

  min() {
    let node = this.root;// 30
    while (node.left) {
      node = node.left;
    }
    return node.key;
  }

  search(key) {
    let node = this.root;
    // while (node) {
    //   if (node.key > key) {
    //     if (node.left) {
    //       node = node.left;
    //     } else {
    //       return false;
    //     }
    //   } else if (node.key < key) {
    //     if (node.right) {
    //       node = node.right;
    //     } else {
    //       return false;
    //     }
    //   } else {
    //     return true;
    //   }
    // }
    return this._searchNode(node, key)
  }


  _searchNode(node, key) {
    if (!node) {
      return false;
    }
    if (node.key > key) {
      return this._searchNode(node.left, key);
    } else if (node.key < key) {
      return this._searchNode(node.right, key);
    } else return node.key === key;
  }

  /*
  * 排序: 二分 查找
  *
  * 先
  * 中序遍历
  * 后
  * */
  midTraverse(handler) {
    let node = this.root;
    this._midTraverse(node, handler);
  }

  //
  _midTraverse(node, handler) {
    if (node) {
      this._midTraverse(node.left, handler);
      handler(node.key);//node.key  1  2  3  4 5 6
      this._midTraverse(node.right, handler);
    }
  }
}

class Node {
  constructor(key) {
    this.key = key;
    this.left = null;
    this.right = null;
  }
}
