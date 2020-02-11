import React from 'react';
import '../style/header.scss';

export default ({ logout }) => (
  <header>
    <img
      onClick={logout}
      className="logout"
      title="Cerrar sesión"
      src={require('../assets/icons/logout.svg')}
    />
  </header>
);
