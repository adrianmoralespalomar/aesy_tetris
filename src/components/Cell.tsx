export interface ICell{
  position:number;
  isColored:boolean;
  isDefColored:boolean;
}
// Clase
// export class CellModel implements ICell {
//   constructor(public position: number, public isColored: boolean) {}
// }
interface Props {
  id:number;
  isColored:boolean;
  isDefColored:boolean;
}

export function Cell({ isColored,isDefColored }: Props): JSX.Element{
    const className=`border-2 border-solid border-white text-white ${isDefColored?'bg-green-500':isColored? 'bg-red-500':''}`;
    return (
      <>
        {!isColored && <div className={className}></div>}
        {isColored && <div className={className}></div>}
      </>
    )
} 
//Otra forma de hacerlo
// export const Cell:React.FC<Props>=({isColored})=>{
//   const pepe=isColored;
//     return (
//       <>
//         {isColored && <div className="border-2 border-solid border-white"></div>}
//         {!isColored && <div className="border-2 border-solid border-white bg-red-500"></div>}
//       </>
//     )
// }