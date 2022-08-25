<template>
  <section class="h-100">
    <div id="map"></div>
    <p>
      <button
        class="btn"
        :class="status ? 'btn-success' : 'btn-secondary'"
        :disabled="!status"
        onclick="alert('반경 안에 있음!')"
      >
        출석체크
      </button>
    </p>
    <small>{{ curPos }}</small>
  </section>
</template>

<script>
export default {
  data() {
    return {
      map: null,
      circle: null,
      curPos: {
        latitude: 33.450701,
        longitude: 126.570667,
      },
      status: false,
    };
  },
  created() {
    console.log("created");
    if (!("geolocation" in navigator)) {
      return;
    }

    // get position
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        console.log("watchposition");
        this.curPos.latitude = pos.coords.latitude;
        this.curPos.longitude = pos.coords.longitude;
        this.initMap;
      },
      (err) => {
        console.log(err.message);
      }
    );
  },
  mounted() {
    if (!window.kakao || !window.kakao.maps) {
      console.log("script");
      const script = document.createElement("script");
      script.src = `http://dapi.kakao.com/v2/maps/sdk.js?autoload=false&appkey=${process.env.VUE_APP_KAKAOMAP_KEY}`;
      /* global kakao */
      script.addEventListener("load", () => {
        kakao.maps.load(this.initMap);
      });
      document.head.appendChild(script);
    } else {
      console.log("initmap");
      //console.log("이미 로딩됨: ", window.kakao);
      this.initMap();
    }
  },

  watch: {
    curPos: {
      handler: function () {
        if (this.circle) this.chkPos();
      },
      deep: true,
    },
  },

  methods: {
    chkPos() {
      if (
        this.curPos.longitude > this.circle.getBounds().ha &&
        this.curPos.latitude > this.circle.getBounds().qa &&
        this.curPos.longitude < this.circle.getBounds().oa &&
        this.curPos.latitude < this.circle.getBounds().pa
      ) {
        this.status = true;
      } else {
        this.status = false;
      }
    },
    initMap() {
      var container = document.getElementById("map");
      var options = {
        center: new kakao.maps.LatLng(
          this.curPos.latitude,
          this.curPos.longitude
        ),
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

        _this.curPos.latitude = latlng.getLat();
        _this.curPos.longitude = latlng.getLng();
      });

      this.circle = new kakao.maps.Circle({
        center: new kakao.maps.LatLng(
          this.curPos.latitude,
          this.curPos.longitude
        ), // 원의 중심좌표 입니다
        radius: 100, // 미터 단위의 원의 반지름입니다
        strokeWeight: 5, // 선의 두께입니다
        strokeColor: "#75B8FA", // 선의 색깔입니다
        strokeOpacity: 1, // 선의 불투명도 입니다 1에서 0 사이의 값이며 0에 가까울수록 투명합니다
        strokeStyle: "dashed", // 선의 스타일 입니다
        fillColor: "#CFE7FF", // 채우기 색깔입니다
        fillOpacity: 0.7, // 채우기 불투명도 입니다
      });

      // 지도에 원을 표시합니다
      this.circle.setMap(this.map);

      this.chkPos();
    },
  },
};
</script>

<style>
#map {
  width: 100%;
  height: 400px;
}
</style>
