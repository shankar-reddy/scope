/* eslint react/jsx-no-bind: "off" */

import React from 'react';
import {Table, Column, Cell} from 'fixed-data-table';


export default class NodesGrid extends React.Component {
  render() {
    const {nodes} = this.props;
    const nodeList = nodes.toList();
    return (
      <div>
        <Table
          rowHeight={36}
          rowsCount={nodeList.size}
          width={200}
          height={500}
          headerHeight={36}>
          <Column
            header={<Cell>Node</Cell>}
            cell={(props) => (
              <Cell {...props}>
                {nodeList.getIn([props.rowIndex, 'id'])}
              </Cell>
            )}
            width={100}
          />
          <Column
            header={<Cell>Shape</Cell>}
            cell={(props) => (
              <Cell {...props}>
                {nodeList.getIn([props.rowIndex, 'shape'])}
              </Cell>
            )}
            width={100}
          />
        </Table>
      </div>
    );
  }
}
