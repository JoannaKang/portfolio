<template>
  <div>
    <canvas :id="canvasId" width="455" height="327"></canvas>
  </div>
</template>

<script>
export default {
  props: {
    doughnutChartData: {
      type: Object,
      required: true
    }
  },
  mounted () {

  
    let max1 = this.doughnutChartData.percentageForChart[0]
    let max2 = this.doughnutChartData.percentageForChart[1]
    let max3 = this.doughnutChartData.percentageForChart[2]

    setInterval(() => {
      if (this.endpoint1 <= max1) {
        this.endpoint1 += 0.3
        this.drawCircle()
      }
    }, 0.01)
    setInterval(() => {
      if (this.endpoint2 <= max2) {
        this.endpoint2 += 0.3
        this.drawCircle()
      }
    }, 0.01)   
    setInterval(() => {
      if (this.endpoint3 <= max3) {
        this.endpoint3 += 0.3
        this.drawCircle()
      }
    }, 0.01)        
    
  },
  data () {
    return {
      canvasId: this.doughnutChartData.canvasId,
      centerX: this.doughnutChartData.centerX,
      centerY: this.doughnutChartData.centerY,
      width: 455,
      height: 327,
      endpoint1: 0,
      endpoint2: 0,
      endpoint3: 0
    }
  },
  methods: {
    drawCircle () {
      const canvas = document.getElementById(`${this.canvasId}`)
      const ctx = canvas.getContext('2d')
      
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      // Chart text
      ctx.font = '500 15px Helvetica'
      ctx.fillStyle = '#686868'
      ctx.fillText(this.doughnutChartData.firstlinebold, 
        this.doughnutChartData.firstlinePosition[0],
        this.doughnutChartData.firstlinePosition[1],
        this.doughnutChartData.firstlinePosition[2])
      ctx.font = '300 14px Helvetica'
      ctx.fillStyle = '#686868'
      ctx.fillText(this.doughnutChartData.firstlinelight, 
        this.doughnutChartData.firstlinePosition[3],
        this.doughnutChartData.firstlinePosition[4],
        this.doughnutChartData.firstlinePosition[5])
      ctx.font = '500 15px Helvetica'
      ctx.fillStyle = '#686868'
      ctx.fillText(this.doughnutChartData.secondlinebold,
        this.doughnutChartData.secondlinePostiion[0],
        this.doughnutChartData.secondlinePostiion[1],
        this.doughnutChartData.secondlinePostiion[2])
      ctx.font = '300 14px Helvetica'
      ctx.fillStyle = '#686868'
      ctx.fillText(this.doughnutChartData.secondlinelight, 
        this.doughnutChartData.secondlinePostiion[3],
        this.doughnutChartData.secondlinePostiion[4],
        this.doughnutChartData.secondlinePostiion[5])
      ctx.font = '500 15px Helvetica'
      ctx.fillStyle = '#686868'
      ctx.fillText(this.doughnutChartData.thirdlinebold,
        this.doughnutChartData.thirdlinePostiion[0],
        this.doughnutChartData.thirdlinePostiion[1],
        this.doughnutChartData.thirdlinePostiion[2])
      ctx.font = '300 14px Helvetica'
      ctx.fillStyle = '#686868'
      ctx.fillText(this.doughnutChartData.thirdlinelight, 
        this.doughnutChartData.thirdlinePostiion[3],
        this.doughnutChartData.thirdlinePostiion[4],
        this.doughnutChartData.thirdlinePostiion[5])                
      ctx.font = '45px Helvetica'
      ctx.fillStyle = '#686868'
      ctx.fillText(`${this.doughnutChartData.percentage}%`,
        this.doughnutChartData.percentageTextPostiion[0],
        this.doughnutChartData.percentageTextPostiion[1],
        this.doughnutChartData.percentageTextPostiion[2])
      ctx.font = '300 15px Helvetica'
      ctx.fillStyle = '#686868'
      ctx.fillText(this.doughnutChartData.insideText, 
        this.doughnutChartData.insideTextPostiion[0],
        this.doughnutChartData.insideTextPostiion[1],
        this.doughnutChartData.insideTextPostiion[2])
      // circle chart : 325 * 325
      this.fillCircles(ctx, this.endpoint1, 314, '#FE8708') // out
      this.fillCircles(ctx, this.endpoint2, 250, '#2FB9EF') // middle
      this.fillCircles(ctx, this.endpoint3, 186, '#EA4C89') // inside
    },
    fillCircles (ctx, endpoint, radius, color) {
      // background
      ctx.beginPath()
      ctx.lineWidth = 12
      ctx.strokeStyle = '#D8D8D8'
      ctx.lineCap = 'round'
      ctx.arc(this.centerX, this.centerY, radius/2, 1.5 * Math.PI, 1 / 100 * 100 * Math.PI, false)
      ctx.stroke()
      ctx.fillStyle = 'rgb(255, 255, 255, 0)'
      ctx.fill()
      // color
      ctx.beginPath()
      ctx.lineWidth = 12
      ctx.strokeStyle = color
      ctx.lineCap = 'round'
      const fraction = endpoint / 100
      ctx.arc(this.centerX, this.centerY, radius/2, 1.5 * Math.PI, (1.0 + fraction) * 1.5 * Math.PI, false)
      ctx.stroke()
      ctx.fillStyle = 'rgb(255, 255, 255, 0)'
      ctx.fill()     
      return ctx
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