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
        <select class="form-select mb-3" v-model="attendCode">
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
            v-model="from"
          />
          <span class="input-group-text" v-if="attendCode === 'AT06'">~</span>
          <input
            type="date"
            class="form-control"
            placeholder="Server"
            aria-label="Server"
            v-model="to"
            v-if="attendCode === 'AT06'"
          />
        </div>
        <button class="btn btn-primary">저장</button>
      </div>
      <div
        class="tab-pane fade"
        id="nav-profile"
        role="tabpanel"
        aria-labelledby="nav-profile-tab"
        tabindex="0"
      >
        ...
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      comCode: [],
      attendCode: null,
      from: null,
      to: null,
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
  methods: {
    // 휴가 신청시 attendCode, from, to
    // api 통신 전에 to가 null인 경우 to = from 으로 넣고 call
    // if(from > to) { alert("시작일이 종료일보다 클 수 없습니다."); return false; }
  },
};
</script>
