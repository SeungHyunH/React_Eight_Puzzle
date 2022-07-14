import React,{useRef,useEffect,useState} from 'react'
import createPuzzle from '../util/createPuzzle';
import solver from '../util/solver';
import styled from 'styled-components';
const MainPage = () => {
  const canvas = useRef(null);
  const [puzzleLength,setPuzzleLength] = useState(3);
  const [moveCount,setMoveCount] = useState(0);
  const PUZZLE_SIZE = useRef(1);
  const fontSize = useRef(16);
  const puzzle = useRef([]);
  const currentPos = useRef([0,0]);
  const answer = useRef([]);
  const time = useRef({start: 0, elapsed: 0});
  const path = useRef();
  const pathIndex = useRef(-1);
  useEffect(()=>{
    puzzle.current = createPuzzle(puzzleLength);
    answer.current = Array.from(Array(puzzleLength),()=>Array(puzzleLength).fill(0));
    for(let i = 0; i < puzzleLength; i++){
      for(let j = 0; j < puzzleLength; j++){
        answer.current[i][j]=i*puzzleLength+j+1;
      }
    }
    answer.current[puzzleLength-1][puzzleLength-1] = 0;
    PUZZLE_SIZE.current = Math.floor((document.documentElement.clientWidth/2.5)/puzzleLength);
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
          setMoveCount(moveCount+1);
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
          setMoveCount(moveCount+1);
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
          setMoveCount(moveCount+1);
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
          setMoveCount(moveCount+1);
          if(CheckAnswer()){alert('정답');}
        }
        break;
      default:
        break;
    }
  }

  const animate = (now = 0)=>{
    if(pathIndex.current<0){
      alert('골인! 원래대로 배치합니다');
      const ctx = canvas.current.getContext("2d");
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
      return;
    }
    // 지난 시간을 업데이트한다.
    time.current.elapsed = now - time.current.start;
    // 지난 시간이 현재 레벨의 시간을 초과했는지 확인한다.
    if (time.current.elapsed > 1000) {
      // 현재 시간을 다시 측정한다.
      time.current.start = now;

      const ctx = canvas.current.getContext("2d");
      for(let i = 0; i < puzzleLength*puzzleLength; i++){
        const ty = i/puzzleLength>>0;
        const tx = i%puzzleLength;
        ctx.fillStyle='#FFC0CB';
        ctx.fillRect(tx*PUZZLE_SIZE.current+1,ty*PUZZLE_SIZE.current+1,PUZZLE_SIZE.current-2,PUZZLE_SIZE.current-2);
        ctx.strokeRect(tx*PUZZLE_SIZE.current+0.5,ty*PUZZLE_SIZE.current+0.5,PUZZLE_SIZE.current-1,PUZZLE_SIZE.current-1);
        ctx.fillStyle='#000000';
        ctx.fillText(`${path.current[pathIndex.current][i]}`,tx*PUZZLE_SIZE.current+Math.floor(PUZZLE_SIZE.current/2),ty*PUZZLE_SIZE.current+Math.floor(PUZZLE_SIZE.current*0.8));
        if(path.current[pathIndex.current][i]==='0'){
          ctx.fillStyle='#D3D3D3';
          ctx.fillRect(tx*PUZZLE_SIZE.current+1,ty*PUZZLE_SIZE.current+1,PUZZLE_SIZE.current-2,PUZZLE_SIZE.current-2);
        }
      }
      pathIndex.current-=1;
    }
    requestAnimationFrame(animate);
  }

  const AutoPlay = () =>{
    path.current = solver(puzzle.current);
    pathIndex.current = path.current.length-1;
    animate();
  }

  return (
    <Wrap tabIndex="0" onKeyDown={(e) => MovePuzzle(e)}>
      <MainContainer><canvas ref={canvas}/></MainContainer>
      <SideConainer>
        <Counter>움직인 횟수 : {moveCount}</Counter>
        <Button onClick={AutoPlay}>AutoPlay</Button>
      </SideConainer>
    </Wrap>
  )
}

const Wrap = styled.div`
  width : 100vw;
  height : 100vh;
  display: flex;
  flex-direction: row;
  :focus{outline: none;}
`

const MainContainer = styled.div`
  width: 75%;
  display: flex;
  justify-content: center;
  align-items: center;
`

const SideConainer = styled.div`
  width: 25%;
  padding-top: 5%;
  display: flex;
  flex-direction: column;
  align-items: left;
`
const Counter = styled.div`
  width: 12rem;
  height: 3rem;
`

const Button = styled.button`
  width: 12rem;
  height: 3rem;
`

export default MainPage