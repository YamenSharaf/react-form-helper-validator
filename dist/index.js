"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
Object.defineProperty(exports, "rules", {
  enumerable: true,
  get: function get() {
    return _rules["default"];
  }
});
exports["default"] = void 0;

var _react = require("react");

var _rules = _interopRequireDefault(require("rules"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

var FormValidator = function FormValidator(_ref) {
  var children = _ref.children,
      _ref$model = _ref.model,
      model = _ref$model === void 0 ? {} : _ref$model,
      _ref$rules = _ref.rules,
      rules = _ref$rules === void 0 ? {} : _ref$rules,
      _ref$manual = _ref.manual,
      manualValidationList = _ref$manual === void 0 ? [] : _ref$manual;

  var _useState = (0, _react.useState)(model),
      _useState2 = _slicedToArray(_useState, 2),
      formData = _useState2[0],
      setFormData = _useState2[1];

  var initialErrorObject = Object.keys(formData).reduce(function (map, key) {
    map[key] = null;
    return map;
  }, {});
  var initialFormElementsState = Object.keys(formData).reduce(function (map, key) {
    map[key] = "pristine";
    return map;
  }, {});

  var _useState3 = (0, _react.useState)(initialFormElementsState),
      _useState4 = _slicedToArray(_useState3, 2),
      formState = _useState4[0],
      setFormState = _useState4[1];

  var _useState5 = (0, _react.useState)(initialErrorObject),
      _useState6 = _slicedToArray(_useState5, 2),
      formErrors = _useState6[0],
      setFormErrors = _useState6[1];

  var _useState7 = (0, _react.useState)(false),
      _useState8 = _slicedToArray(_useState7, 2),
      hasErrors = _useState8[0],
      setHasErrors = _useState8[1];

  var setField = function setField(field, value) {
    setFormData(function (currentFormData) {
      return _objectSpread({}, currentFormData, _defineProperty({}, field, value));
    });
    setFormState(function (currentFormState) {
      if (currentFormState[field] !== "dirty") {
        return _objectSpread({}, currentFormState, _defineProperty({}, field, "dirty"));
      }

      return currentFormState;
    });
  };

  var validate = function validate() {
    return new Promise(function (resolve, reject) {
      var _validateForm = validateForm(true),
          hasErrors = _validateForm.hasErrors,
          errors = _validateForm.errors;

      setFormErrors(errors);
      !hasErrors ? resolve() : reject(errors);
    });
  };

  var clearValidation = function clearValidation() {
    setFormState(initialFormElementsState);
    setFormErrors(initialErrorObject);
  };

  var resetForm = function resetForm() {
    setFormData(model);
    clearValidation();
  };

  var setFieldError = function setFieldError(field, error) {
    setFormErrors(function (currentErrors) {
      return _objectSpread({}, currentErrors, _defineProperty({}, field, error));
    });
  };

  var validateForm = function validateForm(force) {
    var hasErrors = false;
    var errors = {};
    Object.entries(rules).forEach(function (_ref2) {
      var _ref3 = _slicedToArray(_ref2, 2),
          key = _ref3[0],
          arrayOfRules = _ref3[1];

      var errorMessage = null;
      var _iteratorNormalCompletion = true;
      var _didIteratorError = false;
      var _iteratorError = undefined;

      try {
        for (var _iterator = arrayOfRules[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
          var ruleFn = _step.value;
          if (errorMessage || !force && manualValidationList.includes(key)) break;
          var validationResult = ruleFn(formData[key]);

          if (validationResult) {
            errorMessage = validationResult;
            !hasErrors && (hasErrors = true);
            errors[key] = errorMessage;
          } else {
            errors[key] = null;
          }
        }
      } catch (err) {
        _didIteratorError = true;
        _iteratorError = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion && _iterator["return"] != null) {
            _iterator["return"]();
          }
        } finally {
          if (_didIteratorError) {
            throw _iteratorError;
          }
        }
      }
    });
    return {
      errors: errors,
      hasErrors: hasErrors
    };
  };

  var getFieldValidation = function getFieldValidation(name) {
    var errorMessage = null;
    rules[name].forEach(function (ruleFn) {
      var validationResult = ruleFn(formData[name]);

      if (!errorMessage && !validationResult) {
        return;
      } else if (errorMessage && validationResult) {
        return;
      } else if (!errorMessage && validationResult) {
        errorMessage = validationResult;
      }
    });
    return errorMessage;
  };

  var validateField = function validateField(name) {
    if (!rules[name]) return;
    var error = getFieldValidation(name);

    if (error) {
      setFieldError(name, error);
    } else {
      setFieldError(name, null);
    }
  };

  var populateFormErrorsWhenDirty = function populateFormErrorsWhenDirty(errors) {
    for (var key in errors) {
      if (formState[key] === "dirty") {
        setFieldError(key, errors[key]);
      }
    }
  };

  (0, _react.useEffect)(function () {
    var _validateForm2 = validateForm(),
        errors = _validateForm2.errors,
        hasErrors = _validateForm2.hasErrors;

    populateFormErrorsWhenDirty(errors);
    setHasErrors(hasErrors); // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [formData]);
  (0, _react.useEffect)(function () {
    var _validateForm3 = validateForm(),
        hasErrors = _validateForm3.hasErrors;

    setHasErrors(hasErrors); // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [formErrors]);

  var FieldActions =
  /*#__PURE__*/
  function () {
    function FieldActions() {
      _classCallCheck(this, FieldActions);
    }

    _createClass(FieldActions, null, [{
      key: "text",
      value: function text(_ref4) {
        var _ref4$target = _ref4.target,
            name = _ref4$target.name,
            value = _ref4$target.value;
        setField(name, value);
      }
    }, {
      key: "checkbox",
      value: function checkbox(_ref5) {
        var _ref5$target = _ref5.target,
            name = _ref5$target.name,
            checked = _ref5$target.checked;
        setField(name, checked);
      }
    }, {
      key: "radio",
      value: function radio(_ref6) {
        var _ref6$target = _ref6.target,
            name = _ref6$target.name,
            value = _ref6$target.value;
        setField(name, value);
      }
    }]);

    return FieldActions;
  }();

  _defineProperty(FieldActions, "select", FieldActions.radio);

  _defineProperty(FieldActions, "textarea", FieldActions.text);

  return children({
    validate: validate,
    validateField: validateField,
    hasErrors: hasErrors,
    formErrors: formErrors,
    formState: formState,
    formData: formData,
    setField: setField,
    clearValidation: clearValidation,
    resetForm: resetForm,
    update: FieldActions
  });
};

exports["default"] = FormValidator;
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _default = {
  required: function required(value, field) {
    return !value ? "".concat(field, " is required") : false;
  },
  selected: function selected(value, fieldError) {
    return value === true ? false : fieldError;
  },
  email: function email(value, field) {
    if (!value) return false;
    var EMAIL_PATTERN = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return EMAIL_PATTERN.test(value) ? false : "Please enter a valid ".concat(field);
  },
  letters: function letters(value, field) {
    if (!value) return false;
    return value && /^[a-zA-Z\s]+$/.test(value.trim()) ? false : "".concat(field, " must be letters and spaces only");
  },
  max: function max(value, _max, field) {
    if (!value) return false;
    return value.length <= _max ? false : "".concat(field, " cannot be more than ").concat(_max, " characters");
  },
  min: function min(value, _min, field) {
    if (!value) return false;
    return value.length > _min ? false : "".concat(field, " cannot be less than ").concat(_min, " characters");
  },
  alphanumeric: function alphanumeric(value, field) {
    if (!value) return false;
    return /^[a-z0-9]+$/i.test(value) ? false : "".concat(field, " should be letters and numbers only");
  }
};
exports["default"] = _default;
