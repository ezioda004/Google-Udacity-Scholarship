// Select color input
// Select size input
// $("h1").addClass("animated fadeIn")

$("#colorPicker").on("click", function(){
   var colorPicked = $(this).val();
   console.log(colorPicked);
});
// When size is submitted by the user, call makeGrid()
let colorPicked = $("#colorPicker").val();


function makeGrid() {

// Your code goes here!
let width = $("#inputWeight").val();
let height = $("#inputHeight").val();

console.log(width);

let rows = "";
let cols = "";
let firstRow = 1;;
for (let i = 1; i <= height; i++){
    // for (let j = 1; j <= width; j++){
    //     cols+=`<td></td>`;
    // }
    while (width>= firstRow){
        cols+=`<td></td>`;
        firstRow+=1;
    }
    rows+=`<tr>${cols}</tr>`
    // cols = "";

}
console.log(rows);
$("#pixelCanvas").html(rows);

$("td").on("click", function(){
    colorPicked = $("#colorPicker").val();
    console.log(colorPicked);
    $(this).css("background", colorPicked);
});
$("#select").addClass("animated fadeInDown");
    // fade
$("#canvas").fadeIn(2000, function(){
    
});



}

$("#submit").on("click", function(e){
    e.preventDefault();
    makeGrid();
   
});

$("#reset").on("click", function(e){
    e.preventDefault();
});



