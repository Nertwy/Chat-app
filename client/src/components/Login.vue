<template>
  <!-- component -->
  <div
    class="
      flex flex-col
      w-screen
      h-screen
      bg-gray-500
      justify-center
      items-center
    "
  >
    <form
      class="flex flex-col bg-white rounded shadow-lg p-12 mt-12"
      action=""
      @submit.prevent="LoginVerify"
    >
      <label class="font-semibold text-xs" for="usernameField">Username</label>
      <input
        v-model="this.$data.name"
        class="
          flex
          items-center
          h-12
          px-4
          w-64
          bg-gray-200
          mt-2
          rounded
          focus:outline-none
          focus:ring-2
        "
        type="text"
      />
      <label class="font-semibold text-xs mt-3" for="passwordField"
        >Password</label
      >
      <input
        v-model="password"
        class="
          flex
          items-center
          h-12
          px-4
          w-64
          bg-gray-200
          mt-2
          rounded
          focus:outline-none
          focus:ring-2
        "
        type="password"
      />
      <button
        type="submit"
        class="
          flex
          items-center
          justify-center
          h-12
          px-6
          w-64
          bg-blue-600
          mt-8
          rounded
          font-semibold
          text-sm text-blue-100
          hover:bg-blue-700
        "
      >
        Login
      </button>
      <div class="flex mt-6 justify-center text-xs">
        <a class="text-blue-400 hover:text-blue-500" href="#"
          >Forgot Password</a
        >
        <span class="mx-2 text-gray-300">/</span>
        <router-link
          class="text-blue-400 hover:text-blue-500"
          to="/registration"
        >
          <a class="text-blue-400 hover:text-blue-500" href="#">Sign Up</a>
        </router-link>
      </div>
    </form>
  </div>
</template>

<script lang='ts'>
import { defineComponent } from "@vue/runtime-core";
import { User } from "../interface/User";
export default defineComponent({
  data() {
    return {
      name: "",
      password: "",
    };
  },
  methods: {
    async LoginVerify() {
      try {
        const responce = await fetch("http://localhost:5000/auth/login", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            username: this.$data.name,
            password: this.$data.password,
          }),
        });
        if (responce.status === 200) {
          const result = await responce.json();
          const token = result.token;
          const req = await fetch("http://localhost:5000/auth/users", {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: "Bearer " + token,
            },
          });
          if (req.status === 200) {
            const usersInfo: User = await req.json();
            console.log(usersInfo[0]);
            this.$router.push({
              name: "home",
              params: usersInfo[0],
            });
          }
        } else {
          throw new Error("Something Went Wrong");
        }
      } catch (e) {
        console.log(e);
      }
    },
  },
  name: "Login",
});
</script>

<style>
</style>