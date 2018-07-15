import Toolkit, { Matrix } from "./toolkit";

export default class Generator {
    private matrix: Matrix<number>;
    private orders: Matrix<number>;
    constructor() {
        this.matrix = new Array();
        this.orders = new Array();
    }
    generate(): Matrix<number> {
        while (!this.internalGenerate()) {
            console.warn("rebuild");
        }
        return this.matrix;
    }

    private internalGenerate(): boolean {
        this.matrix = Toolkit.matrix.make();
        this.orders = Array.from({ length: 9 })
            .map(() => Array.from({ length: 9 }, (x, i) => i))
            .map(row => Toolkit.matrix.shuffle(row));

        return Array.from({ length: 9 })
            .every((n, i) => this.fillNumber(i + 1));
    }

    private fillNumber(number: number): boolean {
        return this.fillRow(number, 0);
    }

    private fillRow(n: number, rowIndex: number): boolean {
        if (rowIndex >= 9) {
            return true;
        }

        const row = this.matrix[rowIndex];
        const orders = this.orders[rowIndex];

        for (let i = 0; i < orders.length; i++) {
            const colIndex = orders[i];
            // 如果这个位置已经有值，跳过
            if (row[colIndex]) {
                continue;
            }

            // 检查这个位置是否可以填入 n，如果不能填，忽略
            if (!Toolkit.matrix.checkFillable(this.matrix, n, rowIndex, colIndex)) {
                continue;
            }

            row[colIndex] = n;

            // 去下一行填 n，如果没填进去，就回退
            if (!this.fillRow(n, rowIndex + 1)) {
                row[colIndex] = 0;
                continue;
            }

            return true;
        }
        return false
    }
}   
