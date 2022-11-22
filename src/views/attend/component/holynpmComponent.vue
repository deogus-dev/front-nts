<template>
  <div
    class="offcanvas offcanvas-bottom p-0 rounded-top"
    style="height: auto"
    tabindex="-1"
    id="offcanvasHoly"
    aria-labelledby="offcanvasHolyLabel"
  >
    <nav class="m-0 p-2">
      <div class="nav nav-tabs" id="nav-tab" role="tablist">
        <button
          class="nav-link active font-weight-bold"
          id="nav-home-tab"
          data-bs-toggle="tab"
          data-bs-target="#nav-home"
          type="button"
          role="tab"
          aria-controls="nav-home"
          aria-selected="true"
        >
          휴가
        </button>
        <button
          class="nav-link font-weight-bold"
          id="nav-profile-tab"
          data-bs-toggle="tab"
          data-bs-target="#nav-profile"
          type="button"
          role="tab"
          aria-controls="nav-profile"
          aria-selected="false"
        >
          연장근무
        </button>
      </div>
    </nav>
    <div class="tab-content" id="nav-tabContent">
      <div
        class="tab-pane fade show active p-2"
        id="nav-home"
        role="tabpanel"
        aria-labelledby="nav-home-tab"
        tabindex="0"
      >
        <select class="form-select mb-3" v-model="data.attendCode">
          <option v-for="code in comCode" :key="code.code" :value="code.code">
            {{ code.name }}
          </option>
        </select>
        <div class="input-group mb-3">
          <input
            type="date"
            class="form-control"
            placeholder="Username"
            aria-label="Username"
            v-model="data.from"
          />
          <span class="input-group-text" v-if="data.attendCode === 'AT06'"
            >~</span
          >
          <input
            type="date"
            class="form-control"
            placeholder="Server"
            aria-label="Server"
            v-model="data.to"
            v-if="data.attendCode === 'AT06'"
          />
        </div>
        <button class="btn btn-primary" @click="attend()">저장</button>
      </div>
      <div
        class="tab-pane fade p-2"
        id="nav-profile"
        role="tabpanel"
        aria-labelledby="nav-profile-tab"
        tabindex="0"
      >
        <div class="input-group mb-3">
          <input
            type="date"
            class="form-control"
            placeholder="Username"
            aria-label="Username"
            v-model="data.from"
          />
          <span class="input-group-text" v-if="data.attendCode === 'AT06'"
            >~</span
          >
          <input
            type="date"
            class="form-control"
            placeholder="Server"
            aria-label="Server"
            v-model="data.to"
            v-if="data.attendCode === 'AT06'"
          />
        </div>
        <button class="btn btn-primary" @click="attend('AT08')">저장</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      comCode: [],
      data: {
        attendCode: null,
        from: null,
        to: null,
      },
    };
  },
  async created() {
    const result = await this.$axios.get("/codes", {
      params: {
        codeGroup: "ATTEND",
      },
    });

    if (result.status === 200) {
      this.comCode = result.data;
    }
  },
  watch: {
    data: {
      handler: function () {
        if (this.data.from > this.data.to) {
          alert("시작일이 종료일보다 클 수 없습니다.");
          this.data.from = null;
          this.data.to = null;
        }
      },
      deep: true,
    },
  },
  methods: {
    async attend(attendCode) {
      const data = {
        attendCode: attendCode ? attendCode : this.data.attendCode,
        from: this.$moment(this.data.from).format("YYYYMMDD"),
        // api 통신 전에 to가 null인 경우 to = from 으로 넣고 call
        to: !this.data.to
          ? this.$moment(this.data.from).format("YYYYMMDD")
          : this.$moment(this.data.to).format("YYYYMMDD"),
      };

      const result = await this.$axios.post("/attend/code", data);

      if (result.status === 200) {
        alert("저장되었습니다.");
      }
    },
  },
};
</script>
