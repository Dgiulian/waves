import React, { Component } from 'react';
import { connect } from 'react-redux';
import FormField from '../../utils/Form/formfield';
import {
  update,
  generateData,
  isFormValid,
  populateFields
} from '../../utils/Form/formActions';
import { getSiteData, updateSite } from '../../../store/actions/site_actions';
class UpdateSiteInfo extends Component {
  state = {
    formError: false,
    formSuccess: false,
    formData: {
      address: {
        element: 'input',
        value: '',
        config: {
          label: 'Adress',
          name: 'address_input',
          type: 'text',
          placeholder: 'Enter the site address'
        },
        validation: {
          required: true
        },
        valid: true,
        touched: true,
        validationMessage: '',
        showLabel: true
      },
      hours: {
        element: 'input',
        value: '',
        config: {
          label: 'Hours',
          name: 'hours_input',
          type: 'text',
          placeholder: 'Enter the working hours'
        },
        validation: {
          required: true
        },
        valid: true,
        touched: true,
        validationMessage: '',
        showLabel: true
      },
      phone: {
        element: 'input',
        value: '',
        config: {
          label: 'Adress',
          name: 'phone_input',
          type: 'text',
          placeholder: 'Enter the phone number'
        },
        validation: {
          required: true
        },
        valid: true,
        touched: true,
        validationMessage: '',
        showLabel: true
      },
      email: {
        element: 'input',
        value: '',
        config: {
          label: 'Email',
          name: 'email_input',
          type: 'email',
          placeholder: 'Enter your email'
        },
        validation: {
          required: true,
          email: true
        },
        valid: true,
        touched: true,
        validationMessage: '',
        showLabel: true
      }
    }
  };
  componentDidMount() {
    this.props.dispatch(getSiteData()).then(() => {
      const newFormData = populateFields(
        this.state.formData,
        this.props.site.siteData[0]
      );
      this.setState({
        formData: newFormData
      });
    });
  }

  submitForm = e => {
    e.preventDefault();
    let dataToSubmit = generateData(this.state.formData, 'update_profile');
    let formIsValid = isFormValid(this.state.formData);
    if (formIsValid) {
      this.props.dispatch(updateSite(dataToSubmit))
      .then(()=>{
        this.setState({ formSuccess: true });          
        setTimeout(() => {
          this.setState({ formSuccess: false });          
        }, 3000);
      })
    } else {
      this.setState({ formError: true });
    }
  };
  updateForm = element => {
    const newFormData = update(element, this.state.formData, 'update_profile');
    this.setState({
      formError: false,
      formData: newFormData
    });
  };
  render() {
    return (
      <form action="POST" onSubmit={this.submitForm}>
        <h2>Site Information</h2>

        <FormField
          id="address"
          formData={this.state.formData['address']}
          onChange={element => this.updateForm(element)}
        />

        <FormField
          id="hours"
          formData={this.state.formData['hours']}
          onChange={element => this.updateForm(element)}
        />

        <FormField
          id="phone"
          formData={this.state.formData['phone']}
          onChange={element => this.updateForm(element)}
        />

        <FormField
          id="email"
          formData={this.state.formData['email']}
          onChange={element => this.updateForm(element)}
        />
        <div>
          {this.state.formSuccess ? (
            <div className="form_success">Site info updated successfuly</div>
          ) : null}
        </div>
        <div>
          {this.state.formError ? (
            <div className="error_label">Please check your data</div>
          ) : null}
          <button type="submit">Update Info</button>
        </div>
      </form>
    );
  }
}

const mapStateToProps = state => ({ site: state.site });
export default connect(mapStateToProps)(UpdateSiteInfo);
