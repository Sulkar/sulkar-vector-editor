import React from 'react';
import PropTypes from 'prop-types';

import Input from './forms/input.jsx';
import InputGroup from './input-group/input-group.jsx';
import LiveInputHOC from './forms/live-input-hoc.jsx';

const LiveInput = LiveInputHOC(Input);
const PositionComponent = props => (
    <InputGroup disabled={props.disabled}>
        <LiveInput
            sulkar
            disabled={props.disabled}
            min="0"
            max="360"
            type="number"
            value={props.positionRotation ? props.positionRotation : 0}
            onSubmit={props.onChangeRotation}
        />
    </InputGroup>
);

PositionComponent.propTypes = {
    disabled: PropTypes.bool.isRequired,
    onChangeRotation: PropTypes.func.isRequired,
    positionRotation: PropTypes.number
};

export default PositionComponent;
