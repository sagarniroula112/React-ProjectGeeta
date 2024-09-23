import React from 'react';

function BackButton({ onClick }) {
  return (
    <button style={{marginTop: '40px', width: '22vw', marginLeft:'auto', fontWeight: 600, marginRight: "50px"}} onClick={onClick} className="back-button">
      Back
    </button>
  );
}

export default BackButton;
