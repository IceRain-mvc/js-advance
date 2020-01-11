import * as React from "react";
import {Route, Switch, Redirect} from 'react-router-dom';

interface PorpsTypes {
  routes: Array<any>
}

/*
* 泛型 <> 类<>   方法<>
* */
export default class RouterView extends React.Component<PorpsTypes> {

  render() {
    let routes = this.props.routes;

    //1:取出每一个条目 判断哪一个是重定向
    let redirectArr = routes.filter((item: any, index: number) => item.redirect);

    let redirectDom = redirectArr.map((item: any, i: number) => {
      return <Redirect from={item.path} to={item.redirect} key={i}/>
    });

    //干掉重定向对象
    routes = routes.filter((item: any) => {
      return !item.redirect
    });

    //2:<Redirect from="/"  to="/look">  //Arr  [<Redirect from="/"  to="/look">,]

    return (
      <Switch>
        {routes.map((item: any, index: number) => {
          return <Route
            key={index} path={item.path}
            render={(props) => {
              let Com = item.component;
              return <Com children={item.children} history={props.history}/>;
            }
            }/>;
        }).concat(redirectDom)
        }
      </Switch>
    );
  }

}
