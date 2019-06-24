var c = document.getElementById("myCanvas");
var ctx = c.getContext("2d");
let jump = 0;
var oiseau = new Image();
oiseau.src = "images/bird.png";
var pipeNorth = new Image();
pipeNorth.src = "images/pipeNorth.png";
var pipeSouth = new Image();
pipeSouth.src = "images/pipeSouth.png";



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
    return bird.x< pipe.x+image.width && bird.x+oiseau.width > pipe.x && bird.y < pipe.y+image.height && bird.y+oiseau.height > pipe.y
}


// Bird jumping
let upOiseau = document.addEventListener('click', function(){
    jump += 50;
});

    
function draw(){

    // bird movings 
        if(jump>0){
            bird.y -= 8;
            jump-=8;
        }
        else{bird.y += 4}; /* la descente */

        if(bird.y >= 400){bird.y = 400};/* floor control */
        if(bird.y < 0){bird.y = 0; jump = 0;}; /* top control */

    // North piller movings
        pipeN.x -= 4;
        if(pipeN.x < -40){pipeN.x = 1000
        pipeN.y = Math.random()*200-230;
        pipeS.y = pipeN.y+400;
        };/* abs control */
    
    // South piller movings        
        pipeS.x -= 4;
        if(pipeS.x < -40){pipeS.x = 1000;};/* abs control */


    ctx.clearRect(0, 0, 1000, 500);
    ctx.fillStyle = "beige";
    ctx.fillRect(0, 0, 1000, 500);
    ctx.drawImage(oiseau, bird.x, bird.y);
    ctx.drawImage(pipeNorth, pipeN.x, pipeN.y);
    ctx.drawImage(pipeSouth, pipeS.x, pipeS.y);

    if(contactPiller(pipeS,pipeSouth) || contactPiller(pipeN, pipeNorth)){
        return;
    }

    requestAnimationFrame(draw);
}

draw();

