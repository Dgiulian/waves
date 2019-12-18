import React, { Component } from 'react';
import { connect } from 'react-redux';
import FormField from '../utils/Form/formfield';
import {
  update,
  generateData,
  isFormValid,
  populateFields
} from '../utils/Form/formActions';
import {
  updateProfile,
  clearUpdateProfile,
  
} from '../../store/actions/user_actions';

class UpdatePersonalInfo extends Component {
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
          placeholder: 'Enter your name'
        },
        validation: {
          required: true
        },
        valid: true,
        touched: true,
        validationMessage: ''
      },
      lastname: {
        element: 'input',
        value: '',
        config: {
          name: 'lastname_input',
          type: 'text',
          placeholder: 'Enter your last name'
        },
        validation: {
          required: true
        },
        valid: true,
        touched: true,
        validationMessage: ''
      },
      email: {
        element: 'input',
        value: '',
        config: {
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
        validationMessage: ''
      }
    }
  };

  componentDidMount() {
    const newFormData = populateFields(
      this.state.formData,
      this.props.user.userData
    );
    this.setState({
      formData: newFormData
    });
  }
  submitForm = e => {
    e.preventDefault();
    let dataToSubmit = generateData(this.state.formData, 'update_profile');
    let formIsValid = isFormValid(this.state.formData);
    if (formIsValid) {
      this.props.dispatch(updateProfile(dataToSubmit)).then(() => {
        if (this.props.user.updateProfile.success) {
          this.setState({ formSuccess: true });

          setTimeout(() => {
            this.setState({ formSuccess: false });
            this.props.dispatch(clearUpdateProfile());
          }, 3000);
        }
      });
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
      <div>
        <form action="POST" onSubmit={this.submitForm}>
          <h2>Personal Information</h2>
          <div className="form_block_two">
            <div className="block">
              <FormField
                id="name"
                formData={this.state.formData['name']}
                onChange={element => this.updateForm(element)}
              />
            </div>
            <div className="block">
              <FormField
                id="lastname"
                formData={this.state.formData['lastname']}
                onChange={element => this.updateForm(element)}
              />
            </div>
          </div>
          <div>
            <FormField
              id="email"
              formData={this.state.formData['email']}
              onChange={element => this.updateForm(element)}
            />
          </div>
          <div>
            {this.state.formSuccess ? (
              <div className="form_success">Profile updated successfuly</div>
            ) : null}
          </div>
          <div>
            {this.state.formError ? (
              <div className="error_label">Please check your data</div>
            ) : null}
            <button type="submit">Update Info</button>
          </div>
        </form>
      </div>
    );
  }
}
const mapStateToProps = state => ({ user: state.user });
export default connect(mapStateToProps)(UpdatePersonalInfo);
