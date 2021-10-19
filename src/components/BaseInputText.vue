<template v-if="submitted == false">
  <div>
    <input
      type="text"
      class="input"
      :value="value"
      v-on="listeners"
    >
    <button v-on:click="clicked">
      {{buttonText}}
    </button>
  </div>
</template>

<script>
export default {
  props: {
    value: {
      type: String,
      default: '',
    },
    buttonText: {
      type: String,
      default: ''
    }
  },
  computed: {
    listeners() {
      return {
        // Pass all component listeners directly to input
        ...this.$listeners,
        // Override input listener to work with v-model
        input: event => this.$emit('input', event.target.value)
      }
    }
  },
  methods: {
    clicked() {
      //console.log(this.value)
      this.$emit('submit', this.value)
    }
  }
}
</script>

<style scoped>

.input {
  width: 100%;
  padding: 8px 8px;
  border: 1px solid #32485F;
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
}


button:hover {
  background-color: white;
  color: #4CAF50;
}
</style>
