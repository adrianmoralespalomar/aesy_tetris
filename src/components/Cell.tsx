export interface ICell{
  position:number;
  isColored:boolean;
}
// Clase
export class CellModel implements ICell {
  constructor(public position: number, public isColored: boolean) {}
}
interface Props {
  id:number;
  isColored:boolean;
}

export function Cell({ id,isColored }: Props): JSX.Element{
    return (
      <>
        {!isColored && <div className="border-2 border-solid border-white text-white">{id}</div>}
        {isColored && <div className="border-2 border-solid border-white bg-red-500 text-white">{id}</div>}
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