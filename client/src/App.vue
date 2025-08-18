<template>
  <div class="min-h-screen flex items-center justify-center bg-gray-50">
    <div class="w-full max-w-md bg-white rounded-2xl shadow-lg p-8">
      <h2 class="text-2xl font-bold text-center text-gray-800 mb-6">
        Create Account To Access Our Apps
      </h2>

      <form @submit.prevent="createAcc" class="space-y-4">
        <div>
          <label class="block text-sm font-medium text-gray-600"
            >First Name</label
          >
          <input
            type="text"
            v-model="user.firstName"
            class="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            placeholder="John"
          />
        </div>

        <div>
          <label class="block text-sm font-medium text-gray-600"
            >Last Name</label
          >
          <input
            type="text"
            v-model="user.lastName"
            class="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            placeholder="Doe"
          />
        </div>

        <div>
          <label class="block text-sm font-medium text-gray-600">Email</label>
          <input
            type="email"
            v-model="user.email"
            class="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            placeholder="you@example.com"
          />
        </div>

        <div>
          <label class="block text-sm font-medium text-gray-600"
            >Password</label
          >
          <input
            type="password"
            v-model="user.password"
            class="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            placeholder="••••••••"
          />
        </div>

        <button
          type="submit"
          class="w-full bg-indigo-600 text-white py-2 px-4 rounded-lg shadow hover:bg-indigo-700 transition"
        >
          Create Account
        </button>
      </form>

      <p
        v-if="output"
        class="mt-6 text-center text-green-600 font-semibold bg-green-50 py-2 rounded-lg"
      >
        ✅ Sign Up Successful! UID: {{ uid }}
      </p>
    </div>
  </div>
</template>

<script setup>
import axios from "axios";
import { reactive, ref } from "vue";

const uid = ref("");
const output = ref(false);

const user = reactive({
  firstName: "",
  lastName: "",
  email: "",
  password: "",
});

const createAcc = async () => {
  try {
    const { data } = await axios.post("http://gkrane.online/api/user/create", {
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      password: user.password,
    });

    uid.value = data.uid;
    output.value = true;
  } catch (error) {
    console.error(error);
  }
};
</script>
