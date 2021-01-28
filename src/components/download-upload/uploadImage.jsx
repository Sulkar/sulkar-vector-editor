import React from "react";
import PropTypes from 'prop-types';
import bindAll from 'lodash.bindall';
import styles from './buttons.css';


class UploadImage extends React.Component {
  constructor(props) {
    super(props);

    bindAll(this, [
        'uploadImage'           
    ]);

  }
  uploadImage(){    
    this.props.rootUploadImage();
  }
 
  render() {
    return (
      <div>

        <span className={styles.buttonMain} onClick={this.uploadImage}>
          <span className={styles.buttonLabel}>
            Bild hochladen
          </span>
        </span>

      </div>
      
    );
  }
}


UploadImage.propTypes = {
  rootUploadImage: PropTypes.func
};

export default UploadImage;