$("document").ready(function(){


//declared and initialized variables
let colorPicked = $("#colorPicker").val();


function makeGrid() { //Grid creating function

// Your code goes here!
    let width = $("#inputWeight").val();
    let height = $("#inputHeight").val();



    let rows = "";
    let cols = "";
    let firstRow = 1;;
    for (let i = 1; i <= height; i++){
        while (width>= firstRow){  //loop only runs once
            cols+=`<td></td>`; //a whole row created
            firstRow+=1;
        }
        rows+=`<tr>${cols}</tr>` //pushes cols to each row
    }
    $("#pixelCanvas").html(rows); //pushes all rows to table

    $("td").on("click", function(){ //event listener for td clicks
        colorPicked = $("#colorPicker").val();
        $(this).css("background", colorPicked);
    });

//Animating when the grid function is ran

    $("#select").addClass("btn-animate"); 
    $("#canvas").css({"opacity": "0","visibility": "visible"}).animate({opacity: 1}, 2000);
}

//Submit button event handler
$("#submit").on("click", function(e){
    e.preventDefault();
    makeGrid();
   
});

//Reset button event handler
$("#reset").on("click", function(e){
    e.preventDefault();
    $("#inputWeight").val(1);
    $("#inputHeight").val(1);
    $("#select").removeClass("btn-animate");
    $("#pixelCanvas").html("");
    $("#canvas").css("visibility", "hidden");
    $("input[type='color']").val("black");  
    
});


});
