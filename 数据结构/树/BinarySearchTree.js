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
}

class Node {
  constructor(key) {
    this.key = key;
    this.left = null;
    this.right = null;
  }

}
