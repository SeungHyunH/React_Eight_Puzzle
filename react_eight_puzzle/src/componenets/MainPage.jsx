import React,{useRef,useEffect,useState} from 'react'
import createPuzzle from '../util/createPuzzle';
import solver from '../util/solver';
import styled from 'styled-components';
const MainPage = () => {
  const canvas = useRef(null);
  const [puzzleLength,setPuzzleLength] = useState(3);
  const PUZZLE_SIZE = useRef(1);
  const fontSize = useRef(16);
  const puzzle = useRef([]);
  const currentPos = useRef([0,0]);
  const answer = useRef([]);
  useEffect(()=>{
    puzzle.current = createPuzzle(puzzleLength);
    answer.current = Array.from(Array(puzzleLength),()=>Array(puzzleLength).fill(0));
    for(let i = 0; i < puzzleLength; i++){
      for(let j = 0; j < puzzleLength; j++){
        answer.current[i][j]=i*puzzleLength+j+1;
      }
    }
    answer.current[puzzleLength-1][puzzleLength-1] = 0;
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
        ctx.fillRect(j*PUZZLE_SIZE.current+1,i*PUZZLE_SIZE.current+1,PUZZLE_SIZE.current-2,PUZZLE_SIZE.current-2);
        ctx.strokeRect(j*PUZZLE_SIZE.current+0.5,i*PUZZLE_SIZE.current+0.5,PUZZLE_SIZE.current-1,PUZZLE_SIZE.current-1);
        ctx.fillStyle='#000000';
        ctx.fillText(`${puzzle.current[i][j]}`,j*PUZZLE_SIZE.current+Math.floor(PUZZLE_SIZE.current/2),i*PUZZLE_SIZE.current+Math.floor(PUZZLE_SIZE.current*0.8));
        if(puzzle.current[i][j]===0){
          currentPos.current[0]=i;
          currentPos.current[1]=j;
          ctx.fillStyle='#D3D3D3';
          ctx.fillRect(j*PUZZLE_SIZE.current+1,i*PUZZLE_SIZE.current+1,PUZZLE_SIZE.current-2,PUZZLE_SIZE.current-2);
        }
      }
    }
  },[puzzleLength])

  const CheckAnswer = ()=> {
    for(let i = 0; i < puzzleLength; i++){
      for(let j = 0; j < puzzleLength; j++){
        if(puzzle.current[i][j]!==answer.current[i][j]){return false;}
      }
    }
    return true;
  }

  const MovePuzzle = (e)=>{
    const ctx = canvas.current.getContext("2d");
    switch(e.key){
      case 'ArrowLeft':
        if(currentPos.current[1]!==0){
          ctx.fillStyle='#FFC0CB';
          ctx.fillRect(currentPos.current[1]*PUZZLE_SIZE.current+1,currentPos.current[0]*PUZZLE_SIZE.current+1,PUZZLE_SIZE.current-2,PUZZLE_SIZE.current-2);
          ctx.fillStyle='#000000';
          ctx.fillText(`${puzzle.current[currentPos.current[0]][currentPos.current[1]-1]}`,currentPos.current[1]*PUZZLE_SIZE.current+Math.floor(PUZZLE_SIZE.current/2),currentPos.current[0]*PUZZLE_SIZE.current+Math.floor(PUZZLE_SIZE.current*0.8));
          ctx.fillStyle='#D3D3D3';
          ctx.fillRect((currentPos.current[1]-1)*PUZZLE_SIZE.current+1,currentPos.current[0]*PUZZLE_SIZE.current+1,PUZZLE_SIZE.current-2,PUZZLE_SIZE.current-2);
          puzzle.current[currentPos.current[0]][currentPos.current[1]] = puzzle.current[currentPos.current[0]][currentPos.current[1]-1];
          puzzle.current[currentPos.current[0]][currentPos.current[1]-1]= 0;
          currentPos.current[1] -=1;
          if(CheckAnswer()){alert('정답');}
        }
        break;
      case 'ArrowRight':
        if(currentPos.current[1]<=puzzleLength-2){
          ctx.fillStyle='#FFC0CB';
          ctx.fillRect(currentPos.current[1]*PUZZLE_SIZE.current+1,currentPos.current[0]*PUZZLE_SIZE.current+1,PUZZLE_SIZE.current-2,PUZZLE_SIZE.current-2);
          ctx.fillStyle='#000000';
          ctx.fillText(`${puzzle.current[currentPos.current[0]][currentPos.current[1]+1]}`,currentPos.current[1]*PUZZLE_SIZE.current+Math.floor(PUZZLE_SIZE.current/2),currentPos.current[0]*PUZZLE_SIZE.current+Math.floor(PUZZLE_SIZE.current*0.8));
          ctx.fillStyle='#D3D3D3';
          ctx.fillRect((currentPos.current[1]+1)*PUZZLE_SIZE.current+1,currentPos.current[0]*PUZZLE_SIZE.current+1,PUZZLE_SIZE.current-2,PUZZLE_SIZE.current-2);
          puzzle.current[currentPos.current[0]][currentPos.current[1]] = puzzle.current[currentPos.current[0]][currentPos.current[1]+1];
          puzzle.current[currentPos.current[0]][currentPos.current[1]+1]= 0;
          currentPos.current[1] +=1;
          if(CheckAnswer()){alert('정답');}
        }
        break;
      case 'ArrowUp':
        if(currentPos.current[0] !== 0){
          ctx.fillStyle='#FFC0CB';
          ctx.fillRect(currentPos.current[1]*PUZZLE_SIZE.current+1,currentPos.current[0]*PUZZLE_SIZE.current+1,PUZZLE_SIZE.current-2,PUZZLE_SIZE.current-2);
          ctx.fillStyle='#000000';
          ctx.fillText(`${puzzle.current[currentPos.current[0]-1][currentPos.current[1]]}`,currentPos.current[1]*PUZZLE_SIZE.current+Math.floor(PUZZLE_SIZE.current/2),currentPos.current[0]*PUZZLE_SIZE.current+Math.floor(PUZZLE_SIZE.current*0.8));
          ctx.fillStyle='#D3D3D3';
          ctx.fillRect((currentPos.current[1])*PUZZLE_SIZE.current+1,(currentPos.current[0]-1)*PUZZLE_SIZE.current+1,PUZZLE_SIZE.current-2,PUZZLE_SIZE.current-2);
          puzzle.current[currentPos.current[0]][currentPos.current[1]] = puzzle.current[currentPos.current[0]-1][currentPos.current[1]];
          puzzle.current[currentPos.current[0]-1][currentPos.current[1]]= 0;
          currentPos.current[0] -=1;
          if(CheckAnswer()){alert('정답');}
        }
        break;
      case 'ArrowDown':
        if(currentPos.current[0] <=puzzleLength-2){
          ctx.fillStyle='#FFC0CB';
          ctx.fillRect(currentPos.current[1]*PUZZLE_SIZE.current+1,currentPos.current[0]*PUZZLE_SIZE.current+1,PUZZLE_SIZE.current-2,PUZZLE_SIZE.current-2);
          ctx.fillStyle='#000000';
          ctx.fillText(`${puzzle.current[currentPos.current[0]+1][currentPos.current[1]]}`,currentPos.current[1]*PUZZLE_SIZE.current+Math.floor(PUZZLE_SIZE.current/2),currentPos.current[0]*PUZZLE_SIZE.current+Math.floor(PUZZLE_SIZE.current*0.8));
          ctx.fillStyle='#D3D3D3';
          ctx.fillRect((currentPos.current[1])*PUZZLE_SIZE.current+1,(currentPos.current[0]+1)*PUZZLE_SIZE.current+1,PUZZLE_SIZE.current-2,PUZZLE_SIZE.current-2);
          puzzle.current[currentPos.current[0]][currentPos.current[1]] = puzzle.current[currentPos.current[0]+1][currentPos.current[1]];
          puzzle.current[currentPos.current[0]+1][currentPos.current[1]]= 0;
          currentPos.current[0] +=1;
          if(CheckAnswer()){alert('정답');}
        }
        break;
      default:
        break;
    }
  }
  return (
    <Wrap tabIndex="0" onKeyDown={(e) => MovePuzzle(e)}>
      <canvas ref={canvas}/>
      <button onClick={()=>solver(puzzle.current)}>Test</button>
    </Wrap>
  )
}

const Wrap = styled.div`
  width : 100vw;
  height : 100vh;
  :focus{outline: none;}
`

export default MainPage