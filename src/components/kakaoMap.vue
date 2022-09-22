<template>
  <div class="h-100">
    <div id="map" class="h-100"></div>
  </div>
</template>

<script>
export default {
  props: ["locationInfo"],
  data() {
    return {
      interval: null,
      time: null,
      map: null,
      marker: null,
      compLoc: [],
      position: {
        lat: 37.51082,
        lng: 127.02928,
      },
      circle: [],
    };
  },
  created() {
    if (!("geolocation" in navigator)) {
      return;
    }
    this.getCurPos();
  },
  mounted() {
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

    compLoc: {
      handler: function () {
        this.initMap();
      },
      deep: true,
    },
  },
  // computed: {
  //   dateUtil,
  // },
  beforeDestroy() {
    // clearInterval(this.interval);
    navigator.geolocation.clearWatch(this.interval);
  },
  destroyed() {
    // console.log(this.interval);
  },
  methods: {
    async initMap() {
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

      const result = await this.$axios.get("/company-locations", {
        params: {
          email: "it1713@gsitm.com",
        },
      });
      if (result.status === 200) {
        console.log(result.data);
        result.data.forEach((obj) => {
          this.circle.push(
            new kakao.maps.Circle({
              center: new kakao.maps.LatLng(obj.latitude, obj.longitude),
              fillColor: obj.locationCode, // kakao circle에 커스텀 데이터 삽입 위해 (String) fillColor 활용
            })
          );
        });

        this.circle.forEach((obj) => {
          obj.setMap(this.map);
        });

        this.posCheck();
      }
      // this.compLoc = result.data;

      this.map.setDraggable(true);

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
        console.log(this.circle);
        this.circle.forEach((obj) => {
          if (
            this.position.lng > obj.getBounds().ha &&
            this.position.lat > obj.getBounds().qa &&
            this.position.lng < obj.getBounds().oa &&
            this.position.lat < obj.getBounds().pa
          ) {
            this.$emit("setLocationInfo", {
              circleIn: true,
              locCode: obj.Eb.fillColor,
            });
            throw new Error("stop loop");
          } else {
            this.$emit("setLocationInfo", {
              circleIn: false,
              locCode: null,
            });
          }
        });
      } catch (e) {}
    },
  },
};
</script>
