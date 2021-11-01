/*eslint no-unused-vars: 0 */
import React, { useState, useEffect } from 'react';
import Plot from 'react-plotly.js';
import { getDSData } from '../../../api';

const initialState = {
  data: [],
  layout: {},
  frames: [],
  config: {
    displaylogo: false,
    displayModeBar: false,
  },
};

function DataViz(props) {
  const { url, authState } = props;
  const [data, setData] = useState(initialState);
  const [figure, setFigure] = useState(null);

  useEffect(() => {
    function fetchDSData() {
      getDSData(url, authState)
        .then(res => {
          setData(res);
        })
        .catch(err => {
          setData({ data: null, err });
        });
    }
    fetchDSData();
  }, [url, authState]);

  return (
    <Plot
      className="DataViz"
      {...data}
      onInitialized={setFigure}
      onUpdate={setFigure}
    />
  );
}

export default DataViz;
