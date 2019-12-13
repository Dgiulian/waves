import React from 'react';

const FormField = ({ id, formData, onChange }) => {
  const showError = () => {
    let errorMessage = null;
    if (formData.validation && !formData.valid) {
      errorMessage = (
        <div className="error_label">{formData.validationMessage}</div>
      );
    }
    return errorMessage;
  };
  const renderTemplate = () => {
    let formTemplate = null;
    switch (formData.element) {
      case 'input': {
        formTemplate = (
          <div className="formBlock">
            <input
              {...formData.config}
              value={formData.value}
              onBlur={event => onChange({ event, id, blur: true })}
              onChange={event => onChange({ event, id })}
            />
            {showError()}
          </div>
        );
        break;
      }
      default:
        return formTemplate;
    }
    return formTemplate;
  };
  return <div>{renderTemplate()}</div>;
};

export default FormField;
