import React, {Component} from 'react';
import {get} from '../utils/reuqest'
import Header from '../components/Header';
import {connect} from 'react-redux';

interface PorpsType {
  name: string;
  num: number;
  add: Function;
}

class Home extends Component<PorpsType> {
  render() {
    return (
      <div>
        <h1>{this.props.num}</h1>
        <Header name={'111'}/>

        <button onClick={()=>{
          this.props.add(20)
        }}>add</button>
      </div>
    );
  }

  async componentDidMount() {
    let res = await get('/menulist');
    console.log(res);
  }
}


export default connect((state: any) => {
  return {
    num: state.shopReducers
  }
}, (dispatch) => {
  return {
    add(num: number) {
      dispatch({type: 'ADD', payload: num})
    }
  }
})(Home);
