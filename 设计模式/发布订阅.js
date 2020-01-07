class Observer {
  constructor() {
    this.publish = {};
  }

  /*
  * 发布者 : 狼人
  * */
  notify(key, msg) {
    if (this.publish[key]) {
      for (let i = 0; i < this.publish[key].length; i++) {
        this.publish[key][i](msg);
      }
    }
  }

  /*
  * 订阅者 : 预言家
  * */
  subscribe(key, callback) {
    if (!this.publish[key]) {
      this.publish[key] = [];
    }
    this.publish[key].push(callback);
  }


  unSubscribe(key, callback) {
    if (this.publish[key]) {
      for (let i = 0; i < this.publish[key].length; i++) {
        if (this.publish[key][i] === callback) {
          this.publish[key].splice(i, 1);
        }
      }
    }
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

/*
* 1:新闻  key:'news'
* 2:健康  key:'jiankang'
* 3:
* */
