$(document).ready(function(){
    var size = 800
var gridSize = 20
var rowNum = parseInt(size/gridSize)

var data = gridData(size,gridSize);
var options = {data: data, 
               size: size,
               gridSize: gridSize,
               rowNum: rowNum,
            }

var interface = new Interface(options)
interface.updateBoard()
options.updateFunction=function () {
    interface.updateBoard()
}
options.speed = 1000
var simulation = new Simulation(options)

$("#switch").change(function() {
    if($(this).is(":checked")) {
        simulation.updateState();
    }
    else {
        simulation.stop();
    }
});

var currentIdx = -1;
$('.collapsible').collapsible({
    accordion: true,    
    onOpen: function(el){
        //$('li.roles_icon', this).html('remove');
        // console.log($(el).find('.collapsible-header').text());
        currentIdx = $(el).index()
        changePattern(currentIdx)
        
    },
    onClose:function(el){
        var idx = $(el).index()
        if (idx==currentIdx) changePattern(6);
    }

});
$("input[name='group']").change(function() {
    var idx = parseInt($(this).val())
    if (idx!=0) {interface.pattern=pattern_list[idx]}
    else {
        clearData(data)
        var scm_pattern = pattern_list[0];
        for(let i=0;i<scm_pattern.length;i++){
            let p = scm_pattern[i]
            data[p[0]][p[1]].isAlive=1
        }
        interface.updateBoard()
        interface.pattern = pattern_list[6]
    }
})

$("#clear").click(function () {
    clearData(data)
    interface.updateBoard()
});

$("#random").click(function () {
    interface.randomAll()
});

$("#ranSelected").click(function () {
    interface.randomSelected()
});

$("#dis_grids").change(function() {
    if($(this).is(":checked")) {
        interface.dispGrids()
    }
    else {
        interface.hideGrids()
    }
});

$("#auto_edit").change(function() {
    if($(this).is(":checked")) {
        interface.autoEdit = true
    }else{
        interface.autoEdit = false
    }
});

var slider = document.getElementById('speed');
var speedSpan = document.getElementById('speedSpan');
noUiSlider.create(slider, {
   start: 2,
   connect: [true,false],
   step: 1,
   range: {
     'min': 0,
     'max': 4
   },
   format: wNumb({
     decimals: 0
   })
  });

slider.noUiSlider.on('update', function (values, handle) {
    let value = parseInt(values[handle])
    let ms_list = [1000,500,100,50,10],
        speeds = [1,5,10,50,100];

    speedSpan.innerHTML = `Speed: x${speeds[value]}`;
    simulation.updateSpeed(ms_list[value]);
});

var nextBtn = document.querySelector("#next");
nextBtn.addEventListener('click', function(){
    if(!simulation.timer) simulation.stop()
    simulation.nextOne()
});

function changePattern(idx){
    if (idx!=0) {interface.pattern=pattern_list[idx]}
    else {
        clearData(data)
        var scm_pattern = pattern_list[0];
        for(let i=0;i<scm_pattern.length;i++){
            let p = scm_pattern[i]
            data[p[0]][p[1]].isAlive=1
        }
        interface.updateBoard()
        interface.pattern = pattern_list[6]
    }
}
});

function gridData(size,gridSize) {
	var data = new Array();
	var xpos = 1; //starting xpos and ypos at 1 so the stroke will show when we make the grid below
	var ypos = 1;
	var alive = 0;
	var num = parseInt(size/gridSize)
	
	for (var row = 0; row < num; row++) {
		data.push(new Array());
		for (var column = 0; column < num; column++) {
			data[row].push({
				x: xpos,
				y: ypos,
				width: gridSize,
				height: gridSize,
				isAlive: alive
			})
			// increment the x position. I.e. move it over by 50 (width variable)
			xpos += gridSize;
		}
		xpos = 1;
		ypos += gridSize;	
	}
	return data;
}

function clearData(data){
    for(let i=0;i<data.length;i++)
        for(let j=0;j<data.length;j++){
            data[i][j].isAlive=0
        }
}














