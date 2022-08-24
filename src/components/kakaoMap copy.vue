<template>
  <section>
    <div id="map"></div>
    <button
      class="btn"
      :class="checkPos ? 'btn-secondary' : 'btn-success'"
      @click="setCircle"
    >
      circle
    </button>
    <br />{{ latitude }} | {{ longitude }} <br />{{ cuLa }} | {{ cuLo }}
  </section>
</template>

<script>
export default {
  data() {
    return {
      map: null,
      markers: [],
      circle: null,
      latitude: 37.5108295,
      longitude: 127.0292881,
      cuLa: 0,
      cuLo: 0,
    };
  },
  created() {
    if (!("geolocation" in navigator)) {
      return;
    }

    // get position
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        this.latitude = pos.coords.latitude;
        this.longitude = pos.coords.longitude;
      },
      (err) => {
        alert(err.message);
      }
    );
  },
  mounted() {
    window.kakao && window.kakao.maps ? this.initMap() : this.addScript();
  },
  computed: {
    checkPos() {
      return true;
    },
  },

  methods: {
    initMap() {
      var container = document.getElementById("map");
      var options = {
        center: new kakao.maps.LatLng(this.latitude, this.longitude),
        level: 3,
      };
      this.map = new kakao.maps.Map(container, options);

      //마커추가하려면 객체를 아래와 같이 하나 만든다.
      var marker = new kakao.maps.Marker({
        position: this.map.getCenter(),
      });

      marker.setMap(this.map);

      var _this = this;

      kakao.maps.event.addListener(this.map, "click", function (mouseEvent) {
        // 마커에 마우스오버 이벤트가 발생하면 인포윈도우를 마커위에 표시합니다
        // 클릭한 위도, 경도 정보를 가져옵니다
        var latlng = mouseEvent.latLng;

        // 마커 위치를 클릭한 위치로 옮깁니다
        marker.setPosition(latlng);

        _this.cuLa = latlng.getLat();
        _this.cuLo = latlng.getLng();

        // console.log("[getLat] : ", latlng.getLat());
        // console.log("[getLng] : ", latlng.getLng());

        // console.log("[circle ha] : ", _this.circle.getBounds().ha);
        // console.log("[circle qa] : ", _this.circle.getBounds().qa);
        // console.log("[circle oa] : ", _this.circle.getBounds().oa);
        // console.log("[circle pa] : ", _this.circle.getBounds().pa);

        // if (
        //   _this.cuLo > _this.circle.getBounds().ha &&
        //   _this.cuLa > _this.circle.getBounds().qa &&
        //   _this.cuLo < _this.circle.getBounds().oa &&
        //   _this.cuLa < _this.circle.getBounds().pa
        // ) {
        //   console.log("success");
        // } else {
        //   console.log("false");
        // }
      });
    },

    addScript() {
      const script = document.createElement("script");
      /* global kakao */
      script.onload = () => kakao.maps.load(this.initMap);
      script.src =
        "http://dapi.kakao.com/v2/maps/sdk.js?autoload=false&appkey=" +
        process.env.VUE_APP_KAKAOMAP_KEY;
      document.head.appendChild(script);
    },

    setCircle() {
      // if (this.checkPos) {
      //   alert("내 위치가 범위안에 있지 않음.");
      // } else {
      var circle = new kakao.maps.Circle({
        center: new kakao.maps.LatLng(this.latitude, this.longitude), // 원의 중심좌표 입니다
        radius: 100, // 미터 단위의 원의 반지름입니다
        strokeWeight: 5, // 선의 두께입니다
        strokeColor: "#75B8FA", // 선의 색깔입니다
        strokeOpacity: 1, // 선의 불투명도 입니다 1에서 0 사이의 값이며 0에 가까울수록 투명합니다
        strokeStyle: "dashed", // 선의 스타일 입니다
        fillColor: "#CFE7FF", // 채우기 색깔입니다
        fillOpacity: 0.7, // 채우기 불투명도 입니다
      });

      // 지도에 원을 표시합니다
      circle.setMap(this.map);

      console.log("[getLat] : ", this.cuLa);
      console.log("[getLng] : ", this.cuLo);

      console.log("[circle ha] : ", circle.getBounds().ha);
      console.log("[circle qa] : ", circle.getBounds().qa);
      console.log("[circle oa] : ", circle.getBounds().oa);
      console.log("[circle pa] : ", circle.getBounds().pa);

      if (
        parseFloat(this.cuLo) > parseFloat(circle.getBounds().ha) &&
        parseFloat(this.cuLa) > parseFloat(circle.getBounds().qa) &&
        parseFloat(this.cuLo) < parseFloat(circle.getBounds().oa) &&
        parseFloat(this.cuLa) < parseFloat(circle.getBounds().pa)
      ) {
        console.log("success");
      } else {
        console.log("false");
      }

      // console.log("[circle bounds]\r\n", circle.getBounds());
      // console.log("[current bounds]\r\n", this.map.getBounds());
    },
  },
};
</script>

<style scoped lang="scss">
// @import "@/assets/stylesheets/index.scss";

#map {
  //   @include css-size(300px, 300px);
  width: 400px;
  height: 400px;
}
</style>
