import {
  getFormFields,
  setFormFieldValue,
  validateFormFields,
  touchFormFields
} from './utils';
import { ACTION_CHANGE_FORM_FIELD, ACTION_SUBMIT_FORM } from './constants';

/**
 * A reducer that handles the state changes
 * @param {Object} state The current state of the store
 * @param {Object} action An object describing the change to the state
 * @return {Object} The new state
 */
export default function reducer(
  state = {
    fields: getFormFields(),
    valid: false,
    submitted: false
  },
  { type, payload }
) {
  switch (type) {
    case ACTION_CHANGE_FORM_FIELD:
      state = {
        ...state,
        fields: setFormFieldValue(state.fields, payload.id, payload.value)
      };

      state = { ...state, ...validateFormFields(state.fields) };

      break;

    case ACTION_SUBMIT_FORM:
      state = { ...state, fields: touchFormFields(state.fields) };
      state = { ...state, ...validateFormFields(state.fields) };
      state = { ...state, submitted: state.valid };

      break;
  }

  return state;
}
