import paper from '@scratch/paper';
import {getSelectedLeafItems} from './selection';
import {isPointTextItem} from './item';
import {isGroup} from './group';
import {getItems} from './selection';
import GradientTypes from '../lib/gradient-types';
import {DEFAULT_COLOR} from '../reducers/fill-style';
import {isCompoundPathChild} from '../helper/compound-path';
import log from '../log/log';
//
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
//
const applyPositionToSelection = function (value, textEditTargetId) {

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

const getPositionXFromSelection = function (selectedItems, bitmapMode){

    let tempX = 0;
    for (let item of selectedItems) {
       tempX = item.position.x;
    }
    return tempX;
}

export {
    applyPositionToSelection,
    getPositionXFromSelection
};
