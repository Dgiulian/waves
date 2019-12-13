import React, { Component } from 'react';
import { connect } from 'react-redux';
import FormField from '../utils/Form/formfield';
import { update, generateData, isFormValid } from '../utils/Form/formActions';
import { registerUser } from '../../store/actions/user_actions';
import Dialog from '@material-ui/core/Dialog';

class Register extends Component {
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
      },
      password: {
        element: 'input',
        value: '',
        config: {
          name: 'password_input',
          type: 'password',
          placeholder: 'Enter your password'
        },
        validation: {
          required: true
        },
        valid: true,
        touched: true,
        validationMessage: ''
      },
      confirmPassword: {
        element: 'input',
        value: '',
        config: {
          name: 'confirm_password_input',
          type: 'password',
          placeholder: 'Confirm your password'
        },
        validation: {
          required: true,
          confirm: 'password'
        },
        valid: true,
        touched: true,
        validationMessage: ''
      }
    }
  };
  submitForm = e => {
    e.preventDefault();
    let dataToSubmit = generateData(this.state.formData, 'register');
    let formIsValid = isFormValid(this.state.formData);
    if (formIsValid) {
      this.props.dispatch(registerUser(dataToSubmit)).then(response => {
        if (response.payload.success) {
          this.setState({ formError: false, formSuccess: true });

          setTimeout(() => this.props.history.push('/register_login'), 2000);
        } else {
          this.setState({ formError: true });
        }
      });
    } else {
      this.setState({ formError: true });
    }
  };
  updateForm = element => {
    const newFormData = update(element, this.state.formData, 'register');
    this.setState({
      formError: false,
      formData: newFormData
    });
  };

  render() {
    return (
      <div className="page_wrapper">
        <div className="container">
          <div className="register_login_container">
            <div className="left">
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
                <h2>Verify Information</h2>
                <div className="form_block_two">
                  <div className="block">
                    <FormField
                      id="password"
                      formData={this.state.formData['password']}
                      onChange={element => this.updateForm(element)}
                    />
                  </div>
                  <div className="block">
                    <FormField
                      id="confirmPassword"
                      formData={this.state.formData['confirmPassword']}
                      onChange={element => this.updateForm(element)}
                    />
                  </div>
                </div>
                <div>
                  {this.state.formError ? (
                    <div className="error_label">Please check your data</div>
                  ) : null}
                  <button type="submit">Create an account</button>
                </div>
              </form>
            </div>
          </div>
        </div>
        <Dialog open={this.state.formSuccess}>
          <div className="dialog_alert">
            <p>Congratulations !</p>
            You will be redirected to the LOGIN in a couple of seconds
          </div>
        </Dialog>
      </div>
    );
  }
}
export default connect()(Register);
