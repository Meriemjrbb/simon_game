var userClickedPattern=[];
var gamePattern =[];
var buttonColours =["red", "blue", "green", "yellow"];
var randomChosenColour;
var indice;
var keypress=false;
var start=false;
var level=0;
alert("hi");
function nextSequence() {
  level++;
  $("h1").text("level "+level);
  var randomNumber = Math.floor(Math.random() * 4);
 randomChosenColour = buttonColours[randomNumber];
  gamePattern.push(randomChosenColour);
  $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
  playSound(randomChosenColour);
}


function playSound(name){
  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}

function animatePress(currentColour){
  $("#"+ currentColour).click(function(){
    $(this).addClass("pressed");
    setTimeout(function(){
      $("#"+ currentColour).removeClass("pressed");
    }, 100);
  });
}
function startOver(){
  level=0;
  start=false;
  gamePattern=[];
  userClickedPattern=[];
}

function checkAnswer(currentLevel){
  if (gamePattern[currentLevel] == userClickedPattern[currentLevel]) {
    if(gamePattern.length==userClickedPattern.length){
      console.log("success");
      userClickedPattern=[];
      setTimeout(function(){nextSequence();},1000);
    }}
    else{
      console.log("wrong");
      playSound("wrong");
      $("body").addClass("game-over");
      setTimeout(function(){
        $("body").removeClass("game-over");
      },200);
      $("h1").text("Game Over, Press Any Key to Restart");
      startOver();
    }
}

$(".btn").click(function(){
  var i=$(this).attr("id");
  animatePress(i);
  playSound(i);
  userClickedPattern.push(i);
  checkAnswer(userClickedPattern.length -1);
});
$(document).keydown(function(){
  if (!start){
    nextSequence();
    start=true;
  }
})
