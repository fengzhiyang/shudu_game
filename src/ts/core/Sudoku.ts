import Generator from './Generator'
export class Sudo {
    private _generator: Generator;
    private _puzzleMatrix: number[][];
    private _matrix: number[][];
    constructor() {
        this._generator = new Generator();
        this._matrix = this._generator.generate();
        this._puzzleMatrix = new Array();
    }

    public make = (level: number = 5): number[][] => {
        this._puzzleMatrix = this._matrix.map(row => {
            return row.map(v => Math.random() * 9 < level ? 0 : v);
        });
        return this._puzzleMatrix;
    }
}