<template>
  <div>
    <h5>Create Account To Access Automation App</h5>

    <div>
      <form>
        Firstname:
        <input type="text" v-model="user.firstName" />
        Lastname:
        <input type="text" v-model="user.lastName" />
        Email:
        <input type="text" v-model="user.email" />
        Password:
        <input type="password" v-model="user.password" />

        <button @click="register">Create Account</button>
      </form>
    </div>

    <p v-if="output">Sign Up Successful. UID: {{ uid }}</p>
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
