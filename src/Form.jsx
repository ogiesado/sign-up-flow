import React from 'react';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import {
  mapStoreStateToFormProps,
  mapStoreDispatchToFormProps,
  getFormFieldValidityCssClassName
} from './utils';
import { ROUTE_CONFIRMATION } from './constants';

import './styles/form.scss';

function Form({ handleSubmit, handleChange, submitted, fields = [] }) {
  return (
    <form className="form" id="form">
      {submitted && <Redirect to={ROUTE_CONFIRMATION} />}
      {fields.map(
        ({ id, value, placeholder, label, message, valid, touched }) => (
          <div className="form__field" key={id}>
            <label
              className={`form__field-label ${
                touched
                  ? `form__field-label--${getFormFieldValidityCssClassName(
                      valid
                    )}`
                  : ''
              }`}
              data-message={message}
              htmlFor={`form_${id}`}
              form="form"
            >
              {label}
            </label>
            <input
              type="text"
              className="form__field-input"
              autoComplete="off"
              value={value}
              onChange={e => handleChange(id, e.target.value)}
              id={`form_${id}`}
              placeholder={placeholder}
            />
          </div>
        )
      )}

      <div className="form__field form__field-actions">
        <button className="form__button" type="button" onClick={handleSubmit}>
          Submit
        </button>
      </div>
    </form>
  );
}

Form.propTypes = {
  fields: PropTypes.array,
  submitted: PropTypes.bool,
  handleSubmit: PropTypes.func,
  handleChange: PropTypes.func
};

export default connect(
  mapStoreStateToFormProps,
  mapStoreDispatchToFormProps
)(Form);
