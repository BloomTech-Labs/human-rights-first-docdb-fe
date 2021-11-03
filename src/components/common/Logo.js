import React from 'react';
import useHistory from 'react-router-dom';
import '../../assets/HRF_Logo.webp';

function Logo() {
  const { push } = useHistory();
  const onClickLogo = e => {
    push('/');
  };
  return (
    <div className="logo">
      {/* NEED TO FIGURE OUT HOW TO IMPORT LOCAL LOGO IMAGE */}
      <img src="" className="logo" alt="HRF logo" onClick={onClickLogo}></img>
    </div>
  );
}

export default Logo;
