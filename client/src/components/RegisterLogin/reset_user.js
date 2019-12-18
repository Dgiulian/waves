import React, { Component } from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import FormField from '../utils/Form/formfield';
import { update, generateData, isFormValid } from '../utils/Form/formActions';
import { registerUser } from '../../store/actions/user_actions';
import { USER_SERVER } from '../../utils/misc';

class ResetUser extends Component {
  state = {
    formError: false,
    formSuccess: false,
    formData: {
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
  submitForm = e => {
    e.preventDefault();
    let dataToSubmit = generateData(this.state.formData, 'reset_email');
    let formIsValid = isFormValid(this.state.formData, 'reset_email');
    if (formIsValid) {
      this.setState({
        formError: false,
        formSuccess: false
      });
      axios
        .post(`${USER_SERVER}/reset_token`, dataToSubmit)
        .then(response => {
          if (response.data.success) {
            this.setState(
              {
                formSuccess: true
              },
              () =>
                setTimeout(
                  () =>
                    this.setState({
                      formSuccess: true
                    }),
                  2000
                )
            );
          }
        });
    } else {
      this.setState({ formError: true });
    }
  };
  updateForm = element => {
    const newFormData = update(element, this.state.formData, 'reset_email');
    this.setState({
      formError: false,
      formData: newFormData
    });
  };
  render() {
    return (
      <div className="container">
        <h1>Reset password</h1>
        <form action="POST" onSubmit={this.submitForm}>
          <FormField
            id="email"
            formData={this.state.formData['email']}
            onChange={element => this.updateForm(element)}
          />
          <div>
            {this.state.formSuccess ? (
              <div className="form_success">
                An email has been sent to your account
              </div>
            ) : null}
            {this.state.formError ? (
              <div className="error_label">Please check your data</div>
            ) : null}
            <button type="submit">Reset password</button>
          </div>
        </form>
      </div>
    );
  }
}

const mapStateToProps = () => ({});

export default connect(mapStateToProps)(ResetUser);
