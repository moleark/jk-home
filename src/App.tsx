
import * as React from 'react';
import './App.css';
import { NavView, nav } from 'tonva-tools';
import { startApp } from 'tonva-react-usql';
import ui from './ui';

const tonvaApp = "百灵威系统工程部/cart";

class App extends React.Component {

  private onLogined = async () => {

    // let home = new CHome(undefined);
    // nav.clear();
    // await home.start();

    startApp(tonvaApp, ui);
  }
  public render() {
    return <NavView onLogined={this.onLogined} />
  }
}

export default App;
