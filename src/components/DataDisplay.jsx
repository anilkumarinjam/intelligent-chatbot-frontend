import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Plot from 'react-plotly.js';
import LoadingSpinner from './LoadingSpinner';

const CHART_TYPES = [
  { value: 'bar', label: 'Bar' },
  { value: 'line', label: 'Line' },
  { value: 'scatter', label: 'Scatter' },
  { value: 'pie', label: 'Pie' }
];

function getNumericColumns(data) {
  if (!data || !data.length) return [];
  const sample = data[0];
  return Object.keys(sample).filter(key => typeof sample[key] === 'number');
}

function getCategoricalColumns(data) {
  if (!data || !data.length) return [];
  const sample = data[0];
  return Object.keys(sample).filter(key => typeof sample[key] === 'string' || typeof sample[key] === 'boolean');
}

const DataDisplay = ({ data, onClose, isDark }) => {
  const [activeTab, setActiveTab] = useState('table');
  const [isLoading, setIsLoading] = useState(false);
  const headers = data ? Object.keys(data[0]) : [];

  // Find numeric and categorical columns
  const numericColumns = useMemo(() => getNumericColumns(data), [data]);
  const categoricalColumns = useMemo(() => getCategoricalColumns(data), [data]);

  // Default chart type: bar if categorical+numeric, else scatter
  const defaultChartType = categoricalColumns.length && numericColumns.length ? 'bar' : 'scatter';
  const [chartType, setChartType] = useState(defaultChartType);
  // Default x: first categorical or first header
  const [xKey, setXKey] = useState(categoricalColumns[0] || headers[0]);
  // Default y: first numeric or second header
  const [yKey, setYKey] = useState(numericColumns[0] || headers[1]);

  const handleTabChange = (tab) => {
    setIsLoading(true);
    setActiveTab(tab);
    setTimeout(() => setIsLoading(false), 300);
  };

  // Generate chart data based on selection
  const chartData = useMemo(() => {
    if (!data || !xKey || (!yKey && chartType !== 'pie')) return null;
    if (chartType === 'pie') {
      // Pie: xKey is label, yKey is value
      return [{
        type: 'pie',
        labels: data.map(row => row[xKey]),
        values: data.map(row => row[yKey]),
        textinfo: 'label+percent',
        hoverinfo: 'label+value+percent',
        hole: 0.3
      }];
    }
    // Bar, Line, Scatter: x and y
    return [{
      type: chartType,
      x: data.map(row => row[xKey]),
      y: data.map(row => row[yKey]),
      mode: chartType === 'scatter' ? 'markers' : undefined,
      marker: { color: 'var(--primary-color)' },
      line: { color: 'var(--primary-color)' }
    }];
  }, [data, chartType, xKey, yKey]);

  const chartLayout = useMemo(() => ({
    autosize: true,
    height: 450,
    width: Math.min(window.innerWidth * 0.4, 1100),
    margin: { t: 40, b: 50, l: 60, r: 40 },
    paper_bgcolor: 'transparent',
    plot_bgcolor: 'transparent',
    font: {
      family: 'Inter, sans-serif',
      color: 'var(--text-color)',
      size: 14
    },
    title: {
      text: `${chartType.charAt(0).toUpperCase() + chartType.slice(1)} Chart`,
      font: {
        family: 'Inter, sans-serif',
        size: 20,
        color: 'var(--text-color)'
      },
      y: 0.95
    },
    xaxis: {
      automargin: true,
      tickfont: { size: 12 },
      title: {
        text: xKey || 'X-Axis',
        font: { size: 14 }
      }
    },
    yaxis: {
      automargin: true,
      tickfont: { size: 12 },
      title: {
        text: yKey || 'Y-Axis',
        font: { size: 14 }
      }
    },
    modebar: {
      bgcolor: 'transparent',
      color: isDark ? '#fff' : '#1e293b',
      activecolor: 'var(--primary-color)'
    }
  }), [chartType, xKey, yKey, isDark]);

  return (
    <motion.div 
      className="data-display-modal glass-effect"
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      transition={{ type: "spring", duration: 0.5 }}
      style={{
        width: '80vw',
        maxWidth: '1400px',
        left: '11%',
        transform: 'translate(-50%, -50%)'
      }}
    >
      <motion.div 
        className="modal-content"
        initial={{ y: 20 }}
        animate={{ y: 0 }}
        transition={{ delay: 0.2 }}
      >
        <div className="modal-header">
          <div className="header-content">
            <h2>Query Results</h2>
            <div className="stats-summary">
              <div className="stat-item">
                <span className="stat-label">Rows</span>
                <span className="stat-value">{data ? data.length : 0}</span>
              </div>
              <div className="stat-item">
                <span className="stat-label">Columns</span>
                <span className="stat-value">{headers.length}</span>
              </div>
            </div>
          </div>
          <motion.button
            className="close-button"
            onClick={onClose}
            whileHover={{ scale: 1.1, rotate: 90 }}
            whileTap={{ scale: 0.9 }}
          >
            <span>✖</span>
          </motion.button>
        </div>

        {/* Chart/Table view controls always shown if enough data */}
        {data && data.length > 0 && (
          <div className="view-controls">
            <button 
              className={`tab-button ${activeTab === 'table' ? 'active' : ''}`}
              onClick={() => handleTabChange('table')}
            >
              Table View
            </button>
            <button 
              className={`tab-button ${activeTab === 'chart' ? 'active' : ''}`}
              onClick={() => handleTabChange('chart')}
              disabled={headers.length < 2}
            >
              Chart View
            </button>
            {activeTab === 'chart' && (
              <>
                <select value={chartType} onChange={e => setChartType(e.target.value)} style={{ marginLeft: 16 }}>
                  {CHART_TYPES.map(opt => (
                    <option key={opt.value} value={opt.value}>{opt.label}</option>
                  ))}
                </select>
                <select value={xKey} onChange={e => setXKey(e.target.value)} style={{ marginLeft: 8 }}>
                  {headers.map(h => (
                    <option key={h} value={h}>{h}</option>
                  ))}
                </select>
                {chartType !== 'pie' && (
                  <select value={yKey} onChange={e => setYKey(e.target.value)} style={{ marginLeft: 8 }}>
                    {headers.map(h => (
                      <option key={h} value={h}>{h}</option>
                    ))}
                  </select>
                )}
              </>
            )}
          </div>
        )}

        <div className="results-container custom-scrollbar">
          <AnimatePresence mode="wait">
            {isLoading ? (
              <motion.div 
                className="loading-container"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                <LoadingSpinner />
              </motion.div>
            ) : (
              <>
                {activeTab === 'chart' && chartData && (
                  <motion.div
                    className="chart-section"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.3 }}
                    style={{
                      minHeight: '600px',
                      padding: '1.5rem',
                      display: 'flex',
                      justifyContent: 'center',
                      alignItems: 'center'
                    }}
                  >
                    <Plot
                      data={chartData}
                      layout={chartLayout}
                      config={{
                        responsive: true,
                        displayModeBar: 'hover',
                        displaylogo: false,
                        modeBarButtonsToRemove: [
                          'sendDataToCloud',
                          'autoScale2d',
                          'resetScale2d'
                        ],
                        toImageButtonOptions: {
                          format: 'png',
                          filename: 'chart',
                          height: 550,
                          width: 1200,
                          scale: 2
                        }
                      }}
                      style={{ 
                        width: '100%', 
                        height: '100%',
                        minHeight: '550px'
                      }}
                      useResizeHandler={true}
                      className="plot-container"
                    />
                  </motion.div>
                )}

                {(activeTab === 'table' || !chartData) && (
                  <motion.div
                    className="table-section"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="table-container custom-scrollbar">
                      <table>
                        <thead>
                          <tr>
                            {headers.map(header => (
                              <th key={header}>
                                {header.replace(/_/g, ' ').toUpperCase()}
                              </th>
                            ))}
                          </tr>
                        </thead>
                        <tbody>
                          {data && data.map((row, index) => (
                            <motion.tr
                              key={index}
                              initial={{ opacity: 0, y: 10 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{ delay: 0.05 * (index % 10) }}
                              whileHover={{ 
                                backgroundColor: isDark ? 'rgba(255, 255, 255, 0.05)' : 'rgba(0, 0, 0, 0.02)'
                              }}
                            >
                              {headers.map(header => (
                                <td key={`${index}-${header}`}>
                                  <div className="cell-content">
                                    {row[header]}
                                  </div>
                                </td>
                              ))}
                            </motion.tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </motion.div>
                )}
              </>
            )}
          </AnimatePresence>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default DataDisplay;
