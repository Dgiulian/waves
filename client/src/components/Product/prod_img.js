import React, { Component } from 'react';
import ImageLightbox from '../utils/image_lightbox';

class ProdImg extends Component {
  state = {
    lightbox: false,
    imagePos: 0,
    lightboxImages: []
  };
  componentDidMount() {
    if (this.props.detail.images) {
      let lightboxImages = [];
      this.props.detail.images.map(item => lightboxImages.push(item.url));
      this.setState({ lightboxImages });
    }
  }
  renderCardImage = images => {
    if (images.length > 0) {
      return images[0].url;
    } else return `/images/image_not_availble.png`;
  };
  handleLightBox = pos => {
    if (this.state.lightboxImages.length > 0) {
      this.setState({ lightbox: true, imagePos: pos });
    }
  };
  handleLightBoxClose = () => {
    this.setState({ lightbox: false });
  };

  showThumbs = () =>
    this.state.lightboxImages.map((item, i) =>
      i > -1 ? (
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
        {this.state.lightbox && (
          <ImageLightbox
            id={detail.id}
            images={this.state.lightboxImages}
            open={this.state.lightbox}
            pos={this.state.imagePos}
            onClose={() => {
              this.handleLightBoxClose();
            }}
          />
        )}
      </div>
    );
  }
}

export default ProdImg;
