class JQuery {

  constructor() {
    this.nodes = {};
  }

  init(nodeOrString) {
    if (typeof nodeOrString === 'string') {
      let node = document.querySelectorAll(nodeOrString);
      for (let i = 0; i < node.length; i++) {
        this.nodes[i] = node[i];
      }
      this.nodes.length = node.length;
    } else if (nodeOrString instanceof Node) {
      this.nodes = {
        0: nodeOrString,
        length: 1
      };
    } else {
      throw new TypeError('node must be type one of string or ElementNode');
    }

    this.nodes.addClass = this.addClass.bind(this);
    // this.nodes.addAnimate = this.addClass.bind(this);
    // this.nodes.addClass = this.addClass.bind(this);
    // this.nodes.addClass = this.addClass.bind(this);

    return this.nodes;
  }

  addClass(className) {
    for (let i = 0; i < this.nodes.length; i++) {
      console.log(this.nodes[i].classList.add(className));
    }
  }
}

JQuery.getInstance = (function () {
  let instance;
  return function () {
    if (!instance) {
      instance = new JQuery();
    }
    return instance;
  }
})();


let jQuery = JQuery.getInstance();
window.$ = jQuery.init.bind(jQuery);

// $()
