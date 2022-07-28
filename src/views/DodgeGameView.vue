<template>
  <div class="ph-game">
    <canvas id="dodge-game" class="workspace">
    </canvas>
    <div class="scoreboard-wrapper">
      <div class="scoreboard">
        <p v-if="started">Highscore: {{highscore}}</p>
        <p v-if="started">Score: {{score}}</p>
      </div>
    </div>
    <div v-if="!started" class="instruction">
      <p>Dodge the obstacles.</p>
      <button @click="onStart">
        Play
      </button>
      <div class="difficulty">
        <input
          type="radio"
          id="normal"
          name="difficulty"
          value="normal"
          :checked="difficulty === 'normal'"
          @change="onChangeDifficulty"
        >
        <label for="normal">Normal</label><br>
        <input
          type="radio"
          id="hard"
          name="difficulty"
          value="hard"
          :checked="difficulty === 'hard'"
          @change="onChangeDifficulty"
        >
        <label for="hard">Hard</label><br>
        <input
          type="radio"
          id="extremely-hard"
          name="difficulty"
          value="extremely-hard"
          :checked="difficulty === 'extremely-hard'"
          @change="onChangeDifficulty"
        >
        <label for="extremely-hard">Killed John Wick's dog</label>
      </div>
      <p class="help">Use mouse to play the game</p>
    </div>
  </div>
</template>

<script>

import { ref } from '@vue/reactivity'
import { onMounted } from '@vue/runtime-core'

export default {
  name: 'PhGame',
  setup: () => {
    const enemySpeed = 40
    const canvasWidth = 400
    const canvasHeight = 225
    const difficultyMultiplier = {
      normal: 1,
      hard: 0.8,
      'extremely-hard': 0.5,
    }
    onMounted(() => {
      document.addEventListener('mousemove', (e) => {
        handleMouseMove(e)
      })
      const _canvas = document.getElementById('dodge-game')
      const _ctx = _canvas.getContext('2d')

      _canvas.width = canvasWidth
      _canvas.height = canvasHeight

      canvas.value = _canvas
      ctx.value = _ctx

      refreshCanvas(_canvas, _ctx, 16)
    })

    const refreshCanvas = (gameCanvas, gameContext, dt) => {
      // draw  field
      gameContext.fillStyle = 'lightyellow'
      gameContext.fillRect(0, 0, gameCanvas.width, gameCanvas.height)

      // draw player
      let newPlayerX = playerPosition.value.currentX + ((playerPosition.value.x - playerPosition.value.currentX) / dt)
      let newPlayerY = playerPosition.value.currentY + ((playerPosition.value.y - playerPosition.value.currentY) / dt)
      gameContext.beginPath();
      gameContext.arc(newPlayerX, newPlayerY, unitSize / 2, 0, Math.PI * 2, true);
      gameContext.closePath();
      gameContext.fillStyle = 'blue';
      gameContext.fill();
      playerPosition.value.currentX = newPlayerX
      playerPosition.value.currentY = newPlayerY

      // draw enemies
      gameContext.fillStyle = 'red'
      for (const enemy of enemyUnits.value) {
        if (enemy.xDirection === 'left' && (enemy.currentX - unitSize / 2) <= 3) {
          enemy.xDirection = 'right'
        }
        if (enemy.xDirection === 'right' && enemy.currentX + unitSize / 2 >= (canvasWidth - 3)) {
          enemy.xDirection = 'left'
        }
        if (enemy.yDirection === 'up' && (enemy.currentY - unitSize / 2) <= 3) {
          enemy.yDirection = 'down'
        }
        if (enemy.yDirection === 'down' && enemy.currentY + unitSize / 2 >= (canvasHeight - 3)) {
          enemy.yDirection = 'up'
        }
        let newEnemyX = enemy.currentX
        let newEnemyY = enemy.currentY
        newEnemyX = enemy.currentX + ((enemySpeed * (enemy.xDirection === 'left' ? -1 : 1)) / enemy.slowness)
        newEnemyY = enemy.currentY + ((enemySpeed *  (enemy.yDirection === 'up' ? -1 : 1)) / enemy.slowness)
        gameContext.beginPath();
        gameContext.arc(newEnemyX, newEnemyY, unitSize / 2, 0, Math.PI * 2, true);
        gameContext.closePath();
        gameContext.fillStyle = 'red';
        gameContext.fill();
        enemy.currentX = newEnemyX
        enemy.currentY = newEnemyY
      }
    }
    const unitSize = 28
    const frameRate = 1000/60

    const ctx = ref()
    const canvas = ref()
    const animationId = ref()
    const playerPosition = ref({
      currentX: (canvasWidth / 2) - (unitSize / 2),
      currentY: (canvasHeight / 2) - (unitSize / 2),
      x: (canvasWidth / 2) - (unitSize / 2),
      y: (canvasHeight / 2) - (unitSize / 2),
    })
    const lastFrame = ref(0)
    const startTime = ref()
    const started = ref(false)
    const difficulty = ref('normal')
    const score = ref(0)
    const highscore = ref(0)
    const lastScoreTime = ref(0)
    const enemyUnits = ref([
      {
        xDirection: Math.random() > 0.5 ? 'left' : 'right',
        yDirection: Math.random() > 0.5 ? 'up' : 'down',
        currentX: 0,
        currentY: canvasHeight / 5,
        slowness: 20 * difficultyMultiplier[difficulty.value],
        baseSlowness: 20,
      },
      {
        xDirection: Math.random() > 0.5 ? 'left' : 'right',
        yDirection: Math.random() > 0.5 ? 'up' : 'down',
        currentX: (canvasWidth / 3) - unitSize / 2,
        currentY: canvasHeight / 5,
        slowness: 30 * difficultyMultiplier[difficulty.value],
        baseSlowness: 30,
      },
      {
        xDirection: Math.random() > 0.5 ? 'left' : 'right',
        yDirection: Math.random() > 0.5 ? 'up' : 'down',
        currentX: canvasWidth - (canvasWidth / 3) - unitSize / 2,
        currentY: canvasHeight - (canvasHeight / 3),
        slowness: 35 * difficultyMultiplier[difficulty.value],
        baseSlowness: 35,
      },
      {
        xDirection: Math.random() > 0.5 ? 'left' : 'right',
        yDirection: Math.random() > 0.5 ? 'up' : 'down',
        currentX: canvasWidth - unitSize,
        currentY: canvasHeight - (canvasHeight / 3),
        slowness: 25 * difficultyMultiplier[difficulty.value],
        baseSlowness: 25,
      },
      {
        xDirection: Math.random() > 0.5 ? 'left' : 'right',
        yDirection: Math.random() > 0.5 ? 'up' : 'down',
        currentX: (canvasWidth - 50) - unitSize / 2,
        currentY: (canvasHeight / 3) - unitSize / 2,
        slowness: 40 * difficultyMultiplier[difficulty.value],
        baseSlowness: 40,
      },
      {
        xDirection: Math.random() > 0.5 ? 'left' : 'right',
        yDirection: Math.random() > 0.5 ? 'up' : 'down',
        currentX: (canvasWidth / 2) - unitSize / 2,
        currentY: 0,
        slowness: 20 * difficultyMultiplier[difficulty.value],
        baseSlowness: 20,
      },
      {
        xDirection: Math.random() > 0.5 ? 'left' : 'right',
        yDirection: Math.random() > 0.5 ? 'up' : 'down',
        currentX: (canvasWidth / 2) - unitSize / 2,
        currentY: canvasHeight - unitSize,
        slowness: 25 * difficultyMultiplier[difficulty.value],
        baseSlowness: 25,
      },
    ])

    const onChangeDifficulty = (e) => {
      difficulty.value = e.target.value
      for (const enemy of enemyUnits.value) {
        enemy.slowness = enemy.baseSlowness * difficultyMultiplier[e.target.value]
      }
    }

    const checkCollission = () => {
      for (const enemy of enemyUnits.value) {
        if (
          (playerPosition.value.currentX + (unitSize / 2)) >= (enemy.currentX - (unitSize * 0.7) / 2)
          && (playerPosition.value.currentX - unitSize / 2) <= (enemy.currentX + ((unitSize * 0.7) / 2))
          && (playerPosition.value.currentY + (unitSize / 2)) >= (enemy.currentY - (unitSize * 0.7) / 2)
          && (playerPosition.value.currentY - unitSize / 2) <= (enemy.currentY + ((unitSize * 0.7) / 2))
        ) {
          onRestart()
        }
      }
    }

    const animate = (time) => {
      if (!ctx.value || !canvas.value) return

      let dt = 16
      if (!startTime.value) {
        startTime.value = time
        lastScoreTime.value = time
      } else {
        const currentFrame = Math.round((time - startTime.value) / frameRate)
        dt = ((currentFrame - lastFrame.value) * frameRate) || 16
        lastFrame.value = currentFrame

        if (time - 1000 > lastScoreTime.value) {
          lastScoreTime.value = time
          score.value += 1
        }
      }

      ctx.value.clearRect(0, 0, canvas.value.width, canvas.value.height)

      refreshCanvas(canvas.value, ctx.value, dt)
      checkCollission()

      animationId.value = requestAnimationFrame(animate)
    }

    const handleMouseMove = (e) => {
      if (!started.value) return
      const rect = canvas.value.getBoundingClientRect()

      let newX = e.clientX - rect.left
      let newY = e.clientY - rect.top
      newX = (newX - unitSize / 2) < 0 ? 0 + unitSize / 2 : newX
      newX = (newX + unitSize / 2) > canvasWidth ? canvasWidth - unitSize / 2 : newX
      newY = (newY - unitSize / 2) < 0 ? 0 + unitSize / 2 : newY
      newY = (newY + unitSize / 2) > canvasHeight ? canvasHeight - unitSize / 2 : newY

      playerPosition.value.x = newX
      playerPosition.value.y = newY
    }

    const onRestart = () => {
      if (highscore.value < score.value) {
        highscore.value = score.value
      }
      score.value = 0
      playerPosition.value.currentX = (canvasWidth / 2) - (unitSize / 2)
      playerPosition.value.x = (canvasWidth / 2) - (unitSize / 2)
      playerPosition.value.currentY = (canvasHeight / 2) - (unitSize / 2)
      playerPosition.value.y = (canvasHeight / 2) - (unitSize / 2)
    }

    const onStart = () => {
      animationId.value = requestAnimationFrame(animate)
      started.value = true
    }

    return {
      score,
      highscore,
      onRestart,
      started,
      onStart,
      difficulty,
      onChangeDifficulty,
    }
  }
}
</script>

<style scoped>

.workspace {
  background-image: url('../assets/PH_background.png');
  background-size: cover;
}

.ph-game {
  position: relative;
}

.ph-game .instruction {
  position: absolute;
  top: 127px;
  left: 50%;
  padding: 10px;
  width: 300px;
  transform: translateX(-50%);
  background-color: #0000ffa7;
  border: 5px solid red;
  color: yellow;
  font-weight: bold;
  font-size: 14px;
}

.ph-game .instruction button {
  border-width: 1px;
  margin: 10px;
  font-weight: bold;
  background: none;
  border: none;
  color: yellow;
  font-size: 24px;
  text-transform: uppercase;
  cursor: pointer;
}

.ph-game .instruction button:hover {
  text-decoration: underline;
}

.ph-game .instruction p {
  margin: 0;
}

.help {
  font-size: 12px;
}

.difficulty {
  display: flex;
  margin-bottom: 5px;
}

.scoreboard-wrapper {
  position: absolute;
  top: 0;
  left: 50%;
  transform: translateX(-50%);
  margin: 120px auto 0;
  height: 225px;
  width: 400px;
}

.scoreboard {
  position: absolute;
  right: 0;
  top: 0;
}

.scoreboard p {
  font-size: 12px;
  text-align: right;
}
</style>
