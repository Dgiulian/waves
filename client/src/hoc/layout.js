import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getSiteData } from '../store/actions/site_actions';
import Header from '../components/Header';
import Footer from '../components/Footer';

class Layout extends Component {
  componentDidMount() {
    if (Object.keys(this.props.site).length === 0) {
      this.props.dispatch(getSiteData());
    }
  }
  render() {
    return (
      <div>
        <Header />
        <div className="page_container">{this.props.children}</div>
        <Footer siteData={this.props.site.siteData} />
      </div>
    );
  }
}
const mapStateToProps = state => ({
  site: state.site
});
export default connect(mapStateToProps)(Layout);
