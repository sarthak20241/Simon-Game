var buttonColors=["green","red","yellow","blue"];
var gamePattern=[];
var userClickedPattern=[];
var level=0;
var started = false;
var index=0;
function nextSequence(){
    level+=1;
    $("h1").text("Level "+level);
    var box=Math.floor(Math.random()*4);
    console.log(box);
    var buttonColor=buttonColors[box];
    gamePattern.push(buttonColor);
    console.log(gamePattern);
    var button=$("#"+buttonColor);
    button.fadeOut(100).fadeIn(100);
    playSound(buttonColor);

    //new level
    userClickedPattern=[];
    index=0;
}

function playSound(name){
    var audio=new Audio("sounds/"+name+".mp3");
    audio.play();
}

function animatePress(currentColor){
    $("#"+currentColor).addClass("pressed");
    setTimeout(function(){
        $("#"+currentColor).removeClass("pressed");
    },100);
    
}

function checkAnswer(userClickedColor){
    if(gamePattern[index]!=userClickedColor){
        console.log("wrong");
        return false;
    }
    console.log("success");
    return true;
}

function gameOver(){
    level=0;
    gamePattern=[];
    index=0;
    userClickedPattern=[];
    started=false;
    playSound("wrong");
    $("h1").text("Game Over, Press Key to restart");
    $("body").addClass("game-over");
    setTimeout(function(){
        $("body").removeClass("game-over");
    },200);
}
//nextSequence();

$(document).on("keydown",function(){
    if(!started){
        nextSequence();
        started=true;
    }
});
$(".btn").click(function(){
    if(started){
        var userChosenColor=$(this).attr("id");
        userClickedPattern.push(userChosenColor);
        console.log(userClickedPattern);
        playSound(userChosenColor);
        animatePress(userChosenColor);
        var correct=checkAnswer(userChosenColor);
        if(correct){
            index++;
            if(index==gamePattern.length){

                setTimeout(function(){
                    nextSequence();
                },1000);
            }
        }
        else{
            gameOver();
        }
    }
});