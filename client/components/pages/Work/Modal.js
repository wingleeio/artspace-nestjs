import React, { useEffect, useState } from 'react';

function Modal(props) {
  const visible = () => (props.visibility === true ? 'show' : 'hide');

  return (
    <div
      className={`image-modal ${visible()}`}
      onClick={() => props.setVisibility(false)}
    >
      <img src={props.image.imageUrl} alt={`${props.image.title} image`} />
    </div>
  );
}

export default Modal;
