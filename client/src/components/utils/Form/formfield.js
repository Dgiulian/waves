import React from 'react';
import { ListItemSecondaryAction } from '@material-ui/core';

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
            {formData.showLabel ? (
              <div className="label_inputs">{formData.config.label}</div>
            ) : null}
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
      case 'select': {
        formTemplate = (
          <div className="formBlock">
            {formData.showLabel ? (
              <div className="label_inputs">{formData.config.label}</div>
            ) : null}
            <select
              value={formData.value}
              onBlur={event => onChange({ event, id, blur: true })}
              onChange={event => onChange({ event, id })}
            >
              <option value="">Select one</option>
              {formData.config.options.map((item, id) => (
                <option key={item.key} value={item.key}>
                  {item.value}
                </option>
              ))}
              }
            </select>
            {showError()}
          </div>
        );
        break;
      }
      case 'textarea': {
        formTemplate = (
          <div className="formBlock">
            {formData.showLabel ? (
              <div className="label_inputs">{formData.config.label}</div>
            ) : null}
            <textarea
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
