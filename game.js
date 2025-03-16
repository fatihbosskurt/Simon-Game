let userClickedPattern = [];

const buttonColours = ["red","blue", "green", "yellow"];
let gamePattern = [];
let level = 0;

$(document).keypress(function() {
    if(level === 0) {
    nextSequence();
    }
});

$(".btn").click(function()  {
    let userChosenColour = $(this).attr("id");
    animatePress(userChosenColour);
    $("#" + userChosenColour).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);
    playAudio(userChosenColour);
    userClickedPattern.push(userChosenColour);
    console.log(userClickedPattern);
    checkAnswer(userClickedPattern.length - 1);
});

function checkAnswer(level) {
    if(userClickedPattern[level] === gamePattern[level]) {
        console.log("success");

        if(userClickedPattern.length === gamePattern.length) {
            setTimeout(function() {
                nextSequence();
            }, 1000);
        } 
    }else {
        console.log("wrong");
        let wrongAudio = new Audio("sounds/wrong.mp3");
        wrongAudio.play();
        $("body").addClass("game-over");
        setTimeout(function() {
            $("body").removeClass("game-over");
        }, 200);
        $("h1").text("Game Over, Press Any Key to Restart");
        startOver();
        }
    }


function nextSequence() {
    userClickedPattern = [];
    level++;

    $("h1").text("Level " + level);
    const randomNumber = Math.floor(Math.random() * 4);
    let randomChosenColour = buttonColours[randomNumber];
    $("#" + randomChosenColour).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);
    playAudio(randomChosenColour);
    gamePattern.push(randomChosenColour);
}

function startOver() {
    level = 0;
    gamePattern = [];
}

function playAudio(audioToPlay) {
    let audio = new Audio("sounds/" + audioToPlay + ".mp3");
    audio.play();
}

function animatePress(currentColour) {
    $("#" + currentColour).addClass("pressed");
    setTimeout(function() {
        $("#" + currentColour).removeClass("pressed");
    },100);
}
