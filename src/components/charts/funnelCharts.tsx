import React, { useState } from "react";
import { Funnel } from '@ant-design/charts';



const FunnelChart: React.FC = () => {
  const data = [
    {
      action: '浏览网站',
      pv: 50000,
    },
    {
      action: '放入购物车',
      pv: 35000,
    },
    {
      action: '生成订单',
      pv: 25000,
    },
    {
      action: '支付',
      pv: 15000,
    },
    {
      action: '成交',
      pv: 8500,
    },
  ];
  const config = {
    data: data,
    xField: 'action',
    yField: 'pv',
    transpose: true,
  };
  return (<Funnel {...config} />);
};
export default FunnelChart