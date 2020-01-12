import React, {Component} from 'react';
import '../style/CardIn.css'
import {connect} from 'react-redux';
import cardReducers from "../store/reducers/cardReducers/cardList";

interface PropsTypes {
  push: Function,
  cardList: Array<any>;
  del:Function
}

class CardIn extends Component<PropsTypes> {
  state = {
    cardList: [
      {id: 1, msg: "早起"},
      {id: 2, msg: "约会"},
      {id: 3, msg: "夜宵"},
      {id: 4, msg: "睡觉"},
      {id: 5, msg: "打游戏"},
      {id: 6, msg: "学习"}
    ]
  };

  render() {
    let {cardList} = this.state;
    return (
      <div>
        <ul className="list">
          {
            cardList.map((item, index) => {
              return <li onClick={() => {
                this.props.push(item);
              }} className='card' key={item.id}>
                {item.msg}
              </li>
            })
          }
        </ul>

        <div className='box'>
          {this.props.cardList.map((item, index) => {
            return <div className='cardIn' key={index} onClick={()=>{
              this.props.del(item.id)
            }}>
                {item.msg}
                <span>×</span>
            </div>
          })}
        </div>
      </div>
    );
  }
}

export default connect((state: any) => {
  return {
    cardList: state.cardReducers
  }
}, (dispatch: Function) => {
  return {
    push(item: any) {
      dispatch({type: 'PUSH', payload: item})
    },
    del(item: any) {
      dispatch({type: 'DEL', payload: item})
    }
  }
})(CardIn);
