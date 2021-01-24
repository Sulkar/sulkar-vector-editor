import paper from '@scratch/paper';
import log from '../log/log';

const MOVING = 'scratch-paint/move/MOVING';
const initialState = new paper.Matrix(); // Identity

const reducer = function (state, action) {
    if (typeof state === 'undefined') state = initialState;
    switch (action.type) {
    case MOVING:
        /*if (!(action.viewBounds instanceof paper.Matrix)) {
            log.warn(`View bounds should be a paper.Matrix.`);
            return state;
        }*/
        return true;
    default:
        return state;
    }
};

// Action creators ==================================
/**
 * Set the view bounds, which defines the zoom and scroll of the paper canvas.
 * @param {paper.Matrix} matrix The matrix applied to the view
 * @return {object} Redux action to set the view bounds
 */
const updateSelectionMoved = function (selectedItems) {
    return {
        type: MOVING,
        selectedItems: selectedItems
    };
};

export {
    reducer as default,
    updateSelectionMoved,
    MOVING
};
