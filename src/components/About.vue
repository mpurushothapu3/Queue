
<template>
  <div>
    <h1>About</h1>
    <p>Here is some information. This is the about page. {{value}}</p>
  </div>
</template>

<script>
export default {
  name: 'About', //this is the name of the component
  props: {
    value: {
      type: String,
      default: 'Default',
    }
  }
}
</script>
<style>
</style>