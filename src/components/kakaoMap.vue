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

      const result = await this.$axios.get("/company-locations");
      if (result.status === 200) {
        result.data.forEach((obj) => {
          this.circle.push(
            new kakao.maps.Circle({
              center: new kakao.maps.LatLng(obj.latitude, obj.longitude),
              fillColor: obj.locationCode, // kakao circle??? ????????? ????????? ?????? ?????? (String) fillColor ??????
            })
          );
        });

        this.circle.forEach((obj) => {
          obj.setMap(this.map);
        });

        this.posCheck();
      }

      this.map.setDraggable(true);

      //?????? ????????????????????? ??????(????????? ??????)
      kakao.maps.event.addListener(this.map, "click", (mouseEvent) => {
        // ????????? ??????????????? ???????????? ???????????? ?????????????????? ???????????? ???????????????
        // ????????? ??????, ?????? ????????? ???????????????
        var latlng = mouseEvent.latLng;

        // ?????? ????????? ????????? ????????? ????????????
        this.marker.setPosition(latlng);

        this.position.lat = latlng.getLat();
        this.position.lng = latlng.getLng();
      });
    },

    getCurPos() {
      if (navigator.geolocation) {
        this.interval = navigator.geolocation.watchPosition(
          (pos) => {
            this.position.lat = pos.coords.latitude;
            this.position.lng = pos.coords.longitude;
          },
          (err) => {
            console.log("[navigator error] : ", err.message);
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
