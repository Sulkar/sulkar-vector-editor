import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import React from 'react';
import bindAll from 'lodash.bindall';
import {changePositionRotation} from '../reducers/positionRotation.js';
import PositionRotationComponent from '../components/positionRotation.jsx';
import {getSelectedLeafItems} from '../helper/selection';


import {setSelectedItems} from '../reducers/selected-items';
import {applyRotationToSelection} from '../helper/transforms'; 

    
import Modes from '../lib/modes';
import Formats from '../lib/format';
import {isBitmap} from '../lib/format';

class PositionIndicator extends React.Component {
    constructor (props) {
        super(props);
        bindAll(this, [
            'handlePosition'
        ]);
    }
    handlePosition (newWidth) {

        let changed = applyRotationToSelection(newWidth, this.props.textEditTarget);  

        this.props.setSelectedItems(this.props.format);

        this.props.onChangeRotation(newWidth);

        if (changed){
            this.props.setSelectedItems(this.props.format);
            this.props.onUpdateImage();
        }
    }
    render () {
        return (
            <PositionRotationComponent
                disabled={this.props.disabled}
                positionRotation={this.props.positionRotation}
                onChangeRotation={this.handlePosition}
            />
        );
    }
}

const mapStateToProps = state => ({
    disabled: state.scratchPaint.mode === Modes.BRUSH ||
        state.scratchPaint.mode === Modes.TEXT ||
        state.scratchPaint.mode === Modes.FILL,
    format: state.scratchPaint.format,
    positionRotation: state.scratchPaint.positionRotation, //
    textEditTarget: state.scratchPaint.textEditTarget
});

const mapDispatchToProps = dispatch => ({
    onChangeRotation: positionRotation => {
        dispatch(changePositionRotation(positionRotation));
        
    },
    setSelectedItems: format => {
        dispatch(setSelectedItems(getSelectedLeafItems(), isBitmap(format)));
    }
});

PositionIndicator.propTypes = {
    disabled: PropTypes.bool.isRequired,
    format: PropTypes.oneOf(Object.keys(Formats)),
    onChangeRotation: PropTypes.func.isRequired,
    onUpdateImage: PropTypes.func.isRequired,
    positionRotation: PropTypes.number,
    textEditTarget: PropTypes.number,
    setSelectedItems: PropTypes.func.isRequired
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(PositionIndicator);
