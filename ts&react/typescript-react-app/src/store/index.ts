import {createStore, applyMiddleware, combineReducers} from 'redux'
import cardReducers from './reducers/cardReducers/cardList'

//[]  {type:, payload}
function myReducers(state = [], action: any) {

}

function shopReducers(state = 0, action: any) {
  switch (action.type) {
    case 'ADD':
      state += action.payload;
      return state;
    case 'SUB':
      state--;
      return state;
    default:
      return state;
  }
}

let reducers = combineReducers({
  shopReducers,cardReducers
});

//方法 reducers 默认state  applyMiddleware()
let store = createStore(reducers);
//@ts-ignore
window.store = store;
export default store;

/*
* ts + redux :
*
* A请求数据 跳转  B 返回 A
*
*
* */
