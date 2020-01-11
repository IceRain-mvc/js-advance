import React, {Component} from 'react';
import {withRouter,RouteComponentProps} from 'react-router-dom'

//type 是ts中的关键字
//让 PropsTypes 的类型 是 RouteComponentProps的 类型
type PropsTypes = RouteComponentProps & {name:string};

type number1 = number;

// let num: number1;

class Header extends Component<PropsTypes> {
  componentDidMount() {
    console.log(this.props.history);
    console.log(this.props.location);
    console.log(this.props.match);
  }
  render() {
    return (
      <div>
        <button onClick={()=>{
          this.props.history.push('/listen');
        }}>跳转</button>
        </div>
    );
  }
}

export default withRouter(Header);
