import { useEffect, useRef, useState } from 'react'
import { Cell, ICell } from './Cell';

const initialBoard={
    size:10
}
export function Board():JSX.Element{
  //const pieceIsFalling = useRef(false);
  const [currentBoard, setBoard] = useState(CreateInitialBoard());


  useEffect(() => {
    let piece = [0,10,11,12];
    const intervalId = setInterval(() => {
      const board = structuredClone(currentBoard);
      piece=FallingPiece({board,piece,setBoard});
    }, 3000);

    // Para detener el intervalo cuando el componente se desmonta
    return () => {
      clearInterval(intervalId);
    };
  }, []);


  return (
    <>
      <section className="grid grid-cols-10 gap-[3px] w-[400px] auto-rows-[40px] self-center">
        {
          currentBoard.map(cell=>{
              const {position, isColored} = cell;
              return (<Cell key={position} isColored={isColored} id={position}/>)
          })
        }
      </section>
    </>
  )
}

function CreateInitialBoard():ICell[]{
  const cellComponent: ICell[] = [];
  for (let index = 0; index < (initialBoard.size*initialBoard.size); index++) {
    cellComponent.push({ position: index, isColored: false });      
  }
  return cellComponent;
}
interface Props {
  board:ICell[];
  piece:number[];
  setBoard:any
}
function FallingPiece({board,piece,setBoard}: Props):any{
  board.filter(p=>p.isColored==true).map(v=>v.isColored=false);//Set all cells to noColored

  if (piece[3]<=(initialBoard.size*initialBoard.size)){//Still Falling
    board[piece[0]].isColored=true;
    board[piece[1]].isColored=true;
    board[piece[2]].isColored=true;
    board[piece[3]].isColored=true;
    setBoard(board);
    piece.forEach((value,index)=>{piece[index]=value+10;});
  }
  else{
    piece = [0,10,11,12]
  }
  return piece;
}