<template>
  <div class="ph-game">
    <canvas id="patintero" class="workspace">
    </canvas>
  </div>
</template>

<script>

import { ref } from '@vue/reactivity'
import { onMounted } from '@vue/runtime-core'

export default {
  name: 'PhGame',
  setup: () => {
    const canvasWidth = 400
    const canvasHeight = 225
    onMounted(() => {
      document.addEventListener('keydown', (e) => {
        handleKeyDown(e)
      })
      const _canvas = document.getElementById('patintero')
      const _ctx = _canvas.getContext('2d')

      _canvas.width = canvasWidth
      _canvas.height = canvasHeight

      canvas.value = _canvas
      ctx.value = _ctx

      refreshCanvas(_canvas, _ctx, 16)
    })

    const refreshCanvas = (gameCanvas, gameContext, dt) => {
      // draw field
      gameContext.fillStyle = 'lightyellow'
      gameContext.fillRect(0, 0, gameCanvas.width, gameCanvas.height)
      gameContext.strokeStyle = 'black'
      gameContext.lineWidth = 1
      gameContext.strokeRect(0, 0, gameCanvas.width, gameCanvas.height)
      gameContext.strokeRect(0, 0, gameCanvas.width, gameCanvas.height / 2)
      gameContext.strokeRect(0, 0, gameCanvas.width / 3, gameCanvas.height)
      gameContext.strokeRect(0, 0, (gameCanvas.width - (gameCanvas.width / 3)), gameCanvas.height)

      gameContext.strokeStyle = startLineColor.value
      gameContext.lineWidth = 6
      gameContext.beginPath()
      gameContext.moveTo(0, 0)
      gameContext.lineTo(0, canvasHeight)
      gameContext.stroke()

      gameContext.strokeStyle = endLineColor.value
      gameContext.beginPath()
      gameContext.moveTo(canvasWidth, 0)
      gameContext.lineTo(canvasWidth, canvasHeight)
      gameContext.stroke()

      // draw player
      let newPlayerX = playerPosition.value.currentX + ((playerPosition.value.x - playerPosition.value.currentX) / dt)
      let newPlayerY = playerPosition.value.currentY + ((playerPosition.value.y - playerPosition.value.currentY) / dt)
      gameContext.fillStyle = 'blue'
      gameContext.fillRect(newPlayerX, newPlayerY, unitSize, unitSize)
      playerPosition.value.currentX = newPlayerX
      playerPosition.value.currentY = newPlayerY

      // draw enemies
      gameContext.fillStyle = 'red'
      for (const enemy of enemyUnits.value) {
        let newEnemyX = enemy.currentX
        let newEnemyY = enemy.currentY
        if (enemy.movement === 'x') {
          newEnemyX = enemy.currentX + ((newPlayerX - enemy.currentX) / enemy.slowness)
        }
        if (enemy.movement === 'y') {
          newEnemyY = enemy.currentY + ((newPlayerY - enemy.currentY) / enemy.slowness)
        }
        gameContext.fillRect(newEnemyX, newEnemyY, unitSize, unitSize)
        enemy.currentX = newEnemyX
        enemy.currentY = newEnemyY
      }
    }

    const moveSize = 20
    const unitSize = 20
    const frameRate = 1000/60

    const ctx = ref()
    const canvas = ref()
    const animationId = ref()
    const playerPosition = ref({
      currentX: 50,
      currentY: 50,
      x: 50,
      y: 50,
    })
    const lastFrame = ref(0)
    const startTime = ref()
    const enemyUnits = ref([
      {
        currentX: 0,
        currentY: canvasHeight / 5,
        movement: 'y',
        slowness: 20,
      },
      {
        currentX: (canvasWidth / 3) - unitSize / 2,
        currentY: canvasHeight / 5,
        movement: 'y',
        slowness: 30,
      },
      {
        currentX: canvasWidth - (canvasWidth / 3) - unitSize / 2,
        currentY: canvasHeight - (canvasHeight / 3),
        movement: 'y',
        slowness: 35,
      },
      {
        currentX: canvasWidth - unitSize,
        currentY: canvasHeight - (canvasHeight / 3),
        movement: 'y',
        slowness: 25,
      },
      {
        currentX: (canvasWidth / 2) - unitSize / 2,
        currentY: (canvasHeight / 2) - unitSize / 2,
        movement: 'x',
        slowness: 40,
      },
      {
        currentX: (canvasWidth / 2) - unitSize / 2,
        currentY: 0,
        movement: 'x',
        slowness: 20,
      },
      {
        currentX: (canvasWidth / 2) - unitSize / 2,
        currentY: canvasHeight - unitSize,
        movement: 'x',
        slowness: 25,
      },
    ])
    const reachedEnd = ref(false)
    const finished = ref(false)
    const startLineColor = ref('gray')
    const endLineColor = ref('gray')

    const checkReachedEnd = () => {
      if (reachedEnd.value) return
      if (playerPosition.value.currentX + unitSize >= (canvasWidth - 5)) {
        reachedEnd.value = true
        endLineColor.value = 'lightgreen'
      }
    }

    const checkFinished = () => {
      if (finished.value) return
      if (playerPosition.value.currentX <= 5 && reachedEnd.value) {
        finished.value = true
        startLineColor.value = 'lightgreen'
      }
    }

    const checkCollission = () => {
      for (const enemy of enemyUnits.value) {
        if (
          (playerPosition.value.currentX + unitSize) >= enemy.currentX
          && (playerPosition.value.currentX) <= (enemy.currentX + unitSize)
          && (playerPosition.value.currentY + unitSize) >= enemy.currentY
          && (playerPosition.value.currentY) <= (enemy.currentY + unitSize)
        ) {
          playerPosition.value.currentX = 50
          playerPosition.value.x = 50
          playerPosition.value.currentY = 50
          playerPosition.value.y = 50
          reachedEnd.value = false
          finished.value = false
          startLineColor.value = 'gray'
          endLineColor.value = 'gray'
        }
      }
    }

    const animate = (time) => {
      if (!ctx.value || !canvas.value) return

      let dt = 16
      if (!startTime.value) {
        startTime.value = time
      } else {
        const currentFrame = Math.round((time - startTime.value) / frameRate)
        dt = ((currentFrame - lastFrame.value) * frameRate) || 16
        lastFrame.value = currentFrame
      }

      ctx.value.clearRect(0, 0, canvas.value.width, canvas.value.height)

      refreshCanvas(canvas.value, ctx.value, dt)

      checkCollission()

      checkReachedEnd()
      checkFinished()

      animationId.value = requestAnimationFrame(animate)
    }

    const handleKeyDown = (e) => {
      if (!animationId.value) {
        animationId.value = requestAnimationFrame(animate)
        // animate()
      }

      if (e.keyCode === 37) {
        // left
        const newX = playerPosition.value.x - moveSize < 0 ? 0 : playerPosition.value.x - moveSize
        playerPosition.value.x = newX
      }
      if (e.keyCode === 39) {
        // right
        const newX = playerPosition.value.x + moveSize > (canvas.value.width - unitSize)
          ? (canvas.value.width - unitSize)
          : playerPosition.value.x + moveSize
        playerPosition.value.x = newX
      }
      if (e.keyCode === 38) {
        // up
        const newY = playerPosition.value.y - moveSize < 0 ? 0 : playerPosition.value.y - moveSize
        playerPosition.value.y = newY
      }
      if (e.keyCode === 40) {
        // down
        const newY = playerPosition.value.y + moveSize > (canvas.value.height - unitSize)
          ? (canvas.value.height - unitSize)
          : playerPosition.value.y + moveSize
        playerPosition.value.y = newY
      }
    }

  }
}
</script>
