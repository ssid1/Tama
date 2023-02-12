let canvas;
let button, button2, button3;

let food = [];
let feeding = false;
let dying = false;

let hungry = 0;
let full = 1;
let tamaState = hungry;

let tamaX;
let tamaY;
let tamaDiam;
let msize = 3;

let a = "💩";
let fwm = "😶";
let dead = "😵";
let state = fwm;



function setup() {

  canvas = createCanvas(600, 600);
  canvas.parent("sketch-container"); //move our canvas inside this HTML element

  tamaX = width/2;
  tamaY = height/2;
  tamaDiam = width/6;

  addGUI();
}

function draw() {
  background(200,200,250);
  
  //Drawing
  noStroke();

  //manage state of Tama
  if(tamaState == hungry){
    fill(0);

    //manage switching to full state
    if(tamaDiam > width/4){
      tamaState = full;
    }

  }else if(tamaState == full){
    //full color
    fill(255,0,0);

    //manage returning to hungry state
    if(tamaDiam > width/6){
      if(frameCount % 2 == 0) tamaDiam--; // reduce every second frame
    }else{
      tamaState = hungry;
    }
  }

  //draw Tama and closed mouth
  textAlign(CENTER);
  textSize(tamaDiam);
  text(state, tamaX,tamaY+20);
  let mouthOffset = tamaDiam/2;
  rect(tamaX-mouthOffset/2,tamaY,mouthOffset,msize);
  updateFood();

  if(food.length > 0 ){

    //Tama Eat
    if(frameCount % 20 < 60 && tamaState == hungry){
      eatFood();
    }

    //draw food

    for(let i = 0; i < food.length; i++){
    //  fill(100);
    //  circle(tamaX,tamaY+food[i],food[i]);  
     textAlign(CENTER);
     textSize(food[i]);
     text(a, tamaX,tamaY+food[i] );
    }
  }else if(feeding){
    //manage button state, only do this once IF the button is inactive
    feeding = false;
    button.html("FEED");
    button.removeClass("inactive");
  }
  

}

function eatFood(){

  //draw open mouth
  fill(0);
  circle(tamaX,tamaY,tamaDiam/2);
  //reduce food & grow Tama
  food[food.length-1] --;
  tamaDiam++;

}

function addGUI()
{

  //add a button
  button = createButton("FEED");
  button2 = createButton("KILL");
  button3 = createButton("REVIVE");
  
  button.addClass("button");
  button2.addClass("button");
  button3.addClass("button");

  //Add the play button to the parent gui HTML element
  button.parent("gui-container");
  button2.parent("gui-container");
  button3.parent("gui-container");
  
  //Adding a mouse pressed event listener to the button 
  button.mousePressed(handleButtonPress); 
  button2.mousePressed(deadbutton); 
  button3.mousePressed(alivebutton);
}

function handleButtonPress()
{
     if(!dying){
      //set food to random value
      food.push(40);

      //manage button state
      //button.html("FEEDING");
      //button.addClass("inactive");
    }
    
 }

function deadbutton()
{
  state = dead;
  msize = 0;
  dying = true;
}
    
function alivebutton()
{

  state = fwm;
  msize = 3;
  dying = false;
}

function updateFood()
{
  for(let i = food.length-1; i >= 0 ; i--){
    //draw and move food
     if(food[i] < 0){
       //using splice() instead of pop() would be good if your food had varying speeds
       food.splice(i,1); //remove one from array at index i  
     }
   }
}