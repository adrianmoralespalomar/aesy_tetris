import { useEffect, useRef, useState } from 'react'
import { Cell } from './Cell';
import { CreateInitialBoard, FallingPiece } from '../services/board-services';
import confetti from 'canvas-confetti';

const initialBoardSize=100;
export function Board():JSX.Element{
  const [currentBoard, setBoard] = useState(CreateInitialBoard(initialBoardSize));
  const thereisWinner = useRef(false);
  //Piece that will fall down
  let piece:Piece = {
    PositionA:0,
    PositionB:10,
    PositionC:11,
    PositionD:12,
    RotationState:1
  };
  const resetGame=useRef(false);
  //Manage Game Flow
  useEffect(() => {
    const intervalId = setInterval(() => {
      const {newPiece,newBoard}=FallingPiece({piece,currentBoard,initialBoardSize});
      piece=newPiece;
      setBoard(newBoard);
      //To Stop the game when there is a winner
      if(newBoard[0].isDefColored==true) thereisWinner.current=true;
      if(thereisWinner.current==true){
        clearInterval(intervalId);
        confetti();
      }
    }, 1000);
    // Para detener el intervalo cuando el componente se desmont
    return () => {
      clearInterval(intervalId);
    };
  }, [resetGame.current]);

  //Capture key pressed by user to move the piece
  useEffect(() => {
    const handleKeyDown = (event:KeyboardEvent) => {
      if (event.key === 'ArrowLeft') {
        if(((piece.PositionA-10)%10 !== 0)) {
          piece=MovePieceToLeft(piece);
        }
      }
      else if (event.key === 'ArrowRight') {
        if(((piece.PositionC-9)%10 !== 0)){
          piece=MovePieceToRight(piece);
        }
      }
      else if (event.key === 'ArrowUp') {
        piece=RotatePiece(piece);
      }
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [resetGame.current]);

  const ResetGame= ()=>{
    setBoard(CreateInitialBoard(initialBoardSize));
    thereisWinner.current=false;
    resetGame.current=true;
  }
  return (
    <>
      {thereisWinner.current && <h2 className='text-3xl text-emerald-400 font-bold self-center'>THERE IS A WINNER!!</h2>}
      <section className="grid grid-cols-10 gap-[3px] w-[400px] auto-rows-[40px] self-center">
        {
          currentBoard?.map(cell=>{
              const {position, isColored,isDefColored} = cell;
              return (<Cell key={position} isColored={isColored} id={position} isDefColored={isDefColored}/>)
          })
        }
      </section>
      <section className='self-center '>
        <button className=' bg-white text-black p-2 mt-3 border-black border-2 border-solid rounded hover:bg-slate-400 transition duration-900 ease-in-out' onClick={ResetGame}>ResetGame</button>
      </section>
    </>
  )
}

export interface Piece {
  PositionA:number,
  PositionB:number,
  PositionC:number,
  PositionD:number,
  RotationState:number
};
function RotatePiece(piece:Piece){
  if(piece.RotationState===1){
    piece.PositionA=piece.PositionA+1; //Move 1 Cell to right
    piece.PositionB=piece.PositionB-10+2; // Move 1 Cell to Up and 2 to right
    piece.PositionC=piece.PositionC; // No move
    piece.PositionD=piece.PositionD+10-1; // Move 1 Cell to Down and 1 to Left
    piece.RotationState=2;
  }
  else if(piece.RotationState===2){
    piece.PositionA=piece.PositionA+10-1; // Move 1 Cell to Down and 1 to Left
    piece.PositionB=piece.PositionB+10; // Move 1 Cell to Down and 2 to Left
    piece.PositionC=piece.PositionC; // No Move
    piece.PositionD=piece.PositionD+1; // Move 1 Cell to Right
    piece.RotationState=3;
  }
  else if(piece.RotationState===3){
    piece.PositionA=piece.PositionA-10+1; // Move 1 Cell to Up and 1 to Right
    piece.PositionB=piece.PositionB+10-2; // Move 1 Cell to Down and 2 to Left
    piece.PositionC=piece.PositionC; // No Move
    piece.PositionD=piece.PositionD-1; // Move 1 Cell to Left
    piece.RotationState=4;
  }
  else if(piece.RotationState===4){
    piece.PositionA=piece.PositionA-1; // Move 1 Cell to Left
    piece.PositionB=piece.PositionB-10; // Move 1 Cell to Up
    piece.PositionC=piece.PositionC; // No Move
    piece.PositionD=piece.PositionD-10+1; // Move 1 Cell to Up and 1 Cell to Right
    piece.RotationState=1;
  }
  return piece;
}
function MovePieceToRight(piece:Piece){
  if(
      (piece.RotationState===1 && ((piece.PositionD-9)%10 !== 0)) ||
      (piece.RotationState===2 && ((piece.PositionB-9)%10 !== 0)) ||
      (piece.RotationState===3 && ((piece.PositionB-9)%10 !== 0)) ||
      (piece.RotationState===4 && ((piece.PositionB-9)%10 !== 0))    
    ) 
    piece.PositionA++; piece.PositionB++; piece.PositionC++; piece.PositionD++;
  return piece;
}
function MovePieceToLeft(piece:Piece){
  if(
     (piece.RotationState===1 && ((piece.PositionA-10)%10 !== 0)) ||
     (piece.RotationState===2 && ((piece.PositionA-11)%10 !== 0)) ||
     (piece.RotationState===3 && ((piece.PositionA-10)%10 !== 0)) ||
     (piece.RotationState===4 && ((piece.PositionB-10)%10 !== 0))
    )
    piece.PositionA--; piece.PositionB--; piece.PositionC--; piece.PositionD--;
  return piece;
}