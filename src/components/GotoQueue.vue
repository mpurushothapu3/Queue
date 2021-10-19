<template>
  <div>
    <CreateQueueText
      @submit="goToQueue($event)"
      buttonText="Go to Queue"
    />
    <p v-if="invalid">The name or password you entered is invalid.</p>
  </div>
</template>

<script>
import CreateQueueText from './CreateQueueText.vue'
import {db} from '../firebase.js'
import router from '../router/index.js'

export default {
	components: {
		CreateQueueText
	},
  data () {
    return {
		existingQueue: '',
		invalid: false
    }
  },
  methods: {
    goToQueue (event) {
		const trimmedText = event[0].trim()
		db.collection(trimmedText).doc("counter").get().then((docSnapshot) => {
            console.log(docSnapshot.data().password === undefined)
            if (docSnapshot.exists) {
                if (docSnapshot.data().password === undefined || docSnapshot.data().password === event[1]) {
                  this.invalid = false;
                } else {
                  this.invalid = true;
                }
            } else {
                this.invalid = true;
            }
            //console.log(this.invalid)
            if (!this.invalid) {
              router.push({name: 'Manage Queue', params: {collectionID: trimmedText, password: docSnapshot.data().password}})
            }
        })
    }
  }
}
</script>
<style scoped>
p {
  display: block;
  text-align: center;
  color: red;
}
</style>