import React from 'react';
import PropTypes from 'prop-types';

function Button({ children, handleClick, testID, disabled, className, image }) {
  return (
    <button
      type="button"
      onClick={ handleClick }
      data-testid={ testID }
      disabled={ disabled }
      className={ className }
      src={ image }
    >
      <span>{children}</span>
    </button>
  );
}

const { func, string, bool, oneOfType, node } = PropTypes;

Button.propTypes = {
  handleClick: func.isRequired,
  testID: string.isRequired,
  disabled: bool,
  children: oneOfType(string, node).isRequired,
  image: string.isRequired,
  className: string.isRequired,
};

Button.defaultProps = {
  disabled: false,
};

export default Button;
