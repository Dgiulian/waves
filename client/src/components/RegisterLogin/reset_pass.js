import React, { Component } from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import FormField from '../utils/Form/formfield';
import { update, generateData, isFormValid } from '../utils/Form/formActions';
import { registerUser } from '../../store/actions/user_actions';
import { USER_SERVER } from '../../utils/misc';
import Dialog from '@material-ui/core/Dialog';

class ResetPassword extends Component {
  state = {
    formError: false,
    formSuccess: false,
    resetToken: '',
    formData: {
      password: {
        element: 'input',
        value: '',
        config: {
          name: 'password_input',
          type: 'password',
          placeholder: 'Enter your password'
        },
        validation: {
          required: true,
          password: true
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
          password: true
        },
        valid: true,
        touched: true,
        validationMessage: ''
      }
    }
  };
  componentDidMount() {
    const resetToken = this.props.match.params.token;
    this.setState({ resetToken });
  }

  submitForm = e => {
    e.preventDefault();
    let dataToSubmit = generateData(this.state.formData, 'reset_email');
    let formIsValid = isFormValid(this.state.formData, 'reset_email');
    if (formIsValid) {
      this.setState({
        formError: false,
        formSuccess: false
      });
      dataToSubmit.resetToken = this.state.resetToken;
      axios
        .post(`${USER_SERVER}/reset_password`, dataToSubmit)
        .then(response => {
          if (response.data.success) {
            this.setState(
              {
                formSuccess: true
              },
              () =>
                setTimeout(
                  () => this.props.history.push('/register_login'),
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
            <button type="submit">Reset password</button>
          </div>
        </form>
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

const mapStateToProps = () => ({});

export default connect(mapStateToProps)(ResetPassword);
