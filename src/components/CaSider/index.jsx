import React from "react";
import { Menu } from "antd";
import {  NavLink } from "react-router-dom";

class CaSider extends React.Component {
  render() {
    return (
      <>
        <Menu theme="dark" mode="inline" defaultSelectedKeys={["1"]}>
          <Menu.Item key="1">
            <NavLink to="/catch_site">抓取网站</NavLink>
          </Menu.Item>

          <Menu.Item key="2">
            <NavLink to="/market_data">行情网站数据</NavLink>
          </Menu.Item>

          <Menu.Item key="3">
            <NavLink to="/dex_data">DEX类数据</NavLink>
          </Menu.Item>

          <Menu.Item key="4">
            <NavLink to="/browser_data">浏览器类数据</NavLink>
          </Menu.Item>
        </Menu>
      </>
    );
  }
}

export default CaSider;
