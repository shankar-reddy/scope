/* eslint no-unused-vars: "off" */
import React from 'react';
import _ from 'lodash';
import NodesChart from '../charts/nodes-chart';
import { deltaAdd } from './debug-toolbar';
import { fromJS, Map as makeMap, Set as makeSet } from 'immutable';


function clog(v) {
  console.log(v);
  return v;
}


function deltaAddSimple(name, adjacency = []) {
  return deltaAdd(name, adjacency, 'circle', false, 1, '');
}


function makeIds(n) {
  return _.range(n).map(i => `n${i}`);
}


function disconnectedGraph(n) {
  return makeMap(makeIds(n)
                  .map((id) => deltaAddSimple(id))
                  .map(d => [d.id, fromJS(d)]));
}


function completeGraph(n) {
  const ids = makeIds(n);
  const allEdges = _.flatMap(ids, i => ids.filter(ii => i !== ii).map(ii => [i, ii]));
  const oneWayEdges = allEdges.filter(edge => _.isEqual(edge, _.sortBy(edge)));
  const adjacencyMap = _(oneWayEdges)
    .groupBy(e => e[0])
    .mapValues(edges => edges.map(e => e[1]))
    .value();
  return makeMap(ids
                  .map((id) => deltaAddSimple(id, adjacencyMap[id] || []))
                  .map(d => [d.id, fromJS(d)]));
}


function completeGraphBi(n) {
  const ids = makeIds(n);
  const adjacency = (id) => ids.filter(_id => _id !== id);
  return makeMap(ids
                  .map((id) => deltaAddSimple(id, adjacency(id)))
                  .map(d => [d.id, fromJS(d)]));
}


function chart(nodes, id) {
  const margins = { top: 0, left: 0, right: 0, bottom: 0 };
  const style = {
    width: 250,
    height: 250
  };

  return (
    <div className="example-chart" style={style}>
      <NodesChart
        nodes={nodes}
        width={style.width}
        height={style.height}
        margins={margins}
        highlightedNodeIds={makeSet()}
        highlightedEdgeIds={makeSet()}
        layoutPrecision="3"
        topologyId={Math.random()}
      />
    </div>
  );
}


export class Examples extends React.Component {
  render() {
    const nCharts = 5;
    const width = 300;
    const style = {width: nCharts * (300 + 16)};
    const generators = [disconnectedGraph, completeGraph, completeGraphBi];
    return (
      <div>
        {generators.map(fn => (
          <div className="nodes-chart-examples" style={style}>
            {_.range(1, nCharts + 1).map(i => chart(fn(i)))}
          </div>
        ))}
      </div>
    );
  }
}
