<template>
  <div class="au-game">
    <div v-if="!started" class="instruction">
      <p class="title">Flappy Hotelier</p>
      <p>Use the <strong>Up</strong> arrow to dodge the obstacles!</p>
      <button @click="onStartClick">Start</button>
    </div>
    <canvas id="game-canvas" :class="{ started: started }"></canvas>
  </div>
</template>

<script>
import { onMounted, onBeforeUnmount } from '@vue/runtime-core'
import { ref } from 'vue'

const PLAYER_SIZE = 70;
const WALL_GAP_MIN = 110;
const WALL_GAP_MAX = 200;
const WALL_CREATE_FREQUENCY = 200;

export default {
  name: 'AuGame',
  setup: () => {
    let audio = new Audio('audio/flappy.m4a');
    const started = ref(false);
    let myGameArea = null;

    onMounted(() => {
      let myGamePiece;
      let myObstacles = [];
      let myScore;
      let bgImg = new Image();
      let playerImg = new Image();
      const gameOverText = new component("30px", "Arial", "yellow", 110, 130, "text");

      async function startGame() {
        await loadBgImg();
        await loadPlayerImg();

        myGamePiece = new component(PLAYER_SIZE, PLAYER_SIZE, "red", 10, 120, 'player');
        myGamePiece.gravity = 0.05;
        myScore = new component("30px", "Arial", "black", 370, 40, "text");
      }

      myGameArea = {
        canvas: document.getElementById("game-canvas"),
        start: function () {
          this.canvas.width = 480;
          this.canvas.height = 270;
          this.context = this.canvas.getContext("2d");
          this.frameNo = 0;
          this.interval = setInterval(updateGameArea, 20);
        },
        clear: function () {
          this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
        }
      }

      function component(width, height, color, x, y, type) {
        this.type = type;
        this.score = 0;
        this.width = width;
        this.height = height;
        this.speedX = 0;
        this.speedY = 0;
        this.x = x;
        this.y = y;
        this.gravity = 0;
        this.gravitySpeed = 0;
        this.update = function () {
          let ctx = myGameArea.context;
          if (this.type == "text") {
            ctx.font = this.width + " " + this.height;
            ctx.fillStyle = color;
            ctx.fillText(this.text, this.x, this.y);
          } else if (this.type == 'player') {
            drawPlayerImg(this.x, this.y);
          } else {
            ctx.fillStyle = color;
            ctx.fillRect(this.x, this.y, this.width, this.height);
          }
        }
        this.newPos = function () {
          this.gravitySpeed += this.gravity;
          this.x += this.speedX;
          this.y += this.speedY + this.gravitySpeed;
          this.hitEdges();
        }
        this.hitEdges = function () {
          // If the player has hit the bottom
          var rockbottom = myGameArea.canvas.height - this.height;
          if (this.y > rockbottom) {
            this.y = rockbottom;
            this.gravitySpeed = 0;
          }

          // If the player has hit the top
          if (this.y < 0) {
            this.y = 0;
            this.gravitySpeed = 0;
          }
        }
        this.crashWith = function (otherobj) {
          var myleft = this.x;
          var myright = this.x + (this.width);
          var mytop = this.y;
          var mybottom = this.y + (this.height);
          var otherleft = otherobj.x;
          var otherright = otherobj.x + (otherobj.width);
          var othertop = otherobj.y;
          var otherbottom = otherobj.y + (otherobj.height);
          var crash = true;
          if ((mybottom < othertop) || (mytop > otherbottom) || (myright < otherleft) || (myleft > otherright)) {
            crash = false;
          }
          return crash;
        }
      }

      function updateGameArea() {
        var x, height, gap, minHeight, maxHeight, minGap, maxGap;
        for (let i = 0; i < myObstacles.length; i += 1) {
          if (myGamePiece.crashWith(myObstacles[i])) {
            gameOverText.text = 'Laundry dropped :\'(';
            gameOverText.update();
            return;
          }
        }
        myGameArea.clear();
        drawBgImg();
        myGameArea.frameNo += 1;
        if (myGameArea.frameNo == 1 || everyinterval(WALL_CREATE_FREQUENCY)) {
          x = myGameArea.canvas.width;
          minHeight = 20;
          maxHeight = 200;
          height = Math.floor(Math.random() * (maxHeight - minHeight + 1) + minHeight);
          minGap = WALL_GAP_MIN;
          maxGap = WALL_GAP_MAX;
          gap = Math.floor(Math.random() * (maxGap - minGap + 1) + minGap);
          myObstacles.push(new component(10, height, '#0C4583', x, 0));
          myObstacles.push(new component(10, x - height - gap, "#0C4583", x, height + gap));
        }
        for (let i = 0; i < myObstacles.length; i += 1) {
          myObstacles[i].x += -1;
          myObstacles[i].update();
        }
        myScore.text = myGameArea.frameNo;
        myScore.update();
        myGamePiece.newPos();
        myGamePiece.update();
      }

      function everyinterval(n) {
        if ((myGameArea.frameNo / n) % 1 == 0) { return true; }
        return false;
      }

      function accelerate(n) {
        myGamePiece.gravity = n;
      }

      const handleKeyDown = (e) => {
        if (e.keyCode === 38) {
          // up
          accelerate(-0.2);
        }
      }

      const handleKeyUp = (e) => {
        if (e.keyCode === 38) {
          // up
          accelerate(0.05);
        }
      }

      function drawBgImg() {
        let ctx = myGameArea.context;
        ctx.drawImage(bgImg, 0, 0, 480, 270);
      }

      async function loadBgImg() {
        bgImg.src = 'images/FH_background.png'
        bgImg.onload = () => {
          return Promise.resolve('success');
        }
      }

      async function loadPlayerImg() {
        playerImg.src = 'images/flappy_hotelier.png';
        playerImg.onload = () => {
          return Promise.resolve('success');
        }
      }

      function drawPlayerImg(x, y) {
        let ctx = myGameArea.context;
        ctx.drawImage(playerImg, x, y, PLAYER_SIZE, PLAYER_SIZE);
      }

      document.addEventListener('keydown', (e) => {
        handleKeyDown(e)
      });

      document.addEventListener('keyup', (e) => {
        handleKeyUp(e)
      })
      startGame();
    })

    onBeforeUnmount(() => {
      audio.pause();
      audio = null;
    })

    const onStartClick = () => {
      started.value = true;
      audio.play();
      myGameArea.start();
    }

    return {
      started,
      onStartClick
    };
  },

}
</script>
<style scoped>
.au-game {
  margin-top: 50px;  
  max-height: 270px;
  overflow: hidden;
}

#game-canvas {
  visibility: hidden;
  height: 0;
}

#game-canvas.started {
  visibility: visible;
  height: auto;
}

.instruction {
  width: 480px;
  height: 270px;
  margin-left: auto;
  margin-right: auto;
  background: blue;
  border-radius: 8px;
  color: white;
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: center;
}

.instruction button {
  border-radius: 8px;
  padding: 8px;
  font-weight: bold;
  background: none;
  border: none;
  color: yellow;
  font-size: 24px;
  text-transform: uppercase;
  cursor: pointer;
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
}

.instruction button:hover {
  background: yellow;
  color: black;
}

.instruction .title {
  font-size: 32px;
  font-weight: bold;
}
</style>