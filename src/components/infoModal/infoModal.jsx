import React from "react";
import PropTypes from 'prop-types';
import bindAll from 'lodash.bindall';

import styles from './infoModal.css';
import headPicture from './head.png';
import info from './info.svg';
import sulkarPicture from './sulkar.svg';

class InfoModal extends React.Component {
  constructor(props) {
    super(props);

    bindAll(this, [
        'displayCodeModal',
        'hideCodeModal'
    ]);

  }
 
  displayCodeModal(){
      var infoModal = document.getElementById(styles.infoModal);
      infoModal.style.display = "block";
  }
  hideCodeModal(){
      var infoModal = document.getElementById(styles.infoModal);
      infoModal.style.display = "none";
  }

  render() {
    return (
      <div>

        <span className={styles.buttonMain} onClick={this.displayCodeModal}>
          <img src={info}></img>
        </span>
        
        {/* hidden modal */}        
        <div id={styles.infoModal} className={styles.infoModal}>
          <div className={styles.infoModalContent}>
              <span className={styles.close} onClick={this.hideCodeModal}>&times;</span>
              <div id={styles.divPictures}>
                <img src={sulkarPicture} id={styles.infoSulkar}></img>
                <img src={headPicture} id={styles.infoHead}></img>
              </div>

              <p id={styles.infoP}>SULKAR ist ein einfacher online Vektorgrafikeditor der auf <a href="https://scratch.mit.edu/" target="_blank"> Grundlage vom Scratch Kostüme-Editor</a> vom Lehrer Richard Scheglmann weiterentwickelt wurde und zur freien Nutzung zur Verfügung steht.
              Alle vorgenommenen Änderungen und Ergänzungen sind in <span id={styles.spanRot}>roter Farbe</span> dargestellt.</p>

              <ul id={styles.infoList}>
                <li><a href="https://github.com/LLK/scratch-paint" target="_blank">GitHub Repository vom original Scratch Kostüme Editor</a></li>
                <li><a href="https://scratch.mit.edu/" target="_blank">Scratch Editor</a></li>
                <li><span id={styles.spanRot}>Info:</span> r.scheglmann@gmail.com</li>
                <li><span id={styles.spanRot}>Version:</span> 1.0.1</li>
              </ul>
          </div>
        </div>

      </div>
      
    );
  }
}


InfoModal.propTypes = {

};

export default InfoModal;