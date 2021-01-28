import paper from '@scratch/paper';
import Modes from '../../lib/modes';
import {styleShape} from '../style-path';
import {clearSelection} from '../selection';
import {getSquareDimensions} from '../math';
import BoundingBoxTool from '../selection-tools/bounding-box-tool';
import NudgeTool from '../selection-tools/nudge-tool';

/**
 * Tool for drawing ovals.
 */
class PolyTool extends paper.Tool {
    static get TOLERANCE () {
        return 2;
    }
    /**
     * @param {function} setSelectedItems Callback to set the set of selected items in the Redux state
     * @param {function} clearSelectedItems Callback to clear the set of selected items in the Redux state
     * @param {function} setCursor Callback to set the visible mouse cursor
     * @param {!function} onUpdateImage A callback to call when the image visibly changes
     */
    constructor (setSelectedItems, clearSelectedItems, setCursor, onUpdateImage) {
        super();
        this.setSelectedItems = setSelectedItems;
        this.clearSelectedItems = clearSelectedItems;
        this.onUpdateImage = onUpdateImage;
        this.boundingBoxTool = new BoundingBoxTool(
            Modes.POLY,
            setSelectedItems,
            clearSelectedItems,
            setCursor,
            onUpdateImage
        );
        const nudgeTool = new NudgeTool(Modes.POLY, this.boundingBoxTool, onUpdateImage);

        // We have to set these functions instead of just declaring them because
        // paper.js tools hook up the listeners in the setter functions.
        this.onMouseDown = this.handleMouseDown;
        this.onMouseDrag = this.handleMouseDrag;
        this.onMouseMove = this.handleMouseMove;
        this.onMouseUp = this.handleMouseUp;
        this.onKeyUp = nudgeTool.onKeyUp;
        this.onKeyDown = nudgeTool.onKeyDown;

        this.poly = null;
        this.colorState = null;
        this.isBoundingBoxMode = null;
        this.active = false;
    }
    getHitOptions () {
        return {
            segments: true,
            stroke: true,
            curves: true,
            fill: true,
            guide: false,
            match: hitResult =>
                (hitResult.item.data && (hitResult.item.data.isScaleHandle || hitResult.item.data.isRotHandle)) ||
                hitResult.item.selected, // Allow hits on bounding box and selected only
            tolerance: PolyTool.TOLERANCE / paper.view.zoom
        };
    }
    /**
     * Should be called if the selection changes to update the bounds of the bounding box.
     * @param {Array<paper.Item>} selectedItems Array of selected items.
     */
    onSelectionChanged (selectedItems) {
        this.boundingBoxTool.onSelectionChanged(selectedItems);
    }
    setColorState (colorState) {
        this.colorState = colorState;
    }
    handleMouseDown (event) {
        if (event.event.button > 0) return; // only first mouse button
        this.active = true;

        if (this.boundingBoxTool.onMouseDown(
            event, false /* clone */, false /* multiselect */, false /* doubleClicked */, this.getHitOptions())) {
            this.isBoundingBoxMode = true;
        } else {
            this.isBoundingBoxMode = false;
            clearSelection(this.clearSelectedItems);
            
            
            this.poly = new paper.Path.RegularPolygon({
                center: event.downPoint,
                sides: 3,
                radius: 100
            });
            
            //console.log(this.poly.bounds.height);
            styleShape(this.poly, this.colorState);
        }
    }
    handleMouseDrag (event) {
        if (event.event.button > 0 || !this.active) return; // only first mouse button

        if (this.isBoundingBoxMode) {
            this.boundingBoxTool.onMouseDrag(event);
            return;
        }

        const downPoint = new paper.Point(event.downPoint.x, event.downPoint.y);
        const point = new paper.Point(event.point.x, event.point.y);
        const squareDimensions = getSquareDimensions(event.downPoint, event.point); // zwei Punkte Start und End

        this.poly.position.x = event.point.x;
        this.poly.position.y = event.point.y;
        /*if (event.modifiers.shift) {
            this.poly.size = squareDimensions.size.abs();
        } else {
            this.poly.size = downPoint.subtract(point);
        }

        if (event.modifiers.alt) {
            this.poly.position = downPoint;
        } else if (event.modifiers.shift) {
            this.poly.position = squareDimensions.position;
        } else {
            this.poly.position = downPoint.subtract(this.poly.size.multiply(0.5));
        }*/

        styleShape(this.poly, this.colorState);
    }
    handleMouseMove (event) {
        this.boundingBoxTool.onMouseMove(event, this.getHitOptions());
    }
    handleMouseUp (event) {
        if (event.event.button > 0 || !this.active) return; // only first mouse button

        if (this.isBoundingBoxMode) {
            this.boundingBoxTool.onMouseUp(event);
            this.isBoundingBoxMode = null;
            return;
        }

        this.poly.selected = true;
        this.setSelectedItems();
        this.onUpdateImage();
        /*if (this.poly) {
            if (Math.abs(this.poly.size.width * this.poly.size.height) < PolyTool.TOLERANCE / paper.view.zoom) {
                // Tiny oval created unintentionally?
                this.poly.remove();
                this.poly = null;
            } else {
                const ovalPath = this.poly.toPath(true);
                this.poly.remove();
                this.poly = null;

                ovalPath.selected = true;
                this.setSelectedItems();
                this.onUpdateImage();
            }
        }*/
        this.active = false;
    }
    deactivateTool () {
        this.boundingBoxTool.deactivateTool();
    }
}

export default PolyTool;
