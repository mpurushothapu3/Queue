<template>
  <li>
    <button @click="$emit('remove', name.id)">
      {{ name.text }}
    </button>
  </li>
</template>

<script>
//Change name from todo eventually
export default {
  props: {
    name: {
      type: Object,
      required: true
    }
  }
}
</script>
<style scoped>
  button {
    display: block;
    width: 75%;
    height: 50px;
    background-color: #4CAF50;
    color: white;
    transition-duration: 0.4s;
    cursor: pointer;
    border-radius: 5px;
    margin-top: 10px;
  }

  button:hover {
    background-color: white;
    color: #4CAF50;
  }
</style>