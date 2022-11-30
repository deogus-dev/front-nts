<template>
  <nav class="navbar d-flex justify-content-between p-2 rounded-top">
    <!-- <router-link to="/" class="btn btn-light w-25 py-2">메인</router-link>

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

    <router-link to="/mypage" class="btn btn-light w-25 py-2">설정</router-link> -->
    <nav class="bottom-navbar">
      <ul>
        <li>
          <router-link to="/" class="menu-home is-active">
            <span class="menu-text">메인</span></router-link
          >
        </li>
        <li>
          <router-link to="/attendhistory" class="menu-home is-active">
            <span class="menu-text">기록</span></router-link
          >
        </li>
        <li>
          <button
            class="menu-home is-active"
            data-bs-toggle="offcanvas"
            data-bs-target="#offcanvasHoly"
            aria-controls="offcanvasHoly"
            to="/"
          >
            <span class="menu-text">휴가</span>
          </button>
        </li>
        <li>
          <router-link to="/mypage" class="menu-home is-active">
            <span class="menu-text">설정</span></router-link
          >
        </li>
      </ul>
    </nav>
  </nav>
</template>
<style>
.navbar nav {
  display: block;
  width: 100%;
  height: 76px;
  padding-top: 12px;
  padding-bottom: 16px;
  background: #ffffff;
  border-radius: 16px 16px 0 0;
  box-shadow: 0 -10px 40px 0 rgb(0 0 0 / 6%);
  overflow: hidden;
}
.navbar > nav > ul {
  display: table;
  width: 100%;
  height: 100%;
}

.navbar > nav > ul > li {
  display: table-cell;
  width: 25%;
  text-align: center;
}
</style>
