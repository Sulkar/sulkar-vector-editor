import {CHANGE_SELECTED_ITEMS} from './selected-items';
import {getPositionHeightFromSelection} from '../helper/transforms';
import {MOVING} from '../reducers/move';

const CHANGE_POSITION_HEIGHT = 'scratch-paint/position/CHANGE_POSITION_HEIGHT';
const initialState = 0;

const reducer = function (state, action) {  

    if (typeof state === 'undefined') state = initialState;

    switch (action.type) {

        case CHANGE_POSITION_HEIGHT:
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
            return getPositionHeightFromSelection(action.selectedItems, action.bitmapMode);

        case MOVING:
            if (!action.selectedItems || !action.selectedItems.length) {
                return state;
            }
            return getPositionHeightFromSelection(action.selectedItems, false);
        default:
            return state;
    }
};

// Action creators ==================================
const changePositionHeight = function (positionHeight) {
    
    return {
        type: CHANGE_POSITION_HEIGHT,
        positionHeight: positionHeight
    };
};

export {
    reducer as default,
    changePositionHeight,
    CHANGE_POSITION_HEIGHT
};
