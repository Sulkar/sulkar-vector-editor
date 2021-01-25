import {CHANGE_SELECTED_ITEMS} from './selected-items';
import {getPositionYFromSelection} from '../helper/transforms';
import {MOVING} from '../reducers/move';

const CHANGE_POSITION_Y = 'scratch-paint/position/CHANGE_POSITION_Y';
const initialState = 4;

const reducer = function (state, action) {  

    if (typeof state === 'undefined') state = initialState;

    switch (action.type) {

        case CHANGE_POSITION_Y:
            if (isNaN(action.positionY)) {
                return state;
            }
            return action.positionY;

        case CHANGE_SELECTED_ITEMS:
            // Don't change state if no selection
            if (!action.selectedItems || !action.selectedItems.length) {
                return state;
            }
            // Bitmap mode doesn't have stroke width
            if (action.bitmapMode) {
                return state;
            }
            return getPositionYFromSelection(action.selectedItems, action.bitmapMode);

        case MOVING:
            if (!action.selectedItems || !action.selectedItems.length) {
                return state;
            }
            return getPositionYFromSelection(action.selectedItems, false);
        default:
            return state;
    }
};

// Action creators ==================================
const changePositionY = function (positionY) {
    
    return {
        type: CHANGE_POSITION_Y,
        positionY: positionY
    };
};

export {
    reducer as default,
    changePositionY,
    CHANGE_POSITION_Y
};
