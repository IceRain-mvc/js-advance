function binary_search(arr, key) {
  let low = 0, high = arr.length - 1;
  let count = 0;
  while (low <= high) {
    count++;
    let mid = Math.ceil((high + low) / 2);
    if (key === arr[mid]) {
      return {
        mid, count
      };
    } else if (key > arr[mid]) {
      low = mid + 1;
    } else if (key < arr[mid]) {
      high = mid - 1;
    } else {
      return -1;
    }
  }
}

let arr = [];
for (let i = 0; i < 1000; i++) {
  arr.push(i)
}

console.log(binary_search(arr, 500));
