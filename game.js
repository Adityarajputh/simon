var buttonColours = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];
var game = "false";
var level = 0;

$(document).keydown(function (){


  if(game=="false"){
    $("#title-level").text("level " + level);
    nextSequence();
    game = "true";
  }

});

$(".btn").on("click",function(e){
  var userChosenColour = e.target.id;
  userClickedPattern.push(userChosenColour);
  // console.log(userClickedPattern);
  var index = userClickedPattern.length - 1;
  playSound(userChosenColour);
  animatePress(userChosenColour);
  checkAnswer(index);
});

function checkAnswer(currentLevel){
  // var answer = userClickedPattern[currentLevel];
  if(gamePattern[currentLevel] === userClickedPattern[currentLevel]){
    console.log("success")
    if(userClickedPattern.length===gamePattern.length){

      setTimeout(function(){
        nextSequence();
      },1000);
      }

    }
  else{
    var audio = new Audio("sounds/wrong.mp3");
    audio.play();
    $("body").addClass("game-over");
    setTimeout(function(){
      $("body").removeClass("game-over");
    }, 200);
    $("h1").text("Press Any Key To Restart The Game");
    startover();
  }
}


function nextSequence(){
   userClickedPattern = [];
   level++;


   $("h1").text("level " + level);


   var randomNumber = Math.floor(Math.random()*4);
   var randomChosenColor = buttonColours[randomNumber];
   gamePattern.push(randomChosenColor);

   $("#"+ randomChosenColor).fadeIn(100).fadeOut(100).fadeIn(100);

   playSound(randomChosenColor);


}



function playSound(name){
  var audio = new Audio("sounds/"+ name +".mp3");
  audio.play();
}

function animatePress(currentColour){
  $("#" + currentColour).addClass("pressed");
  setTimeout(function(){
    $("#" + currentColour).removeClass("pressed");
  }, 120);

}


  function startover(){

    level = 0;
    gamePattern = [];
    game = "false";
  }
