import React from 'react';

function Spinner({ height }) {
  return (
    <div className="bg-is-dark-blue-grey spinner" style={{ height }}>
      <div className="lds-roller">
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
    </div>
  );
}

export default Spinner;
