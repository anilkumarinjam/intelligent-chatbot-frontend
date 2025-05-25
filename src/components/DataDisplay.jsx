import React from 'react';
import Plot from 'react-plotly.js';

const DataDisplay = ({ data, chart }) => {
  const headers = Object.keys(data[0]);

  return (
    <div className="data-display">
      <table>
        <thead>
          <tr>
            {headers.map(header => (
              <th key={header}>{header.replace(/_/g, ' ').toUpperCase()}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((row, index) => (
            <tr key={index}>
              {headers.map(header => (
                <td key={`${index}-${header}`}>{row[header]}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
      {chart && chart.data && chart.layout && (
        <div
          className="chart-container"
          style={{
            marginTop: '2rem',
            background: '#fff',
            borderRadius: '12px',
            boxShadow: '0 2px 12px rgba(0,0,0,0.08)',
            padding: '1rem',
            width: '95%',
            maxWidth: '800px',
            marginLeft: 'auto',
            marginRight: 'auto'
          }}
        >
          <Plot
            data={chart.data}
            layout={{
              ...chart.layout,
              autosize: true,
              height: 400,
              width: null,
              margin: { t: 20, b: 30, l: 50, r: 20 },
              paper_bgcolor: 'transparent',
              plot_bgcolor: 'transparent'
            }}
            config={{
              ...chart.config,
              responsive: true,
              displayModeBar: false,
              scrollZoom: false,
              modeBarButtonsToRemove: ['autoScale2d']
            }}
            style={{ width: '100%', height: '100%' }}
            useResizeHandler={true}
          />
        </div>
      )}
    </div>
  );
};

export default DataDisplay;
