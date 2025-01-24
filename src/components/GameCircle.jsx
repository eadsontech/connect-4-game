const GameCircle = ({id, className, onCircleClicked}) => {

    
  return (
    <div className={`gameSquare ${className}`} onClick={() => onCircleClicked(id)}></div>
  )
}
export default GameCircle