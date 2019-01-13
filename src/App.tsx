
import * as React from 'react';
import './App.css';
import { NavView, nav, Page, Tabs } from 'tonva-tools';
import { startApp } from 'tonva-react-usql';
import ui from './ui';
//import { faceTabs } from 'facetabs';

const tonvaApp = "百灵威系统工程部/cart";

class App extends React.Component {

  private onLogined = async () => {

    await startApp(tonvaApp, ui);
    /*
    let page = <Page header={false}>
      <Tabs tabs={faceTabs} />
    </Page>
    nav.push(page);
    */
  }
  public render() {
    return <NavView onLogined={this.onLogined} notLogined={this.onLogined} />
  }
}

export default App;
