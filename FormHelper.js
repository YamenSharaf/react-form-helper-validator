import { useState, useEffect } from "react";

const FormValidator = ({ children, model, rules }) => {
  const [formData, setFormData] = useState(model);

  const initialErrorObject = Object.keys(formData).reduce((map, key) => {
    map[key] = null;
    return map;
  }, {});

  const initialFormElementsState = Object.keys(formData).reduce((map, key) => {
    map[key] = "pristine";
    return map;
  }, {});

  const [formState, setFormState] = useState(initialFormElementsState);
  const [formErrors, setFormErrors] = useState(initialErrorObject);

  const [hasErrors, setHasErrors] = useState(false);

  const setField = (field, value) => {
    setFormData(currentFormData => {
      return {
        ...currentFormData,
        [field]: value
      };
    });

    setFormState(currentFormState => {
      if (currentFormState[field] !== "dirty") {
        return {
          ...currentFormState,
          [field]: "dirty"
        };
      }
      return currentFormState;
    });
  };

  const validate = () => {
    return new Promise((resolve, reject) => {
      const { hasErrors, errors } = validateForm();
      setFormErrors(errors);
      !hasErrors ? resolve() : reject(errors);
    });
  };

  const clearValidation = () => {
    setFormErrors(initialErrorObject);
    setFormState(initialFormElementsState);
  };

  const resetForm = () => {
    setFormData(model);
    clearValidation();
  };

  const setFieldError = (field, error) => {
    setFormErrors(currentErrors => {
      return {
        ...currentErrors,
        [field]: error
      };
    });
  };

  const validateForm = () => {
    let hasErrors = false;
    const errors = {};
    Object.entries(rules).forEach(([key, arrayOfRules]) => {
      arrayOfRules.forEach(rule => {
        const error = rule(formData[key]);
        if (error) {
          !hasErrors && (hasErrors = true);
          errors[key] = error;
        } else {
          errors[key] = null;
        }
      });
    });
    return { errors, hasErrors };
  };

  const populateFormErrorsWhenDirty = errors => {
    for (let key in errors) {
      if (formState[key] === "dirty") {
        setFieldError(key, errors[key]);
      }
    }
  };

  useEffect(() => {
    const { errors, hasErrors } = validateForm();
    populateFormErrorsWhenDirty(errors);
    setHasErrors(hasErrors);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [formData]);

  useEffect(() => {
    const { hasErrors } = validateForm();
    setHasErrors(hasErrors);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [formErrors]);

  class FieldChangeHandler {
    static text({ target: { name, value } }) {
      setField(name, value);
    }
    static checkbox({ target: { name, checked } }) {
      setField(name, checked);
    }
    static radio({ target: { name, value } }) {
      setField(name, value);
    }

    static select = this.radio;
    static textarea = this.text;
  }

  return children({
    validate,
    hasErrors,
    formErrors,
    formState,
    formData,
    setField,
    clearValidation,
    resetForm,
    update: FieldChangeHandler
  });
};

export default FormValidator;
