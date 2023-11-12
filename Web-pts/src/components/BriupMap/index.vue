<script>
export default {
  data() {
    return {
      myplace: '', // 我的位置
      mycity: ''// 我所在的城市
    }
  },
  mounted() {
    this.initMap()
  },
  methods: {
    initMap() {
      var map, geolocation
      map = new AMap.Map(document.getElementById('container'))
      document.getElementById('container').style.height = '420px'
      map.plugin('AMap.Geolocation', () => {
        geolocation = new AMap.Geolocation({
          enableHighAccuracy: true, // 是否使用高精度定位，默认:true
          timeout: 2000, // 超过10秒后停止定位，默认：无穷大
          maximumAge: 0, // 定位结果缓存0毫秒，默认：0
          convert: true, // 自动偏移坐标，偏移后的坐标为高德坐标，默认：true
          showButton: true, // 显示定位按钮，默认：true
          buttonPosition: 'LB', // 定位按钮停靠位置，默认：'LB'，左下角
          buttonOffset: new AMap.Pixel(10, 20), // 定位按钮与设置的停靠位置的偏移量，默认：Pixel(10, 20)
          showMarker: true, // 定位成功后在定位到的位置显示点标记，默认：true
          showCircle: true, // 定位成功后用圆圈表示定位精度范围，默认：true
          panToLocation: true, // 定位成功后将定位到的位置作为地图中心点，默认：true
          zoomToAccuracy: true, // 定位成功后调整地图视野范围使定位位置及精度范围视野内可见，默认：false
          zoom: 2
        })
        map.addControl(geolocation)
        geolocation.getCurrentPosition()
        AMap.event.addListener(geolocation, 'complete', this.onComplete) // 返回定位信息
        AMap.event.addListener(geolocation, 'error', this.onError) // 返回定位出错信息
      })
    },
    onComplete(data) {
      var str = ['定位成功']
      str.push('经度：' + data.position.getLng())
      str.push('纬度：' + data.position.getLat())
      if (data.accuracy) {
        str.push('精度：' + data.accuracy + ' 米')
      } // 如为IP精确定位结果则没有精度信息
      str.push('是否经过偏移：' + (data.isConverted ? '是' : '否'))

      // document.getElementById('tip').innerHTML = str.join('<br>');
      // parent.loca(data);
      this.myplace = data.formattedAddress // 我的位置
      this.mycity = data.addressComponent.city // 我所在的城市
      // console.log('str', data.position.getLng(), data.position.getLat())
      // console.log('我所在的地点为 ' + data.formattedAddress)
      // console.log('我所在的城市为 ' + data.addressComponent.city)
      this.$emit('loaded', {
        longitude: data.position.getLng(),
        latitude: data.position.getLat(),
        address: data.formattedAddress,
        city: data.addressComponent.city
      })
    },
    getSomeOfMyVal() {
      return this.myplace + '+' + this.mycity
    },
    // 解析定位错误信息
    onError(data) {
      this.$emit('onError','设备异常，定位失败')
    },
    getGeolocation() {
      geolocation.getCurrentPosition()
    }
  },
  render(createElement) {
    return createElement('div', {
      attrs: {
        id: 'container'
      }
    })
  }
}
</script>
