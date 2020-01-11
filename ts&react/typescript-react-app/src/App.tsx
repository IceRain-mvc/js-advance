import React from 'react';
// import logo from './logo.svg';
import './App.css';
// import Home from "./views/Home";
import RouterView from "./router/routerView";
import routes from './router/routerConfig';
import {BrowserRouter as Router} from 'react-router-dom';
import {Provider} from 'react-redux'
import store from "./store";


const App: React.FC = () => {
  return (
    <Provider store={store}>
      <h1>App</h1>
      <Router>
        <RouterView routes={routes.routes}/>
      </Router>
    </Provider>
  );
};

export default App;
