var c = document.getElementById("myCanvas");
var ctx = c.getContext("2d");
let jump = 0;
let score = 0;
let speed = 0;
let pipesN = [];
let pipesS = [];
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
fly.src = "sounds/score.mp3";


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
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }
}


pipesN.push(new Piller(1000, -200));
pipesS.push(new Piller(1000, 200));


// Contact function

function contactPiller(pipe, pipeImage) {
    return bird.x < pipe.x + (pipeImage.width / 2) && bird.x + oiseau.width > pipe.x && bird.y < pipe.y + pipeImage.height && bird.y + oiseau.height > pipe.y || bird.y > 430; // 430 : quand il touche le sol -> il se blesse
}




// Bird jumping
// document.addEventListener('click', function () {
//     speed = -8; // monte de 8px
// });
// document.addEventListener('keypress', function () {
//     speed = -8;
// });

function jumping(event){
    document.addEventListener(event, function () {
        speed = -8;
    });
}

jumping('click'); jumping('keypress');



function draw() {

    // Score
    if (bird.x > pipesS[0].x && !checkScore) {
        score++;
        fly.play();
        document.getElementById("points").innerText = score;
        checkScore = true;
    }

    // bird movings 
    bird.y += speed /* moving top|bottom */

    if (bird.y >= 450) { bird.y = 450 };/* floor control */
    if (bird.y < 0) { bird.y = 0; speed = 0; }; /* top control */

    // North piller movings
    if (pipesN[0].x + pipeNorth.width < 0) {
        pipesN.splice(0, 1);
        pipesS.splice(0, 1);
        checkScore = false;
    };/* abs control */


    // South piller movings        
    /* if(pipeS.x+52 < 0){pipeS.x = 800;}; *//* abs control pas besoin */

    // Background moving
    bgX -= 2;

    // Speed de descente
    if (speed < 8) { speed += .5 } // .5 est l'accélération de mvt, ici descente

    while (pipesN[pipesN.length - 1].x < c.width) { // tant que le dernier pipe est dans l'écran

        let randomY = Math.random() * 200 - 230; // ordonnée aléatoire
        let newX = pipesN[pipesN.length - 1].x + 300; // new pipe par rapport au précédent

        let pipeN = new Piller(newX, randomY); // new north piller created
        let pipeS = new Piller(newX, randomY + 400); // new south piller created


        pipesN.push(pipeN) // on ajoute le dernier pipe (récent) à l'array des pipes
        pipesS.push(pipeS)
    }

    ctx.clearRect(0, 0, 800, 500); // on nettoie le canvas, pas nécessairement besoin
    // ctx.fillRect(0, 0, 800, 500); // on remet à nouveau le canvas, pas besoin

    if (bgX < -bg.width) {
        bgX = 0;
    }
    ctx.drawImage(bg, bgX, 0); // le background
    ctx.drawImage(bg, bgX + bg.width, 0); // la répétition du bg
    ctx.drawImage(oiseau, bird.x, bird.y); // dessine l'oiseau

    for (let i = 0; i < pipesN.length; i++) {
        // la vitesse du déplacement de toutes les pipes du canvas
        pipesS[i].x -= 4; 
        pipesN[i].x -= 4;

        ctx.drawImage(pipeNorth, pipesN[i].x, pipesN[i].y); // dessine les pipes north
        ctx.drawImage(pipeSouth, pipesS[i].x, pipesS[i].y); // les pipes south
    }


    // si y a contact entre le pipe le plus proche (haut ou bas) une fenêtre d'alerte popup
    if (contactPiller(pipesS[0], pipeSouth) || contactPiller(pipesN[0], pipeNorth)) {
        if (confirm('Oops ! Piou-piou s\'est blessé !\nTon score : ' + score + '\nRéessayer ?')) {
            location.reload(); // si ok, alors on recommence
        }
        return; // sinon, pause
    }

    requestAnimationFrame(draw);
}

draw();

