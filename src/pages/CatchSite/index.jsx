import React, { useState } from "react";
import urls from "../../config/urls";
import { Card, List, Button } from "antd";
import request from "../../utils/request";

function Item(item) {
  const [btnState, setBtnState] = useState(0);
  const [showLoad, setShowLoad] = useState(false);

  function startCrawler(id) {
    if (btnState === 1) return;
    setShowLoad(true);
    // 把对象处理成数组
    const newUrls = [...urls.market, ...urls.dex, ...urls.browser];
    const filterUrl = newUrls.filter((item) => {
      return item.id === id;
    });
    const urlObj = filterUrl[0];
    request({
      method: "get",
      url: urlObj.api,
    })
      .then((res) => {
        setBtnState(1);
        setShowLoad(false);
        // console.log(res);
      })
      .catch((error) => {
        console.log(error);
        setShowLoad(false);
      });
  }

  return (
    <List.Item>
      <div style={{ display: "flex" }}>
        <div style={{ marginRight: "20px" }}>
          {" "}
          {item.website}  {item.process ? "待开发" : ""}{" "}
        </div>
        {btnState === 0 && (
          <Button
            type="primary"
            onClick={() => startCrawler(item.id)}
            loading={showLoad}
          >
            开始
          </Button>
        )}
        {btnState === 1 && <Button type="danger">完成</Button>}
      </div>
    </List.Item>
  );
}

function Market() {
  const market = urls.market;
  return (
    <div className="site-card-border-less-wrapper">
      <List
        size="small"
        bordered
        dataSource={market}
        renderItem={(item) => Item(item)}
      />
    </div>
  );
}

function Dex() {
  const dex = urls.dex;
  return (
    <div className="site-card-border-less-wrapper">
      <List
        size="small"
        bordered
        dataSource={dex}
        renderItem={(item) => Item(item)}
      />
    </div>
  );
}

function Browser() {
  const browser = urls.browser;
  return (
    <div className="site-card-border-less-wrapper">
      <List
        size="small"
        bordered
        dataSource={browser}
        renderItem={(item) => Item(item)}
      />
    </div>
  );
}

const tabListNoTitle = [
  {
    key: "market",
    tab: "市场行情",
  },
  {
    key: "dex",
    tab: "dex",
  },
  {
    key: "browser",
    tab: "浏览器",
  },
];
const contentListNoTitle = {
  market: <Market />,
  dex: <Dex />,
  browser: <Browser />,
};

class CatchSite extends React.Component {
  state = {
    broswer: urls.browser,
    dex: urls.dex,
    market: urls.market,
  };
  componentDidMount() {}

  state = {
    noTitleKey: "market",
  };

  onTabChange = (key, type) => {
    console.log(key, type);
    this.setState({ [type]: key });
  };

  render() {
    return (
      <>
        <Card
          style={{ width: "100%", height: "100%", overflowY: "scroll" }}
          tabList={tabListNoTitle}
          activeTabKey={this.state.noTitleKey}
          onTabChange={(key) => {
            this.onTabChange(key, "noTitleKey");
          }}
        >
          {contentListNoTitle[this.state.noTitleKey]}
        </Card>
      </>
    );
  }
}
export default CatchSite;
