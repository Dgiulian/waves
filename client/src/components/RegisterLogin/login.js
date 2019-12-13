import React, { Component } from 'react';
import { connect } from 'react-redux';
import FormField from '../utils/Form/formfield';
import { update, generateData, isFormValid } from '../utils/Form/formActions';
import { loginUser } from '../../store/actions/user_actions';
import { withRouter } from 'react-router-dom';

class login extends Component {
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
      }
    }
  };
  submitForm = e => {
    e.preventDefault();
    let dataToSubmit = generateData(this.state.formData, 'login');
    let formIsValid = isFormValid(this.state.formData);
    if (formIsValid) {
      this.props.dispatch(loginUser(dataToSubmit)).then(response => {
        console.log(response.payload);
        if (response.payload.success) {
          this.props.history.push('/user/dashboard');
        } else {
          this.setState({ formError: true });
        }
      });
    } else {
      this.setState({ formError: true });
    }
  };
  updateForm = element => {
    const newFormData = update(element, this.state.formData, 'login');
    this.setState({
      formError: false,
      formData: newFormData
    });
  };
  render() {
    return (
      <div className="signin_wrapper">
        <form action="POST" onSubmit={event => this.submitForm(event)}>
          <FormField
            id="email"
            formData={this.state.formData['email']}
            onChange={element => this.updateForm(element)}
          />
          <FormField
            id="password"
            formData={this.state.formData['password']}
            onChange={element => this.updateForm(element)}
          />
          {this.state.formError ? (
            <div className="error_label">Please check your data</div>
          ) : null}
          <button type="submit">Log in</button>
        </form>
      </div>
    );
  }
}

export default connect()(withRouter(login));
