import React from "react";
import PropTypes from 'prop-types';
import bindAll from 'lodash.bindall';
import styles from './codeModal.css';


class CodeModal extends React.Component {
  constructor(props) {
    super(props);

    bindAll(this, [
        'setSVGCodeToEditor',
        'getSVGCodeFromEditor',
        'displayCodeModal',
        'hideCodeModal'
    ]);

  }
  setSVGCodeToEditor(){    
    let data = document.getElementById("codeTextarea").value;
    this.props.rootSetImage(data);
  }
  getSVGCodeFromEditor(){    
    let data = this.props.image;
    document.getElementById("codeTextarea").value = data;
  }
  displayCodeModal(){
      var codeModal = document.getElementById(styles.myModal);
      codeModal.style.display = "block";
  }
  hideCodeModal(){
      var codeModal = document.getElementById(styles.myModal);
      codeModal.style.display = "none";
  }

  render() {
    return (
      <div>

        <span className={styles.buttonMain} onClick={this.displayCodeModal}>
          <span className={styles.buttonLabel}>
            SVG Code
          </span>
        </span>
        
        {/* hidden modal */}        
        <div id={styles.myModal} className={styles.modal}>
          <div className={styles.modalContent}>
              <span className={styles.close} onClick={this.hideCodeModal}>&times;</span>
              <p>Hier kannst du eigenen SVG Code eingeben oder den Code der aktuellen Grafik anzeigen lassen.</p>
              <textarea id="codeTextarea" className={styles.codeTextarea} rows="6" /> 
              <div>
                <button className={styles.modalButton} onClick={this.getSVGCodeFromEditor}>Code anzeigen</button>
                <button className={styles.modalButton} onClick={this.setSVGCodeToEditor}>Code anwenden</button>
              </div>
          </div>
        </div>

      </div>
      
    );
  }
}


CodeModal.propTypes = {
  rootSetImage: PropTypes.func
};

export default CodeModal;