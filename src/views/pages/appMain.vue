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
      <day-component></day-component>
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
        :class="
          (attendStatus === 'in' && locationInfo.circleIn) ||
          attendStatus === 'out'
            ? 'btn-success'
            : 'btn-secondary'
        "
        @click="attend(attendStatus)"
      >
        {{ attendStatus === "in" ? "출근하기" : "퇴근하기" }}
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
          :class="
            (attendStatus === 'in' && locationInfo.circleIn) ||
            attendStatus === 'out'
              ? 'btn-success'
              : 'btn-secondary'
          "
          @click="attend(attendStatus)"
        >
          {{ attendStatus === "in" ? "출근하기" : "퇴근하기" }}
        </button>
      </div>
    </div>
    {{ attendStatus }}<br />
    {{ attendInfo }}
  </div>
</template>

<script>
import kakaoMap from "@/components/kakaoMap.vue";
import dayComponent from "@/components/button/dayComponent.vue";
export default {
  components: { kakaoMap, dayComponent },

  data() {
    return {
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
        console.log(result1.data.attendList);
      }
    } catch (err) {
      console.log(err);
    }
  },

  computed: {
    attendStatus() {
      if (!this.attendInfo[0].outTime) {
        if (this.attendInfo[0].attendCode === "PM") {
          return "out";
        }
      }
      if (this.attendInfo[1].inTime && this.attendInfo[1].outTime) {
        return "end";
      }
      if (!this.attendInfo[1].inTime) {
        return "in";
      } else {
        return "out";
      }
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
          attendDate: this.$moment().format("YYMMDD"),
          attendCode: "A01",
        };

        //출근하기 클릭
        if (type === "in") {
          data.inTime = this.$moment().format("HHmmss");
          data.locationCode = this.locationInfo.locCode;
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
