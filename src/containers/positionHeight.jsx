import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import React from 'react';
import bindAll from 'lodash.bindall';
import {changePositionHeight} from '../reducers/positionHeight.js';
import PositionHeightComponent from '../components/positionHeight.jsx';
import {getSelectedLeafItems} from '../helper/selection';


import {setSelectedItems} from '../reducers/selected-items';
import {applyPositionHeightToSelection} from '../helper/transforms'; 

    
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

        let changed = applyPositionHeightToSelection(newWidth, this.props.textEditTarget);  

        this.props.setSelectedItems(this.props.format);

        this.props.onChangePosition(newWidth);

        if (changed){
            this.props.setSelectedItems(this.props.format);
            this.props.onUpdateImage();
        }
    }
    render () {
        return (
            <PositionHeightComponent
                disabled={this.props.disabled}
                positionHeight={this.props.positionHeight}
                onChangePosition={this.handlePosition}
            />
        );
    }
}

const mapStateToProps = state => ({
    disabled: state.scratchPaint.mode === Modes.BRUSH ||
        state.scratchPaint.mode === Modes.TEXT ||
        state.scratchPaint.mode === Modes.FILL,
    format: state.scratchPaint.format,
    positionHeight: state.scratchPaint.positionHeight, //
    textEditTarget: state.scratchPaint.textEditTarget
});

const mapDispatchToProps = dispatch => ({
    onChangePosition: positionHeight => {
        dispatch(changePositionHeight(positionHeight));
        
    },
    setSelectedItems: format => {
        dispatch(setSelectedItems(getSelectedLeafItems(), isBitmap(format)));
    }
});

PositionIndicator.propTypes = {
    disabled: PropTypes.bool.isRequired,
    format: PropTypes.oneOf(Object.keys(Formats)),
    onChangePosition: PropTypes.func.isRequired,
    onUpdateImage: PropTypes.func.isRequired,
    positionHeight: PropTypes.number,
    textEditTarget: PropTypes.number,
    setSelectedItems: PropTypes.func.isRequired
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(PositionIndicator);
