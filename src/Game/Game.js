import * as Chess from 'chess.js'
import { BehaviorSubject } from 'rxjs'

const chess = new Chess()

export const gameSubject = new BehaviorSubject({

    board:chess.board()

})
export function initGame(){
    const savedGame = localStorage.getItem('savedGame')
    if(savedGame){
        chess.load(savedGame)
    }
    updateGame()
}
export function move(from, to, promotion){
    let tempMove = {from, to}
    if(promotion){
        tempMove.promotion = promotion
    }
    const legalMove = chess.move(tempMove)
    if(legalMove) {
        updateGame()
    }
}
export function handleMove(from, to){
    const promotions = chess.moves({ verbose: true }).filter(m => m.promotion)
    if(promotions.some(promotion => `${promotion.from}:${promotion.to}`===`${from}:${to}` )){
        const pendingPromotion = {from, to, color:promotions[0].color}
        updateGame(pendingPromotion)
    }
    const {pendingPromotion} = gameSubject.getValue()
    
    if(!pendingPromotion) {
        move(from, to)
    }
}
function updateGame(pendingPromotion){
    const isGameOver = chess.game_over()
    const newGame = {
        board:chess.board(),
        pendingPromotion,
        isGameOver,
        turn: chess.turn(),
        result: isGameOver ? getGameResult() :null
    }
    localStorage.setItem('savedGame',chess.fen())
    gameSubject.next(newGame)
}
function getGameResult(){
    if(chess.in_checkmate()){
        const winner = chess.turn() === 'w' ? 'BLACK' : "WHITE"
        return `CHECKMATE - WINNER - ${winner}`
    } else if(Chess.is_drow()){
        let reson = `50 = MOVES - RULE`
        if(chess.in_stalemate()){
            reson = 'STALEMATE'
        } else if(chess.in_threefold_repetition()){
            reson = 'REPETITION'
        } else if(chess.insufficient_material()){
            reson = 'INSUFFICIENT MATERIAL'
        }
        return `DRAW = ${reson}`
    } else{
        return 'UNKNOW REASON '
    }
}
export function resetGame(){
    chess.reset()
    updateGame()
}