
import React, { useState, PropsWithChildren } from "react";
import DemoFunnel from '../charts/funnelCharts'
import { MenuOutlined } from '@ant-design/icons';
import arrayMove from 'array-move';
import { Table, Button } from 'antd';
import { SortableContainer, SortableElement, SortableHandle } from 'react-sortable-hoc';
import './index.css'

const DragHandle = SortableHandle(() => (
  <MenuOutlined style={{ cursor: 'pointer', color: '#999' }} />
));
const columns = [
  {
    title: 'Sort',
    dataIndex: 'sort',
    width: 30,
    className: 'drag-visible',
    render: () => <DragHandle />,
  },
  {
    title: 'Name',
    dataIndex: 'name',
    className: 'drag-visible',
  },
];

const SortableItem = SortableElement((props: JSX.IntrinsicAttributes & React.ClassAttributes<HTMLTableRowElement> & React.HTMLAttributes<HTMLTableRowElement>) => <tr {...props} />);
const SortableWrapper = SortableContainer((props: JSX.IntrinsicAttributes & React.ClassAttributes<HTMLTableSectionElement> & React.HTMLAttributes<HTMLTableSectionElement>) => <tbody {...props} />);
interface targetResult {
  busProps: Object;
  userProps: Object;
  eventId: String;
  userName: String;
  realIp: String;
}

type Props = PropsWithChildren<{
  data: targetResult[],
}>;

let unique = ( array ) => {
  let obj = {}
  return array.reduce( (res, item) => {
      // eslint-disable-next-line @typescript-eslint/no-unused-expressions
      obj[item.eventId] ? '' : obj[item.eventId] = true && res.push(item)
      return res
  },[])
}


function FunnelAnalylize(props: Props) {
  const EventIdList = unique(props.data).map( (item,index) =>({
    name: item.eventId,
    content: '',
    count: '',
    index
  }))
  const [dataSource, setDataSource] = useState(EventIdList)
  const [showChart, setShowChart] = useState(false)
  const onSortEnd = ({ oldIndex, newIndex }) => {
    if (oldIndex !== newIndex) {
      const newData = arrayMove([].concat(dataSource), oldIndex, newIndex).filter(el => !!el);
      setDataSource(newData);
    }
  };

  const DraggableBodyRow = ({ className, style, ...restProps }) => {
    const index = dataSource.findIndex(x => x.index === restProps['data-row-key']);
    return (
      <SortableItem index={index} {...restProps} />
    );
  };

  const DraggableContainer = (props) => (
    <SortableWrapper
      useDragHandle
      helperClass="row-dragging"
      onSortEnd={onSortEnd}
      {...props}
    />
  );

  const handleBtnClick = () => {
    setShowChart(true)
  }
  return (
    <>
      <h1>请选择漏斗顺序</h1>
      <Table
          pagination={false}
          dataSource={dataSource}
          columns={columns}
          rowKey="index"
          components={{
          body: {
            wrapper: DraggableContainer,
            row: DraggableBodyRow,
          },
        }}
      />
      <Button 
        type="primary" 
        onClick={handleBtnClick}
        key="funnel"
      >
        确认
      </Button>,
      </>
  )
  
}

export default FunnelAnalylize

