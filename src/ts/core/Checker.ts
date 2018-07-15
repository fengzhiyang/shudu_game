import Toolkit, { Matrix } from "./toolkit";

export default class Checker {
    private matrix: Matrix<number>;
    private _success: boolean;
    marks: Matrix<boolean>;

    static _checkArray(array: Array<number>): Array<number> {
        const marks: Array<boolean> = new Array(array.length);
        marks.fill(true);

        array.forEach((v, i) => {
            if (!v) {
                marks[i] = false;
                return;
            }

            if (marks[i]) {
                for (let j = i + 1; j < 9; j++) {
                    if (v === array[j]) {
                        marks[i] = false;
                        marks[j] = false;
                    }
                }
            }
        });

        return marks
            .map((v, i) => v ? -1 : i)
            .filter(index => index >= 0);
    }

    constructor(matrix: Matrix<number>) {
        this.matrix = matrix;
    }

    check(): this {
        this.marks = Toolkit.matrix.make(true);
        this.checkRows();
        this.checkCols();
        this.checkBoxes();
        this._success = this.marks.every(row => row.every(v => v));
        return this;
    }

    get success(): boolean {
        return this._success;
    }

    private checkRows() {
        const marks = this.marks;
        this.matrix.forEach((row, rowIndex) => {
            const rowMarks = Checker._checkArray(row);
            rowMarks.forEach(colIndex => {
                marks[rowIndex][colIndex] = false;
            });
        });
    }

    private checkCols() {
        const { matrix, marks } = this;
        for (let colIndex = 0; colIndex < 9; colIndex++) {
            const cols = Array.from({ length: 9 })
                .map((v, i) => matrix[i][colIndex]);
            const colMarks = Checker._checkArray(cols);
            colMarks.forEach(rowIndex => marks[rowIndex][colIndex] = false);
        }
    }

    private checkBoxes() {
        const { matrix, marks } = this;
        const boxes = Array.from({ length: 9 })
            .map((v, i) => Toolkit.box.getBoxCells(matrix, i));
        boxes.forEach((box, boxIndex) => {
            const boxMarks = Checker._checkArray(box);
            boxMarks.forEach(cellIndex => {
                const { rowIndex, colIndex }
                    = Toolkit.box.convertFromBoxIndex(boxIndex, cellIndex);
                marks[rowIndex][colIndex] = false;
            });
        });
    }
}