import React, { Component } from 'react';
import Dropzone from 'react-dropzone';
import axios from 'axios';
import { Link } from 'react-router-dom';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import faPlusCircle from '@fortawesome/fontawesome-free-solid/faPlusCircle';
import CircularProgress from '@material-ui/core/CircularProgress';

import UserLayout from '../../hoc/userlayout';

class AddFile extends Component {
  state = {
    formSuccess: false,
    formError: false,
    uploading: false,
    files: []
  };
  componentDidMount() {
    axios.get('/api/user/admin_files').then(response => {
      if (response.data.success) {
        this.setState({ files: response.data.files });
      }
    });
  }
  onDrop = files => {
    this.setState({ uploading: true });
    let formData = new FormData();
    const config = {
      header: { 'content-type': 'multipart/form-data' }
    };
    formData.append('file', files[0]);
    axios.post('/api/users/uploadfile', formData, config).then(response => {
      if (response.data.success) {
        this.setState(
          {
            formSuccess: true,
            formError: false,
            uploading: false
          },
          () => setTimeout(() => this.setState({ formSuccess: false }), 2000)
        );
      }
    });
  };
  showFileList = () =>
    this.state.files ? (
      <ul>
        {this.state.files.map((item, i) => (
          <li key={i}>
            {' '}
            <Link to={`/api/users/download/${item}`} target="_blank">{item}</Link>
          </li>
        ))}
      </ul>
    ) : null;

  render() {
    console.log(this.state.files);
    return (
      <UserLayout>
        <h1>Upload file</h1>
        <div>
          <Dropzone
            onDrop={this.onDrop}
            multiple={false}
            className="dropzone_box"
          >
            <div className="wrap">
              <FontAwesomeIcon icon={faPlusCircle} />
            </div>
          </Dropzone>
          {this.state.uploading ? (
            <div
              className="dropzone_box"
              style={{ textAlign: 'center', paddingTop: '60px' }}
            >
              <CircularProgress style={{ color: '#00BCD4' }} thickness={7} />
            </div>
          ) : null}
          <div style={{ clear: 'both' }}>
            {this.state.formSuccess ? (
              <div className="form_success">Sucess</div>
            ) : null}
            {this.state.formError ? (
              <div className="error_label">Check your data</div>
            ) : null}
          </div>
          <div>
            <hr />
            {this.showFileList()}
          </div>
        </div>
      </UserLayout>
    );
  }
}

export default AddFile;
