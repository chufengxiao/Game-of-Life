class Simulation {
    constructor(options) {
        this.data = options.data
        this.update = options.updateFunction
        this.speed = options.speed
        this.rowNum = options.rowNum
        this.timer = null
    }

    updateSpeed(speed){
        this.speed = speed
    }

    updateState(){
        this.generateNextState();
        this.update();
        this.timer = setTimeout(() => {this.updateState();}, this.speed);
    }
    nextOne(){
        this.updateState()
        this.stop()
    }

    stop(){
        clearTimeout(this.timer)
        this.timer = null
    }

    generateNextState(){
        var tempArr = JSON.parse(JSON.stringify(this.data)) //do a deep copy for 2D Array-Object
        for(let i=0; i<this.rowNum; i++){
            for(let j=0; j<this.rowNum; j++){
                let value = tempArr[i][j].isAlive;
                let aliveCount = this.getAliveCount(tempArr, i, j);
                this.data[i][j].isAlive = this.getNextState(value, aliveCount);
            }
        }
    }

    getNextState(value, count){
    
        var result = 0;
    
        if(value === 0){
            // For a dead cell, its state is changed to be alive
            if(count === 3) result = 1;
        }else if(value === 1){
            // For a alive cell, its state stay alive
            if(count ===2 || count === 3)result = 1;
        }
    
        return result;
    }
    
    //get the alive count around a cell
    getAliveCount(arr, x, y){
        var count = 0;
        for(var i=x-1; i<=x+1; i++){
            for(var j=y-1; j<=y+1; j++){
                if(i===x && j===y)continue;
                try{
                    if(arr[i][j].isAlive === 1)count++;
                }catch(e){
    
                }
            }
        }
        return count;
    }

}