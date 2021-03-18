<template>
  <div>
    <canvas id="frameworkBtn" width="130" height="130"></canvas>
  </div>
</template>

<script>
export default {
  mounted () {
    // let min = 0
    // let max = this.doughnutChartData.percentage
    // setInterval(() => {
    //   if (min <= max) {
    //     min += 0.3
    //     this.drawCircle(min)
    //   }
    // }, 0.01)
    this.drawCircle()
  },
  // data () {
  //   return {
  //     box: ''
  //   }
  // },
  methods: {
    drawCircle () {
      const canvas = document.getElementById('frameworkBtn')
      const centerX = canvas.width / 2
      const centerY = canvas.height / 2
      const ctx = canvas.getContext('2d')
      
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      // text
      ctx.font = '16.2px Helvetica'
      ctx.fillStyle = '#F19C42'
      ctx.fillText('See', 50, 66, 100)
      ctx.font = '16.2px Helvetica'
      ctx.fillStyle = '#F19C42'
      ctx.fillText('framework', 23, 85, 100)      
      // background
      ctx.beginPath()
      ctx.lineWidth = 8
      ctx.strokeStyle = '#D8D8D8'
      ctx.lineCap = 'round'
      ctx.arc(centerX, centerY, 60, 1.5, false)
      ctx.stroke()
      ctx.fillStyle = 'rgb(255, 255, 255, 0)'
      ctx.fill()
      // color
      ctx.beginPath()
      ctx.lineWidth = 8
      ctx.strokeStyle = '#F19C42'
      ctx.lineCap = 'round'
      const fraction = 90 / 100
      ctx.arc(centerX, centerY, 60, 1.5 * Math.PI, (1.0 + fraction) * 1.5 * Math.PI, false)
      ctx.stroke()
      ctx.fillStyle = 'rgb(255, 255, 255, 0)'
      ctx.fill()
    }
  }
}
</script>

<style>
</style>