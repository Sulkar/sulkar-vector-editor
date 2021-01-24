import log from '../log/log';
import {CHANGE_SELECTED_ITEMS} from './selected-items';
import {CHANGE_MODE} from './modes';
import {getPositionXFromSelection} from '../helper/transforms';
import {MOVING} from '../reducers/move';

const CHANGE_POSITION_X = 'scratch-paint/position/CHANGE_POSITION_X';
const initialState = 4;

const reducer = function (state, action) {  

    if (typeof state === 'undefined') state = initialState;

    switch (action.type) {
        
        case CHANGE_POSITION_X:
            if (isNaN(action.positionX)) {
                log.warn(`Invalid brush size: ${action.positionX}`);
                return state;
            }
            return action.positionX;

        case CHANGE_SELECTED_ITEMS:
            // Don't change state if no selection
            if (!action.selectedItems || !action.selectedItems.length) {
                return state;
            }
            // Bitmap mode doesn't have stroke width
            if (action.bitmapMode) {
                return state;
            }
            return getPositionXFromSelection(action.selectedItems, action.bitmapMode);

        case MOVING:
            if (!action.selectedItems || !action.selectedItems.length) {
                return state;
            }
            return getPositionXFromSelection(action.selectedItems, false);
        default:
            return state;
    }
};

// Action creators ==================================
const changePosition = function (positionX) {
    
    return {
        type: CHANGE_POSITION_X,
        positionX: positionX
    };
};



export {
    reducer as default,
    changePosition,
    CHANGE_POSITION_X
};
