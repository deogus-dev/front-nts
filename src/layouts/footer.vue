<template>
  <nav
    class="navbar fixed-bottom d-flex justify-content-between px-2 rounded-top"
  >
    <router-link to="/" class="btn btn-light w-25 py-2">메인</router-link>

    <router-link to="/attendhistory" class="btn btn-light w-25 py-2"
      >기록</router-link
    >

    <button
      class="btn btn-light w-25 py-2"
      data-bs-toggle="offcanvas"
      data-bs-target="#offcanvasHoly"
      aria-controls="offcanvasHoly"
    >
      휴가
    </button>

    <router-link to="/mypage" class="btn btn-light w-25 py-2">설정</router-link>
  </nav>
</template>
