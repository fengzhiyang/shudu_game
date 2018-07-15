const BLOCK_WIDTH = 48;     // 这是在样式表中固定的大小
const OFFSET = BLOCK_WIDTH + 2;
const POPUP_WIDTH = BLOCK_WIDTH * 3 + 10;

export default class Popup {
    private _$targetCell: JQuery;
    private _$panel: JQuery;

    constructor($div: JQuery) {
        this._$panel = $div;
        this._$panel
            .on("click", "span", e => {
                const $cell = $(e.target);
                if ($cell.hasClass("empty")) {
                    this.emptyTarget();
                } else if ($cell.hasClass("mark")) {
                    this.markTarget($cell.data("mark"));
                } else {
                    this.setTargetValue($cell.text());
                }

                this._$panel.hide();
                this._$targetCell = null;
            })
            .hide()
            .removeClass("hidden");
    }

    private emptyTarget() {
        this._$targetCell
            .text("0")
            .removeClass("mark1 mark2 error")
            .addClass("empty");
    }

    private markTarget(marker: string) {
        const $target = this._$targetCell;
        if ($target.hasClass(marker)) {
            $target.removeClass("mark1 mark2 error");
        } else {
            $target.removeClass("mark1 mark2 error").addClass(marker);
        }
    }

    private setTargetValue(value: string) {
        this._$targetCell
            .text(value)
            .removeClass("empty error");
    }

    /**
     * 基于 $cell 指定的方格弹出数字面板，选择的数字将回填到 $cell
     */
    popup($cell: JQuery) {
        this._$targetCell = $cell;

        const cellPosition = $cell.position();
        const left = Math.min(
            Math.max(cellPosition.left - OFFSET, 0),
            $(window).width() - POPUP_WIDTH);
        const top = Math.max(cellPosition.top - OFFSET, 0);

        this._$panel
            .css({
                left: `${left}px`,
                top: `${top}px`
            })
            .show();
    }
}