import React, { useEffect, useState } from 'react';

function Modal() {
  return (
    <div className="image-modal">
      <img src={props.image} alt={`${props.image.title} image`} />
    </div>
  );
}

export default Modal;
