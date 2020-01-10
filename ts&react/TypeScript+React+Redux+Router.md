# TypeScript + React + Redux 

本文详细介绍了如何使用 Create-React-App 编写 TypeScript + React 项目

## 前言

对于 TypeScript + React 开发，MicroSoft 编写了一个 `TypeScript-React-Starter` 的例子，[Github 地址](https://github.com/Microsoft/TypeScript-Node-Starter)。有需要的朋友可以去看一下。

我自己也看了一下，文档说明讲解的很好，但是 Demo 拉下来却无法正常运行，一直报错。所以我自己使用 TypeScript + React + Redux 写了 Demo，作为范例来用一下。

### 本文 Demo 地址

- 本文 Counter Demo 是一个简易的例子，可以用来作为入门参考，**Counter Demo**
- 另外还写了一个 TodoList 的例子，稍微更有难度一些，代码量和组件更多更详细。有需要的朋友也可以参考一下。**TodoList Demo**

### 建议

可以先下载 Counter Demo 后，运行项目，查看运行效果，然后对照本文进行阅读，效果更佳！

### 使用 `TypeScript` 编写 `React` 需要注意的规范

- 必须遵守的要求：
  - 所有用到 `jsx` 语法的文件都需要以 `tsx` 后缀命名
  - 使用组件声明时的 `Component<P, S>` 泛型参数声明，来代替 `PropTypes`进行类型校验
- 额外的代码规范：
  - 全局变量或者自定义的 `window` 对象属性，统一在项目根下的 `global.d.ts` 中进行声明定义
  - 对于项目中常用到的接口数据对象，最好在 `types/` 目录下定义好其结构化类型声明

------

## 安装 Create-React-App

```shell
$ npm install create-react-app -g
 
```

------

## 创建项目

### 先创建一个新的项目，这里我们命名为 typescript-react-app

```shell
$ create-react-app typescript-react-app --template typescript
 
```

[react-scripts-ts](https://www.npmjs.com/package/react-scripts-ts)是一系列适配器，它利用标准的create-react-app工程管道并把TypeScript混入进来。

项目创建成功后，此时项目结构如下所示：

```
my-app/
├─ node_modules/
├─ public/
├─ src/
│  └─ ...
├─ .gitignore
├─ images.d.ts
├─ package.json
├─ README.md
├─ tsconfig.json
├─ tsconfig.prod.json
├─ tsconfig.test.json
├─ tslint.json
└─ yarn.lock
 
```

### 注意：

- tsconfig.json包含了工程里TypeScript特定的选项。
- tslint.json保存了要使用的代码检查器的设置，TSLint。
- package.json包含了依赖，还有一些命令的快捷方式，如测试命令，预览命令和发布应用的命令。
- public包含了静态资源如HTML页面或图片。除了index.html文件外，其它的文件都可以删除。
- src包含了TypeScript和CSS源码。index.tsx是强制使用的入口文件。

### 运行项目

先运行项目，看看是否能够正常启动，如果可以，说明项目创建没有问题。 运行命令：

```shell
$ npm start

# 或者运行 yarn run start
 
```

------

## React 配合 TypeScript 的基本使用

在当前项目中，可以看到 index.tsx 和 App.jsx 文件中已经使用了 TypeScript，我们现在自己来用 TypeScript 编写一个 React 组件吧。

### 定义一个 Counter 组件

我们在 src 下创建一个 components 目录，新增 Counter 组件：

Counter.tsx

```tsx
import * as React from 'react';


// 创建类型接口
export interface Iprops {
    value: number
}

// 使用接口代替 PropTypes 进行类型校验
const Counter = ({ value }: Iprops) => {
    return <p>Clicked: { value } times</p>
}

export default Counter;
 
```

### 在 App.tsx 中引用 Counter 组件并展示

```tsx
import * as React from 'react';
import './App.css';

import Counter from './components/Counter.jsx';
// import logo from './logo.svg';

class App extends React.Component {
  public render() {
    return (
      <div className="App">
        <Counter value={ 0 } />
      </div>
    );
  }
}

export default App;
 
```

运行项目：`npm run start`，可以看到浏览器中展示出了 `Clicked: 0 times`，说明我们第一个 Counter 组件已经编写并使用成功了。

### 使用类的方式定义 Counter 组件

刚才是使用函数组件的方式定义的 Counter 组件，现在我们使用类的方式来改写一下。两种方式都试一试：

Counter.tsx

```tsx
import * as React from 'react';


// 创建类型接口
export interface IProps {
    value: number
}

// 使用接口代替 PropTypes 进行类型校验
export default class Counter extends React.PureComponent<IProps> {
    public render() {
        return <p>Clicked: { this.props.value } times</p>
    }
}
 
```

------

## 进阶：在项目中配合 Redux 进行使用

### 安装项目需要的插件

安装redux和react-redux以及它们的类型文件做为依赖。

```shell
$ npm install -S redux react-redux @types/react-redux
 
```

这里我们不需要安装`@types/redux`，因为`Redux`已经自带了声明文件（`.d.ts`文件）。

### 定义应用的状态 State

一般会将常用的结构类型存放到 /types 目录下。所以我们在 src 目录下新建 types 目录。 此时项目中只有一个 state，就是 Counter 中的点击次数，所以就没有使用借口来作为约束，而是直接使用了 type。

`type/index.tsx`

```tsx
// 定义 State 结构类型
export type StoreState = number;
 
```

### 添加 actions

在 `src` 下创建 constants 目录，在 `index.tsx `文件中添加需要响应的消息类型

`constants/index.tsx`

```tsx
// 定义增加 state 类型常量
export const INCREMENT = "INCREMENT";
export type INCREMENT = typeof INCREMENT;

// 定义减少 state 类型常量
export const DECREMENT = "DECREMENT";
export type DECREMENT = typeof DECREMENT;
 
```

这里的`const/type`模式允许我们以容易访问和重构的方式使用`TypeScript`的字符串字面量类型。 接下来，我们创建一些 `actions` 以及创建这些 `actions` 的函数，`src/actions/index.tsx`。

`actions/index.tsx`

```tsx
export interface IINCREMENTAction {
    type: INCREMENT;
}

export interface IDECREMENTAction {
    type: DECREMENT;
}

// 定义 modifyAction 类型，包含 IINCREMENTAction 和 IDECREMENTAction 接口类型
export type ModifyAction = IINCREMENTAction | IDECREMENTAction;


// 增加 state 次数的方法
export const increment = (): IINCREMENTAction => ({
    type: INCREMENT,
})

// 减少 state 次数的方法
export const decrement = (): IDECREMENTAction => ({
    type: DECREMENT
})
 
```

`actions/index.tsx` 中定义了两个类型，分别负责添加和减少操作的行为。我们还定义了一个类型（`ModifyAction`），它描述了哪些 `action` 是可以增加或减少的。 最后，我们定义了两个函数用来创建实际的 `actions`。

### 添加 reducer

我们的`reducer`将放在`src/reducers/index.tsx`文件里。 它的功能是保证增加操作会让 `times` 加1，减少操作则要将 `times` 减1。

reducers/index.tsx

```tsx
import { ModifyAction } from '../actions';
import { DECREMENT, INCREMENT } from '../constants';


// 处理并返回 state 
export default (state = 0, action: ModifyAction): number => {
    switch (action.type) {
      case INCREMENT:
        return state + 1
      case DECREMENT:
        return state - 1
      default:
        return state
    }
}
 
```

### 创建容器组件

之前我们已经使用了` Counter` 组件，但是这个组件是一个纯组件，此时我们需要一个组件将 `Counter` 和 数据连接起来。我们先修改一下原先的 Counter 组件，在其中添加一些操作按钮

components/Counter.tsx

```tsx
import * as React from 'react';


// 创建类型接口
export interface IProps {
    value: number,
    onIncrement: () => void,
    onDecrement: () => void
}

// 使用接口代替 PropTypes 进行类型校验
export default class Counter extends React.PureComponent<IProps> {
    public render() {
        const { value, onIncrement, onDecrement } = this.props;
        return (
            <p>
                Clicked: { value } times
                <br />
                <br />
                <button onClick={ onIncrement } style={{ marginRight: 20 }}> +  </button>
                <button onClick={ onDecrement }> - </button>
            </p>
        )
    }
}

 
```

然后我们再创建一个 `container` 目录，用来存放需要与数据交互的组件，新建 `CounterCon.tsx`文件.

两个关键点是初始的 `Counter` 组件和 `react-redux` 的 `connect` 函数。 `connect` 可以将我们的 `Counter` 组件转换成一个容器，通过以下两个函数：

- `mapStateToProps`将当前store里的数据以我们的组件需要的形式传递到组件。
- `mapDispatchToProps`利用`dispatch`函数，创建回调`props`将`actions`送到`store`。

container/CounterCon.tsx

```tsx
import { connect } from 'react-redux';
import { Dispatch } from 'redux';

import { decrement, increment } from '../actions';
import Counter from '../components/Counter';
import { StoreState } from '../types';


// 将 reducer 中的状态插入到组件的 props 中
const mapStateToProps = (state: StoreState): { value: number } => ({
    value: state
})

// 将 对应action 插入到组件的 props 中
const mapDispatchToProps = (dispatch: Dispatch) => ({
    onDecrement: () => dispatch(decrement()),
    onIncrement: () => dispatch(increment())
})

// 使用 connect 高阶组件对 Counter 进行包裹
export default connect(mapStateToProps, mapDispatchToProps)(Counter);
 
```

### 创建 store

让我们回到`src/index.tsx`。 要把所有的东西合到一起，我们需要创建一个带初始状态的`store`，并用我们所有的`reducers`来设置它。 并且使用 `react-redux` 的 `Provider `将 `props` 和 容器连接起来

`index.tsx`

```tsx
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore } from 'redux';

import App from './App';
import './index.css';
import reducer from './reducer'; 
import registerServiceWorker from './registerServiceWorker';


// 1、创建 store
const store = createStore(reducer);

ReactDOM.render(
    // 2、然后使用react-redux的Provider将props与容器连通起来
    <Provider store={ store }>
        <App />
    </Provider> ,
    document.getElementById('root') as HTMLElement
);
registerServiceWorker();
 
```

回到我们的` App.jsx `文件中，之前我们引用的是 `components` 中的` Counter` 组件，但是此时我们需要使用的是与数据有交互的 `CounterCon` 组件。改写如下：

`App.jsx`

```tsx
import * as React from 'react';
import './App.css';

// 引入 container 组件 CountCon
import CountCon from './container/CountCon';
// import logo from './logo.svg';

class App extends React.Component {
  public render() {
    return (
      <div className="App">
        <CountCon />
      </div>
    );
  }
}

export default App;
 
```

注意，此时 `CountCon` 不再需要 `props` 了，因为我们使用了 `connect` 函数为包裹起来的 `Hello`组件的 `props` 适配了应用的状态。

此时，运行项目，点击 + 或者 - 按钮，即可看到 `times` 的次数会发生变化。

## 2.ts中路由配置

1. 引入`@types/react-router-dom`

但是引入`@types/react-router-dom`后直接使用`withRouter`ts会一直报错(ts2339)， 原因是必需使用 **RuoteComponentProps**,。

```tsx
import React from 'react';
import { withRouter, RouteComponentProps } from 'react-router-dom';

type PropsType = RouteComponentProps & {};

class demo extends React.Component<PropsType, any> {
  
  constructor(props: PropsType) {
    super(props);
    this.state = {
      demo: 'demo',
    }
  }

  goBack() {
    this.props.history.goBack();
  }

  render() {
    return (
      <div>
        <button onClick={() => this.goBack()}>goBack</button>
      </div>
    )
  }
}

export default withRouter(demo);
```

## 3.props、state的使用

ts中React的组件中使用props或者state的时候，需要给组件传两个参数：指定类型（types）和对象的形（shape）,原因是ts的规则一切都应该按住预期的方式工作，类型检查方面得先定义。

```tsx
React.Compnent<types, shape>
```

如果类型对不上ts会提示报错： ![img](https://user-gold-cdn.xitu.io/2019/8/20/16caf4037049673b?imageView2/0/w/1280/h/960/format/webp/ignore-error/1) ![img](https://user-gold-cdn.xitu.io/2019/8/20/16caf407c114c6b9?imageView2/0/w/1280/h/960/format/webp/ignore-error/1)

应该对应类型： ![img](https://user-gold-cdn.xitu.io/2019/8/20/16caf4599efe9e8b?imageView2/0/w/1280/h/960/format/webp/ignore-error/1)

当你不确定自己需要创建多少参数和参数类型时，建议使用**any**（任意类型）:

```tsx
class demo extends React.Component<any, any>
```

给组件传入 **RuoteComponentProps** 后就相当于定义了 **any** ， 如果是没有使用路由插件的普通组型，需要注意如果`React.Compnent<types, shape>`中的**types**被定义了，则没办法接手来自路由的参数。

```tsx
this.props.history.push({
  pathname: 'demo',
  state: {
    data: 1
  }
})
```

![img](https://user-gold-cdn.xitu.io/2019/8/20/16caf5f17803348c?imageView2/0/w/1280/h/960/format/webp/ignore-error/1) 同样的我们可以把改为来解决。 



## 总结

至此，对于使用 `TypeScript` 编写 `React` 应用应该有了一定的了解。其实写法也比较固定，刚接触的话可能有些地方容易出现问题，多写几个组件之后，应该就没什么问题了。 在编写项目的过程中，`create-react-app` 自带的 `tslint` 可能要求比较严严格，比如：

- 在标签里不允许使用 lambda 表达式，在 `tslint.json` 文件 `rules` 属性中添加：`"jsx-no-lambda": false` 即可
- 在导入模块时，必须按照字母顺序导入，在 `tslint.json` 文件 `rules` 属性中添加："`ordered-imports": false` 即可

还有很多别的配置，有需要的话，可以查看文档：[TSLint core rules](https://palantir.github.io/tslint/rules/)。