import bindAll from 'lodash.bindall';
import React from 'react';
import ReactDOM from 'react-dom';
import PaintEditor from '..';
import {Provider} from 'react-redux';
import {createStore} from 'redux';
import reducer from './reducers/combine-reducers';
import {intlInitialState, IntlProvider} from './reducers/intl.js';
import styles from './playground.css';

// scratch-render-fonts is a playground-only dep. Fonts are expected to be imported
// as a peer dependency, otherwise there will be two copies of them.
import {FONTS} from 'scratch-render-fonts';

const appTarget = document.createElement('div');
appTarget.setAttribute('class', styles.playgroundContainer);
document.body.appendChild(appTarget);
const store = createStore(
    reducer,
    intlInitialState,
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);
const svgString = '';

class Playground extends React.Component {
    constructor (props) {
        super(props);
        bindAll(this, [
            'rootDownloadImage',
            'handleUpdateName',
            'handleUpdateImage',
            'onUploadImage',
            'rootSetImage'
        ]);
        // Append ?dir=rtl to URL to get RTL layout
        const match = location.search.match(/dir=([^&]+)/);
        const rtl = match && match[1] == 'rtl';
        this.id = 0;
        this.state = {
            name: 'Vektorgrafik',
            rotationCenterX: 20,
            rotationCenterY: 400,
            imageFormat: 'svg', // 'svg', 'png', or 'jpg'
            image: svgString, // svg string or data URI
            imageId: this.id, // If this changes, the paint editor will reload
            rtl: rtl,
        };
        this.reusableCanvas = document.createElement('canvas');
    }
    handleUpdateName (name) {
        this.setState({name});
    }
    handleUpdateImage (isVector, image, rotationCenterX, rotationCenterY) {
        this.setState({
            imageFormat: isVector ? 'svg' : 'png'
        });
        if (!isVector) {
            console.log(`Image width: ${image.width}    Image height: ${image.height}`);
        }

        if (isVector) {
            this.setState({image, rotationCenterX, rotationCenterY});
        } else { // is Bitmap
            // image parameter has type ImageData
            // paint editor takes dataURI as input
            this.reusableCanvas.width = image.width;
            this.reusableCanvas.height = image.height;
            const context = this.reusableCanvas.getContext('2d');
            context.putImageData(image, 0, 0);
            this.setState({
                image: this.reusableCanvas.toDataURL('image/png'),
                rotationCenterX: rotationCenterX,
                rotationCenterY: rotationCenterY
            });
        }
    }
 
    rootSetImage(data){
        this.setState({
            image: data,
            imageId: ++this.id,
            imageFormat: 'svg',
            rotationCenterX: undefined,
            rotationCenterY: undefined,
        });
    }
    rootDownloadImage () {
        const downloadLink = document.createElement('a');
        document.body.appendChild(downloadLink);

        const format = this.state.imageFormat;
        let data = this.state.image;
        if (format === 'png' || format === 'jpg') {
            data = this.b64toByteArray(data);
        } else {
            data = [data];
        }
        const blob = new Blob(data, {type: format});
        const filename = `${this.state.name}.${format}`;
        if ('download' in HTMLAnchorElement.prototype) {
            const url = window.URL.createObjectURL(blob);
            downloadLink.href = url;
            downloadLink.download = filename;
            downloadLink.type = blob.type;
            downloadLink.click();
            window.URL.revokeObjectURL(url);
        } else {
            // iOS Safari, open a new page and set href to data-uri
            let popup = window.open('', '_blank');
            const reader = new FileReader();
            reader.onloadend = function () {
                popup.location.href = reader.result;
                popup = null;
            };
            reader.readAsDataURL(blob);
        }
        document.body.removeChild(downloadLink);
    }
    b64toByteArray (b64Data, sliceSize=512) {
        // Remove header
        b64Data = b64Data.substring(b64Data.indexOf('base64,') + 7);

        const byteCharacters = atob(b64Data);
        const byteArrays = [];

        for (let offset = 0; offset < byteCharacters.length; offset += sliceSize) {
            const slice = byteCharacters.slice(offset, offset + sliceSize);

            const byteNumbers = new Array(slice.length);
            for (let i = 0; i < slice.length; i++) {
                byteNumbers[i] = slice.charCodeAt(i);
            }

        const byteArray = new Uint8Array(byteNumbers);
        byteArrays.push(byteArray);
      }

      return byteArrays;
    }
    rootUploadImage() {
        document.getElementById(styles.fileInput).click();
    }
    onUploadImage(event) {
        var file = event.target.files[0];
        var type = file.type === 'image/svg+xml' ? 'svg' :
            file.type === 'image/png' ? 'png' :
            file.type === 'image/jpg' ? 'jpg' :
            file.type === 'image/jpeg' ? 'jpg' :
            null;

        var reader = new FileReader();
        if (type === 'svg') {
            reader.readAsText(file,'UTF-8');
        } else if (type === 'png' || type === 'jpg'){
            reader.readAsDataURL(file);
        } else {
            alert("Couldn't read file type: " + file.type);
        }

        const that = this;
        reader.onload = readerEvent => {
            var content = readerEvent.target.result; // this is the content!

            that.setState({
                image: content,
                name: file.name.split('.').slice(0, -1).join('.'),
                imageId: ++that.id,
                imageFormat: type,
                rotationCenterX: undefined,
                rotationCenterY: undefined,
            });
       }
    }

    render () {
        return (
            <div className={styles.wrapper}>
                <PaintEditor
                    {...this.state}
                    rootSetImage={this.rootSetImage}
                    rootDownloadImage={this.rootDownloadImage}
                    rootUploadImage={this.rootUploadImage}
                    onUpdateName={this.handleUpdateName}
                    onUpdateImage={this.handleUpdateImage}
                />
                <input id={styles.fileInput} type="file" name="name" onChange={this.onUploadImage} />

            </div>
            
        );
    }

}
ReactDOM.render((
    <Provider store={store}>
        <IntlProvider>
            <Playground />
            
        </IntlProvider>
    </Provider>
), appTarget);
