<template>
  <div>
    <CreateQueueText
      @submit="createQueue($event)"
      buttonText="Create Queue"
    />
    <p v-if="invalid">The name you entered is invalid.</p>
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
		invalid: false
    }
  },
  methods: {
    createQueue (event) {
      //console.log(event[0])
      const trimmedText = event[0].trim()
      console.log(trimmedText)
      db.runTransaction((transaction) => {
        return transaction.get(db.collection(trimmedText).doc("counter")).then((doc) => {
          if(doc.exists) {
            throw "Queue already exists!";
          }
          transaction.set(db.collection(trimmedText).doc("counter"), {numberOfDocs: 0, password: event[1]});
          router.push({name: 'Manage Queue', params: {collectionID: trimmedText, password: event[1]}});
        }).catch((error) => { this.invalid = true; console.log(error)});
      })
      // try {
      //   db.collection(trimmedText).doc("counter").get().then((doc) => {
      //     if(doc.exists) {
      //       throw "Queue already exists!"
      //     }
      //   });
      //   router.push({name: 'Manage Queue', params: {collectionID: trimmedText}})
      // }
      // catch(error) {
      //   this.invalid = true
      //   console.log(error)
      // }

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