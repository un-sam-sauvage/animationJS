const canvas = document.getElementById('canvas-test');
const ctx = canvas.getContext('2d');
canvas.width = document.documentElement.clientWidth || document.body.clientWidth;
canvas.height = document.documentElement.clientHeight || document.body.clientHeight;

var particles = [];
const btn = document.getElementsByClassName("btn-animation")[0];
const btnBack = document.getElementsByClassName("btn-back")[0];

btn.addEventListener("click", () => {
    const gradient = document.getElementsByClassName("bg-gradient")[0];
    gradient.classList.add("space")
    setAnimation();
})



function createParticle(posX, posY, width, height, color, speed) {
    let particle = {
        x: posX,
        y: posY,
        w: width,
        h: height,
        c: color,
        s: speed,
    }
    particles.push(particle);
}


function setAnimation() {
    let nbParticleToCreate = 40
    for (let i = 0; i < nbParticleToCreate; i++) {
        let randomPosX = randomIntFromInterval(50, canvas.width - 50);
        let randomPosY = randomIntFromInterval(50, canvas.height - 50);
        let randomSpeed = randomIntFromInterval(15, 20);
        createParticle(randomPosX, randomPosY, 10, 55, "white", randomSpeed);
    }
    const interval = setInterval(animationLoop, 1000 / 60);
    setTimeout(function () {
        clearInterval(interval);
        starInSky();
    }, 1500)
}
//TODO clear array
//TODO stop looping in stars

function animationLoop() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    particles.forEach(element => {
        ctx.fillStyle = element.c;
        ctx.fillRect(element.x, element.y, element.w, element.h);
        element.y += element.s;
    });

}

function starInSky(){
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    particles = [];
    let nbParticleToCreate = 150
    for (let i = 0; i < nbParticleToCreate; i++) {
        let randomPosX = randomIntFromInterval(50, canvas.width - 50);
        let randomPosY = randomIntFromInterval(50, canvas.height - 50);
        createParticle(randomPosX, randomPosY, 5, 5, "white", 0);
    }
    var i = 0;
    const anotherInterval = setInterval(function(){
        element = particles[i];
        ctx.fillStyle = element.c;
        ctx.fillRect(element.x, element.y, element.w, element.h);
        i++
        if(i >= particles.length){
            clearInterval(anotherInterval);
        }
    },1000/60)

}


function randomIntFromInterval(min, max) { // min and max included 
    return Math.floor(Math.random() * (max - min + 1) + min)
}

btnBack.addEventListener("click" , ()=>{
    window.location.reload();
})