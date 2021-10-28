import React from 'react';
import PropTypes from 'prop-types';

const FormButton = props => {
  // notice we don't pass a click handler to this component. It's supposed to be used as a FormButton only.
  // You'd want to use an onSubmit on the Form Element itself to keep your forms organized.
  const { isDisabled, classType, buttonText } = props;
  return (
    <button disabled={isDisabled} className={classType || 'primary'}>
      {buttonText}
    </button>
  );
};

export default FormButton;

FormButton.propTypes = {
  buttonText: PropTypes.string.isRequired,
  classType: PropTypes.string,
  disabled: PropTypes.string,
};
