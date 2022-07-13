export default class PriorityQueue {
    constructor(comp){
        this.heap = [];
        this.comp = comp;
        if(comp === undefined){this.comp = (a,b)=>{return a-b;}}
    }

    popLeft(){
        if(this.heap.length === 0){return null;}
        let min = this.heap[0];
        let last = this.heap.pop();
        if(this.heap.length !== 0){
            this.heap[0]=last;
            this.downHeap(0);
        }
        return min;
    }

    downHeap(pos){
        while(this.hasLeft(pos)){
            let s = null;
            const leftV = this.left(pos);        
            const rightV = this.right(pos);

            if(!this.hasRight(pos)){
                s = leftV;
            }else if(this.comp(this.heap[leftV],this.heap[rightV])<0){
                s = leftV;
            }else{
                s = rightV;
            }

            if(this.comp(this.heap[s],this.heap[pos])<0){
                this.swap(pos,s);
                pos = s;
            }else{
                break;
            }
        }
    }

    upHeap(pos){
        while(pos !== 0){
            let p = this.parent(pos);
            if(this.comp(this.heap[p],this.heap[pos])<=0){break;}
            this.swap(p,pos);
            pos = p;
        }
    }
    swap(x,y){const temp = this.heap[x]; this.heap[x] = this.heap[y]; this.heap[y] = temp;}

    parent(pos){return parseInt((pos-1)/2);}

    left(pos){return 2*pos+1;}

    right(pos){return 2*pos+2;}

    hasLeft(pos){return this.left(pos) < this.heap.length ? true : false;}

    hasRight(pos){return this.right(pos) < this.heap.length ? true : false;}

    push(value){this.heap.push(value); this.upHeap(this.heap.length-1);}

    size(){return this.heap.length;}
}