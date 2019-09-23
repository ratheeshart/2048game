const Board = require('./Board')
const BoardView = require('./BoardView')

class BoardGame {
    constructor(col, row) {
        // TODO: Validation
        this.board = new Board(col, row)
        this.boardViewer = new BoardView(this.board)
        // this.board.highestValue = 8
    }

    play() {
        let inputReader = require('readline-sync')
        let canPlay = true
        this.boardViewer.view()
        while (canPlay) {
            // Get the user input
            let val = inputReader.keyIn('Enter 1, 2, 3, 4 to indicate left, right, up, down\nSPACE to Exit.', { hideEchoBack: true, limit: '1234 ', mask: '', guide: 'The input should one of 1, 2, 3, 4 to indicate left, right, up, down', cancel: true })
            // TODO: Apply Game logic
            console.log(val);

            switch (val) {
                case '1':
                    this.board.swipeleft()
                    break;
                case '2':
                    this.board.swiperight()
                    // canPlay = false
                    break;
                case '3':
                    this.board.swipeup()
                    break;
                case '4':
                    this.board.swipedown()
                    break;
                case ' ':
                    canPlay = false
                    break;
                default:
                    break;
            }

            console.clear();
            // Print the Board
            this.boardViewer.view()
            if (this.board.won) {
                canPlay = false
                this.boardViewer.alert('Winner 🎖️')
            }
            else if (this.board.canPlay() == false) {
                canPlay = false
                this.boardViewer.alert('Failed', 'redBright')
            }
            else if (this.board.canPlay() == false) {
                this.boardViewer.alert('Failed', 'redBright')
            }

        }
    }
}

module.exports = BoardGame