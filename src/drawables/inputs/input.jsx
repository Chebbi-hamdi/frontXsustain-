import React from 'react';
import styles from './style.module.scss';

const Input = ({ name, type, style = {}, label, register, onChange, required, errors ,labelStyle}) => {
  return (
    <div className={styles.box_input}>
      <label htmlFor={name} className={`${styles.label} ${labelStyle}`}>
        {label} {required && <span className={styles.required}>*</span>}
      </label>
      <input
        type={type}
        className={styles.input}
        name={name}
        style={style}
        onChange={onChange}
        {...register(name, { required: required })}
      />
      {/* Display error message if field is required and has an error */}
      {errors[name] && errors[name].type === 'required' && (
        <span className={styles.error}>This field is required</span>
      )}
    </div>
  );
};

export default Input;
