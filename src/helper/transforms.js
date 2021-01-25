import paper from '@scratch/paper';
import {getSelectedLeafItems} from './selection';
import {isGroup} from './group';
import {getItems} from './selection';

const MIN_WIDTH = 1;
const MIN_HEIGHT = 1;


// Selected items and currently active text edit items respond to color changes.
const _getItems = function (textEditTargetId) {
    const items = getSelectedLeafItems();
    if (textEditTargetId) {
        const matches = getItems({
            match: item => item.id === textEditTargetId
        });
        if (matches.length) {
            items.push(matches[0]);
        }
    }
    return items;
};

// set Position X,Y
const applyPositionXToSelection = function (value, textEditTargetId) {

    let changed = false;
    const items = _getItems(textEditTargetId);
    for (let item of items) {
        if (item.parent instanceof paper.CompoundPath) {
            item = item.parent;
        }
        if (isGroup(item)) {
            continue;
        } else if (item.position.x !== value) {
            item.position.x = value;
            changed = true;
        }
    }
    return changed;
};
const applyPositionYToSelection = function (value, textEditTargetId) {
    let changed = false;
    const items = _getItems(textEditTargetId);
    for (let item of items) {
        if (item.parent instanceof paper.CompoundPath) {
            item = item.parent;
        }
        if (isGroup(item)) {
            continue;
        } else if (item.position.y !== value) {
            item.position.y = value;
            changed = true;
        }
    }
    return changed;
};

// get Position X, Y
const getPositionXFromSelection = function (selectedItems, bitmapMode){
    let tempX = 0;
    for (let item of selectedItems) {
       tempX = item.position.x;
    }
    return Math.round(tempX);
}
const getPositionYFromSelection = function (selectedItems, bitmapMode){
    let tempY = 0;
    for (let item of selectedItems) {
       tempY = item.position.y;
    }
    return Math.round(tempY);
}

// set Position Width, Height
const applyPositionWidthToSelection = function (value, textEditTargetId) {
    let changed = false;
    const items = _getItems(textEditTargetId);
    for (let item of items) {
        if (item.parent instanceof paper.CompoundPath) {
            item = item.parent;
        }
        if (isGroup(item)) {
            continue;
        } else if (item.bounds.width !== value) {
            if(value < MIN_WIDTH) value = MIN_WIDTH;
            item.bounds.width = value;
            changed = true;
        }
    }
    return changed;
};
const applyPositionHeightToSelection = function (value, textEditTargetId) {
    let changed = false;
    const items = _getItems(textEditTargetId);
    for (let item of items) {
        if (item.parent instanceof paper.CompoundPath) {
            item = item.parent;
        }
        if (isGroup(item)) {
            continue;
        } else if (item.bounds.height !== value) {
            if(value < MIN_HEIGHT) value = MIN_HEIGHT;
            item.bounds.height = value;
            changed = true;
        }
    }
    return changed;
};

// get Position Width, Height
const getPositionWidthFromSelection = function (selectedItems, bitmapMode){
    let tempWidth = 0;
    for (let item of selectedItems) {
        tempWidth = item.bounds.width;
    }
    if(tempWidth < MIN_WIDTH) tempWidth = MIN_WIDTH;
    return Math.round(tempWidth);
}
const getPositionHeightFromSelection = function (selectedItems, bitmapMode){
    let tempHeight = 0;
    for (let item of selectedItems) {
        tempHeight = item.bounds.height;
    }
    if(tempHeight < MIN_HEIGHT) tempHeight = MIN_HEIGHT;
    return Math.round(tempHeight);
}

// set Rotation
//
const _getDeltaRotation = function (currentItemRotation, rotationInput){
    // beispiel: element ist bereits um 45° gedreht und will insgesamt auf 50°
    let deltaRotation = rotationInput - currentItemRotation;
    return deltaRotation;
}


const applyRotationToSelection = function (value, textEditTargetId) {

    let changed = false;
    const items = _getItems(textEditTargetId);
    for (let item of items) {
        //add new rotation property to item
        if(item.myRotation == null) item.myRotation = 0;

        if (item.parent instanceof paper.CompoundPath) {
            item = item.parent;
        }
        if (isGroup(item)) {
            continue;
        } else if (item.myRotation !== value) {
            item.rotate(_getDeltaRotation(item.myRotation, value));
            item.myRotation = value;
            changed = true;
        }
    }
    return changed;
};
// get Rotation
const getRotationFromSelection = function (selectedItems, bitmapMode){
    
    let tempRotation = 0;
    for (let item of selectedItems) {
        if(item.myRotation == null) item.myRotation = 0;
        tempRotation = item.myRotation;
    }
    return Math.round(tempRotation);
}
export {
    applyPositionXToSelection,
    applyPositionYToSelection,
    getPositionXFromSelection,
    getPositionYFromSelection,
    applyPositionWidthToSelection,
    applyPositionHeightToSelection,
    getPositionWidthFromSelection,
    getPositionHeightFromSelection,
    applyRotationToSelection,
    getRotationFromSelection
};
