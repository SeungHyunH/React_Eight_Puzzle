import React,{useRef,useEffect,useState} from 'react'
import createPuzzle from '../util/createPuzzle';
const MainPage = () => {
  const canvas = useRef(null);
  const [puzzleLength,setPuzzleLength] = useState(3);
  const PUZZLE_SIZE = useRef(1);
  const fontSize = useRef(16);
  const puzzle = useRef([]);
  const EmptyPuzzlePos = useRef([0,0]);
  useEffect(()=>{
    puzzle.current = createPuzzle(puzzleLength);
    PUZZLE_SIZE.current = Math.floor((document.documentElement.clientWidth/3)/puzzleLength);
    const ctx = canvas.current.getContext("2d");
    ctx.canvas.width = PUZZLE_SIZE.current*puzzleLength+2;
    ctx.canvas.height = PUZZLE_SIZE.current*puzzleLength+2;
    ctx.lineWidth=1;
    ctx.strokeStyle='#000000';
    fontSize.current = Math.floor(PUZZLE_SIZE.current*0.8);
    ctx.font = `${fontSize.current}px Gothic`
    ctx.textAlign = 'center';
    for(let i = 0; i < puzzleLength ; i++){
      for(let j = 0; j < puzzleLength; j++){
        ctx.fillStyle='#FFC0CB';
        ctx.fillRect(i*PUZZLE_SIZE.current+1,j*PUZZLE_SIZE.current+1,PUZZLE_SIZE.current-2,PUZZLE_SIZE.current-2);
        ctx.strokeRect(i*PUZZLE_SIZE.current+0.5,j*PUZZLE_SIZE.current+0.5,PUZZLE_SIZE.current-1,PUZZLE_SIZE.current-1);
        ctx.fillStyle='#000000';
        ctx.fillText(`${puzzle.current[i][j]}`,i*PUZZLE_SIZE.current+Math.floor(PUZZLE_SIZE.current/2),j*PUZZLE_SIZE.current+Math.floor(PUZZLE_SIZE.current*0.8));
        if(puzzle.current[i][j]===0){
          EmptyPuzzlePos.current[0]=i;
          EmptyPuzzlePos.current[1]=j;
          ctx.fillStyle='#D3D3D3';
          ctx.fillRect(i*PUZZLE_SIZE.current+1,j*PUZZLE_SIZE.current+1,PUZZLE_SIZE.current-2,PUZZLE_SIZE.current-2);
        }
      }
    }
  },[])
  return (
    <>
      <canvas ref={canvas} />
    </>
  )
}

export default MainPage