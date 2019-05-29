export default {
  required(value, field) {
    return !value ? `${field} is required` : false;
  },
  selected(value, fieldError) {
    return value === true ? false : fieldError;
  },
  email(value, field) {
    if (!value) return false;
    const EMAIL_PATTERN = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return EMAIL_PATTERN.test(value) ? false : `Please enter a valid ${field}`;
  },
  letters(value, field) {
    if (!value) return false;
    return value && /^[a-zA-Z\s]+$/.test(value.trim())
      ? false
      : `${field} must be letters and spaces only`;
  },
  max(value, max, field) {
    if (!value) return false;
    return value.length <= max
      ? false
      : `${field} cannot be more than ${max} characters`;
  },
  min(value, min, field) {
    if (!value) return false;
    return value.length > min
      ? false
      : `${field} cannot be less than ${min} characters`;
  },
  alphanumeric(value, field) {
    if (!value) return false;
    return /^[a-z0-9]+$/i.test(value)
      ? false
      : `${field} should be letters and numbers only`;
  }
};
