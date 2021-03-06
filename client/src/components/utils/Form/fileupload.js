import React, { Component } from "react";
import Dropzone from "react-dropzone";
import axios from "axios";

import FontAwesomeIcon from "@fortawesome/react-fontawesome";
import faPulseCircle from "@fortawesome/fontawesome-free-solid/faPlusCircle";
import CircularProgress from "@material-ui/core/CircularProgress";
import { image } from "cloudinary";

class Fileupload extends Component {
  constructor() {
    super();
    this.state = {
      uploadFiles: [],
      uploading: false,
    };
  }

  onDrop = (files) => {
    this.setState({
      uploading: true,
    });
    let formData = new FormData();
    const config = {
      header: {
        "content-type": "multipart/form-data",
      },
    };
    formData.append("file", files[0]);

    axios.post("/api/users/uploadimage", formData, config).then((response) => {
      console.log(response.data);
      this.setState(
        {
          uploading: false,
          uploadFiles: [...this.state.uploadFiles, response.data],
        },
        () => {
          this.props.imagesHandler(this.state.uploadFiles);
        }
      );
    });
  };

  onRemove = (id) => {
    axios.get(`/api/users/removeimage?public_id=${id}`).then((response) => {
      let images = this.state.uploadFiles.filter((item) => {
        return item.public_id !== id;
      });
      this.setState(
        {
          uploadFiles: images,
        },
        () => {
          this.props.imagesHandler(images);
        }
      );
    });
  };

  showUploadedImages = () =>
    this.state.uploadFiles.map((item) => (
      <div
        className="dropzone_box"
        key={item.public_id}
        onClick={() => this.onRemove(item.public_id)}
      >
        <div
          className="wrap"
          style={{ background: `url(${item.url}) no-repeat` }}
        ></div>
      </div>
    ));

  static getDrivedStateFromProps(props, state) {
    if (props.reset) {
      return (state = {
        uploadFiles: [],
      });
    }
    return null;
  }

  render() {
    return (
      <div>
        <section>
          <div className="dropzone clear">
            <Dropzone
              onDrop={(e) => this.onDrop(e)}
              multiple={false}
              className="dropzone_box"
            >
              <div className="wrap">
                <FontAwesomeIcon icon={faPulseCircle} />
              </div>
            </Dropzone>
            {this.showUploadedImages()}
            {this.state.uploading ? (
              <div
                className="dropzone_box"
                style={{
                  textAlign: "center",
                  paddingTop: "60px",
                }}
              >
                <CircularProgress
                  style={{
                    color: "#00bcd4",
                  }}
                  thickness={4}
                />
              </div>
            ) : null}
          </div>
        </section>
      </div>
    );
  }
}

export default Fileupload;
