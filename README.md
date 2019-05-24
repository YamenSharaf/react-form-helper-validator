# react-form-helper-validator

⚡ Tiny library for form state/ validation written entirely with React Hooks

## Installation

    npm install react-form-helper-validator --save

Or

    yarn add react-form-helper-validator

## Usage

First off let's import FormHelper

    import  FormHelper  from  "react-form-helper-validator";

and then wrap your form with FormHelper like so while providing required props

```react
  const model = {
    email: "",
  };

  const rules = {
    email: [
      v => !v && "This field is required",
      v => validationRules.emailValidation(v, "email")
    ]
  };

<FormValidator model={model} rules={rules}>
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
                <div className="field">
                  <label className="label">
                    Email
                  </label>
                  <div className="control">
                    <input
                      name="email"
                      value={formData.email}
                      onChange={update.text}
                      className="input"
                      type="email"
                      placeholder="Enter your email"
                    />
                  </div>
                  <p
                    className={`help ${!formErrors["email"] &&
                      "is-success"} ${formErrors["email"] && "is-danger"}`}
                  >
                    {formErrors["email"]}
                  </p>
                </div>
                <button
                  onClick={handleSubmit}
                  type="submit"
                  className="button"
                >
                  Submit
                </button>
            </form>
        )
    }
</FormValidator>
```

## Props

| Prop   | Required | purpose                                                                                                                                                       | Type   |
| ------ | -------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------ |
| model  | true     | Provides initial form data                                                                                                                                    | Object |
| rules  | false    | An object containing an array of rules which corresponds to data properties. Rules are functions that return an error `string` on error and `false` otherwise | Object |
| manual | false    | An array of field names which shall not be validated automatically on change                                                                                  | Array  |
