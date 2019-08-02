import React from 'react';
import TextInput from '../components/inputs/TextInput';
import CustomButton from '../components/buttons/CustomButton';

export default () => (
  <div className="searchToolbar">
    <TextInput className="searchInput" width="100%" />
    <CustomButton text="Crear Proyecto" />
  </div>
);
