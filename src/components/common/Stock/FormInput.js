import React from 'react';
import PropTypes from 'prop-types';

const FormInput = props => {
  const { labelId, name, placeholder } = props;
  return (
    <>
      <label htmlFor={labelId}>{labelId}</label>
      <input type="text" id={labelId} name={name} placeholder={placeholder} />
    </>
  );
};

export default FormInput;

FormInput.propTypes = {
  placeholder: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  labelId: PropTypes.string.isRequired,
};
