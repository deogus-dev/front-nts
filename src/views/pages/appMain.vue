<template>
  <div class="card h-100 border-0 py-2 container-md">
    <div class="card-header border-0 row m-0 px-0 py-3 bg-transparent">
      <div class="col-2 text-start">
        <button class="btn h-100 border rounded-circle">
          <i class="bi-person h-100"></i>
        </button>
      </div>
      <div class="col-10 text-start">
        <h5><strong>김지각</strong>님<br />환영합니다.</h5>
      </div>
    </div>
    <div class="card-body h-25 border-0 shadow">
      <div class="row row-cols-5 m-0 align-items-center h-100">
        <div class="col p-0 fw-light">
          <h4>{{ getDay(-2) }}</h4>
        </div>
        <div class="col p-0 fw-light">
          <h4>{{ getDay(-1) }}</h4>
        </div>
        <div class="col p-0 fw-bold">
          <h4>{{ getDay(0) }}</h4>
        </div>
        <div class="col p-0 fw-light">
          <h4>{{ getDay(1) }}</h4>
        </div>
        <div class="col p-0 fw-light">
          <h4>{{ getDay(2) }}</h4>
        </div>
      </div>
    </div>
    <div class="card-body h-25 border-0">
      <h2 class="fw-bold">{{ getTime }}</h2>
    </div>
    <div class="card-body border-0 p-0">
      <button
        class="btn bg-gradient w-100 shadow"
        type="button"
        data-bs-toggle="offcanvas"
        data-bs-target="#offcanvasBottom"
        aria-controls="offcanvasBottom"
      >
        내 위치보기
      </button>
    </div>
    <div class="card-body p-0 h-100 border-0">
      <button
        class="btn w-100 py-3 my-1 bg-gradient"
        :class="locationInfo.circleIn ? 'btn-success' : 'btn-secondary'"
        @click="attend"
      >
        {{ attendType === "in" ? "출근하기" : "퇴근하기" }}
      </button>
      <button
        class="btn w-100 py-3 my-1 btn-secondary bg-gradient opacity-50"
        style="--bs-bg-opacity: 0.5"
      >
        나의 출퇴근 기록
      </button>
      {{ compLoc }}
    </div>
    <div
      class="offcanvas offcanvas-bottom h-100"
      tabindex="-1"
      id="offcanvasBottom"
      aria-labelledby="offcanvasBottomLabel"
    >
      <div class="offcanvas-header">
        <h5 class="offcanvas-title" id="offcanvasBottomLabel">
          Nine to Six Map
        </h5>
        <button
          type="button"
          class="btn-close"
          data-bs-dismiss="offcanvas"
          aria-label="Close"
        ></button>
      </div>
      <div class="offcanvas-body small h-100 p-0">
        <kakao-map
          class="h-100"
          :locationInfo="locationInfo"
          :compLoc="compLoc"
          @setLocationInfo="setLocationInfo"
        />
        <button
          class="btn fixed-bottom mb-5 mx-5 bg-gradient py-3"
          :class="locationInfo.circleIn ? 'btn-success' : 'btn-secondary'"
          @click="attend"
        >
          {{ attendType === "in" ? "출근하기" : "퇴근하기" }}
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import kakaoMap from "@/components/kakaoMap.vue";
export default {
  components: { kakaoMap },

  data() {
    return {
      attendType: "in", // 출근, 퇴근 버튼 구분값
      attendInfo: [{}, {}],
      locationInfo: {
        circleIn: false, // 현재 위치가 회사위치 반경 안 유무
        locCode: null, // 현재 회사위치 코드
      },
      compLoc: [
        {
          lat: 37.501957186941915,
          lng: 127.03731489385599,
        },
        {
          lat: 37.275884784729506,
          lng: 127.10868871356905,
        },
      ],
    };
  },

  async created() {
    // try {
    //   // 1. 서버에 출근정보 요청
    //   const result1 = await this.$axios.get("/attends", {
    //     params: {
    //       email: JSON.stringify(this.$store.getters.getEmail),
    //     },
    //   });
    //   if (result1.status === 200) {
    //     if (!result1[0].outTime) {
    //       if (result1[0].attendCode === "PM") {
    //         this.attendType = "out";
    //         return;
    //       } else if (result1[0].attendCode != "휴가") {
    //         // 전일 퇴근시간 입력 요청(18:00)
    //       }
    //     }
    //     if (result1[1].inTime && result1[1].outTime) {
    //       // 근무종료
    //       return;
    //     }
    //     if (!result1[1].inTime) {
    //       this.attendType = "in";
    //     } else {
    //       this.attendType = "out";
    //     }
    //   }
    //   // 2. 회사 위치 정보 가져오기
    //   const result2 = await this.$axios.get("/company-locations", {
    //     params: {
    //       email: this.$store.getters.getEmail,
    //     },
    //   });
    //   if (result2.status === 200) {
    //     console.log(result2.data);
    //   }
    // } catch (err) {
    //   console.log(err);
    // }
  },

  computed: {
    getTime() {
      return this.$moment().format("HH:mm:ss");
    },
    getDay() {
      return (days) => {
        return this.$moment().add("days", days).format("DD\n일");
      };
    },
  },

  methods: {
    async getCompLoc() {
      try {
        const compList = await this.$axios.post("/attend", {
          email: "it1713@gsitm.com",
        });
        this.compLoc = compList.data;
      } catch (err) {
        console.log(err);
      }
    },
    setLocationInfo(param) {
      this.locationInfo.circleIn = param.circleIn;
      this.locationInfo.locCode = param.locCode;
    },
    async attend(type) {
      // try {
      //출근, 퇴근 버튼 클릭?
      let data = { email: "it1713@gsitm.com" };
      if (type === "in") {
        data.inTime = "090000";
      } else {
        data.outTime = "180000";
      }

      if (this.locationInfo.circleIn) {
        const compList = await this.$axios.post("/attend/code", data);
        this.compLoc = compList.data;
      } else {
        alert("현재 위치가 회사 근처가 아닙니다 위치를 확인해주세요!");
      }
      // } catch (err) {
      //   console.log(JSON.stringify(err));
      // }
    },
  },
};
</script>
