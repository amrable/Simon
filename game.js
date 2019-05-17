var pattern=[];
var userPattern=[];
var colorSet=["red","green","yellow","blue"];
var first=0;
var level=0;
var ansNo=0;
// Detect mouse clicks
$('.btn').on('click',function(event){
  userChoice=(event.target.id);
  playSound(userChoice);
  animatePress(userChoice);
  userPattern.push(userChoice);
  ansNo+=1;
  checkAnswer(ansNo-1);
  console.log("ans no : "+ansNo+" Level : "+level+" answer : "+ans);
  if(ansNo==level){
    ansNo=0;
    if(ans==false)
    {
      wrongAnswer();
    }
    setTimeout(function () {
      if(ans)
      {nextStep();
        }
    }, 1000);
  }
});

// Detect keyboard pressing
$(document).on("keydown", function (event){
  if (first==0){
    nextStep();
  }
  first=1;

});

function nextStep(){
  updateH1();
  userPattern=[];
  randomNumber=rand();
  randomColor=colorSet[randomNumber];
  pattern.push(randomColor);
  $('#'+randomColor).fadeIn(100).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);
  var audio= new Audio("sounds/"+colorSet[randomNumber]+".mp3");
  audio.play();
}
// Utilities
function rand()
{
  return Math.floor(Math.random()*4);
}
function playSound(key){
  var audio = new Audio("sounds/"+key+".mp3");
  audio.play();
}
function animatePress(key){
  $('#'+key).addClass('pressed');
  setTimeout(function () {
    $('#'+key).removeClass('pressed');
  }, 100);
}
function updateH1()
{
  level++;
  $("h1").text("LEVEL "+level);
}
function checkAnswer(i)
{
  ans=true;
  if(userPattern[i]!=(pattern[i]))
  {
    ans=false;
  }
  if(!ans){
    wrongAnswer();
  }

}
function wrongAnswer()
{
  var wrongAudio=new Audio("sounds/wrong.mp3");
  wrongAudio.play();
  $("h1").text("Game Over, Press Any Key to Restart !");
  pattern=[];
  userPattern=[];
  level=0;
  first=0;
  ansNo=0;
    $("body").addClass("game-over");
  setTimeout(function () {
    $("body").removeClass("game-over");
  }, 200);
}
