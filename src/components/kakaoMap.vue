<template>
  <div class="h-100">
    <div id="map" class="h-100"></div>
  </div>
</template>

<script>
export default {
  props: ["status", "compLoc"],
  data() {
    return {
      interval: null,
      time: null,
      map: null,
      marker: null,
      position: {
        lat: 37.51082,
        lng: 127.02928,
      },
      circle: [],
    };
  },
  created() {
    console.log("[created]");
    if (!("geolocation" in navigator)) {
      return;
    }

    this.getCurPos();
  },
  mounted() {
    console.log("[mounted]");
    if (!window.kakao || !window.kakao.maps) {
      const script = document.createElement("script");
      script.src = `//dapi.kakao.com/v2/maps/sdk.js?autoload=false&appkey=${process.env.VUE_APP_KAKAOMAP_KEY}`;
      script.addEventListener("load", () => {
        kakao.maps.load(this.initMap);
      });
      document.head.appendChild(script);
    } else {
      // this.setCompBounds();
      this.initMap();
    }

    // this.interval = setInterval(this.getCurPos, 10000);
  },
  watch: {
    position: {
      handler: function () {
        console.log("watch call");
        if (this.map) {
          var latlng = new kakao.maps.LatLng(
            this.position.lat,
            this.position.lng
          );
          this.map.setCenter(latlng);
          this.marker.setPosition(latlng);
          this.posCheck();
        }
      },
      deep: true,
    },
  },
  // computed: {
  //   dateUtil,
  // },
  beforeDestroy() {
    console.log("[beforedestroy]");
    // clearInterval(this.interval);
    navigator.geolocation.clearWatch(this.interval);
  },
  destroyed() {
    console.log(this.interval);
  },
  methods: {
    initMap() {
      console.log("[methods]-[initmap]");
      var container = document.getElementById("map");
      var options = {
        center: new kakao.maps.LatLng(this.position.lat, this.position.lng),
        level: 4,
      };
      this.map = new kakao.maps.Map(container, options);

      this.marker = new kakao.maps.Marker({
        position: this.map.getCenter(),
      });

      this.marker.setMap(this.map);

      this.compLoc.forEach((obj) => {
        this.circle.push(
          new kakao.maps.Circle({
            center: new kakao.maps.LatLng(obj.lat, obj.lng),
          })
        );
      });

      this.circle.forEach((obj) => {
        obj.setMap(this.map);
      });

      //위치 테스트용으로만 사용(배포시 삭제)
      kakao.maps.event.addListener(this.map, "click", (mouseEvent) => {
        // 마커에 마우스오버 이벤트가 발생하면 인포윈도우를 마커위에 표시합니다
        // 클릭한 위도, 경도 정보를 가져옵니다
        var latlng = mouseEvent.latLng;

        // 마커 위치를 클릭한 위치로 옮깁니다
        this.marker.setPosition(latlng);

        this.position.lat = latlng.getLat();
        this.position.lng = latlng.getLng();
      });
    },
    getCurPos() {
      console.log("call getCurPos");
      if (navigator.geolocation) {
        //발열 테스트 후 발열 심하면 getCurrentPosition interval set
        this.interval = navigator.geolocation.watchPosition(
          (pos) => {
            this.position.lat = pos.coords.latitude;
            this.position.lng = pos.coords.longitude;
          },
          (err) => {
            console.log("error! ", err.message);
          },
          {
            enableHighAccuracy: false,
          }
        );
      }
    },
    posCheck() {
      try {
        this.circle.forEach((obj) => {
          if (
            this.position.lng > obj.getBounds().ha &&
            this.position.lat > obj.getBounds().qa &&
            this.position.lng < obj.getBounds().oa &&
            this.position.lat < obj.getBounds().pa
          ) {
            this.$emit("setStatus", true);
            throw new Error("stop loop");
          } else {
            this.$emit("setStatus", false);
          }
        });
      } catch (e) {}
    },
  },
};
</script>
