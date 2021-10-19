<template>
  <div>
    <h2>{{$route.name}}</h2>
    <nav>
      <router-link class="spacing" v-for="routes in links"
      v-bind:key="routes.id"
      :to="`${routes.page}`">{{routes.text}}</router-link>
    </nav>
  </div>
</template>

<script>
export default {
  name: 'Navigation',
  data() {
    return {
      links: [
        {
          id: 0,
          text: 'Home',
          page:'/'
        },
        {
          id: 1,
          text: 'About',
          page:'/about'
        },
        {
          id: 2,
          text: 'Create',
          page:'/create'
        },
        {
          id: 3,
          text: 'Manage',
          page: '/goto'
        }

      ]
    }
  }
}
</script>
<style>
.spacing {
  margin-right: 10px;
}
</style>