<template>
  <div>
    <canvas id="demo" width="45" height="45"></canvas>
  </div>
</template>

<script>
export default {
  props: {
    doughnutChartData: {
      type: Number,
      required: true
    }
  },
  mounted () {
    // console.log(this.doughnutChartData)
    let min = 0
    let max = this.doughnutChartData
    setInterval(() => {
      if (min <= max) {
        min += 0.3
        this.drawCircle(min)
      }
    }, 0.01)
  },
  // data () {
  //   return {
  //     box: ''
  //   }
  // },
  methods: {
    drawCircle (endpoint) {
      const canvas = document.getElementById('demo')
      const centerX = canvas.width / 2
      const centerY = canvas.height / 2
      const ctx = canvas.getContext('2d')
      // text
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      ctx.font = '12px Helvetica'
      ctx.fillStyle = '#686868'
      ctx.fillText(`${this.doughnutChartData}%`, 12, 26, 60)
      // background
      ctx.beginPath()
      ctx.lineWidth = 4
      ctx.strokeStyle = '#D8D8D8'
      ctx.lineCap = 'round'
      ctx.arc(centerX, centerY, 20, 1.5 * Math.PI, 1 / 100 * 100 * Math.PI, false)
      ctx.stroke()
      ctx.fillStyle = 'rgb(255, 255, 255, 0)'
      ctx.fill()
      // color
      ctx.beginPath()
      ctx.lineWidth = 4
      ctx.strokeStyle = '#8954BA'
      ctx.lineCap = 'round'
      const fraction = endpoint / 100
      ctx.arc(centerX, centerY, 20, 1.5 * Math.PI, (1.0 + fraction) * 1.5 * Math.PI, false)
      ctx.stroke()
      ctx.fillStyle = 'rgb(255, 255, 255, 0)'
      ctx.fill()
    }
  },
  watch: {
    // doughnutChartData: {
    //   handler: function (val) {
    //     this.drawCircle(
    //       val.box,
    //       val.title,
    //       val.subtitle1,
    //       val.subtitle2,
    //       val.percentage,
    //       val.insideText,
    //       val.color)
    //   },
    //   deep: true
    // }
  }
}
</script>

<style>
</style>