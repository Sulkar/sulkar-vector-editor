import React from "react";
import PropTypes from 'prop-types';
import bindAll from 'lodash.bindall';
import styles from './buttons.css';


class DownloadImage extends React.Component {
  constructor(props) {
    super(props);

    bindAll(this, [
        'downloadImage'           
    ]);

  }
  downloadImage(){    
    this.props.rootDownloadImage();
  }
 
  render() {
    return (
      <div>

        <span className={styles.buttonMain} onClick={this.downloadImage}>
          <span className={styles.buttonLabel}>
            Bild exportieren
          </span>
        </span>

      </div>
      
    );
  }
}


DownloadImage.propTypes = {
  rootDownloadImage: PropTypes.func
};

export default DownloadImage;