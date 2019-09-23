class Board {

    constructor(col, row) {
        // TODO:validation for col, row
        // NOTE: Assume col and row has non negative value
        this.data = []
        this.col = col
        this.row = row
        this.cells = (col * row)
        this.highestValue = 2048
        this.won = false
        this.randomData = [2, 4]
        let randomCell1 = Math.floor(Math.random() * this.cells)
        let randomCell2 = Math.floor(Math.random() * this.cells)
        this.freeCells = []
        for (let n = 0; n < row; n++) {
            this.data[n] = []
            for (let c = 0; c < col; c++) {
                let cellKey = 1 + (n * row) + c
                cellKey == randomCell1 || cellKey == randomCell2 ? this.data[n][c] = this.getCellValue() : (this.freeCells.push({ x: n, y: c }) && (this.data[n][c] = (0)))
                // if (cellKey == randomCell1 || cellKey == randomCell2){
                //     this.data[n][c] = this.getCellValue()}
                // else
                //     this.freeCells.push({ x: n, y: c }); this.data[n][c] = (0)
            }
        }

        // console.log(this.data);
        // this.randomizeFreeCell()
    }

    set randomSource(data) {
        this.randomData = data
    }

    randomizeFreeCell() {
        if (this.freeCells.length == 0)
            return this.won = false
        let randomCell = Math.floor(Math.random() * this.freeCells.length) % this.freeCells.length
        let randomCellData = this.freeCells[randomCell]
        this.data[randomCellData.x][randomCellData.y] = this.getCellValue()
        this.freeCells.splice(randomCell, 1)
        // this.swipeleft()
    }

    canPlay() {
        for (let row = 0; row < this.row; row++) {
            for (let col = 1; col < this.col; col++) {
                if (this.data[row][col - 1] == this.data[row][col])
                    return true
            }
        }

        for (let col = 0; col < this.col; col++) {
            for (let row = 1; row < this.row; row++) {
                if (this.data[row - 1][col] == this.data[row][col])
                    return true
            }
        }
        return this.freeCells.length > 0
    }
    generateFreeCells() {
        this.freeCells = []
        for (let n = 0; n < this.row; n++) {
            for (let c = 0; c < this.col; c++) {
                this.data[n][c] == 0 ? this.freeCells.push({ x: n, y: c }) : ''
            }
        }
        // console.log(this.freeCells);

    }
    swipeleft() {
        for (let row = 0; row < this.row; row++) {
            let calcTiles = []
            for (let col = 0; col < this.col - 1; col++) {
                let calcNotRegistered = calcTiles.every(cell => cell.y !== col - 2)
                if (this.data[row][col] != 0 && this.data[row][col] == this.data[row][col + 1] && calcNotRegistered) {
                    let merge = this.data[row][col] + this.data[row][col + 1]
                    // this.data[row][col] = 0
                    // this.data[row][col + 1] = merge

                    calcTiles.push({ x: row, y: col, value: 0 })
                    calcTiles.push({ x: row, y: col + 1, value: merge })
                    this.won = merge === this.highestValue
                }
            }
            this.updateCells(calcTiles)
            // console.log(this.data[row]);

            for (let col = 1; col < this.col; col++) {
                for (let prevCell = col - 1; prevCell >= 0; prevCell--) {
                    let cell = prevCell + 1
                    if (this.data[row][prevCell] == 0 && this.data[row][cell] > 0) {
                        this.data[row][prevCell] = this.data[row][cell]
                        this.data[row][cell] = 0
                    }
                }
            }
            // console.log(this.data[row]);
            // let freecells = this.data[row].filter((cell) => cell == 0).map((cell, n) => ({ x: row, y: n }))
            // console.log(freecells, this.freeCells);
            // if (freecells.length)
            //     this.freeCells.push(...freecells)


        }
        this.generateFreeCells()
        this.randomizeFreeCell()
    }
    swipeup() {
        for (let col = 0; col < this.col; col++) {
            let calcTiles = []
            for (let row = this.row - 1; row > 0; row--) {
                let calcNotRegistered = calcTiles.every(cell => cell.x !== row + 2)
                if (this.data[row][col] != 0 && this.data[row][col] == this.data[row - 1][col] && calcNotRegistered) {
                    let merge = this.data[row][col] + this.data[row - 1][col]
                    // this.data[row][col] = merge
                    // this.data[row][col] = 0

                    calcTiles.push({ x: row, y: col, value: 0 })
                    calcTiles.push({ x: row - 1, y: col, value: merge })
                    this.won = merge === this.highestValue
                }
            }
            this.updateCells(calcTiles)

            for (let row = 1; row < this.row; row++) {
                for (let prevCell = row - 1; prevCell >= 0; prevCell--) {
                    let cell = prevCell + 1
                    if (this.data[prevCell][col] == 0 && this.data[cell][col] > 0) {
                        this.data[prevCell][col] = this.data[cell][col]
                        this.data[cell][col] = 0
                    }
                }
            }
            // console.log(this.data[row]);
            // let freecells = this.data[row].filter((cell) => cell == 0).map((cell, n) => ({ x: row, y: n }))
            // console.log(freecells, this.freeCells);
            // if (freecells.length)
            //     this.freeCells.push(...freecells)


        }
        this.generateFreeCells()
        this.randomizeFreeCell()
    }
    swipedown() {
        for (let col = 0; col < this.col; col++) {
            let calcTiles = []
            for (let row = 0; row < this.row - 1; row++) {
                let calcNotRegistered = calcTiles.every(cell => cell.x !== row - 2)
                if (this.data[row][col] != 0 && this.data[row][col] == this.data[row + 1][col] && calcNotRegistered) {
                    let merge = this.data[row][col] + this.data[row + 1][col]
                    // this.data[row][col] = 0
                    // this.data[row + 1][col] = merge

                    calcTiles.push({ x: row, y: col, value: 0 })
                    calcTiles.push({ x: row + 1, y: col, value: merge })
                    this.won = merge === this.highestValue
                }
            }
            this.updateCells(calcTiles)

            for (let row = this.row - 1; row > 0; row--) {
                for (let prevCell = row - 1; prevCell < this.row - 1; prevCell++) {
                    let cell = prevCell + 1
                    if (this.data[prevCell][col] > 0 && this.data[cell][col] == 0) {
                        this.data[cell][col] = this.data[prevCell][col]
                        this.data[prevCell][col] = 0
                    }
                }
            }
            // let 
            // console.log(this.data[row]);
            // let freecells = this.data[row].filter((cell) => cell == 0).map((cell, n) => ({ x: row, y: n }))
            // console.log(freecells, this.freeCells);
            // if (freecells.length)
            //     this.freeCells.push(...freecells)


        }
        this.generateFreeCells()
        this.randomizeFreeCell()
    }
    swiperight() {
        for (let row = 0; row < this.row; row++) {
            let calcTiles = []
            for (let col = this.col - 1; col > 0; col--) {
                let calcNotRegistered = calcTiles.every(cell => cell.y !== row + 2)
                if (this.data[row][col] != 0 && this.data[row][col] == this.data[row][col - 1] && calcNotRegistered) {
                    let merge = this.data[row][col] + this.data[row][col - 1]
                    // this.data[row][col] = 0
                    // this.data[row][col - 1] = merge
                    calcTiles.push({ x: row, y: col, value: 0 })
                    calcTiles.push({ x: row, y: col - 1, value: merge })
                    this.validateWon(merge)
                }
            }
            this.updateCells(calcTiles)
            // console.log(this.data[row]);

            for (let col = this.col - 1; col >= 0; col--) {
                for (let prevCell = col - 1; prevCell < this.col - 1; prevCell++) {
                    let cell = prevCell + 1
                    if (this.data[row][prevCell] > 0 && this.data[row][cell] == 0) {
                        this.data[row][cell] = this.data[row][prevCell]
                        this.data[row][prevCell] = 0
                    }
                }
            }
            // console.log(this.data[row]);
            // let freecells = this.data[row].filter((cell) => cell == 0).map((cell, n) => ({ x: row, y: n }))
            // console.log(freecells, this.freeCells);
            // if (freecells.length)
            //     this.freeCells.push(...freecells)


        }
        this.generateFreeCells()
        this.randomizeFreeCell()
    }

    getCellValue() {
        return this.randomData[Math.floor(Math.random() * (this.randomData.length))]
    }

    updateCells(calcTiles) {
        for (let cell of calcTiles)
            this.data[cell.x][cell.y] = cell.value

    }
    validateWon(n) {
        if (!this.won) {
            this.won = n === this.highestValue
        }
        return this.won
    }
}

module.exports = Board