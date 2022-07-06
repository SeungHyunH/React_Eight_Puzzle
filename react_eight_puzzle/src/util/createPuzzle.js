export default function createPuzzle(SIZE){
    let puzzle = null;

    const createRandomPuzzle = () =>{
        const initPuzzle = Array.from(Array(SIZE*SIZE),(_,idx)=>idx);
        puzzle = Array.from(Array(SIZE),()=>Array(SIZE).fill(0));
        for(let i = 0; i < SIZE; i++){
            for(let j = 0; j < SIZE; j++){
                const randomIndex = Math.floor((window.crypto.getRandomValues(new Uint32Array(1))/4294967296)*initPuzzle.length);
                puzzle[i][j]=initPuzzle.splice(randomIndex,1)[0];
            }
        }
    }

    const isValid = () => {
        let result = false;
        let inversionCount = 0;
        let yPosition = 0;
        for(let y = 0; y < SIZE; y++){
            for(let x = 0; x < SIZE; x++){
                const cur = puzzle[y][x];
                if(cur === 0){
                    yPosition = SIZE-y;
                    continue;
                }
                for(let i = y; i < SIZE; i++){
                    for(let j = 0; j < SIZE; j++){
                        if(puzzle[i][j]===0 || (i===y && j<=x)){continue;}
                        if(cur > puzzle[i][j]){
                            inversionCount+=1;
                        }
                    }
                }
            }
        }
    
        console.log(inversionCount,yPosition,puzzle);
    
        if(SIZE%2===1){
            if(inversionCount%2===0){result=true;}
        }else{
            if(yPosition%2 === 0 && inversionCount%2 === 1){
                result = true;
            }
            else if(yPosition%2 === 1 && inversionCount%2 === 0){
                result = true;
            }
        }
        return result;
    }


    createRandomPuzzle();
    while(!isValid()){
        createRandomPuzzle();
    }
    console.log(puzzle);
    return puzzle;
}