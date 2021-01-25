import {CHANGE_SELECTED_ITEMS} from './selected-items';
import {getRotationFromSelection} from '../helper/transforms';
import {MOVING} from '../reducers/move';

const CHANGE_POSITION_ROTATION = 'scratch-paint/position/CHANGE_POSITION_ROTATION';
const initialState = 4;

const reducer = function (state, action) {  

    if (typeof state === 'undefined') state = initialState;

    switch (action.type) {

        case CHANGE_POSITION_ROTATION:
            if (isNaN(action.positionHeight)) {
                return state;
            }
            return action.positionHeight;

        case CHANGE_SELECTED_ITEMS:
            // Don't change state if no selection
            if (!action.selectedItems || !action.selectedItems.length) {
                return state;
            }
            // Bitmap mode doesn't have stroke width
            if (action.bitmapMode) {
                return state;
            }
            return getRotationFromSelection(action.selectedItems, action.bitmapMode);

        case MOVING:
            if (!action.selectedItems || !action.selectedItems.length) {
                return state;
            }
            return getRotationFromSelection(action.selectedItems, false);
        default:
            return state;
    }
};

// Action creators ==================================
const changePositionRotation = function (positionRotation) {
    
    return {
        type: CHANGE_POSITION_ROTATION,
        positionHeight: positionRotation
    };
};

export {
    reducer as default,
    changePositionRotation,
    CHANGE_POSITION_ROTATION
};
