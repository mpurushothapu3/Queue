<template v-if="submitted == false">
  <div>
    <input
      type="text"
      class="input"
      v-model="value"
      placeholder="Name of Queue"
      @keydown.enter="clicked"
    >
    <input
      type="text"
      class="input"
      v-model="password"
      placeholder="Password"
      @keydown.enter="clicked"
      >
    <button v-on:click="clicked">
      {{buttonText}}
    </button>
  </div>
</template>

<script>
export default {
  props: {
    buttonText: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      value: '',
      password: ''
    }
  },
  methods: {
    clicked() {
      //console.log(this.value)
      this.$emit('submit', [this.value, this.password])
    }
  }
}
</script>

<style scoped>

.input {
  width: 100%;
  padding: 8px 8px;
  border: 1px solid #32485F;
  margin-bottom: 6px;
}

button {
  display: block;
  background-color: #4CAF50; /* Green */
  border: none;
  color: white;
  padding: 16px 32px;
  text-align: center;
  text-decoration: none;
  font-size: 16px;
  margin: auto;
  margin-top: 6px;
  width: 80%;
  transition-duration: 0.4s;
  cursor: pointer;
  border: 1px solid black;
}


button:hover {
  background-color: white;
  color: #4CAF50;
}
</style>
