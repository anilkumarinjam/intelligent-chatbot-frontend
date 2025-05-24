import React from 'react';

const DataDisplay = ({ data }) => {
  if (!data || !Array.isArray(data)) {
    return null;
  }

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
    </div>
  );
};

export default DataDisplay;
