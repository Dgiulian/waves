import React, { Component } from 'react';


class ProdImg extends Component {
  state = {
    lightbox: false,
    imagePos: 0,
    lightbodImages: []
  };
  componentDidMount() {
    if (this.props.detail.images) {
      let lightbodImages = [];
      this.props.detail.images.map(item => lightbodImages.push(item.url));
      this.setState({ lightbodImages });
    }
  }
  renderCardImage = images => {
    if (images.length > 0) {
      return images[0].url;
    } else return `/images/image_not_availble.png`;
  };
  handleLightBox = pos => {
    if (this.state.lightbodImages.length > 0) {
      this.state({ lightbox: true, imagePos: pos });
    }
  };
  handleLightBoxClose = () => {
    this.state({ lightbox: false });
  };

  showThumbs = () =>
    this.state.lightbodImages.map((item, i) =>
      i > 0 ? (
        <div
          key={i}
          onClick={() => this.handleLightBox(i)}
          className="thumb"
          style={{
            background: `url(${item}) no-repeat`
          }}
        ></div>
      ) : null
    );

  render() {
    const { detail } = this.props;

    return (
      <div className="product_image_container">
        <div className="main_pic">
          <div
            style={{
              background: `url(${this.renderCardImage(
                detail.images
              )}) no-repeat`
            }}
            onClick={() => this.handleLightBox(0)}
          ></div>
        </div>
        <div className="main_thumbs">{this.showThumbs()}</div>

      </div>
    );
  }
}

export default ProdImg;
