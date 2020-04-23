const Engine = Matter.Engine;
const World= Matter.World;
const Bodies = Matter.Bodies;
const Constraint = Matter.Constraint;

var score = 0;
var bg = "sprite/cbh1.jpg";
var engine, world;
var min1, pete1,pete3;
var backgroundImg,platform;
var mickey, slingshot;

var gameState = "onSling";

function preload() {
  getBackgroundImage();
}

function setup(){
    var canvas = createCanvas(1200,400);
    engine = Engine.create();
    world = engine.world;


    ground = new Ground(600,height,1200,20);
    platform = new Ground(150, 305, 300, 170);

    min1 = new Minnie(700,320,70,70);
    min2 = new Minnie(920,320,70,70);
    pete1 = new Pete(810, 350);
    log1 = new Log(810,260,300, PI/2);

    min3 = new Minnie(700,240,70,70);
    min4 = new Minnie(920,240,70,70);
    pete3 = new Pete(810, 220);

    log3 =  new Log(810,180,300, PI/2);

    min5 = new Minnie(810,160,70,70);
    log4 = new Log(760,120,150, PI/7);
    log5 = new Log(870,120,150, -PI/7);

    mickey = new Mickey(200,50);

    //log6 = new Log(230,180,80, PI/2);
    slingshot = new SlingShot(mickey.body,{x:200, y:50});
}

function draw(){
    if(backgroundImg)
       background(backgroundImg);
    textSize(35);
    fill("white");
    text("Score : " + score,width-300,50);
    Engine.update(engine);
    //strokeWeight(4);
    min1.display();
    min2.display();
    ground.display();
    pete1.display();
    pete1.score();
    log1.display();

    min3.display();
    min4.display();
    pete3.display();
    pete3.score();
    log3.display();

    min5.display();
    log4.display();
    log5.display();

    mickey.display();
    platform.display();
    //log6.display();
    slingshot.display()   
}

function mouseDragged(){
    if (gameState!=="launched"){
        Matter.Body.setPosition(mickey.body, {x: mouseX , y: mouseY});
    }
}


function mouseReleased(){
    slingshot.fly();
    gameState = "launched";
}

function keyPressed(){
    if(keyCode === 32){
       // slingshot.attach(mickey.body);
    }
}
async function getBackgroundImage(){
    var response = await fetch("http://worldtimeapi.org/api/timezone/Asia/Kolkata");
    var responseJSON = await response.json();
    var datetime = responseJSON.datetime;
    var hour  = datetime.slice(11,13);
    console.log(hour);
    if(hour >= 6 && hour <= 18){
       bg = "sprites/cbh1.jpg";
    }else{
        bg = "sprites/cbh2.jpg";
    }
    backgroundImg = loadImage(bg);
}