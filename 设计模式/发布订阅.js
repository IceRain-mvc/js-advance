class Observer {
  constructor() {
    this.sub = null
  }

  /*
  * 发布者 : 狼人
  * */
  notify(msg) {
    this.sub(msg);
  }

  /*
  * 订阅者 : 预言家
  * */
  subscribe(sub) {
    this.sub = sub
  }
}

let observer = new Observer();

function sub(msg) {
  console.log(msg)
}

//组件A
observer.subscribe(sub);

//组件B:
observer.notify('史京港 有人暗恋你');

