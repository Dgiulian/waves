export const validate = (element, formData = []) => {
  let error = [true, ''];
  if (element.validation.email) {
    const valid = /\S+@\S+\.\S+/.test(element.value);
    const message = !valid ? 'Must be a valid email' : '';
    error = !valid ? [valid, message] : error;
  }
  if (element.validation.confirm) {
    const valid =
      element.value.trim() === formData[element.validation.confirm].value;
    const message = !valid ? 'Passwords do not match' : '';
    error = !valid ? [valid, message] : error;
  }

  if (element.validation.required) {
    const valid = element.value.trim() !== '';
    const message = !valid ? 'This field is required' : '';
    error = !valid ? [valid, message] : error;
  }
  return error;
};

export const update = (element, formData, formName) => {
  const newFormData = { ...formData };
  const newElement = {
    ...newFormData[element.id],
    value: element.event.target.value
  };
  if (element.blur) {
    let validData = validate(newElement, formData);
    newElement.valid = validData[0];
    newElement.validationMessage = validData[1];
  }
  newElement.touched = element.blur;
  newFormData[element.id] = newElement;
  return newFormData;
};

export const generateData = (formData, formName) => {
  let dataToSubmit = {};
  for (let key in formData) {
    dataToSubmit[key] = formData[key].value;
  }
  return dataToSubmit;
};

export const isFormValid = (formData, formName) => {
  for (let key in formData) {
    if (!formData[key].valid) {
      return false;
    }
  }
  return true;
};

export function populateOptionsFields(formData, arrayData = [], field) {
  const newArray = [];
  const newFormData = { ...formData };
  arrayData.forEach(item => {
    newArray.push({ key: item._id, value: item.name });
  });
  newFormData[field].config.options = newArray;
  return newFormData;
}

export function resetFields(formData, formName) {
  const newFormData = { ...formData };
  for (let key in newFormData) {
    if (key === 'images') {
      newFormData[key].value = [];
    } else {
      newFormData[key].value = '';
    }
    newFormData[key].valid = false;
    newFormData[key].touched = false;
    newFormData[key].validationMessage = '';
  }
  return newFormData;
}

export function populateFields(formData, fields) {
  console.log(fields)
  for (let key in formData) {
    formData[key].value = fields[key];
    formData[key].valid = true;
    formData[key].touched = true;
    formData[key].validationMessage = '';
  }
  return formData;
}
