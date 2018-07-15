export type Matrix<T> = Array<Array<T>>;

// 宫坐标工具箱
class BoxToolkit {
    // 根据给定的宫号(从0开始)获取一个数组，
    // 这个数组按先行后列从左到右的顺序包含宫内每个元素的值
    getBoxCells(matrix: Matrix<number>, boxIndex: number): Array<number> {
        const startRowIndex = Math.floor(boxIndex / 3) * 3;
        const startColIndex = boxIndex % 3 * 3;
        const result: Array<number> = [];
        for (let i = 0; i < 9; i++) {
            const rowIndex = startRowIndex + Math.floor(i / 3);
            const colIndex = startColIndex + i % 3;
            result.push(matrix[rowIndex][colIndex]);
        }
        return result;
    }

    // 从宫坐标转换为矩阵坐标
    convertFromBoxIndex(boxIndex: number, cellIndex: number) {
        return {
            rowIndex: Math.floor(boxIndex / 3) * 3 + Math.floor(cellIndex / 3),
            colIndex: boxIndex % 3 * 3 + cellIndex % 3
        };
    }

    // 从矩阵坐标转换为宫坐标
    convertToBoxIndex(rowIndex: number, colIndex: number) {
        return {
            boxIndex: Math.floor(rowIndex / 3) * 3 + Math.floor(colIndex / 3),
            cellIndex: rowIndex % 3 * 3 + colIndex % 3
        };
    }
};

export interface IBoxToolkit extends BoxToolkit { }
const boxToolkit = new BoxToolkit();

// 矩阵工具箱
class MatrixToolkit {
    // 生成一个 9 * 9 的矩阵(数组的数组)
    // 如果没有初始值，全部填 0
    make(value?: number): Matrix<number>;
    make<T>(value: T): Matrix<T>;
    make(value: any = 0): Matrix<any> {
        return Array.from(
            { length: 9 },
            () => this.makeRow(value));
    }

    // 生成矩阵的一条，一个含 9 个元素的数组
    // 如果没有给初始值，全部填 0
    makeRow(value?: number): Array<number>;
    makeRow<T>(value: T): Array<T>;
    makeRow(value: any = 0): Array<any> {
        const array = new Array(9);
        array.fill(value);
        return array;
    }

    // Fisher-Yates 洗牌算法，Lodash 中有实现
    // 传入一个数组，对数组元素洗牌之后，再将其返回
    shuffle<T>(array: Array<T>): Array<T> {
        const length = array.length;
        const endIndex = length - 1;
        for (let i: number = 0; i < endIndex; i++) {
            const j = i + Math.floor(Math.random() * (length - i));
            [array[i], array[j]] = [array[j], array[i]];
        }
        return array;
    }

    // 检查某个位置是否可以填入 n
    checkFillable(matrix: Matrix<number>, n: number, rowIndex: number, colIndex: number) {
        const boxCoor = boxToolkit.convertToBoxIndex(rowIndex, colIndex);
        const boxCells = boxToolkit.getBoxCells(matrix, boxCoor.boxIndex);
        for (let i = 0; i < 9; i++) {
            if (matrix[i][colIndex] === n
                || matrix[rowIndex][i] === n
                || boxCells[i] === n) {
                return false;
            }
        }
        return true;
    }
};

export interface IMatrixToolkit extends MatrixToolkit { }
const matrixToolkit = new MatrixToolkit();

const Toolkit = {
    get matrix(): IMatrixToolkit {
        return matrixToolkit;
    },

    get box(): IBoxToolkit {
        return boxToolkit;
    }
};

export default Toolkit;