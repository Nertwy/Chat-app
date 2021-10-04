<template>
  <nav
    class="
      flex
      items-center
      justify-between
      flex-wrap
      bg-teal-500
      p-6
      bg-indigo-500
    "
  >
    <div class="flex items-center flex-shrink-0 text-white mr-6">
      <span class="font-semibold text-xl tracking-tight">{{
        this.$data.user.username.toUpperCase()
      }}</span>
    </div>
    <div class="block lg:hidden">
      <button
        class="
          flex
          items-center
          px-3
          py-2
          border
          rounded
          text-teal-200
          border-teal-400
          hover:text-white
          hover:border-white
        "
      >
        <svg
          class="fill-current h-3 w-3"
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg"
        >
          <title>Menu</title>
          <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z" />
        </svg>
      </button>
    </div>
    <div class="w-full block flex-grow lg:flex lg:items-center lg:w-auto">
      <div class="text-sm lg:flex-grow">
        <a
          @click.prevent="socketGEt"
          href="#responsive-header"
          class="
            block
            mt-4
            lg:inline-block
            lg:mt-0
            text-teal-200
            hover:text-white
            mr-4
          "
        >
          Chat
        </a>
        <a
          href="#responsive-header"
          class="
            block
            mt-4
            lg:inline-block
            lg:mt-0
            text-teal-200
            hover:text-white
            mr-4
          "
        >
          Rooms
        </a>
        <a
          href="#responsive-header"
          class="
            block
            mt-4
            lg:inline-block
            lg:mt-0
            text-teal-200
            hover:text-white
          "
        >
          Blog
        </a>
      </div>
    </div>
  </nav>
</template>

<script  lang='ts'>
import { defineComponent } from "@vue/runtime-core";
import router from "vue-router";
import { User } from "../interface/User";
import io from "socket.io-client";
export default defineComponent({
  data() {
    return {
      user: this.$route.params as unknown as User,
    };
  },
  mounted() {},
  methods: {
    socketGEt() {
      const socket = io("http://localhost:5000/auth/rooms");
      console.log(socket);
      socket.on("connect", () => {
        console.log(this.socket.id);
      });
    },
  },
});
</script>

<style>
</style>