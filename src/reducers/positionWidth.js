import {CHANGE_SELECTED_ITEMS} from './selected-items';
import {getPositionWidthFromSelection} from '../helper/transforms';
import {MOVING} from '../reducers/move';

const CHANGE_POSITION_WIDTH = 'scratch-paint/position/CHANGE_POSITION_WIDTH';
const initialState = 0;

const reducer = function (state, action) {  

    if (typeof state === 'undefined') state = initialState;

    switch (action.type) {

        case CHANGE_POSITION_WIDTH:
            if (isNaN(action.positionWidth)) {
                return state;
            }
            return action.positionWidth;

        case CHANGE_SELECTED_ITEMS:
            // Don't change state if no selection
            if (!action.selectedItems || !action.selectedItems.length) {
                return state;
            }
            // Bitmap mode doesn't have stroke width
            if (action.bitmapMode) {
                return state;
            }
            return getPositionWidthFromSelection(action.selectedItems, action.bitmapMode);

        case MOVING:
            if (!action.selectedItems || !action.selectedItems.length) {
                return state;
            }
            return getPositionWidthFromSelection(action.selectedItems, false);
        default:
            return state;
    }
};

// Action creators ==================================
const changePositionWidth = function (positionWidth) {
    
    return {
        type: CHANGE_POSITION_WIDTH,
        positionWidth: positionWidth
    };
};

export {
    reducer as default,
    changePositionWidth,
    CHANGE_POSITION_WIDTH
};
