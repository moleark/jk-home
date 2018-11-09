
import * as React from 'react';
import './App.css';
import { NavView, nav } from 'tonva-tools';
import { CHome } from './home';

class App extends React.Component {

  private onLogined = async () => {
    let home = new CHome(undefined);
    nav.clear();
    await home.start();
  }
  public render() {
    return <NavView onLogined={this.onLogined} />
  }
}

export default App;
