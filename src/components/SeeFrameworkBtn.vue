<template>
  <div>
    <canvas id="frameworkBtn" width="1363" height="686"></canvas>
  </div>
</template>

<script>
import router from '../router'
export default {
  props: {
    buttonClicked: {
      type: Boolean,
      required: true
    }    
  },
  data () {
    return {
      min : 60,
      max: 1480
    }
  },
  mounted () {
    this.drawCircle(60)
    // min size: 112 * 92
    // max size: 1363 * 686 
  },
  methods: {
    drawCircle (maxsize) {
      const canvas = document.getElementById('frameworkBtn')
      // height: 92 px width: 112px
      const centerX = 1317
      const centerY = 60
      const ctx = canvas.getContext('2d')
      ctx.clearRect(0, 0, canvas.width, canvas.height) 
      // grey line
      ctx.beginPath()
      ctx.lineWidth = 8
      ctx.strokeStyle = '#D8D8D8'
      ctx.lineCap = 'round'
      ctx.arc(centerX, centerY, maxsize, 1.5, false) // minimum size 60px / maximum size 1480px
      ctx.stroke()
      ctx.fillStyle = 'rgb(255, 255, 255, 0.6)'
      ctx.closePath()
      ctx.fill()
      // color line
      ctx.beginPath()
      ctx.lineWidth = 10
      ctx.strokeStyle = '#F19C42'
      ctx.lineCap = 'round'
      const fraction = 1.02
      ctx.arc(centerX, centerY, maxsize, 1.5 * Math.PI, (1.0 + fraction) * 1.5 * Math.PI, false)
      ctx.stroke()
      ctx.fillStyle = 'rgb(255, 255, 255, 0)'
      ctx.fill()
      // text
      ctx.font = '16.2px Helvetica'
      ctx.fillStyle = '#F19C42'
      ctx.fillText('See', 1300, 65, 100)
      ctx.font = '16.2px Helvetica'
      ctx.fillStyle = '#F19C42'
      ctx.fillText('framework', 1278, 84, 100)       
    }
  },
  watch: {
    min () {
      if (this.min > this.max) {
        router.push('/framework')
      }
    },
    buttonClicked () {
      if (this.buttonClicked) {
        setInterval(() => {
          if (this.min <= this.max) {
            this.min += 6
            this.drawCircle(this.min)
          }
        }, 0.0000001)
      }
    }
  }
}
</script>

<style>
</style>