import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Plot from 'react-plotly.js';
import LoadingSpinner from './LoadingSpinner';

const DataDisplay = ({ data, chart, onClose, isDark }) => {
  const [activeTab, setActiveTab] = useState('table');
  const [isLoading, setIsLoading] = useState(false);
  const headers = data ? Object.keys(data[0]) : [];

  const handleTabChange = (tab) => {
    setIsLoading(true);
    setActiveTab(tab);
    // Simulate loading for smooth transition
    setTimeout(() => setIsLoading(false), 300);
  };

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

        {chart && (
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
            >
              Chart View
            </button>
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
                {chart && activeTab === 'chart' && (
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
                      data={chart.data}
                      layout={{
                        ...chart.layout,
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
                            text: chart.layout?.xaxis?.title?.text || 'X-Axis',
                            font: { size: 14 }
                          }
                        },
                        yaxis: {
                          automargin: true,
                          tickfont: { size: 12 },
                          title: {
                            text: chart.layout?.yaxis?.title?.text || 'Y-Axis',
                            font: { size: 14 }
                          }
                        },
                        modebar: {
                          bgcolor: 'transparent',
                          color: isDark ? '#fff' : '#1e293b',
                          activecolor: 'var(--primary-color)'
                        }
                      }}
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

                {(!chart || activeTab === 'table') && (
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
