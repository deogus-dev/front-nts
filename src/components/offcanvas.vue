<template>
  <div
    class="offcanvas offcanvas-bottom h-25 p-0"
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
        class="tab-pane fade show active"
        id="nav-home"
        role="tabpanel"
        aria-labelledby="nav-home-tab"
        tabindex="0"
      >
        ...
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
      <div
        class="tab-pane fade"
        id="nav-contact"
        role="tabpanel"
        aria-labelledby="nav-contact-tab"
        tabindex="0"
      >
        ...
      </div>
      <div
        class="tab-pane fade"
        id="nav-disabled"
        role="tabpanel"
        aria-labelledby="nav-disabled-tab"
        tabindex="0"
      >
        ...
      </div>
    </div>
    <!-- <div class="offcanvas-header">
      <h5 class="offcanvas-title" id="offcanvasHolyLabel">
        휴가 및 기타일정 관리
      </h5>
      <button
        type="button"
        class="btn-close"
        data-bs-dismiss="offcanvas"
        aria-label="Close"
      ></button>
    </div>
    <div class="offcanvas-body small h-100 p-0">
      <select class="form-select" aria-label="Default select example">
        <option>1</option>
        <option>2</option>
        <option>3</option>
      </select>
    </div> -->
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },
};
</script>
