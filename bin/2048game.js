#!/usr/bin/env node
let BoardGame = require('../lib/BoardGame')

let game = new BoardGame(4,4)
game.play()