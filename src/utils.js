import {
  REGEX_EMAIL,
  REGEX_DATE,
  REGEX_NAME,
  ACTION_CHANGE_FORM_FIELD,
  ACTION_SUBMIT_FORM
} from './constants';

/**
 * Returns the form fields
 * @return {Array<Object>}
 */
export function getFormFields() {
  return {
    'first-name': {
      id: 'first-name',
      value: '',
      placeholder: 'Will',
      label: 'First Name',
      touched: false,
      validations: { isRequired: true, isRegex: REGEX_NAME },
      valid: true,
      message: ''
    },
    surname: {
      id: 'surname',
      value: '',
      placeholder: 'Smith',
      label: 'Surname',
      touched: false,
      validations: { isRequired: true, isRegex: REGEX_NAME },
      valid: true,
      message: ''
    },
    dob: {
      id: 'dob',
      value: '',
      placeholder: '01/01/1980',
      label: 'Date of Birth',
      touched: false,
      validations: { isRequired: true, isDate: true },
      valid: true,
      message: ''
    },
    nationality: {
      id: 'nationality',
      value: '',
      placeholder: 'Irish',
      label: 'Nationality',
      validations: { isRegex: /ese|an|ish|i|er/ },
      touched: false,
      valid: true,
      message: ''
    },
    email: {
      id: 'email',
      value: '',
      placeholder: 'hello@info.com',
      touched: false,
      validations: { isRequired: true, isEmail: true },
      label: 'Email Address'
    },
    occupation: {
      id: 'occupation',
      value: '',
      placeholder: 'Front End Developer',
      label: 'Occupation',
      touched: false,
      validations: { isRequired: true },
      valid: true,
      message: ''
    }
  };
}

/**
 * Maps the store state to the props for the form component
 * @param {Object} state
 * @return {Object}
 */
export function mapStoreStateToFormProps(state) {
  return {
    submitted: state.submitted,
    fields: Object.values(state.fields)
  };
}

/**
 * Maps the store dispatch to the props for the form component
 * @param {Object} state
 * @return {Object}
 */
export function mapStoreDispatchToFormProps(dispatch) {
  return {
    handleSubmit: () => dispatch(submitFormAction()),
    handleChange: (id, value) => dispatch(changeFormFieldAction(id, value))
  };
}

/**
 * Maps the store state to the props for the confirmation component
 * @param {Object} state
 * @return {Object}
 */
export function mapStoreStateToConfirmationProps(state) {
  return { submitted: state.submitted };
}

/**
 * Creates an action that describes the form submssion
 * @return {Object}
 */
function submitFormAction() {
  return { type: ACTION_SUBMIT_FORM };
}

/**
 * Creates an action that describes the form field change
 * @param {String} id The form field id
 * @param {String} value The form field new value
 * @return {Object}
 */
function changeFormFieldAction(id, value) {
  return { type: ACTION_CHANGE_FORM_FIELD, payload: { id, value } };
}

/**
 * A pure function that sets a form field value
 * @param {Object} fields The form fields
 * @param {String} id The form field id
 * @param {String} value The form field new value
 * @return {Object}
 */
export function setFormFieldValue(fields, id, value) {
  return { ...fields, [id]: { ...fields[id], touched: true, value } };
}

/**
 * A pure function that validates the form fields
 * @param {Object} fields The form fields
 * @return {Object}
 */
export function validateFormFields(fields) {
  let valid = true;

  fields = Object.keys(fields).reduce((validatedFields, id) => {
    const field = fields[id];
    const {
      label,
      value,
      validations: { isRequired, isEmail, isDate, isRegex }
    } = field;

    if (!field.touched || (!isRequired && value === '')) {
      validatedFields[id] = field;
    } else {
      if (isRequired && value === '') {
        valid = false;
        validatedFields[id] = {
          ...field,
          valid,
          message: `${label} is required.`
        };
      } else if (isEmail && !REGEX_EMAIL.test(value)) {
        valid = false;
        validatedFields[id] = {
          ...field,
          valid,
          message: `${label} is an invalid email.`
        };
      } else if (isRegex && !isRegex.test(value)) {
        valid = false;
        validatedFields[id] = {
          ...field,
          valid,
          message: `${label} is invalid.`
        };
      } else if (isDate && !isValidDate(value)) {
        valid = false;
        validatedFields[id] = {
          ...field,
          valid,
          message: `${label} is an invalid date.`
        };
      } else {
        validatedFields[id] = { ...field, valid: true, message: '' };
      }
    }

    return validatedFields;
  }, {});

  return { valid, fields };
}

/**
 * A pure function that marks the form fields a touched
 * @param {Object} fields The form fields
 * @return {Object}
 */
export function touchFormFields(fields) {
  return Object.keys(fields).reduce((touchedFields, id) => {
    touchedFields[id] = { ...fields[id], touched: true };
    return touchedFields;
  }, {});
}

/**
 * A helper to get the form field validity css class
 * @param {Boolean} valid If the field is valid or not
 * @return {String}
 */
export function getFormFieldValidityCssClassName(valid) {
  return valid ? 'valid' : 'invalid';
}

/**
 * A helper to check if a value is a valid date
 * @param {String} dateString
 * @return {Boolean}
 */
function isValidDate(dateString) {
  if (!REGEX_DATE.test(dateString)) return false;

  const [day, month, year] = dateString.split('/');

  return !Number.isNaN(Date.parse(`${year}-${month}-${day}`));
}
