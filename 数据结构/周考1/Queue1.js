class Queue1{
  constructor() {
    this.list = new LinkedList();
  }

  enqueue(data) {
    this.list.append(data);
  }

  outqueue() {
    return this.list.removeAt(0);
  }

  indexData(index) {
    return this.list.get(index);
  }

  empty() {
    return this.list.size() === 0;
  }

  sizes() {
    return this.list.size();
  }
}
