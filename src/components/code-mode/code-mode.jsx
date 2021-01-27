import React from 'react';
import PropTypes from 'prop-types';
import ToolSelectComponent from '../tool-select-base/tool-select-base.jsx';
import messages from '../../lib/messages.js';
import codeIcon from './code.svg';

const DisplayCodeComponent = props => (
    <ToolSelectComponent
        imgDescriptor={messages.rect}
        imgSrc={codeIcon}
        isSelected={props.isSelected}
        onMouseDown={props.onMouseDown}
    />
);

DisplayCodeComponent.propTypes = {
    isSelected: PropTypes.bool.isRequired,
    onMouseDown: PropTypes.func.isRequired
};

export default DisplayCodeComponent;
