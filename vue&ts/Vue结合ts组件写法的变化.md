## `Vue`组件写法的变化

在此之前, 我们可能需要先了解下[ES7装饰器(Decorator)在Javascript中的使用](https://blog.hduzplus.xyz/articles/2018/09/29/1538213899209.html)

1. `vue-class-component` , 对 `Vue` 组件进行了一层封装，让` Vue` 组件语法在结合了` TypeScript `语法更加贴近面向对象编程. 并提供一个工具函数一个装饰器:

- `@Component`
- `@mixins`

1. `vue-property-decorator`, 在` vue-class-component `上增强更多的结合 `Vue` 特性的装饰器, 新增了这 7 个装饰器：

- `@Watch`
- `@Model`
- `@Prop`
- `@PropSync`
- `@Emit`
- `@Provide & @Inject`
- `@Ref`

因此, 会有以下写法上的改变

### 1. @Component

`@Component(options) options `中需要配置 `decorator` 库不支持的属性, 如: `components`, `filters`, `directives`等

示例:

```vue
<template>
 <div>
     <input-demo :demo="demo"></input-demo>
   </div>
 </div>
</template>

<script lang="ts">
import Component from 'vue-class-component'
import { Emit, Inject, Model, Prop, Provide, Ref, Vue, Watch, PropSync } from 'vue-property-decorator'

import InputDemo from './InputDemo.vue'

@Component({
  components: {
    InputDemo
  }
})
export default class Demo extends Vue {
  // data
  count = 0
  demo = '123'

  mounted () {
    window.console.log('bar=> ', this.bar)
    window.console.log('foo=> ', this.foo)
    window.console.log('optional=> ', this.optional)
  }
}
</script>
 
```

### 2. `mixins`

在使用`Vue`进行开发时我们可能需要用到混合,在`TypeScript`中, 我们可以这么写

在以下示例中`mixins/index.ts`中, 我们在data中添加了一个属性`mixinVal`, 值为: `'Hello Mixin'`

```ts
// 定义要混合的类 mixins/index.ts
import Vue from 'vue'
import Component from 'vue-class-component'

@Component
// 一定要用Component修饰
export default class myMixins extends Vue {
  mixinVal: string = 'Hello Mixin'
}
 
```

然后, 在其他组件中使用它

```vue
<template>
  <div>
    <hello-world msg='hello world'></hello-world>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import Component, { mixins } from 'vue-class-component'
import { Emit, Inject, Model, Prop, Provide, Watch, PropSync, Ref } from 'vue-property-decorator'

import HelloWorld from '../components/HelloWorld.vue'
import mixinDemo from './mixin'

@Component({
  components: {
    HelloWorld // 组件注入
  }
})
export default class App extends mixins(mixinDemo) {
  // data
  message = 'hello'
  mounted () {
    // 此时, 就可以使用this.mixinVal
    window.console.log('mixinVal => ', this.mixinVal) // 输出: 'Hello Mixin'
  }
}
</script>
 
```

### 3. data

```ts
export default class App extends Vue {
  // data
  message = 'hello'
  name = 'dmax'
  child: number | string = 'james'
}
 
```

等价于:

```ts
export default {
    name: 'App',
    data () {
        return {
            message: 'hello',
            name: 'dmax',
            child: 'james'
        }
    }
}
 
```

### 4. computed

```ts
// 计算属性
  get msg () {
    return 'computed ' + this.message
  }
 
```

等价于:

```ts
computed: {
    msg(){
        return 'computed ' + this.message
    }
}
 
```

### 5. watch

`@Watch(path: string, options: WatchOptions = {})`

`@Watch `装饰器接收两个参数：

- `path: string` 被侦听的属性名；
- `options?: WatchOptions={} options`可以包含两个属性 ： 
  - `immediate?:boolean `侦听开始之后是否立即调用该回调函数；
  - `deep?:boolean `被侦听的对象的属性被改变时，是否调用该回调函数；

```ts
@Watch('child')
onChildChanged (val: string, oldVal: string) {
    if (val !== oldVal) {
    window.console.log(val)
    }
}
 
```

等价于:

```ts
watch: {
    'child': {
        handler: 'onChildChanged',
        immediate: false,
        deep: false 
    }
},
method: {
    onChildChanged(val, oldVal) {
        if (val !== oldVal) {
          window.console.log(val)
        }
    }
}
 
```

也可以写成: `@Watch('child', { immediate: true, deep: true })`, 等价于:

```ts
watch: {
    'child': {
        handler: 'onChildChanged',
        immediate: true,
        deep: true 
    }
},
method: {
    onChildChanged(val, oldVal) {
        if (val !== oldVal) {
          window.console.log(val)
        }
    }
}
 
```

### 6. model

`@Model Vue`组件提供`model: {prop?: string, event?: string}` 让我们可以定制`prop`和`event`.默认情况下, 一个组件上的`v-model`会:

- 将 `value`用作 `prop`
- 将 `input`用作 `event`，但是一些输入类型比如单选框和复选框按钮可能想使用` value prop`来达到不同的目的。使用`model`选项可以回避这些情况产生的冲突。

下面是`Vue`官网的例子

```ts
Vue.component('my-checkbox', {
  model: {
    prop: 'checked',
    event: 'change'
  },
  props: {
    // this allows using the `value` prop for a different purpose
    value: String,
    // use `checked` as the prop which take the place of `value`
    checked: {
      type: Number,
      default: 0
    }
  },
  // ...
})
<my-checkbox v-model="foo" value="some value"></my-checkbox>
 
```

上述代码相当于：

```vue
<my-checkbox
  :checked="foo"
  @change="val => { foo = val }"
  value="some value">
</my-checkbox>
 
```

即`foo`双向绑定的是组件的`checked`, 触发双向绑定数值的事件是`change`

使用`vue-property-decorator`提供的`@Model`改造上面的例子.

`Parent.vue`

```vue
<template>
 <div>
   <child v-model="price"></child>
   <div>
     v-model(price) => {{price}}
   </div>
 </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator'

import Child from './Child.vue'

@Component({
  components: {
    Child
  }
})
export default class Parent extends Vue {
  price = 'hello price'
}
</script>
 
```

`Child.vue`

```vue
<template>
 <div>
   <input type="text" :value="value" @input="changed"/>
 </div>
</template>

<script lang="ts">
import { Vue, Component, Prop, Model, Emit } from 'vue-property-decorator'

@Component
export default class Child extends Vue {
  @Model('input') value!: boolean

  @Emit('input')
  changed (ev:any) {
    return ev.target.value
  }
}
</script>
 
```

最终效果可能为:



![img](https://user-gold-cdn.xitu.io/2019/11/22/16e9381d15960324?imageslim)



也可以通过`clone git`库 [vue-typescript-skills](https://github.com/hijameszhang/vue-typescript-skills.git), 运行本地服务后进入http://localhost:8080/#/model, 看到效果.

### 7. props

`@Prop(options: (PropOptions | Constructor[] | Constructor) = {})`

`@Prop`装饰器接收一个参数，这个参数可以有三种写法：

- `Constructor，例如String，Number，Boolean`等，指定` prop `的类型；
- `Constructor[]`，指定` prop` 的可选类型；
- `PropOptions`，可以使用以下选项：`type，default，required，validator`。

示例:

```ts
@Component
export default class Hello extends Vue {
  // child, 必传, child! => 表示不需要构建器进行初始化
  @Prop({ type: [String, Number], required: true }) readonly child!: string | number

  // propA, 非必传, 类型可以是number | undefined
  @Prop(Number) readonly propA: number | undefined

  // propB, 非必传, 类型可以是number | undefined, propB! => 表示不需要构建器进行初始化
  @Prop({ default: 'default value' }) readonly propB!: string

  // propC, 非必传, 构建器可以是String|Boolean, 值类型可以为: string | boolean | undefined
  @Prop([String, Boolean]) readonly propC: string | boolean | undefined
}
 
```

等价于:

```ts
export default {
    name: 'Hello',
    props: {
        child: {
            required: true,
            type: [String, Number]
        },
        propA: {
            type: Number
        },
        propB: {
            required: false,
            type: String,
            default: 'default value'
        },
        propC: {
            type: [String, Boolean]
        }
    }
}
 
```

#### 注意

1. 属性的ts类型后面需要加上`undefined`类型；
2. 或者在属性名后面加上!，表示非`null `和 非`undefined`的断言，否则编译器会给出错误提示；

### 8. `prop.sync`

`@PropSync(propName: string, options: (PropOptions | Constructor[] | Constructor) = {})`

`@PropSync`装饰器与`@prop`用法类似，二者的区别在于：` @PropSync `装饰器接收两个参数：

- `propName: string `表示父组件传递过来的属性名；
- `options: Constructor | Constructor[] | PropOptions `与`@Prop`的第一个参数一致；

`@PropSync` 会生成一个新的计算属性。 示例:

```ts
import { Vue, Component, PropSync } from 'vue-property-decorator'

@Component
export default class MyComponent extends Vue {
  @PropSync('name', { type: String }) syncedName!: string
}
 
```

等价于

```ts
props: {
  name: {
    type: String
  }
},
computed: {
  syncedName: {
    get() {
      return this.name
    },
    set(value) {
      this.$emit('update:name', value)
    }
  }
}
 
```

#### 注意

`@PropSync`需要配合父组件的`.sync`修饰符使用

### 9. $emit

`@Emit(event?: string)`

- 接受一个参数` event?: string`, 如果没有的话会自动将` camelCase `转为` dash-case` 作为事件名.
- 会将函数的返回值作为回调函数的第二个参数, 如果是` Promise `对象,则回调函数会等 `Promise resolve` 掉之后触发.
- 如果`$emit` 还有别的参数, 比如点击事件的` event `, 会在返回值之后, 也就是第三个参数.

```ts
import { Vue, Component, Emit } from 'vue-property-decorator'

@Component
export default class MyComponent extends Vue {
  count = 0
  @Emit('reset')
  public resetCount() {
    this.count = 0
  }
  @Emit()
  public addToCount (n: number) {
    this.count += n
  }
  @Emit()
  public returnValue () {
    return 10
  }
  @Emit()
  public onInputChange (e:any) {
    return e.target.value
  }
  @Emit()
  public promise () {
    return new Promise(resolve => {
      setTimeout(() => {
        resolve(20)
      }, 0)
    })
  }
}
 
```

等价于

```ts
export default {
  data() {
    return {
      count: 0
    }
  },
  methods: {
    addToCount(n) {
      this.count += n
      this.$emit('add-to-count', n)
    },
    resetCount() {
      this.count = 0
      this.$emit('reset')
    },
    returnValue() {
      this.$emit('return-value', 10)
    },
    onInputChange(e) {
      this.$emit('on-input-change', e.target.value, e)
    },
    promise() {
      const promise = new Promise(resolve => {
        setTimeout(() => {
          resolve(20)
        }, 0)
      })
      promise.then(value => {
        this.$emit('promise', value)
      })
    }
  }
}
 
```

### 10. provide & inject

1. `@Provide(key?: string | symbol)`

`@Provide`接收一个参数:

- `key`, 值可以为`String` 或` symbol`类型

> 如果为了避免命名冲突, 可以使用 `ES6` 的 `Symbol `特性作为` key`

1. `@Inject(options?: { from?: InjectKey, default?: any } | InjectKey) decorator`

`@Inject` 装饰器一个参数, 该参数有两种要能：

- 若为`String`类型, 即为接收`(inject)`的`key`名称
- 若为对象, 则可能需要传入两个值: 
  - `from`, 接收`(inject)`的`key`名称
  - `default`, 若祖先没有`provide`此`key`, 则使用默认值

示例:

```ts
import { Component, Inject, Provide, Vue } from 'vue-property-decorator'

const symbol = Symbol('baz')

@Component
export class MyComponent extends Vue {
  @Inject() readonly foo!: string
  @Inject('bar') readonly bar!: string
  @Inject({ from: 'optional', default: 'default' }) readonly optional!: string
  @Inject(symbol) readonly baz!: string

  @Provide() foo = 'foo'
  @Provide('bar') baz = 'bar'
}
 
```

等价于:

```ts
const symbol = Symbol('baz')

export const MyComponent = Vue.extend({
  inject: {
    foo: 'foo',
    bar: 'bar',
    optional: { from: 'optional', default: 'default' },
    [symbol]: symbol
  },
  data() {
    return {
      foo: 'foo',
      baz: 'bar'
    }
  },
  provide() {
    return {
      foo: this.foo,
      bar: this.baz
    }
  }
})
 
```

### 11.` @ProvideReactive/@InjectReactive`

顾名思义就是响应式的注入, 会同步更新到子组件中. 比如下例可以实现在 input 中的输入实时注入到子组件中. 示例: `Parent.vue`

```vue
<template>
  <div>
    <input type="text" v-model="bar">
    <Child />
  </div>
</template>
<script lang="ts">
import { Vue, Component, Prop, ProvideReactive } from 'vue-property-decorator'

import Child from './Child.vue'

@Component({
  components: {
    Child
  }
})
export default class Parent extends Vue {
  @ProvideReactive() private bar = 'deeper lorry'
}
</script>

 
```

`Child.vue`

```vue
<template>
  <div >
    InjectReactive: {{bar}}
  </div>
</template>
<script lang="ts">
import { Vue, Component, Prop, InjectReactive } from 'vue-property-decorator'

@Component
export default class Child extends Vue {
  @InjectReactive() private bar!: string
}
</script>
 
```

最终效果可能如下:



![img](https://user-gold-cdn.xitu.io/2019/11/22/16e93916faa8225a?imageslim)

也可以通过clone git库 [vue-typescript-skills](https://github.com/hijameszhang/vue-typescript-skills.git), 运行本地服务后进入http://localhost:8080/#/provide, 看到效果.

### 12. ref

`@Ref(refKey?: string)`

@Ref装饰器接收一个可选参数:

- `refKey`, 值可以为String, 如果省略传输参数, 那么会自动将属性名作为参数, 注意与`@Emit`的区别, `@Emit`在不传参数的情况下会转为` dash-case`, 而 `@Ref`不会转, 为原属性名

```vue
<template>
  <div>
    <span>Name:</span>
    <input type="text" v-model="value" ref='name' />
  </div>
</template>

<script lang="ts">
@Component
export default class RefComponent extends Vue {
  @Ref('name') readonly name!: string;
  value = 'lorry'
  mounted() {
    window.console.log(this.inputName); // <input type="text">
  }
}
</script>
 
```

等价于:

```vue
<template>
  <div>
    <span>Name:</span>
    <input type="text" v-model="value" ref='name' />
  </div>
</template>

<script lang="ts">
@Component
export default {
  data(){
      return {
          value: 'lorry'
      }
  },
  computed: {
    inputName(){
        return this.$refs.name
    }
  },
  mounted() {
    window.console.log(this.inputName); // <input type="text">
  }
}
</script>
 
```

### 13. directives

`directives` 具体的介绍可以看` Vue` 的[官方介绍](https://cn.vuejs.org/v2/api/#Vue-directive).

示例:

```vue
<template>
  <span v-demo:foo.a="1+1">test</span>
</template>

<script lang="ts">
@Component({
  directives: {
    demo: {
      bind(el:any, binding:any, vnode:any) {
        var s = JSON.stringify
        el.innerHTML =
          'name: '       + s(binding.name) + '<br>' +
          'value: '      + s(binding.value) + '<br>' +
          'expression: ' + s(binding.expression) + '<br>' +
          'argument: '   + s(binding.arg) + '<br>' +
          'modifiers: '  + s(binding.modifiers) + '<br>' +
          'vnode keys: ' + Object.keys(vnode).join(', ')
      },
    }
  },
})
export default class App extends Vue {}
</script>
```

