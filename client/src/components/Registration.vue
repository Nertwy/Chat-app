<template>
  <div class="w-screen h-screen bg-gray-500 flex">
    <form
      @submit.prevent="sendRegistration"
      class="
        flex flex-col
        items-center
        rounded-md
        space-y-5
        m-auto
        p-24
        bg-white
        shadow-lg
      "
    >
      <div class="text-2xl pb-9 font-bold">Registration</div>
      <input
        v-model="this.user.username"
        type="text"
        class="rounded flex text-xl p-3 bg-gray-400 placeholder-white"
        placeholder="Name"
      />
      <input
        type="text"
        class="rounded flex text-xl p-3 bg-gray-400 placeholder-white"
        placeholder="SureName"
      />
      <input
        v-model="this.user.password"
        type="text"
        class="rounded flex text-xl p-3 bg-gray-400 placeholder-white"
        placeholder="Password"
      />
      <input
        type="email"
        class="rounded flex text-xl p-3 bg-gray-400 placeholder-white"
        placeholder="Email"
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
        Register
      </button>
      <div v-if="this.successful">Account was created!</div>
      <div v-else></div>
    </form>
  </div>
</template>

<script lang='ts'>
import { defineComponent } from "vue";
import { User } from "../interface/User";
export default defineComponent({
  name: "Registration",
  data() {
    return {
      successful: false,
      user: {
        username: "",
        password: "",
      } as User,
    };
  },
  methods: {
    async sendRegistration() {
      try {
        const responce = await fetch(
          "http://localhost:5000/auth/registration",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              username: this.user.name,
              password: this.user.password,
            }),
          }
        );
        if (responce.status === 200) {
          const result = await responce.json();
          console.log(result);
          console.log("ALL GOOD");
          this.successful = true;
        } else {
          throw new Error("Something Went Wrong");
        }
      } catch (e) {
        console.log(e);
        this.successful = false;
      }
    },
  },
});
</script>

<style>
</style>