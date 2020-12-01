import React, {useEffect, useState} from 'react'
import "./App.css"
import { gameSubject, initGame } from './Game/Game'
import Board from './Board/Board'


function App() {
  const[board ,setBoard] = useState([])
  const [isGameOver, setIsGameOver] = useState()
  const [result, setResult ] =useState()
  useEffect( () =>{
    initGame()
    const subscribe = gameSubject.subscribe( game => {
      setBoard(game.board)
      setIsGameOver(game.isGameOver)
      setResult(game.result)
    }

      )
      return () => subscribe.unsubscribe()
  }, [])

  return (
    <div className='container'>
      {isGameOver && (
        <h2 className='vertical-text' >
          GAME OVER
          <button>
          <span className='vertical-text'>NEW GAME</span>
        </button>
        </h2>
        
      )}
      <div className='board-container'>
        <Board board={board}/>
      </div>
    </div>

    
  );
}

export default App;
