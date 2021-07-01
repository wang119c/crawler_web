import React from "react";
import "./App.css";
import { Layout } from "antd";
import { Route } from "react-router-dom";
import CaSider from "./components/CaSider";
import Market from "./pages/Market";
import CatchSite from "./pages/CatchSite";
import Browser from "./pages/Browser";
import Dex from "./pages/Dex";
const { Sider, Content } = Layout;
class App extends React.Component {
  state = {
    collapsed: false,
  };

  toggle = () => {
    this.setState({
      collapsed: !this.state.collapsed,
    });
  };

  render() {
    return (
      <div className="app">
        <Layout className="layout">
          <Sider trigger={null} collapsible collapsed={this.state.collapsed}>
            <CaSider />
          </Sider>
          <Content
            className="site-layout-background"
            style={{
              margin: "24px 16px",
              padding: 24,
              minHeight: 280,
            }}
          >
            <Route path="/catch_site" component={CatchSite} />
            <Route path="/market_data" component={Market} />
            <Route path="/dex_data" component={Dex} />
            <Route path="/browser_data" component={Browser} />
          </Content>
        </Layout>
      </div>
    );
  }
}

export default App;
