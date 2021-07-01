import React from "react";
import urls from "../../config/urls";
import { Card, List, Button } from "antd";

function Item(item) {
  function startCrawler(id) {
    // 把对象处理成数组
    const newUrls = [...urls.market, ...urls.dex, ...urls.browser];
    const url = newUrls.filter((item) => {
      return item.id === id;
    });
      

    console.log(url[0].website);
  }

  return (
    <List.Item>
      <div style={{ display: "flex" }}>
        <div style={{ marginRight: "20px" }}> {item.website} </div>
        <Button type="primary" onClick={() => startCrawler(item.id)}>
          开始
        </Button>
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
  return <>Dex</>;
}

function Broswer() {
  return <>Broswer</>;
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
  broswer: <Broswer />,
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
