<template>
	<div>
		<div v-if="!validCollection">
			<BaseInputText
				v-model="enterQueue"
				placeholder="Name of Queue"
				@keydown.enter="verifyQueue"
				@submit="verifyQueue"
				buttonText="Go to queue"
			/>
			<p style="text-align: center; color: red" v-if="invalidCollection">
				The specified queue does not exist.
			</p>
		</div>
		<div v-else-if="submitted==false">
			<BaseInputText
				v-model="newUser"
				placeholder="Name"
				@keydown.enter="addUser"
				@submit="addUser"
				buttonText="Add"
			/>

		</div>
		<div v-else-if="served==false">
			<p> You are #{{queuePosition}} in line. </p>
		</div>
		<div v-else>
			<p>You have been served. Thank you for using Custom Queues.</p>
		</div>
	</div>
</template>


<script>
import BaseInputText from './BaseInputText.vue'
import {db} from '../firebase.js'
//import router from '../router/index.js'

export default {
	components: {
		BaseInputText
	},
  data () {
    return {
		newUser: '',
		enterQueue: '',
        submitted:  false,
		queuePosition: 0,
		validCollection: false,
		invalidCollection: false,
		queueName: '',
		served: false
    }
  },
  mounted () {

  },
	methods: {
		verifyQueue () {
			const trimmedText = this.enterQueue.trim()
			if(trimmedText) {
				db.collection(trimmedText).doc("counter").get().then((querySnapshot) => {
					if (querySnapshot.exists) {
						this.validCollection = true;
						this.invalidCollection = true;
					} else {
						this.invalidCollection = true;
					}
				})
				// if(query.size == 0) {
				// 	this.invalidCollection = true
				// } else {
				// 	this.invalidCollection = false
				// }
				console.log(this.invalidCollection)
			}
		},
		addUser () {
			const trimmedText = this.newUser.trim()
			if (trimmedText) {
				db.collection(this.enterQueue).add({
					name: trimmedText,
					time: Date.now()
				}).then(docRef => {
					console.log("Success");
					db.collection(this.enterQueue.trim()).doc(docRef.id)
					.onSnapshot((doc) => {
						if (doc.exists) {
							console.log("Current data: ", doc.data());
							this.queuePosition = doc.data().position;
						} else {
							this.served = true;
						}
					});
				}).catch(function(error) {
					console.error("Error adding document: ", error);
				})
				console.log(db.collection("queue"))
				console.log(trimmedText)



				this.newUser = ''
				this.submitted = true

				//Add way to get document back
				//router.push({name: 'AboutE', params: {value: trimmedText}})
			}
		}
	}
}
</script>