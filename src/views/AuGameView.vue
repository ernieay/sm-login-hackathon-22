<template>
  <div class="au-game">
    <canvas id="game-canvas" class="workspace"></canvas>
  </div>
</template>

<script>
import { onMounted } from '@vue/runtime-core'

export default {
  name: 'AuGame',
  setup: () => {
    onMounted(() => {
      let myGamePiece;
      let myObstacles = [];
      let myScore;
      let bgImg = new Image();
      let playerImg = new Image();

      async function startGame() {
          await loadBgImg();
          await loadPlayerImg();
          myGamePiece = new component(30, 30, "red", 10, 120, 'player');
          myGamePiece.gravity = 0.05;
          myScore = new component("30px", "Consolas", "black", 280, 40, "text");
          myGameArea.start();
      }

      const myGameArea = {
          canvas : document.getElementById("game-canvas"),
          start : function() {
              this.canvas.width = 480;
              this.canvas.height = 270;
              this.context = this.canvas.getContext("2d");
              this.frameNo = 0;
              this.interval = setInterval(updateGameArea, 20);
              },
          clear : function() {
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
          this.update = function() {
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
          this.newPos = function() {
              this.gravitySpeed += this.gravity;
              this.x += this.speedX;
              this.y += this.speedY + this.gravitySpeed;
              this.hitBottom();
          }
          this.hitBottom = function() {
              var rockbottom = myGameArea.canvas.height - this.height;
              if (this.y > rockbottom) {
                  this.y = rockbottom;
                  this.gravitySpeed = 0;
              }
          }
          this.crashWith = function(otherobj) {
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
                  return;
              } 
          }
          myGameArea.clear();
          drawBgImg();
          myGameArea.frameNo += 1;
          if (myGameArea.frameNo == 1 || everyinterval(150)) {
              x = myGameArea.canvas.width;
              minHeight = 20;
              maxHeight = 200;
              height = Math.floor(Math.random()*(maxHeight-minHeight+1)+minHeight);
              minGap = 50;
              maxGap = 200;
              gap = Math.floor(Math.random()*(maxGap-minGap+1)+minGap);
              myObstacles.push(new component(10, height, "green", x, 0));
              myObstacles.push(new component(10, x - height - gap, "green", x, height + gap));
          }
          for (let i = 0; i < myObstacles.length; i += 1) {
              myObstacles[i].x += -1;
              myObstacles[i].update();
          }
          myScore.text=myGameArea.frameNo;
          myScore.update();
          myGamePiece.newPos();
          myGamePiece.update();
      }

      function everyinterval(n) {
          if ((myGameArea.frameNo / n) % 1 == 0) {return true;}
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
        ctx.drawImage(bgImg, 0, 0);
      }

      async function loadBgImg() {
        bgImg.src = 'images/clouds.jpg';
        bgImg.onload = () => {
          return Promise.resolve('success');
        }
      }

      async function loadPlayerImg() {
        playerImg.src = 'images/sm-logo-app-colour-136.png';
        playerImg.onload = () => {
          return Promise.resolve('success');
        }
      }

      function drawPlayerImg(x, y) {
        let ctx = myGameArea.context;
        ctx.drawImage(playerImg, x, y, 30, 30);
      }

      startGame();
      document.addEventListener('keydown', (e) => {
        handleKeyDown(e)
      });

      document.addEventListener('keyup', (e) => {
        handleKeyUp(e)
      })
    })
  }
}
</script>
