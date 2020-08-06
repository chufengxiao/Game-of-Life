// var pattern_list = [[[0,0]],[[-1,0],[0,0],[1,0]]]
class Interface {
    constructor(options) {
        var size = options.size
        var data = options.data
        this.rowNum = options.rowNum
        this.gridSize = options.gridSize
        this.pattern = pattern_list[6]

        // document.getElementById("grids").style.width=`${size}px`
        // document.getElementById("grids").style.height=`${size}px`

        var zoom = d3.zoom().scaleExtent([1, 10])
            .translateExtent([[0,0],[size,size]])
            .on("zoom", function () {
                svg.attr("transform", d3.event.transform)
            });

        var svg = d3.select("#grids")
            .append("svg")
            .attr("width", "100%")
            .attr("height", "100%")
            .style("margin","auto")
            .call(zoom)
            .append("g")

        this.row = svg.selectAll(".row")
            .data(data)
            .enter().append("g")
            .attr("class", "row");
            
        this.column = this.row.selectAll(".square")
            .data(function(d) { return d; })
            .enter().append("rect")
            .attr("class","square")
            .attr("x", function(d) { return d.x; })
            .attr("y", function(d) { return d.y; })
            .attr("width", function(d) { return d.width; })
            .attr("height", function(d) { return d.height; })
            .style("fill", "#fff")
            .style("stroke", "#222")
            .on('click', (d) => {
                this.hoverPattern(d,0)
            })
            .on('mouseover', (d) => {
                if(d.isAlive == 0)
                    this.hoverPattern(d,1)
            })
            .on('mouseleave', (d) => {
                if(d.isAlive == 0)
                    this.hoverPattern(d,2)
            });
        this.autoEdit = false

        // console.log(this.row.selectAll(".square"))
        // console.log(rowNum);
    }
    dispGrids(){
        this.column.style("stroke", "#222")
    }
    hideGrids(){
        this.column.style("stroke", "#fff")
    }
    getRandomPoint(){
        for(;;){
            var y = randomNum(0,this.rowNum-1),
                x = randomNum(0,this.rowNum-1);
            var p = this.column["_groups"][y][x].__data__;
            if(p.isAlive == 0) break;
        }
        return p
    }

    randomSelected(){
        var p = this.getRandomPoint();
        this.hoverPattern(p,0);
    }

    randomAll(){
        for(let i=0;i<5;i++){
            var p = this.getRandomPoint();
            var pat_idx = randomNum(1,5);
            var pattern = pattern_list[pat_idx]
            this.hoverPattern(p,0,pattern)
        }
        
    }

    hoverPattern(data,type,pattern=this.pattern){
        
        var x = parseInt(data.x/this.gridSize), y = parseInt(data.y/this.gridSize);

        if (type == 0 && data.isAlive == 1){
            data.isAlive = 0
            this.column["_groups"][y][x].style.fill = "#fff";
            return
        }
        for(let i=0;i<pattern.length;i++){
            let r = y + pattern[i][0],
                c = x + pattern[i][1];
                
            try {
                let d = this.column["_groups"][r][c].__data__;
                if(type==0){
                    d.isAlive = 1;
                    if (d.isAlive) { this.column["_groups"][r][c].style.fill = "rgb(44, 147, 232)"; }
                    else { this.column["_groups"][r][c].style.fill = "#fff";  }
                }
                else if(type==1 && d.isAlive == 0){
                    if(this.autoEdit){
                        d.isAlive = 1;
                        this.column["_groups"][r][c].style.fill="rgba(44, 147, 232)";
                    }
                    else {
                        this.column["_groups"][r][c].style.fill="rgba(44, 147, 232, 0.4)";
                    }
                    
                }
                else if(type==2 && d.isAlive == 0){
                    this.column["_groups"][r][c].style.fill="#fff";
                }
            } catch (error) {
                continue
            }
        }
    }

    updateBoard() {
        this.row.selectAll(".square")
            .data(function(d) { return d; })
            .style("fill",function(d){return d.isAlive?"rgb(44, 147, 232)":"#fff"})
    }
}


function randomNum(minNum,maxNum){ 
    switch(arguments.length){ 
        case 1: 
            return parseInt(Math.random()*minNum+1,10); 
        break; 
        case 2: 
            return parseInt(Math.random()*(maxNum-minNum+1)+minNum,10); 
        break; 
            default: 
                return 0; 
            break; 
    } 
} 