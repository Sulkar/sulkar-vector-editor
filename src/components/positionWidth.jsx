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
            type="number"
            value={props.positionWidth ? props.positionWidth : 0}
            onSubmit={props.onChangePosition}
        />
    </InputGroup>
);

PositionComponent.propTypes = {
    disabled: PropTypes.bool.isRequired,
    onChangePosition: PropTypes.func.isRequired,
    positionWidth: PropTypes.number
};

export default PositionComponent;
