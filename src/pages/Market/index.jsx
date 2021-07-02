import { Table, Button } from "antd";
import React from "react";
import { apiUrl } from "../../config/network";
import request from "../../utils/request";

const columns = [
  {
    title: "币种全称",
    dataIndex: "currencyName",
    // sorter: true,
    // render: name => `${name.first} ${name.last}`,
    width: "100px",
    fixed: "left",
  },
  {
    title: "币种简称",
    dataIndex: "currencyAbbreviations",
    // filters: [
    //   { text: 'Male', value: 'male' },
    //   { text: 'Female', value: 'female' },
    // ],
    width: "100px",
    fixed: "left",
  },
  {
    title: "币种当前链接",
    dataIndex: "currentLink",
    width: "20%",
    // ellipsis: true,
  },
  {
    title: "合约地址",
    dataIndex: "contractAddress",
    width: "20%",
    textWrap: "word-break",
  },
  {
    title: "项目官方网站",
    dataIndex: "website",
    render: (res) =>
      res.map((item, index) => {
        return <p key={index}>网址:{item}</p>;
      }),
    width: "20%",
    textWrap: "word-break",
  },
  {
    title: "社区链接",
    dataIndex: "communityLinks",
    width: "20%",
    render: (res) =>
      res.map((item, index) => {
        return <p key={index}>网址:{item}</p>;
      }),
    textWrap: "word-break",
  },
  {
    title: "通讯链接",
    dataIndex: "chatLink",
    width: "20%",
    render: (res) =>
      res.map((item, index) => {
        return <p key={index}>网址:{item}</p>;
      }),
    textWrap: "word-break",
  },
  {
    title: "图表链接",
    dataIndex: "chartLink",
    width: "20%",
    render: (res) =>
      res.map((item, index) => {
        return <p key={index}>网址:{item}</p>;
      }),
    textWrap: "word-break",
  },
];

const getRandomuserParams = (params) => ({
  results: params.pagination.pageSize,
  page: params.pagination.current,
  ...params,
});

class Browser extends React.Component {
  state = {
    data: [],
    pagination: {
      current: 1,
      pageSize: 10,
    },
    loading: false,
  };
  componentDidMount() {
    const { pagination } = this.state;
    this.getMarketList({ pagination });
  }

  handleTableChange = (pagination, filters, sorter) => {
    this.getMarketList({
      sortField: sorter.field,
      sortOrder: sorter.order,
      pagination,
      ...filters,
    });
  };

  getMarketList = (params = {}) => {
    this.setState({ loading: true });
    request({
      method: "get",
      url: "/market/lists",
      params: getRandomuserParams(params),
    }).then((res) => {
      const { data } = res;
      this.setState({
        loading: false,
        data: data.data,
        pagination: {
          ...params.pagination,
          total: data.total,
        },
      });
    });
  };

  downloadExcel = () => {
    const downloadUrl = `${apiUrl}/market/download`;
    const a = document.createElement("a");
    a.href = downloadUrl;
    a.download = "forum";
    a.style.display = "none";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  render() {
    const { data, pagination, loading } = this.state;
    return (
      <div style={{height:'100%',overflowY: "scroll"}}>
        <div style={{ marginBottom: "10px" }}>
          <Button type="primary" onClick={() => this.downloadExcel()}>
            下载excel
          </Button>
        </div>
        <div>
          <Table
            size="small"
            scroll={{ x: 3000 }}
            columns={columns}
            rowKey={(record) => record._id}
            dataSource={data}
            pagination={pagination}
            loading={loading}
            onChange={this.handleTableChange}
          />
        </div>
      </div>
    );
  }
}

export default Browser;
