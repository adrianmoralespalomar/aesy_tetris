import { Piece } from "../components/Board";
import { ICell } from "../components/Cell";

export function CreateInitialBoard(initialBoardSize:number):ICell[]{
    const cellComponent: ICell[] = [];
    for (let index = 0; index < initialBoardSize; index++) {
      cellComponent.push({ position: index, isColored: false, isDefColored:false });      
    }
    return cellComponent;
}

interface Props {
    piece:Piece;
    currentBoard:ICell[];
    initialBoardSize:number;
}
export function FallingPiece({piece,currentBoard,initialBoardSize}: Props):any{
    let board = [...currentBoard];
    board.filter(p=>p.isDefColored==false).map(v=>v.isColored=false);//Set all cells to noColored
  
    if (CheckCellsHitColored(piece,initialBoardSize,board)){//Still Falling
        board[piece.PositionA].isColored=true;
        board[piece.PositionB].isColored=true;
        board[piece.PositionC].isColored=true;
        board[piece.PositionD].isColored=true;
        //Move Down the piece
        piece.PositionA=piece.PositionA+10;
        piece.PositionB=piece.PositionB+10;
        piece.PositionC=piece.PositionC+10;
        piece.PositionD=piece.PositionD+10;
    }
    else{
        board[piece.PositionA].isDefColored=true;
        board[piece.PositionB].isDefColored=true;
        board[piece.PositionC].isDefColored=true;
        board[piece.PositionD].isDefColored=true;
        //Reset Piece
        piece.PositionA=0;
        piece.PositionB=10;
        piece.PositionC=11;
        piece.PositionD=12;
        piece.RotationState=1;
    }
    //console.log(board)
    return {newPiece:piece,newBoard:board};
}

function CheckCellsHitColored(piece:Piece,initialBoardSize:number,board:ICell[]):boolean{
    if(board[piece.PositionB + 10]?.isDefColored==true || board[piece.PositionC + 10]?.isDefColored==true || board[piece.PositionD + 10]?.isDefColored==true) return false;
    else if(piece.RotationState==1){
        if ((piece.PositionB + (initialBoardSize/10)) <initialBoardSize) return true;
    }
    else if(piece.RotationState==2){
        if ((piece.PositionD + (initialBoardSize/10)) <initialBoardSize) return true;
    }
    else if(piece.RotationState==3){
        if ((piece.PositionD + (initialBoardSize/10)) <initialBoardSize) return true;
    }
    else if(piece.RotationState==4){
        if ((piece.PositionD + (initialBoardSize/10)) <initialBoardSize) return true;
    }
    return false;
}