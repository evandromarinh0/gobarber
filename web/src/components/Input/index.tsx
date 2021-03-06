import React, { InputHTMLAttributes, useCallback, useEffect, useRef, useState } from 'react';
import { IconBaseProps } from 'react-icons';
import { useField } from '@unform/core';
import { FiAlertCircle } from 'react-icons/fi';

import { Container, Error } from './styles';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  name: string;
  containerStyle?: object;
  icon?: React.ComponentType<IconBaseProps>;
}

const Input: React.FC<InputProps> = ({ name, containerStyle, icon: Icon, ...rest }) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const { registerField, fieldName, defaultValue, error } = useField(name);
  const [isFocused, setIsFocused] = useState(false);
  const [isFilled, setIsFilled] = useState(false);

  const handleInputFocus = useCallback(() => {
    setIsFocused(true)
  }, [])

  const handleInputBlur = useCallback(() => {
    setIsFocused(false);

    if(inputRef.current?.value) {
      setIsFilled(true);
    } else {
      setIsFilled(false);
    }
  }, []);

  useEffect(() => {
    registerField({
      name: fieldName,
      ref: inputRef.current,
      path: 'value'
    })
  }, [fieldName, registerField]);

  return(
    <Container style={containerStyle} isErrored={!!error} isFilled={isFilled} isFocused={isFocused}>
      { Icon && <Icon size={20} /> }
      <input 
      onFocus={handleInputFocus}
      onBlur={handleInputBlur}
      defaultValue={defaultValue} 
      ref={inputRef} 
      {...rest} />

      {error && 
        <Error title={error}>
          <FiAlertCircle size={20} color="#c53030" />
        </Error>
      }
    </Container>
  );
}

export default Input;