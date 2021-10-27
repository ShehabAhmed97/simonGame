var sequence =[]; //array for the sequence of clicks
var level = 1; //starting level
var clickCounter = -1; //counter for the number of clicks through the game

//initiating the audio objects
var green = new Audio("sounds/green.mp3");
var red = new Audio("sounds/red.mp3");
var yellow = new Audio("sounds/yellow.mp3");
var blue = new Audio("sounds/blue.mp3");
var wrong = new Audio("sounds/wrong.mp3");

$(document).one("keydown",function(e){ //one time event listener to start the game
    if(e.key == "a"){
        random();
        $("h1").text("Level " + level);
    }
})

$(document).on("click",function(e){ //check if the clicked element was one of the buttons
    var click = e.target;
    if($(click).hasClass("btn")){
        clickCounter++; //increasing number of clicks by one every single click
    }
})

$(".btn").on("click",function(){ //setting a listener for all the buttons
    var id = this.id; //detecting the id of the clicked button

    if(sequence.length != 0){ //check if the sequence array has elements, meanning that the player had pressed a to start

        $(this).addClass("pressed"); //animating the pressed button

            switch(id){ //actions based on the clicked button
                case "green":
                    var no = 1; //the green button has the number 1
                    checkButton(no,green)
                    break;

                case "red":
                    var no = 2;
                    checkButton(no,red)
                    break;

                case "yellow":
                    var no = 3;
                    checkButton(no,yellow)
                    break;

                case "blue":
                    var no = 4;
                    checkButton(no,blue)
                    break;              
            }
    
            setTimeout(function(){
                $(".btn").removeClass("pressed");
            },100)    
        
    }
})    



function random(){ //generating random number for the start of the game and adding it to the sequence
    var ranNumber = Math.floor(Math.random() * 4) + 1;
    sequence.push(ranNumber);

    switch(ranNumber){ //giving the player hint of the new button in the sequence to click
        case 1:
            setTimeout(function(){
                $("#green").addClass("hint");
                green.play();    
            },500)
            break;
        case 2:
            setTimeout(function(){
                $("#red").addClass("hint");
                red.play();    
            },500)
            break;
        case 3:
            setTimeout(function(){
                $("#yellow").addClass("hint");
                yellow.play();    
            },500)
            break;
        case 4:
            setTimeout(function(){
                $("#blue").addClass("hint");
                blue.play();    
            },500)
            break;              
    }

    setTimeout(function(){
        $(".btn").removeClass("hint");
    },500)
}



function checkButton(n,color){ //check if the button that the player clicked is in the right sequence
    setTimeout(function(){
        if(sequence[clickCounter] === n){ //checking if the number of the clicked buuton is the same in the sequence based on the clicks counter
            color.play();
            if(clickCounter == sequence.length-1){ //if this was the last number in the sequence, then upgrade to the next level
                random()
                level++;
                $("h1").text("Level " + level);    
                clickCounter = -1; 
            }
        }else{ //if the player clicked the wrong button, he loses and asked to click any button to restart the game
            wrong.play();
            $("body").addClass("game-over");
            $("h1").text("GAME OVER, Press any key to restart");    
            setTimeout(function(){
                $("body").removeClass("game-over")
            },500);

            $(document).on("keydown",function(){//adding event listener to the document so when the player presses any button, every thing changes back to the starting state
                sequence = [];
                clickCounter = -1; 
                level = 1;
                $("h1").text("Level " + level);    
                random();    
            })
        }    
    },200)
};