var c = document.getElementById("myCanvas");
var ctx = c.getContext("2d");
let jump = 0;
let score = 0;
let speed = 0;
let checkScore = false;
let bgX = 0;
let bg = new Image();
bg.src = "images/background.jpg";
var oiseau = new Image();
oiseau.src = "images/bird.png";
var pipeNorth = new Image();
pipeNorth.src = "images/pipeNorth.png";
var pipeSouth = new Image();
pipeSouth.src = "images/pipeSouth.png";

let fly = new Audio();
fly.src = "sounds/score.mp3"



// Class Bird
class Bird {

    constructor() {
        this.x = 10;
        this.y = 10;
    }
}
let bird = new Bird(); // init de la class bird

// Class Piller
class Piller {
    constructor(x, y){
        this.x = x;
        this.y = y;
    }
}

let pipeN = new Piller(1000, -50); // init piller
let pipeS = new Piller(1000, 350); // init piller

// Contact function

function contactPiller(pipe, image){
    return bird.x< pipe.x+image.width-20 && bird.x+oiseau.width > pipe.x && bird.y < pipe.y+image.height && bird.y+oiseau.height > pipe.y || bird.y > 440;
}




// Bird jumping
document.addEventListener('click', function(){
    speed = -8;
});
document.addEventListener('keypress', function(){
    speed = -8;
});


    
function draw(){

    // Score
    if(bird.x > pipeS.x && !checkScore){
        score++;
        fly.play();
        document.getElementById("points").innerText = score;
        checkScore = true;
    }

    // bird movings 
    bird.y += speed /* down moving */

    if(bird.y >= 450){bird.y = 450};/* floor control */
    if(bird.y < 0){bird.y = 0; speed = 0;}; /* top control */

    // North piller movings
        pipeN.x -= 4;
        if(pipeN.x+52 < 0){pipeN.x = 800
        pipeN.y = Math.random()*200-230;
        pipeS.y = pipeN.y+400;
        checkScore = false;
        };/* abs control */

        
        // South piller movings        
        pipeS.x = pipeN.x; // pes besoin, se déplace par rapport à la barre du haut
        /* if(pipeS.x+52 < 0){pipeS.x = 800;}; *//* abs control pas besoin */
        
        // Background moving
        bgX -=2;

        // Speed de descente
        if(speed < 7){speed+=.5}
        


    ctx.clearRect(0, 0, 800, 500);
    ctx.fillRect(0, 0, 800, 500);
    if(bgX<-bg.width){
        bgX =0;
    }
    ctx.drawImage(bg,bgX,0);
    ctx.drawImage(bg,bgX+bg.width,0);
    ctx.drawImage(oiseau, bird.x, bird.y);
    ctx.drawImage(pipeNorth, pipeN.x, pipeN.y);
    ctx.drawImage(pipeSouth, pipeS.x, pipeS.y); /* pipeN.x pour garder la symétrie par rapport à la barre du haut */

    if(contactPiller(pipeS,pipeSouth) || contactPiller(pipeN, pipeNorth)){
        if(confirm('Oops ! Piou-piou s\'est blessé !\nTon score : ' + score + '\nRéessayer ?')){
            location.reload();
        }
        return;
    }

    requestAnimationFrame(draw);
}

draw();

