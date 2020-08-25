
import React, { useState, PropsWithChildren } from "react";
import { MenuOutlined } from '@ant-design/icons';
import arrayMove from 'array-move';
import { Table } from 'antd';
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

const data = [
  {
    key: '1',
    name: 'John Brown',
    index: 0,
  },
  {
    key: '2',
    name: 'Jim Green',
    index: 1,
  },
  {
    key: '3',
    name: 'Joe Black',
    index: 2,
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


function FunnelAnalylize(props: Props) {

  const [dataSource, setDataSource] = useState(data)

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
    </>

  )
  
}

export default FunnelAnalylize

