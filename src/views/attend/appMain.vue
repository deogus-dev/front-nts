<template>
  <div class="card h-100 border-0 py-2 container-md">
    <!-- {{ attendInfo }} -->
    <div class="card-header border-0 row m-0 px-0 py-3 bg-transparent">
      <div class="col-2 text-start">
        <button class="btn h-100 border rounded-circle">
          <i class="bi-person h-100"></i>
        </button>
      </div>
      <div class="col-7 text-start">
        <h5>
          <strong>{{ getName }}</strong
          >님<br />환영합니다.
        </h5>
      </div>
      <div class="col-3 text-start">
        <div class="form-check form-switch">
          <input
            class="form-check-input"
            type="checkbox"
            role="switch"
            id="flexSwitchCheckChecked"
            true-value="AT07"
            false-value="AT01"
            @change="toggle()"
            v-model="attendInfo[1].attendCode"
            :disabled="attendStatus === 'out' || attendStatus === 'end'"
          />
          <!-- <label class="form-check-label" for="flexSwitchCheckChecked">{{
            attendInfo[1].attendCode
          }}</label> -->
          <select
            class="border-0"
            style="appearance: none"
            for="flexSwitchCheckChecked"
            v-model="attendInfo[1].attendCode"
            disabled
          >
            <option value="AT01">정상근무</option>
            <option value="AT07">재택근무</option>
          </select>
        </div>
      </div>
    </div>
    <div class="card-body h-100 border-0 shadow">
      <day-component v-if="attendStatus === 'in'"></day-component>
      <working-component
        v-else-if="attendStatus === 'out'"
        :inTime="attendInfo[1].inTime"
      ></working-component>
      <end-component v-else></end-component>
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
    <div class="card-body px-0 py-5 border-0" v-if="attendStatus !== 'end'">
      <!-- <attend-button
        class="btn w-100 py-3 my-1 bg-gradient"
        :attendStatus="attendStatus"
        :locationStatus="locationInfo.circleIn"
      ></attend-button> -->
      <button
        class="btn w-100 py-3 my-1 bg-gradient"
        :class="
          (attendStatus === 'in' && locationInfo.circleIn) ||
          attendStatus === 'out' ||
          attendInfo[1].attendCode === 'AT07'
            ? 'btn-success'
            : 'btn-secondary'
        "
        @click="attend(attendStatus)"
      >
        {{ attendStatus === "in" ? "출근하기" : "퇴근하기" }}
      </button>
      <router-link
        class="btn w-100 py-3 my-1 btn-secondary bg-gradient opacity-50"
        style="--bs-bg-opacity: 0.5"
        to="/attendhistory"
      >
        나의 출퇴근 기록
      </router-link>
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
        <!-- <attend-button
          class="btn fixed-bottom mb-5 mx-5 bg-gradient py-3"
          :attendStatus="attendStatus"
        ></attend-button> -->
        <button
          class="btn fixed-bottom mb-5 mx-5 bg-gradient py-3"
          :class="
            (attendStatus === 'in' && locationInfo.circleIn) ||
            attendStatus === 'out' ||
            attendInfo[1].attendCode === 'AT07'
              ? 'btn-success'
              : 'btn-secondary'
          "
          @click="attend()"
        >
          {{ attendStatus === "in" ? "출근하기" : "퇴근하기" }}
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import kakaoMap from "@/components/kakaoMap.vue";
import dayComponent from "../attend/component/dayComponent.vue";
import workingComponent from "../attend/component/workingComponent.vue";
import endComponent from "../attend/component/endComponent.vue";
export default {
  components: { kakaoMap, dayComponent, workingComponent, endComponent },

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

        // if (
        //   this.attendInfo[0].attendCode !== "AT08" &&
        //   !this.attendInfo[0].outTime
        // ) {
        //   alert("전일 퇴근 정보가 없어 18:00 퇴근으로 입력합니다.");
        // }

        if (!this.attendInfo[1].attendCode) {
          this.attendInfo[1].attendCode = "AT01";
        }

        if (!this.attendInfo[1].attendDate) {
          this.attendInfo[1].attendDate = this.$moment().format("YYMMDD");
        }
      }
    } catch (err) {
      // console.log(err);
    }
  },

  computed: {
    ...mapGetters(["getName"]),
    isVisible() {
      switch (this.attendStatus) {
        case "in":
          if (!this.attendInfo[1].inTime) {
            return true;
          }
          break;
        case "out":
          if (this.attendInfo[1].inTime && !this.attendInfo[1].outTime) {
            return true;
          }
          break;
        case "end":
          break;
      }
      return false;
    },
    attendStatus() {
      if (!this.attendInfo[0].outTime) {
        if (this.attendInfo[0].attendCode === "AT08") {
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
    async attend() {
      try {
        if (!this.attendValid()) {
          return false;
        }
        let data = {
          attendDate: this.$moment().format("YYMMDD"),
          attendCode: this.attendInfo[1].attendCode,
        };

        //출근하기 클릭
        if (this.attendStatus === "in") {
          data.inTime = this.$moment().format("HHmmss");
          data.locationCode = this.locationInfo.locCode;
        }

        //퇴근하기 클릭
        else if (this.attendStatus === "out") {
          if (!confirm("퇴근하시겠습니까?")) return false;
          data.outTime = this.$moment().format("HHmmss");
        }

        const result = await this.$axios.post("/attend", data);

        if (result.status === 200) {
          var attendTxt = null;
          if (this.attendStatus === "in") {
            attendTxt = "출근";
          } else if (this.attendStatus === "out") {
            attendTxt = "퇴근";
          }
          // global alert으로 변경
          alert(attendTxt + "이 확인되었습니다!");
          this.$router.go();
        }
      } catch (err) {
        // console.log(JSON.stringify(err));
      }
    },
    attendValid() {
      if (
        this.attendStatus === "in" &&
        this.attendInfo[1].attendCode !== "AT07"
      ) {
        if (!this.locationInfo.circleIn) {
          alert("현재 위치가 회사 근처가 아닙니다 위치를 확인해주세요!");
          return false;
        }
      }
      return true;
    },

    async toggle() {
      const result = await this.$axios.post("/attend", {
        attendDate: this.$moment().format("YYMMDD"),
        attendCode: this.attendInfo[1].attendCode,
      });

      if (result.status === 200) {
        console.log("succeed!");
      }
    },
  },
};
</script>
