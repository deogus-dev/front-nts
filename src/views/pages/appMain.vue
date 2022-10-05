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
      <!-- <pre class="text-start">{{ attendInfo }}</pre> -->
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
          @setLocationInfo="setLocationInfo"
        />
        <button
          class="btn fixed-bottom mb-5 mx-5 bg-gradient py-3"
          :class="locationInfo.circleIn ? 'btn-success' : 'btn-secondary'"
          @click="attend(attendType)"
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
      // compLoc: [],
    };
  },

  async created() {
    try {
      // 1. 서버에 출근정보 요청
      const result1 = await this.$axios.get("/attends");
      if (result1.status === 200) {
        this.attendInfo = result1.data.attendList;
        console.log("attend list");
        console.log(result1.data.attendList);
      }

      if (!this.attendInfo[0].outTime) {
        if (this.attendInfo[0].attendCode === "PM") {
          alert("PM 작업중!");
          this.attendType = "out";
          return;
        }
        // else if (this.attendInfo[0].attendCode != "휴가") {
        //   // 전일 주말, 공휴일 체크?
        // }
      }
      if (this.attendInfo[1].inTime && this.attendInfo[1].outTime) {
        alert("근무종료됨");
        // 근무종료
        return;
      }
      if (!this.attendInfo[1].inTime) {
        this.attendType = "in";
        alert("출근하기 버튼 활성화!");
      } else {
        this.attendType = "out";
        alert("퇴근하기 버튼 활성화!");
      }

      // 2. 회사 위치 정보 가져오기
    } catch (err) {
      console.log(err);
    }
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
    setLocationInfo(param) {
      this.locationInfo.circleIn = param.circleIn;
      this.locationInfo.locCode = param.locCode;
    },
    async attend(type) {
      try {
        let data = {
          email: "it1713@gsitm.com",
          attendDate: this.$moment().format("YYMMDD"),
          attendCode: "A01",
        };

        //출근하기 클릭
        if (type === "in") {
          data.inTime = this.$moment().format("HHmmss");
          data.locationCode = this.locationInfo.locCode;

          // if (this.locationInfo.circleIn) {
          //   const result = await this.$axios.post("/attend", data);

          //   if (result.status === 200) {
          //     this.$router.go();
          //   }
          // } else {
          //   alert("현재 위치가 회사 근처가 아닙니다 위치를 확인해주세요!");
          // }
        }

        //퇴근하기 클릭
        else {
          data.outTime = this.$moment().format("HHmmss");
        }

        if ((type === "in" && this.locationInfo.circleIn) || type === "out") {
          const result = await this.$axios.post("/attend", data);

          if (result.status === 200) {
            this.$router.go();
          }
        } else if (type === "in" && !this.locationInfo.circleIn) {
          alert("현재 위치가 회사 근처가 아닙니다 위치를 확인해주세요!");
        }
      } catch (err) {
        console.log(JSON.stringify(err));
      }
    },
  },
};
</script>
