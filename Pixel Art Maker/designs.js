// Select color input
// Select size input
$("#colorPicker").on("click", function(){
   var colorPicked = $(this).val();
   console.log(colorPicked);
});
// When size is submitted by the user, call makeGrid()

function makeGrid() {

// Your code goes here!
let width = $("#inputWeight").val();
let height = $("#inputHeight").val();
let colorPicked = $("#colorPicker").val();
console.log(width);

let rows = "";
let cols = "";
for (let i = 1; i <= height; i++){
    for (let j = 1; j <= width; j++){
        cols+=`<td></td>`;
    }
    rows+=`<tr>${cols}</tr>`
    cols = "";

}
console.log(rows);
$("#pixelCanvas").html(rows);

$("td").on("click", function(){
    console.log(colorPicked);
    $(this).css("background", colorPicked);
})


}

$("#submit").on("click", function(e){
    e.preventDefault();
    makeGrid();
});

