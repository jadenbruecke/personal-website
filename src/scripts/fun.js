var buttonColors = ["red", "blue", "green", "yellow"]

var gamePattern = []
var userClickedPattern = []
var gameStarted = false
var level = 0

$(document).keydown(function(){
    if (!gameStarted) {
        gameStarted = true
        nextSequence()
    }
})

function nextSequence(){
    userClickedPattern = []
    level++
    $("#level-title").text("Level " + level)

    var randomNumber = Math.floor((Math.random()*4))
    var randomChosenColor = buttonColors[randomNumber]
    gamePattern.push(randomChosenColor)
    // console.log(randomChosenColor)

    setTimeout(function(){
        makeSound(randomChosenColor)
        flash(randomChosenColor)
    }, 500)
    
}

$(".btn").click(function(){
    var userChosenColor = $(this).attr("id")
    userClickedPattern.push(userChosenColor)
    // console.log(userClickedPattern)
    makeSound(userChosenColor)
    animatePress(userChosenColor)

    if (checkAnswer(userClickedPattern.length)){
        if(userClickedPattern.length === level){
            nextSequence()
        }
    }
    else {
        makeSound("wrong")
        animateWrong()
        $("#level-title").text("Game Over, Press Any Key to Restart")
        startOver()
    }
    
})

function makeSound(fileName) {
    var mySound = new Audio("../sounds/"+fileName+".mp3")
    mySound.play()
}

function flash(chosenColor) {
    $("#"+chosenColor).fadeIn(100).fadeOut(100).fadeIn(100)
}

function animatePress(chosenColor) {
    $("#"+chosenColor).addClass("pressed")
    setTimeout(function() {
        $("#"+chosenColor).removeClass("pressed")
      }, 100)
}

function animateWrong() {
    $("body").addClass("game-over")
    setTimeout(function() {
        $("body").removeClass("game-over")
      }, 200)
}

function checkAnswer(currentLevel){
    if (userClickedPattern[currentLevel-1] === gamePattern[currentLevel-1]){
        console.log("correct")
        return true
    } else {
        console.log("wrong")
        return false
    }
}

function startOver(){
    gamePattern = []
    gameStarted = false
    level = 0
}