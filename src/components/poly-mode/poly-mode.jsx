import React from 'react';
import PropTypes from 'prop-types';
import ToolSelectComponent from '../tool-select-base/tool-select-base.jsx';
import messages from '../../lib/messages.js';
import polyIcon from './poly.svg';

const PolyModeComponent = props => (
    <ToolSelectComponent
        imgDescriptor={messages.rect}
        imgSrc={polyIcon}
        isSelected={props.isSelected}
        onMouseDown={props.onMouseDown}
        sulkar
    />
);

PolyModeComponent.propTypes = {
    isSelected: PropTypes.bool.isRequired,
    onMouseDown: PropTypes.func.isRequired
};

export default PolyModeComponent;
