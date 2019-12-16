import React, { Component } from 'react';
import { connect } from 'react-redux';
import FormField from '../../utils/Form/formfield';
import {
  update,
  generateData,
  isFormValid,
  resetFields
} from '../../utils/Form/formActions';
import { getWoods, addWood } from '../../../store/actions/product_actions';
class ManageWoods extends Component {
  state = {
    formError: false,
    formSuccess: false,
    formData: {
      name: {
        element: 'input',
        value: '',
        config: {
          name: 'name_input',
          type: 'text',
          placeholder: 'Enter the wood'
        },
        validation: {
          required: true
        },
        valid: true,
        touched: true,
        validationMessage: ''
      }
    }
  };
  componentDidMount() {
    this.props.dispatch(getWoods());
  }
  showCategoryItems = () =>
    this.props.products.woods
      ? this.props.products.woods.map((item, i) => (
          <div className="category_item" key={item._id}>
            {item.name}
          </div>
        ))
      : null;
  updateForm = element => {
    const newFormData = update(element, this.state.formData, 'woods');
    this.setState({
      formError: false,
      formData: newFormData
    });
  };
  resetFieldsHandler = () => {
    const newFormData = resetFields(this.state.formData, 'woods');
    console.log(newFormData);
    this.setState({ formData: newFormData, formSuccess: true });
    setTimeout(() => this.setState({ formSuccess: false }), 3000);
  };
  submitForm = e => {
    e.preventDefault();
    let dataToSubmit = generateData(this.state.formData, 'woods');
    let formIsValid = isFormValid(this.state.formData, 'woods');
    if (formIsValid) {
      this.props
        .dispatch(addWood(dataToSubmit, this.props.products.woods))
        .then(response => {
          if (response.payload.success) {
            this.resetFieldsHandler();
          } else {
            this.setState({ formError: true });
          }
        });
    } else {
      this.setState({ formError: true });
    }
  };
  render() {
    return (
      <div className="admin_category_wrapper">
        <h1>Woods</h1>
        <div className="admin_two_column">
          <div className="left">
            <div className="brands_container">{this.showCategoryItems()}</div>
          </div>
          <div className="right">
            <form action="POST" onSubmit={this.submitForm}>
              <FormField
                id={'name'}
                formData={this.state.formData['name']}
                onChange={element => this.updateForm(element)}
              />
              {this.state.formSuccess ? (
                <div className="form_success">Success</div>
              ) : null}

              {this.state.formError ? (
                <div className="error_label">Please check your data</div>
              ) : null}
              <button type="submit">Add Product</button>
            </form>
          </div>
        </div>
      </div>
    );
  }
}
const mapStateToProps = state => ({ products: state.products });
export default connect(mapStateToProps)(ManageWoods);
