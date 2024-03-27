import React from 'react';
import { Table, TagPicker } from 'rsuite';


const { Column, HeaderCell, Cell } = Table;
const data = 'mockUsers';

const CompactCell = props => <Cell {...props} style={{ padding: 4 }} />;
const CompactHeaderCell = props => <HeaderCell {...props} style={{ padding: 4 }} />;

const defaultColumns = [
  {
    key: 'id',
    label: 'Id',
    fixed: true,
    width: 70
  },
  {
    key: 'firstName',
    label: 'Produit',
    width: 130
  },
  {
    key: 'lastName',
    label: 'Prix',
    width: 130
  },

  {
    key: 'gender',
    label: 'Client',
    width: 130
  },
  {
    key: 'city',
    label: 'Statut de livraison',
    flexGrow: 1
  }
];

const Tablev = () => {
  const [loading] = React.useState(false);
  const [compact] = React.useState(true);
  const [bordered] = React.useState(true);
  const [noData] = React.useState(false);
  const [showHeader] = React.useState(true);
  const [autoHeight] = React.useState(true);
  const [fillHeight] = React.useState(false);
  const [hover] = React.useState(true);
  const [columnKeys, setColumnKeys] = React.useState(defaultColumns.map(column => column.key));

  const columns = defaultColumns.filter(column => columnKeys.some(key => key === column.key));
  const CustomCell = compact ? CompactCell : Cell;
  const CustomHeaderCell = compact ? CompactHeaderCell : HeaderCell;

  return (
    <div style={{width:'700px'}}>
      
      <hr />
      Columns：
      <TagPicker
        data={defaultColumns}
        labelKey="label"
        valueKey="key"
        value={columnKeys}
        onChange={setColumnKeys}
        cleanable={false}
      />
      <hr />
      <div style={{ height: autoHeight ? 'auto' : 700 }}>
        <Table
          loading={loading}
          height={300}
          hover={hover}
          fillHeight={fillHeight}
          showHeader={showHeader}
          autoHeight={autoHeight}
          data={noData ? [] : data}
          bordered={bordered}
          cellBordered={bordered}
          headerHeight={compact ? 30 : 40}
          rowHeight={compact ? 30 : 46}
        >
          {columns.map(column => {
            const { key, label, ...rest } = column;
            return (
              <Column {...rest} key={key}>
                <CustomHeaderCell>{label}</CustomHeaderCell>
                <CustomCell dataKey={key} />
              </Column>
            );
          })}
        </Table>
      </div>
    </div>
  );
};


export default Tablev