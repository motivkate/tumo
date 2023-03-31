
function setup() {
    createCanvas(windowWidth , windowHeight)
    Game.addCommonBalloon();

}

function draw() {
    background('skyblue');

    for (const balloon of Game.balloons) {
        balloon.display();
        balloon.move();

        if (balloon.y <= balloon.size / 2 && balloon.color != 'black') {
            noLoop();
            clearInterval(interval);
            Game.balloons.length = 0;
            if (Game.maxscore < Game.score) {
                Game.maxscore = Game.score;
            }
            if (Game.maxscore > Game.score) {
                Game.lowscore = Game.score;
            }
            let finalScore = Game.score;
            Game.score = '';
            background(195, 74, 74);
            textSize(64);
            fill("white")
            textAlign(CENTER);
            text("End. Click for more ", 400, 200);
            textSize(34);
            text('Score: ' + finalScore, 400, 300)
            text('Max score: ' + Game.maxscore, 400, 350)
            text('Lowest score: ' + Game.lowscore, 400, 400)
        }
    }


    if (frameCount % 50 == 0) {
        Game.addCommonBalloon();
    }

    if (frameCount % 150 == 0) {
        Game.addUniqeBalloon();
    }

    if (frameCount % 70 == 0) {
        Game.addAngryBalloon();
    }

    if (frameCount % 250 == 0) {
        Game.addBossBalloon();
    }

    textSize(32);
    fill('black');
    text(Game.score, 20, 40);

}

function mousePressed() {
    if (!isLooping()) {
        Game.score = 0;
        loop()  
        interval = setInterval(() => {
    Game.sendStats()
}, 5000);
    }
    Game.countOfClick += 1;
    Game.checkIfBalloonBurst();
    }

setInterval(() => {
    Game.sendStats()
}, 5000);
    

class Game {
    static balloons = [];
    static score = 0;
    static maxscore = 0;
    static lowsore = 0;

    static countOfBlue = 0;
    static countOfGreen = 0;
    static countOfBlack = 0;
    static countOfYellow = 0;

    static addCommonBalloon() {
        let balloon = new CommonBalloon('blue', 50);
        this.balloons.push(balloon);
    }

        static addUniqeBalloon() {
        let balloon = new UniqeBalloon('green', 30);
        this.balloons.push(balloon);
    }

        static addAngryBalloon() {
        let balloon = new AngryBalloon('black', 50);
        this.balloons.push(balloon);
    }

    
        static addBossBalloon() {
        let balloon = new BossBalloon('yellow', 15);
        this.balloons.push(balloon);
    }

    static checkIfBalloonBurst() {
        Game.balloons.forEach((balloon, index) => { 
                    let distance = dist(balloon.x, balloon.y, mouseX, mouseY)

        if (distance <= balloon.size / 2) {
            balloon.burst(index);
        }
        })

    }
    static sendStats() {
        const statistics = {
            score: this.score,
            maxscore: this.maxscore,
            lowsore: this.lowsore,
            countOfBlue: this.countOfBlue,
            countOfGreen: this.countOfGreen,
            countOfBlack: this.countOfBlack,
            countOfYellow: this.countOfYellow
        };
    
    
    fetch('/stats', {
        method: 'POST',
        headers: {
        'Content-Type': 'application/json'
    },
        body: JSON.stringify(statistics)
    });
    };
}


class CommonBalloon {
    constructor(color, size) {
        this.x = random(width);
        this.y = random(height - 10, height + 50);
        this.color = color;
        this.size = size;
    }

    display() {
        fill(this.color);
        ellipse(this.x, this.y, this.size)
        line(this.x, this.y + this.size / 2, this.x, this.y + 2 * this.size );
    } 

    move() {
        if (Game.score <= 200) {
           this.y -= 1;  
        } else if (Game.score > 200) {
            this.y -= 1.5;
        }
        else if (Game.score > 250) {
            this.y -= 2;
        }
        else if (Game.score >= 300) {
            this.y -= 2.5;
        }
        
    }

    burst(index) {
        Game.balloons.splice(index, 1); //вирізати певний елемент масиву
        Game.score += 1;
        Game.countOfBlue += 1;
    }
}

class UniqeBalloon extends CommonBalloon{
    constructor(color, size) {
        super(color, size);
    }
       burst(index) {
        Game.balloons.splice(index, 1); 
           Game.score += 10;
           Game.countOfGreen += 1;
    }
}

class AngryBalloon extends CommonBalloon{
    constructor(color, size) {
        super(color, size);
    }
       burst(index) {
        Game.balloons.splice(index, 1); 
        Game.score -= 10;
        Game.countOfBlack += 1;
    }
}

class BossBalloon extends CommonBalloon{
    constructor(color, size) {
        super(color, size);
    }
       burst(index) {
        Game.balloons.splice(index, 1); 
        Game.score += 35;
        Game.countOfYellow += 1;
    }
}

