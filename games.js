var buttonColours = ["red", "blue", "green", "yellow"];

var gamePattern = [];
var userClickedPattern = [];

var started = false;
var level = 0;
var canClick = false;
var flash = 0;

//if key has press it will start the game
$(document).keypress(function () {
    if (!started) {
        $("#leve-title").text("level " + level);
        // nextSequence();
        colorPattern();
        started = true;
    }
});


$(".btn").click(function () {

    if (canClick == true) {
    
    console.log("True");
    
    let userChosenColour = $(this).attr("id");
    
    userClickedPattern.push(userChosenColour);

    animatePress(userChosenColour);

    playSound(userChosenColour);
    
    checkAnswer(userClickedPattern.length - 1);
    
    } else {
        console.log("false");
    }

});



//this is when the user guess the game pattern
// var clickbtn = $(".btn").click(function () {

//     let userChosenColour = $(this).attr("id");

//     userClickedPattern.push(userChosenColour);

//     animatePress(userChosenColour);

//     playSound(userChosenColour);

//     checkAnswer(userClickedPattern.length - 1);

// });



//it will check if the user follow the correct patter of the game
function checkAnswer(currentLevel) {

    if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {

        console.log(`success current level: ${currentLevel}`);

        if (userClickedPattern.length === gamePattern.length) {
            
            setTimeout(function () {
                colorPattern();
            }, 1000);
        }

    } else {

        playSound("wrong");

        $("body").addClass("game-over");

        setTimeout(() => {
            $("body").removeClass("game-over");
        }, 500)

        $("#level-title").text("Game Over Press any Key to Restart");

        startOver();
    }

}


const flashPattern = gameSequence => {

    return new Promise((resolve, reject) => {
        $("#" + gameSequence).addClass("blinked");
        playSound(gameSequence);

        setTimeout(() => {
            $("#" + gameSequence).removeClass("blinked");
            setTimeout(() => {
                resolve();
            }, 500);
        }, 1000)
    });

}

//generate pattern, looping the pattern of game for every level
const colorPattern = async () => {
    //reset for nxt level
    userClickedPattern = [];
    level++;

    $("#level-title").text("Level " + level);

    if (level <= 3) {
       
        let randomNumber = Math.floor(Math.random() * 4);
        let randomChosenColour = buttonColours[randomNumber];
        gamePattern.push(randomChosenColour);
        

        for (const gameSequence of gamePattern) {
            await flashPattern(gameSequence);
            flash++
            console.log(gameSequence + " " + flash);
        }

        if (flash === level) {
            console.log("flash " + flash + " times");
            flash = 0;
            canClick = true;
        } else {
            canClick = false;
        }

        


    } else {

        $("#level-title").text("You Win! Press any key to continue");
        startOver();

    }

    
}

// function nextSequence() {
//     //reset for nxt level
//     userClickedPattern = [];
//     level++;

//     $("#level-title").text("Level " + level);
//     var randomNumber = Math.floor(Math.random() * 4);
//     var randomChosenColour = buttonColours[randomNumber];
//     gamePattern.push(randomChosenColour);

//     switch (level) {
//         case 1:
//             $("#" + randomChosenColour).fadeIn(500).fadeOut(500).fadeIn(500);
//             break;
//         case 2:
//             $("#" + randomChosenColour).fadeIn(300).fadeOut(500).fadeIn(300);
//             break;
//         case 3:
//             $("#" + randomChosenColour).fadeIn(200).fadeOut(200).fadeIn(200);
//             break;

//         default:
//             $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
//             break;
//     }
//     // $("#" + randomChosenColour).fadeIn(500).fadeOut(500).fadeIn(500);

//     playSound(randomChosenColour);
// }


//sound effect
function playSound(name) {

    var audio = new Audio("sounds/" + name + ".mp3");
    audio.play();
}


//animate on pressing a key
function animatePress(currentColour) {

    $("#" + currentColour).addClass("pressed")

    setTimeout(() => {
        $("#" + currentColour).removeClass("pressed")
    }
        , 100);
}

//when the game is ended
function startOver() {
    level = 0;
    gamePattern = [];
    started = false;
    canClick = false;
    flash = 0;

}

