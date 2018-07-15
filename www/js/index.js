/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 2);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

module.exports = jQuery;

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

Object.defineProperty(exports, "__esModule", { value: true });
// 宫坐标工具箱

var BoxToolkit = function () {
    function BoxToolkit() {
        _classCallCheck(this, BoxToolkit);
    }

    _createClass(BoxToolkit, [{
        key: "getBoxCells",

        // 根据给定的宫号(从0开始)获取一个数组，
        // 这个数组按先行后列从左到右的顺序包含宫内每个元素的值
        value: function getBoxCells(matrix, boxIndex) {
            var startRowIndex = Math.floor(boxIndex / 3) * 3;
            var startColIndex = boxIndex % 3 * 3;
            var result = [];
            for (var i = 0; i < 9; i++) {
                var rowIndex = startRowIndex + Math.floor(i / 3);
                var colIndex = startColIndex + i % 3;
                result.push(matrix[rowIndex][colIndex]);
            }
            return result;
        }
        // 从宫坐标转换为矩阵坐标

    }, {
        key: "convertFromBoxIndex",
        value: function convertFromBoxIndex(boxIndex, cellIndex) {
            return {
                rowIndex: Math.floor(boxIndex / 3) * 3 + Math.floor(cellIndex / 3),
                colIndex: boxIndex % 3 * 3 + cellIndex % 3
            };
        }
        // 从矩阵坐标转换为宫坐标

    }, {
        key: "convertToBoxIndex",
        value: function convertToBoxIndex(rowIndex, colIndex) {
            return {
                boxIndex: Math.floor(rowIndex / 3) * 3 + Math.floor(colIndex / 3),
                cellIndex: rowIndex % 3 * 3 + colIndex % 3
            };
        }
    }]);

    return BoxToolkit;
}();

;
var boxToolkit = new BoxToolkit();
// 矩阵工具箱

var MatrixToolkit = function () {
    function MatrixToolkit() {
        _classCallCheck(this, MatrixToolkit);
    }

    _createClass(MatrixToolkit, [{
        key: "make",
        value: function make() {
            var _this = this;

            var value = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;

            return Array.from({ length: 9 }, function () {
                return _this.makeRow(value);
            });
        }
    }, {
        key: "makeRow",
        value: function makeRow() {
            var value = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;

            var array = new Array(9);
            array.fill(value);
            return array;
        }
        // Fisher-Yates 洗牌算法，Lodash 中有实现
        // 传入一个数组，对数组元素洗牌之后，再将其返回

    }, {
        key: "shuffle",
        value: function shuffle(array) {
            var length = array.length;
            var endIndex = length - 1;
            for (var i = 0; i < endIndex; i++) {
                var j = i + Math.floor(Math.random() * (length - i));
                var _ref = [array[j], array[i]];
                array[i] = _ref[0];
                array[j] = _ref[1];
            }
            return array;
        }
        // 检查某个位置是否可以填入 n

    }, {
        key: "checkFillable",
        value: function checkFillable(matrix, n, rowIndex, colIndex) {
            var boxCoor = boxToolkit.convertToBoxIndex(rowIndex, colIndex);
            var boxCells = boxToolkit.getBoxCells(matrix, boxCoor.boxIndex);
            for (var i = 0; i < 9; i++) {
                if (matrix[i][colIndex] === n || matrix[rowIndex][i] === n || boxCells[i] === n) {
                    return false;
                }
            }
            return true;
        }
    }]);

    return MatrixToolkit;
}();

;
var matrixToolkit = new MatrixToolkit();
var Toolkit = {
    get matrix() {
        return matrixToolkit;
    },
    get box() {
        return boxToolkit;
    }
};
exports.default = Toolkit;

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function($) {

Object.defineProperty(exports, "__esModule", { value: true });
var Grid_1 = __webpack_require__(3);
var Popup_1 = __webpack_require__(7);
function main() {
    var $container = $("#container");
    var $popup = $("#popup");
    var grid = new Grid_1.default($container);
    grid.bindPopup(new Popup_1.default($popup));
    grid.rebuild();
    $("#check").on("click", function () {
        if (grid.check()) {
            alert("成功");
        }
    });
    $("#reset").on("click", function () {
        return grid.reset();
    });
    $("#clear").on("click", function () {
        return grid.clear();
    });
    $("#rebuild").on("click", function () {
        return grid.rebuild();
    });
    $(window).on("resize", function () {
        return grid.layout();
    });
}
main();
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(0)))

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function($) {

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

Object.defineProperty(exports, "__esModule", { value: true });
var Sudoku_1 = __webpack_require__(4);
var checker_1 = __webpack_require__(6);

var Grid = function () {
    function Grid(container) {
        _classCallCheck(this, Grid);

        this._$container = container;
    }

    _createClass(Grid, [{
        key: "rebuild",
        value: function rebuild() {
            var sudoku = new Sudoku_1.Sudo();
            var matrix = sudoku.make();
            var rowGroupClasses = ["row_g_top", "row_g_middle", "row_g_bottom"];
            var colGroupClasses = ["col_g_left", "col_g_center", "col_g_right"];
            // 创建矩阵数组对应的 span 二维数组
            this._cells = matrix.map(function (rowValues) {
                return rowValues.map(function (cellValue, colIndex) {
                    return $("<span>").text(cellValue).addClass(cellValue ? "fixed" : "empty").addClass(colGroupClasses[colIndex % 3]);
                });
            });
            // 创建 DOM
            var rows = this._cells.map(function (rowCells, rowIndex) {
                return $("<div>").addClass("row").addClass(rowGroupClasses[rowIndex % 3]).append(rowCells);
            });
            this._$container.empty().append(rows);
            this.layout();
        }
    }, {
        key: "layout",
        value: function layout() {
            var width = $("span:first", this._$container).width();
            $("span", this._$container).height(width).css({
                "line-height": width + "px",
                "font-size": width < 32 ? width / 2 + "px" : ""
            });
        }
    }, {
        key: "bindPopup",
        value: function bindPopup(popupNumbers) {
            this._$container.on("click", "span", function (e) {
                var $cell = $(e.target);
                if ($cell.hasClass("fixed")) {
                    return;
                }
                popupNumbers.popup($cell);
            });
        }
    }, {
        key: "check",
        value: function check() {
            var data = this._cells.map(function (rowCells) {
                return rowCells.map(function ($span) {
                    return parseInt($span.text(), 10);
                });
            });
            var checker = new checker_1.default(data).check();
            if (checker.success) {
                return true;
            }
            var marks = checker.marks;
            this._cells.forEach(function (rowCells, rowIndex) {
                return rowCells.forEach(function ($span, colIndex) {
                    // 所有预置的数字都不标记
                    if ($span.hasClass("fixed")) {
                        return;
                    }
                    if (marks[rowIndex][colIndex]) {
                        $span.removeClass("error");
                    } else {
                        $span.addClass("error");
                    }
                });
            });
            return false;
        }
    }, {
        key: "reset",
        value: function reset() {
            $("span:not(.fixed)", this._$container).text("0").removeClass("mark1 mark2 error").addClass("empty");
        }
    }, {
        key: "clear",
        value: function clear() {
            $("span.error", this._$container).removeClass("error");
        }
    }]);

    return Grid;
}();

exports.default = Grid;
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(0)))

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

Object.defineProperty(exports, "__esModule", { value: true });
var Generator_1 = __webpack_require__(5);

var Sudo = function Sudo() {
    var _this = this;

    _classCallCheck(this, Sudo);

    this.make = function () {
        var level = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 5;

        _this._puzzleMatrix = _this._matrix.map(function (row) {
            return row.map(function (v) {
                return Math.random() * 9 < level ? 0 : v;
            });
        });
        return _this._puzzleMatrix;
    };
    this._generator = new Generator_1.default();
    this._matrix = this._generator.generate();
    this._puzzleMatrix = new Array();
};

exports.Sudo = Sudo;

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

Object.defineProperty(exports, "__esModule", { value: true });
var toolkit_1 = __webpack_require__(1);

var Generator = function () {
    function Generator() {
        _classCallCheck(this, Generator);

        this.matrix = new Array();
        this.orders = new Array();
    }

    _createClass(Generator, [{
        key: "generate",
        value: function generate() {
            while (!this.internalGenerate()) {
                console.warn("rebuild");
            }
            return this.matrix;
        }
    }, {
        key: "internalGenerate",
        value: function internalGenerate() {
            var _this = this;

            this.matrix = toolkit_1.default.matrix.make();
            this.orders = Array.from({ length: 9 }).map(function () {
                return Array.from({ length: 9 }, function (x, i) {
                    return i;
                });
            }).map(function (row) {
                return toolkit_1.default.matrix.shuffle(row);
            });
            return Array.from({ length: 9 }).every(function (n, i) {
                return _this.fillNumber(i + 1);
            });
        }
    }, {
        key: "fillNumber",
        value: function fillNumber(number) {
            return this.fillRow(number, 0);
        }
    }, {
        key: "fillRow",
        value: function fillRow(n, rowIndex) {
            if (rowIndex >= 9) {
                return true;
            }
            var row = this.matrix[rowIndex];
            var orders = this.orders[rowIndex];
            for (var i = 0; i < orders.length; i++) {
                var colIndex = orders[i];
                // 如果这个位置已经有值，跳过
                if (row[colIndex]) {
                    continue;
                }
                // 检查这个位置是否可以填入 n，如果不能填，忽略
                if (!toolkit_1.default.matrix.checkFillable(this.matrix, n, rowIndex, colIndex)) {
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
            return false;
        }
    }]);

    return Generator;
}();

exports.default = Generator;

/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

Object.defineProperty(exports, "__esModule", { value: true });
var toolkit_1 = __webpack_require__(1);

var Checker = function () {
    _createClass(Checker, null, [{
        key: "_checkArray",
        value: function _checkArray(array) {
            var marks = new Array(array.length);
            marks.fill(true);
            array.forEach(function (v, i) {
                if (!v) {
                    marks[i] = false;
                    return;
                }
                if (marks[i]) {
                    for (var j = i + 1; j < 9; j++) {
                        if (v === array[j]) {
                            marks[i] = false;
                            marks[j] = false;
                        }
                    }
                }
            });
            return marks.map(function (v, i) {
                return v ? -1 : i;
            }).filter(function (index) {
                return index >= 0;
            });
        }
    }]);

    function Checker(matrix) {
        _classCallCheck(this, Checker);

        this.matrix = matrix;
    }

    _createClass(Checker, [{
        key: "check",
        value: function check() {
            this.marks = toolkit_1.default.matrix.make(true);
            this.checkRows();
            this.checkCols();
            this.checkBoxes();
            this._success = this.marks.every(function (row) {
                return row.every(function (v) {
                    return v;
                });
            });
            return this;
        }
    }, {
        key: "checkRows",
        value: function checkRows() {
            var marks = this.marks;
            this.matrix.forEach(function (row, rowIndex) {
                var rowMarks = Checker._checkArray(row);
                rowMarks.forEach(function (colIndex) {
                    marks[rowIndex][colIndex] = false;
                });
            });
        }
    }, {
        key: "checkCols",
        value: function checkCols() {
            var matrix = this.matrix,
                marks = this.marks;

            var _loop = function _loop(colIndex) {
                var cols = Array.from({ length: 9 }).map(function (v, i) {
                    return matrix[i][colIndex];
                });
                var colMarks = Checker._checkArray(cols);
                colMarks.forEach(function (rowIndex) {
                    return marks[rowIndex][colIndex] = false;
                });
            };

            for (var colIndex = 0; colIndex < 9; colIndex++) {
                _loop(colIndex);
            }
        }
    }, {
        key: "checkBoxes",
        value: function checkBoxes() {
            var matrix = this.matrix,
                marks = this.marks;

            var boxes = Array.from({ length: 9 }).map(function (v, i) {
                return toolkit_1.default.box.getBoxCells(matrix, i);
            });
            boxes.forEach(function (box, boxIndex) {
                var boxMarks = Checker._checkArray(box);
                boxMarks.forEach(function (cellIndex) {
                    var _toolkit_1$default$bo = toolkit_1.default.box.convertFromBoxIndex(boxIndex, cellIndex),
                        rowIndex = _toolkit_1$default$bo.rowIndex,
                        colIndex = _toolkit_1$default$bo.colIndex;

                    marks[rowIndex][colIndex] = false;
                });
            });
        }
    }, {
        key: "success",
        get: function get() {
            return this._success;
        }
    }]);

    return Checker;
}();

exports.default = Checker;

/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function($) {

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

Object.defineProperty(exports, "__esModule", { value: true });
var BLOCK_WIDTH = 48; // 这是在样式表中固定的大小
var OFFSET = BLOCK_WIDTH + 2;
var POPUP_WIDTH = BLOCK_WIDTH * 3 + 10;

var Popup = function () {
    function Popup($div) {
        var _this = this;

        _classCallCheck(this, Popup);

        this._$panel = $div;
        this._$panel.on("click", "span", function (e) {
            var $cell = $(e.target);
            if ($cell.hasClass("empty")) {
                _this.emptyTarget();
            } else if ($cell.hasClass("mark")) {
                _this.markTarget($cell.data("mark"));
            } else {
                _this.setTargetValue($cell.text());
            }
            _this._$panel.hide();
            _this._$targetCell = null;
        }).hide().removeClass("hidden");
    }

    _createClass(Popup, [{
        key: "emptyTarget",
        value: function emptyTarget() {
            this._$targetCell.text("0").removeClass("mark1 mark2 error").addClass("empty");
        }
    }, {
        key: "markTarget",
        value: function markTarget(marker) {
            var $target = this._$targetCell;
            if ($target.hasClass(marker)) {
                $target.removeClass("mark1 mark2 error");
            } else {
                $target.removeClass("mark1 mark2 error").addClass(marker);
            }
        }
    }, {
        key: "setTargetValue",
        value: function setTargetValue(value) {
            this._$targetCell.text(value).removeClass("empty error");
        }
        /**
         * 基于 $cell 指定的方格弹出数字面板，选择的数字将回填到 $cell
         */

    }, {
        key: "popup",
        value: function popup($cell) {
            this._$targetCell = $cell;
            var cellPosition = $cell.position();
            var left = Math.min(Math.max(cellPosition.left - OFFSET, 0), $(window).width() - POPUP_WIDTH);
            var top = Math.max(cellPosition.top - OFFSET, 0);
            this._$panel.css({
                left: left + "px",
                top: top + "px"
            }).show();
        }
    }]);

    return Popup;
}();

exports.default = Popup;
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(0)))

/***/ })
/******/ ]);
//# sourceMappingURL=index.js.map