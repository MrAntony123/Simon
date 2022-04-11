var gamePattern = [];
var userClickedPattern = [];
const buttonColors = ["red", "blue", "green", "yellow"];
var started = false;
var level = 0;
$(".btn").click(function() {

  var userChosenColor = $(this).attr("id");
  userClickedPattern.push(userChosenColor);
  playSound(userChosenColor);
  animatePress(userChosenColor);
  checkAnswer(userClickedPattern.length - 1);
});
$("body").keypress(function(event) {
  if (!started) {
    nextSequence();
    started = true;
  }
});
//changed
$("body").on("tap",function(event) {
  if (!started) {
    nextSequence();
    started = true;
  }
});
function nextSequence() {
  var randomNumber = Math.floor(Math.random() * 4);
  var randomChosenColor = buttonColors[randomNumber];
  gamePattern.push(randomChosenColor);
  $("#" + randomChosenColor).fadeIn(100).fadeOut(100).fadeIn(100);
  $("#level-title").html("Level " + level);
  level += 1;
  userClickedPattern = [];
  playSound(randomChosenColor);
  animatePress(randomChosenColor)
}

function playSound(name) {

  //3. Take the code we used to play sound in the nextSequence() function and add it to playSound().
  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}

function animatePress(currentColor) {
  $("#" + currentColor).addClass("pressed");
  setTimeout(
    function() {
      $("#" + currentColor).removeClass("pressed");
      //dj & c were here
    }, 100);
}

function checkAnswer(currentLevel) {
  if (userClickedPattern[currentLevel] == gamePattern[currentLevel]) {
    if (currentLevel == gamePattern.length - 1) {
      setTimeout(
        function() {
          nextSequence();
        }, 1000);
    }
  } else {
    playSound("wrong");
    $("body").addClass("game-over");
    setTimeout(
      function() {
        $("body").removeClass("game-over");
      }, 200);
    $("#level-title").html("Game Over, Press Any Key to Restart");
    $("body").keypress(startOver());
    //changed
    $("body").on("tap",startOver());
  }
}
function startOver() {
  level = 0;
  gamePattern = [];
  started = false;
}
