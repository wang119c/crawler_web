import { Table } from 'antd';
import React from 'react'

const columns = [
  {
    title: '币种全称',
    dataIndex: 'currencyName',
    // sorter: true,
    // render: name => `${name.first} ${name.last}`,
    width: '20%',
  },
  {
    title: '币种简称',
    dataIndex: 'currencyAbbreviations',
    // filters: [
    //   { text: 'Male', value: 'male' },
    //   { text: 'Female', value: 'female' },
    // ],
    width: '20%',
  },
  {
    title: '币种当前链接',
    dataIndex: 'currentLink',
  },
  {
    title: '合约地址',
    dataIndex: 'contractAddress',
  },
  {
    title: '项目官方网站',
    dataIndex: 'website',
  },
  {
    title: '社区链接',
    dataIndex: 'communityLinks',
  },
  {
    title: '通讯链接',
    dataIndex: 'chatLink',
  },
  {
    title: '图表链接',
    dataIndex: 'chartLink',
  },
];

class Browser extends React.Component {

  componentDidMount() {

  }


  render() {
    return (
        <>
          <Table columns={columns}  />
        </>
    )
  }
}

export default Browser;
