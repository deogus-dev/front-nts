<template>
  <div class="card h-100 border-0 py-2">
    <div class="card-header border-0 row m-0 px-0 py-3 bg-transparent">
      <div class="col-10 text-start">
        <h5><strong>김지각</strong>님<br />환영합니다.</h5>
      </div>
      <div class="col-2 h-100">
        <button class="btn shadow-lg h-100 border rounded-circle">
          <i class="bi-person h-100"></i>
        </button>
      </div>
    </div>
    <div class="card-body border-0 p-2">
      <div class="shadow-lg rounded">
        {{ position.lat }} | {{ position.lng }}
      </div>
    </div>
    <div class="card-body border-0 bg-success">
      <h3>
        <strong>{{ getCurrentTime }}</strong>
      </h3>
    </div>
    <div class="card-body h-100 border-0">
      <button class="btn btn-success">
        <!-- <img src="@/assets/image/location-crosshairs-solid.svg" /> -->
      </button>
    </div>
    <!-- <kakao-map></kakao-map> -->
  </div>
</template>

<script>
// import kakaoMap from "@/components/kakaoMap.vue";
import dateUtil from "@/utils/date";
export default {
  data() {
    return {
      interval: null,
      time: null,
      position: {
        lat: 0,
        lng: 0,
      },
    };
  },
  components: {
    // kakaoMap,
  },
  created() {
    if (navigator.geolocation) {
      console.log("getPosition1");
      navigator.geolocation.getCurrentPosition((pos) => {
        this.position.lat = pos.coords.latitude;
        this.position.lng = pos.coords.longitude;
      });
    }
  },
  mounted() {
    // this.interval = setInterval(this.getNow, 5000);
  },
  beforeDestroy() {
    console.log("beforeDestroy");
    // clearInterval(this.interval);
  },
  computed: {
    getCurrentTime() {
      return dateUtil.getCurrentTime();
    },
  },
  methods: {
    getNow() {
      if (navigator.geolocation) {
        console.log("getPosition2");
        navigator.geolocation.getCurrentPosition((pos) => {
          console.log(pos.coords.latitude);
          this.position.lat += pos.coords.latitude;
          this.position.lng += pos.coords.longitude;
        });
      }
    },
  },
};
</script>
