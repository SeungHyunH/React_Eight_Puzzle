import PriorityQueue from './priorityQueue';
export default function solver (init)
{   
    console.log('start',init);
    const ROW = init.length;
    const COL = init[0].length;
    const ANSWER = Array.from(Array(ROW*ROW),(_,idx)=>idx === ROW*ROW-1 ? 0 : idx+1);
    const ANSWER_TEXT = ANSWER.join('');
    const DIR = [[0,1],[1,0],[0,-1],[-1,0]];
    class Node{
        constructor(data,g,f,parent){
            this.data = data;
            this.g = g;
            this.f = f;
            this.parent = parent;
        }
    }
    
    const getHeuristic = (data) =>{
        let count = 0;
        //123456780
        for(let i = 0; i < data.length; i++){
            if(data[i]===0){continue;}
            let answerX = i/ROW>>0;
            let answerY = i%COL;
            let curX = (data[i]-1)/ROW>>0;
            let curY = (data[i]-1)%COL;
            count+=Math.abs(curX-answerX)+Math.abs(curY-answerY); //Manhattan
            if(data[i]!==ANSWER[i]){count+=2;}//Hamming
        }
        return count;
    }

    const isValid = (x,y)=>{
        return (x >= 0 && x < ROW && y >= 0 && y < COL) ? true : false;
    }

    const getNext = (tx,ty,nx,ny,data) =>{
        const result = [...data];
        const cur = tx*3+ty;
        const next = nx*3+ny;
        const temp = result[cur];
        result[cur] = result[next];
        result[next] = temp;
        return result;
    }

    const initData = init.flat();
    const pq = new PriorityQueue((a,b)=>{
        if(a.f===b.f){return a.g-b.g;}
        return a.f-b.f;
    });

    const visited = {};
    const initNode = new Node(initData,0,0,null);
    pq.push(initNode);
    visited[initData.join('')]=initNode;
    while(pq.size()!==0 && !visited.hasOwnProperty(ANSWER_TEXT)){
        let cur = pq.popLeft();
        let emptyIndex = cur.data.join('').indexOf('0');
        let tx = emptyIndex/ROW >> 0;
        let ty = emptyIndex%COL;

        for(let i = 0; i < 4; i++){
            let nx = tx+DIR[i][0];
            let ny = ty+DIR[i][1];
            let nextDataText;
            let nextData;
            if(isValid(nx,ny)){
                nextData = getNext(tx,ty,nx,ny,cur.data);
                nextDataText = nextData.join('');
                if(visited.hasOwnProperty(nextDataText)){continue;}
                else{
                    let g = cur.g+1;
                    let h = getHeuristic(nextData);
                    let f = g+h;
                    const next = new Node(nextData,g,f,cur);
                    pq.push(next);
                    visited[nextDataText]=next;
                }
            }
        }
    }
    const path = [];
    let temp = visited[ANSWER_TEXT];
    if(temp === undefined){console.log('error');}
    else{
        while(temp.parent !== null){
            path.push(temp.data.join(''));
            temp = temp.parent;
        }
        path.push(initData.join(''));
        console.log('end',path);
    }
}
