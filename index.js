var buttonColors = ["red","green","yellow","blue"];
var gamepattern = [];
var userClickedPattern = [];
var started = false;
var level = 0;

$(document).keypress(function(){
    if(started != true)
    {
        $("#level-title").text("Level " + level);
        nextSequence();
        started = true;
    }
})
$(".btn").click(function(){

    var userChoosenColor = $(this).attr("id");
    userClickedPattern.push(userChoosenColor);

    makeSound(userChoosenColor);
    animatePress(userChoosenColor);

    checkAnswer(userClickedPattern.length-1);
})  
function checkAnswer(currentLevel)
{
    if(gamepattern[currentLevel] === userClickedPattern[currentLevel])
    {
        console.log("success");
        if(userClickedPattern.length ===  gamepattern.length)
        {
            setTimeout(function(){
                nextSequence();
            },1000);
        }
    }
    else{
        console.log("Wrong");
        makeSound("wrong");
        $("body").addClass("game-over");
        setTimeout(function(){
            $("body").removeClass("game-over");
        },200);
        $("#level-title").text("Game Over, Press Any Key to Restart");
        startOver();
    }
}
function nextSequence()
{
    userClickedPattern = [];
    level++;   
    $("#level-title").text("Level " + level);
    var randomNumber = Math.floor(Math.random()*4);
    var randomChoosenColor = buttonColors[randomNumber];
    gamepattern.push(randomChoosenColor);

    $("#"+randomChoosenColor).fadeIn(100).fadeOut(100).fadeIn(100);
    makeSound(randomChoosenColor);

}
function makeSound(key)
{
    var sound = new Audio("sounds/" + key +".mp3");
    sound.play();
}
function animatePress(key)
{
    $("#" + key).addClass("pressed");
    setTimeout(function() {
        $("#" + key).removeClass("pressed");
    },100);
}
function startOver()
{
    level = 0;
    gamepattern = [];
    started = false;
}
