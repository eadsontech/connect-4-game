import { useEffect, useState } from "react";
import GameCircle from "./GameCircle"
import Header from "./Header";
import Footer from "./Footer";
import { isDraw, isWinner, getComputerMove } from "../helper";
import { GAME_STATE_PLAYING, GAME_STATE_WIN,  NO_PLAYER, PLAYER_1, PLAYER_2,  NO_CIRCLES, GAME_STATE_DRAW } from "../Constants";

const GameBoard = () => {

  const [gameBoard, setGameBoard] = useState(Array(NO_CIRCLES).fill(NO_PLAYER))
  const [currentPlayer, setCurrentPlayer] = useState(PLAYER_1)
  const [gameState, setGameState] = useState(GAME_STATE_PLAYING)
  const [winPlayer, setWinPlayer] = useState(NO_PLAYER)


  useEffect(() => {
    initGame()
  }, [])


  const initGame = () => { 
    setGameBoard(Array(NO_CIRCLES).fill(NO_PLAYER))
    setCurrentPlayer(PLAYER_1)
    setGameState(GAME_STATE_PLAYING)
  }
  
  const initBoard = () => {

    const circles = []
    for(let i = 0; i < NO_CIRCLES; i++) {
     circles.push(renderCircle(i)) 
    }

    return circles
    
  }

  const suggestMove = () => {
    circleClicked(getComputerMove(gameBoard))
    
  }

  const circleClicked = (id) => {

    if(gameBoard[id] !== NO_PLAYER) return;
    if(gameState !== GAME_STATE_PLAYING) return;

    if(isWinner(gameBoard, id, currentPlayer)) {
      setGameState(GAME_STATE_WIN)
      setWinPlayer(currentPlayer)
      
    }

    if(isDraw(gameBoard, id, currentPlayer)) {
      setGameState(GAME_STATE_DRAW)
      setWinPlayer(NO_PLAYER)
      
    }

    setGameBoard(prev => {
      return prev.map((circle, pos) => {
        if(pos === id) return currentPlayer;
        return circle;
      })
    })
    
    

    setCurrentPlayer(currentPlayer === PLAYER_1 ? PLAYER_2 : PLAYER_1)
  }

  const renderCircle = (id) => {
    return <GameCircle key={id} id={id} className={`player_${gameBoard[id]}`}  onCircleClicked={circleClicked} />
  }
  return (
    <>
      <Header gameState={gameState} currentPlayer={currentPlayer} winPlayer={winPlayer} />
    <div className="gameBtns">
      {initBoard()}
    </div>
    <Footer onNewGameClick={initGame} onSuggestClick={suggestMove} gameState={gameState} />
    </>
    
  )
}
export default GameBoard