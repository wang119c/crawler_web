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
    width: "5%",
    fixed: "left",
  },
  {
    title: "币种简称",
    dataIndex: "currencyAbbreviations",
    // filters: [
    //   { text: 'Male', value: 'male' },
    //   { text: 'Female', value: 'female' },
    // ],
    width: "5%",
    fixed: "left",
  },
  {
    title: "浏览器地址",
    dataIndex: "currentLink",
    width: "30%",
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
    width: "20%",
    textWrap: "word-break",
  },
  {
    title: "持币数量",
    dataIndex: "holderNum",
    width: "5%",
    textWrap: "word-break",
  }
];

const getRandomuserParams = (params) => ({
  results: params.pagination.pageSize,
  page: params.pagination.current,
  ...params,
});

class Dex extends React.Component {
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
    this.getDexList({ pagination });
  }

  handleTableChange = (pagination, filters, sorter) => {
    this.getDexList({
      sortField: sorter.field,
      sortOrder: sorter.order,
      pagination,
      ...filters,
    });
  };

  getDexList = (params = {}) => {
    this.setState({ loading: true });
    request({
      method: "get",
      url: "/dex/lists",
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
    const downloadUrl = `${apiUrl}/dex/download`;
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
            scroll={{ x: 2000 }}
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

export default Dex;
