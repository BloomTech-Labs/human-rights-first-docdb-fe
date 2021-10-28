import React from 'react';
import PropTypes from 'prop-types';

const Button = props => {
  // Here is a button for use when simply in need of a button that doesn't require to be wrapped in a form.
  // contains a click property for your use onClick
  const { handleClick, isDisabled, classType, buttonText } = props;
  return (
    <button
      onClick={handleClick}
      disabled={isDisabled}
      className={classType || 'primary'}
    >
      {buttonText}
    </button>
  );
};

export default Button;

Button.propTypes = {
  buttonText: PropTypes.string.isRequired,
  classType: PropTypes.string,
  disabled: PropTypes.string,
  handleClick: PropTypes.func,
};
