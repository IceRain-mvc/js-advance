function mergeLinkedList(list1, list2) {
  //1:查找到list1 的最后一项
  let current = list1.head;
  while (current.next) {
    current = current.next;
  }
  current.next = list2.head;
  return list1;
}
