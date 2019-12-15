import React, { Component } from 'react';
import { connect } from 'react-redux';
import UserLayout from '../../../hoc/userlayout';
import FormField from '../../utils/Form/formfield';
import {
  getBrands,
  getWoods,
  addProduct,
  clearProduct
} from '../../../store/actions/product_actions';
import {
  update,
  generateData,
  isFormValid,
  populateOptionsFields,
  resetFields
} from '../../utils/Form/formActions';
class AddProduct extends Component {
  state = {
    formError: false,
    formSuccess: false,
    formData: {
      name: {
        element: 'input',
        value: '',
        config: {
          label: 'Product name',
          name: 'name_input',
          type: 'text',
          placeholder: 'Enter your name'
        },
        validation: {
          required: true
        },
        valid: true,
        touched: true,
        validationMessage: '',
        showLabel: true
      },
      description: {
        element: 'textarea',
        value: '',
        config: {
          label: 'Description',
          name: 'description_input',
          type: 'text',
          placeholder: 'Add your description'
        },
        validation: {
          required: true
        },
        valid: true,
        touched: true,
        validationMessage: '',
        showLabel: true
      },

      price: {
        element: 'input',
        value: '',
        config: {
          label: 'Price',
          name: 'price_input',
          type: 'text',
          placeholder: 'Enter your price'
        },
        validation: {
          required: true
        },
        valid: true,
        touched: true,
        validationMessage: '',
        showLabel: true
      },
      brand: {
        element: 'select',
        value: '',
        config: {
          label: 'Brand',
          name: 'brand_input',
          type: 'text',
          options: []
        },
        validation: {
          required: true
        },
        valid: true,
        touched: true,
        validationMessage: '',
        showLabel: true
      },
      shipping: {
        element: 'select',
        value: '',
        config: {
          label: 'Shipping',
          name: 'shipping_input',
          type: 'text',
          options: [
            { key: true, value: 'Yes' },
            { key: false, value: 'No' }
          ]
        },
        validation: {
          required: true
        },
        valid: true,
        touched: true,
        validationMessage: '',
        showLabel: true
      },
      available: {
        element: 'select',
        value: '',
        config: {
          label: 'Available in stock',
          name: 'available_input',
          type: 'text',
          options: [
            { key: true, value: 'Yes' },
            { key: false, value: 'No' }
          ]
        },
        validation: {
          required: true
        },
        valid: true,
        touched: true,
        validationMessage: '',
        showLabel: true
      },
      wood: {
        element: 'select',
        value: '',
        config: {
          label: 'Wood material',
          name: 'wood_input',
          type: 'text',
          options: []
        },
        validation: {
          required: true
        },
        valid: true,
        touched: true,
        validationMessage: '',
        showLabel: true
      },
      frets: {
        element: 'select',
        value: '',
        config: {
          label: 'Frets',
          name: 'frets_input',
          type: 'text',
          options: [
            { key: 20, value: 20 },
            { key: 21, value: 21 },
            { key: 22, value: 22 },
            { key: 24, value: 24 }
          ]
        },
        validation: {
          required: true
        },
        valid: true,
        touched: true,
        validationMessage: '',
        showLabel: true
      },
      publish: {
        element: 'select',
        value: '',
        config: {
          label: 'Publish',
          name: 'publish_input',
          type: 'text',
          options: [
            { key: true, value: 'Public' },
            { key: false, value: 'hidden' }
          ]
        },
        validation: {
          required: true
        },
        valid: true,
        touched: true,
        validationMessage: '',
        showLabel: true
      }
    }
  };
  componentDidMount() {
    const { formData } = this.state;

    this.props.dispatch(getBrands()).then(response => {
      const newFormData = populateOptionsFields(
        formData,
        this.props.products.brands,
        'brand'
      );
      this.updateFields(newFormData);
    });
    this.props.dispatch(getWoods()).then(response => {
      const newFormData = populateOptionsFields(
        formData,
        this.props.products.woods,
        'wood'
      );
      this.updateFields(newFormData);
    });
  }
  componentWillMount() {
    this.props.dispatch(clearProduct());
  }
  updateFields = newFormData => {
    this.setState({ formData: newFormData });
  };
  updateForm = element => {
    const newFormData = update(element, this.state.formData, 'products');
    this.setState({
      formError: false,
      formData: newFormData
    });
  };
  resetFieldsHandler = () => {
    const newFormData = resetFields(this.state.formData, 'products');
    this.setState({ formData: newFormData, formSuccess: true });
    setTimeout(() => this.setState({ formSuccess: true }), 3000);
  };
  submitForm = e => {
    e.preventDefault();
    let dataToSubmit = generateData(this.state.formData, 'products');
    let formIsValid = isFormValid(this.state.formData, 'products');
    if (formIsValid) {
      this.props.dispatch(addProduct(dataToSubmit)).then(() => {
        if (this.props.products.addProduct.success) {
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
      <UserLayout>
        <div>
          <h1>Add Product</h1>
          <form action="POST" onSubmit={this.submitForm}>
            <FormField
              id={'name'}
              formData={this.state.formData['name']}
              onChange={element => this.updateForm(element)}
            />
            <FormField
              id={'description'}
              formData={this.state.formData['description']}
              onChange={element => this.updateForm(element)}
            />
            <FormField
              id={'price'}
              formData={this.state.formData['price']}
              onChange={element => this.updateForm(element)}
            />
            <div className="form_divider"></div>
            <FormField
              id={'brand'}
              formData={this.state.formData['brand']}
              onChange={element => this.updateForm(element)}
            />
            <FormField
              id={'shipping'}
              formData={this.state.formData['shipping']}
              onChange={element => this.updateForm(element)}
            />
            <FormField
              id={'available'}
              formData={this.state.formData['available']}
              onChange={element => this.updateForm(element)}
            />
            <FormField
              id={'wood'}
              formData={this.state.formData['wood']}
              onChange={element => this.updateForm(element)}
            />
            <FormField
              id={'frets'}
              formData={this.state.formData['frets']}
              onChange={element => this.updateForm(element)}
            />
            <div className="form_divider"></div>
            <FormField
              id={'publish'}
              formData={this.state.formData['publish']}
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
      </UserLayout>
    );
  }
}
const mapStateToProps = state => ({ products: state.products });
export default connect(mapStateToProps)(AddProduct);
