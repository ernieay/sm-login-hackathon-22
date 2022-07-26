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
    onMounted(() => {
      document.addEventListener('keydown', (e) => {
        handleKeyDown(e)
      })
      const _canvas = document.getElementById('patintero')
      const _ctx = _canvas.getContext('2d')

      _canvas.width = 400
      _canvas.height = 225

      // draw field
      _ctx.strokeRect(0, 0, _canvas.width, _canvas.height)
      _ctx.strokeRect(0, 0, _canvas.width, _canvas.height / 2)
      _ctx.strokeRect(0, 0, _canvas.width / 3, _canvas.height)
      _ctx.strokeRect(0, 0, (_canvas.width - (_canvas.width / 3)), _canvas.height)

      // draw player
      _ctx.fillStyle = 'blue'
      _ctx.fillRect(playerPosition.value.x, playerPosition.value.y, playerSize, playerSize)

      // draw enemies
      _ctx.fillStyle = 'red'
      _ctx.fillRect((_canvas.width / 3) - playerSize / 2, _canvas.height / 5, playerSize, playerSize)
      _ctx.fillRect(_canvas.width - (_canvas.width / 3) - playerSize / 2, _canvas.height - (_canvas.height / 3), playerSize, playerSize)
      _ctx.fillRect((_canvas.width / 2) - playerSize / 2, (_canvas.height / 2) - playerSize / 2, playerSize, playerSize)

      canvas.value = _canvas
      ctx.value = _ctx

      // animate()
    })

    const moveSize = 20
    const playerSize = 20
    const frameRate = 1000/60

    const ctx = ref()
    const canvas = ref()
    const animationId = ref()
    const playerPosition = ref({
      currentX: 0,
      currentY: 0,
      x: 0,
      y: 0,
    })
    const lastFrame = ref(0)
    const startTime = ref()

    const animate = (time) => {
      if (!ctx.value) return

      let dt = 16
      if (!startTime.value) {
        startTime.value = time
      } else {
        const currentFrame = Math.round((time - startTime.value) / frameRate)
        dt = ((currentFrame - lastFrame.value) * frameRate) || 16
        lastFrame.value = currentFrame
      }

      ctx.value.clearRect(0, 0, canvas.value.width, canvas.value.height)


      // draw field
      ctx.value.strokeRect(0, 0, canvas.value.width, canvas.value.height)
      ctx.value.strokeRect(0, 0, canvas.value.width, canvas.value.height / 2)
      ctx.value.strokeRect(0, 0, canvas.value.width / 3, canvas.value.height)
      ctx.value.strokeRect(0, 0, (canvas.value.width - (canvas.value.width / 3)), canvas.value.height)

      // draw player
      let newX = playerPosition.value.currentX + ((playerPosition.value.x - playerPosition.value.currentX) / dt)
      let newY = playerPosition.value.currentY + ((playerPosition.value.y - playerPosition.value.currentY) / dt)
      ctx.value.fillStyle = 'blue'
      ctx.value.fillRect(newX, newY, playerSize, playerSize)
      playerPosition.value.currentX = newX
      playerPosition.value.currentY = newY

      // draw enemies
      ctx.value.fillStyle = 'red'
      ctx.value.fillRect((canvas.value.width / 3) - playerSize / 2, canvas.value.height / 5, playerSize, playerSize)
      ctx.value.fillRect(canvas.value.width - (canvas.value.width / 3) - playerSize / 2, canvas.value.height - (canvas.value.height / 3), playerSize, playerSize)
      ctx.value.fillRect((canvas.value.width / 2) - playerSize / 2, (canvas.value.height / 2) - playerSize / 2, playerSize, playerSize)

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
        const newX = playerPosition.value.x + moveSize > (canvas.value.width - playerSize)
          ? (canvas.value.width - playerSize)
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
        const newY = playerPosition.value.y + moveSize > (canvas.value.height - playerSize)
          ? (canvas.value.height - playerSize)
          : playerPosition.value.y + moveSize
        playerPosition.value.y = newY
      }
    }

  }
}
</script>
