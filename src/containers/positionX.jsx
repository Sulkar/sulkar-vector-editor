import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import React from 'react';
import bindAll from 'lodash.bindall';
import {changePosition} from '../reducers/positionX.js';
import PositionXComponent from '../components/positionX.jsx';
import {getSelectedLeafItems} from '../helper/selection';


import {setSelectedItems} from '../reducers/selected-items';
import {applyPositionXToSelection} from '../helper/transforms'; 

    
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

        let changed = applyPositionXToSelection(newWidth, this.props.textEditTarget);  

        this.props.setSelectedItems(this.props.format);

        this.props.onChangePosition(newWidth);

        if (changed){
            this.props.setSelectedItems(this.props.format);
            this.props.onUpdateImage();
        }
    }
    render () {
        return (
            <PositionXComponent
                disabled={this.props.disabled}
                positionX={this.props.positionX}
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
    positionX: state.scratchPaint.positionX,
    textEditTarget: state.scratchPaint.textEditTarget
});

const mapDispatchToProps = dispatch => ({
    onChangePosition: positionX => {
        dispatch(changePosition(positionX));
        
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
    positionX: PropTypes.number,
    textEditTarget: PropTypes.number,
    setSelectedItems: PropTypes.func.isRequired
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(PositionIndicator);
