<template>
  <nav
    class="navbar fixed-bottom d-flex justify-content-between px-2 rounded-top"
  >
    <router-link :to="{ name: 'main' }" class="btn btn-light w-25 py-2"
      ><i class="bi-house"></i
    ></router-link>

    <router-link :to="{ name: 'page2' }" class="btn btn-light w-25 py-2"
      ><i class="bi-clock"></i
    ></router-link>

    <button
      class="btn btn-light w-25 py-2"
      data-bs-toggle="offcanvas"
      data-bs-target="#offcanvasHoly"
      aria-controls="offcanvasHoly"
    >
      <i class="bi-house"></i>
    </button>

    <router-link :to="{ name: 'page4' }" class="btn btn-light w-25 py-2"
      ><i class="bi-lock"></i
    ></router-link>
  </nav>
</template>
