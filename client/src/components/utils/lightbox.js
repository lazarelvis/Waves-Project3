import React, { Component } from "react";
import Lightbox from "react-images";

class ImageLightbox extends Component {
  //constructor

  state = {
    lightboxIsOpen: true,
    currentImage: this.props.pos,
    images: [],
  };

  static getDerivedStateFromProps(props, state) {
    if (props.images) {
      const images = [];
      props.images.forEach((element) => {
        images.push({ src: `${element}` });
      });
      return (state = {
        images,
      });
    }
    return false;
  }

  gotoNext = () => {
    this.setState({
      currentImage: this.state.currentImage + 1,
    });
  };
  gotoPrevious = () => {
    this.setState({
      currentImage: this.state.currentImage - 1,
    });
  };

  closeLightbox = () => {
    this.props.onclose();
  };
  render() {
    console.log(this.state.currentImage, this.state.images);

    //verificat props
    return (
      <Lightbox
        currentImage={this.state.currentImage}
        images={this.state.images}
        isOpen={this.state.lightboxIsOpen}
        onClickPrev={() => this.gotoPrevious()}
        onClickNext={() => this.gotoNext()}
        onClose={() => this.closeLightbox()}
      />
    );
  }
}

export default ImageLightbox;
