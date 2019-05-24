# react-form-helper-validator

⚡ Tiny library for form state/ validation written entirely with React Hooks

## Installation

    npm install react-form-helper-validator --save

Or

    yarn add react-form-helper-validator

## Usage

First off let's import FormHelper

    import  FormHelper  from  "react-form-helper-validator";

and then wrap your form with FormHelper like so

```react
<FormValidator model={model} rules={rules} manual={manualValidation}>
      {({
        validate,
        formData,
        formState,
        formErrors,
        update,
        resetForm,
        hasErrors,
        validateField,
        clearValidation
      }) => {
        const handleSubmit = e => {
          e.preventDefault();
          validate()
            .then(() => {
              console.log("submitting", formData);
            })
            .catch(err => {
              console.error("err", err);
            });
        };
        return (
            <form onSubmit={handleSubmit}>
            </form>
        )
    }
</FormValidator>

```
