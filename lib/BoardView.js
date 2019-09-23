
class BoardView {

    constructor(board) {
        // TODO: validation for board
        this._data = board.data
        this._col = board.col
        this._row = board.row
        this.boxen = require('boxen')
    }

    view() {
        let { table } = require('table')

        let tableData = []
        for (let row = 0; row < this._row; row++) {
            tableData[row] = []
            for (let col = 0; col < this._col; col++) {
                let cell = this.boxen(this._data[row][col].toString() || '', { borderColor: 'white', borderStyle: 'round' })
                tableData[row][col] = cell
            }
        }
        console.log('' + table(tableData));
    }




    alert(msg, color = 'green') {
        console.log(this.boxen(msg, { borderStyle: "round", backgroundColor: color, padding: 2 }));

    }
}
module.exports = BoardView