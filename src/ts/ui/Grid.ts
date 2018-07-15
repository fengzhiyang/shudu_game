import { Sudo } from "../core/Sudoku";
import Checker from "../core/Checker";
import { Matrix } from "../core/toolkit";
import Popup from "./Popup";

export default class Grid {
    private _$container: JQuery;
    private _cells: Matrix<JQuery>;

    constructor(container) {
        this._$container = container;
    }

    rebuild() {
        const sudoku = new Sudo();
        const matrix = sudoku.make();

        const rowGroupClasses = ["row_g_top", "row_g_middle", "row_g_bottom"];
        const colGroupClasses = ["col_g_left", "col_g_center", "col_g_right"];

        // 创建矩阵数组对应的 span 二维数组
        this._cells = matrix.map(rowValues => rowValues.map((cellValue, colIndex) => {
            return $("<span>")
                .text(cellValue)
                .addClass(cellValue ? "fixed" : "empty")
                .addClass(colGroupClasses[colIndex % 3]);
        }));

        // 创建 DOM
        const rows = this._cells.map((rowCells, rowIndex) => {
            return $("<div>")
                .addClass("row")
                .addClass(rowGroupClasses[rowIndex % 3])
                .append(rowCells);
        });

        this._$container.empty().append(rows);
        this.layout();
    }

    layout() {
        const width = $("span:first", this._$container).width();
        $("span", this._$container)
            .height(width)
            .css({
                "line-height": `${width}px`,
                "font-size": width < 32 ? `${width / 2}px` : ""
            });
    }

    bindPopup(popupNumbers: Popup) {
        this._$container.on("click", "span", e => {
            const $cell = $(e.target);
            if ($cell.hasClass("fixed")) {
                return;
            }

            popupNumbers.popup($cell);
        });
    }

    check(): boolean {
        const data = this._cells
            .map(rowCells => rowCells
                .map($span => parseInt($span.text(), 10)));
        const checker = new Checker(data).check();
        if (checker.success) {
            return true;
        }

        const marks = checker.marks;
        this._cells.forEach((rowCells, rowIndex) => rowCells.forEach(($span, colIndex) => {
            // 所有预置的数字都不标记
            if ($span.hasClass("fixed")) {
                return;
            }

            if (marks[rowIndex][colIndex]) {
                $span.removeClass("error");
            } else {
                $span.addClass("error");
            }
        }));
        return false;
    }

    reset() {
        $("span:not(.fixed)", this._$container)
            .text("0")
            .removeClass("mark1 mark2 error")
            .addClass("empty");
    }

    clear() {
        $("span.error", this._$container).removeClass("error");
    }
}