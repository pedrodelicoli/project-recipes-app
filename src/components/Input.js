import React from 'react';
import PropTypes from 'prop-types';

const Input = (props) => {
  const { name,
    labelText,
    inputType,
    testID,
    handleChange,
    placeholder,
    className,
    value,
    id } = props;

  const myId = id || name;

  return (
    <label htmlFor={ myId } className={ className }>
      {labelText}
      <input
        id={ myId }
        name={ name }
        value={ value }
        type={ inputType }
        data-testid={ testID }
        onChange={ handleChange }
        placeholder={ placeholder }
      />
    </label>
  );
};

const { string, func } = PropTypes;

Input.propTypes = {
  name: string.isRequired,
  value: string,
  labelText: string.isRequired,
  inputType: string.isRequired,
  testID: string,
  handleChange: func.isRequired,
  placeholder: string,
  className: string,
  id: string,
};

Input.defaultProps = {
  value: undefined,
  testID: undefined,
  placeholder: undefined,
  className: undefined,
  id: undefined,
};

export default Input;
