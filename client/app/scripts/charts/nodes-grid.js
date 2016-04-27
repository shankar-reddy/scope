/* eslint react/jsx-no-bind: "off" */

import React from 'react';
import NodesChart from './nodes-chart';

const COLUMNS = [
  { label: 'Node', key: 'label', style: { width: 200 } },
  { label: 'Shape', key: 'shape', style: { width: 100 } },
  { label: 'Rank', key: 'rank' },
  { label: 'Graph', key: 'graph', style: { width: 800 } }
];


function graph(props) {
  const {width, height} = props;
  return (
    <td key={props.key} className="nodes-grid-graph-header">
      <div style={{height, width}} className="nodes-grid-graph">
        <NodesChart {...props} />
      </div>
    </td>
  );
}


export default class NodesGrid extends React.Component {
  render() {
    const {margins, nodes, height, nodeSize} = this.props;
    const rowStyle = { height: nodeSize };
    const tableHeight = nodes.size * rowStyle.height;
    const graphProps = Object.assign({}, this.props, {
      height: tableHeight,
      width: 800,
      noZoom: true,
      nodeSize: nodeSize - 4,
      margins: {top: 0, left: 0, right: 0, bottom: 0},
      nodes: nodes.map(node => node.remove('label').remove('label_minor'))
    });
    const cmpStyle = {
      height,
      paddingTop: margins.top,
      paddingBottom: margins.bottom,
      paddingLeft: margins.left,
      paddingRight: margins.right,
    };

    return (
      <div className="nodes-grid" style={cmpStyle}>
        <table style={{width: this.props.width}}>
          <thead>
            <tr>
              {COLUMNS.map(({label, key, style}) => (
                <th style={style} key={key}>{label}</th>
              ))}
            </tr>
          </thead>
          <tbody>
          {nodes.toList().map((n, i) => (
            <tr style={rowStyle} key={n.get('id')}>
              {COLUMNS.map(({key, style}) => {
                if (i === 0 && key === 'graph') {
                  return graph(Object.assign({key}, graphProps));
                }
                return (
                  <td key={key} className="truncate" style={style}>
                    {n.get(key)}
                  </td>
                );
              })}
            </tr>))}
          </tbody>
        </table>
      </div>
    );
  }
}
