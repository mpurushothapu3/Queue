<template>
	<div>
		<div>
			<b>Queue name: {{collectionID}}</b>
			<br/>
			<b>Queue password: {{password}}</b>
			<div>
				<button v-on:click="clearQueue">Clear queue</button>
				<button>Delete queue</button>
			</div>
			<div>
				<button v-on:click="addTenToQueue">Add 10 to queue</button>
			</div>
			<ul v-if="queue.length">
				<Queuee
					v-for="queuee in queue"
					:key="queuee.id"
					:name="queuee"
					@remove="removeTodo"
				/>
			</ul>
			<p v-else>
				Noone left in the queue.
			</p>
		</div>
	</div>
</template>


<script>
import Queuee from './Queuee.vue'
import {db} from '../firebase.js'
import {functions} from '../firebase.js'

export default {
	components: {
		Queuee
    },
    props: {
        collectionID: {
            type: String,
            default: ''
        }, password: {
			type: String,
			default: ''
		}
    },
  data () {
    return {
		queue: []
    }
  },
  mounted () {
	db.collection(this.collectionID).orderBy("position").onSnapshot((querySnapshot) => {
		this.queue = []
        querySnapshot.forEach((doc) => {
            this.queue.push({
				id: doc.id,
				text: doc.data().name
			})
        });
    });
  },
	methods: {
		addTodo () {
			const trimmedText = this.newTodoText.trim()

			if (trimmedText) {
				db.collection(this.collectionID).add({
					name: trimmedText,
					time: Date.now()
				}).then(function() {
					console.log("Success");
				}).catch(function(error) {
					console.error("Error adding document: ", error);
				})
				console.log(db.collection("queue"))
				console.log(trimmedText)
				this.queue = []
				db.collection(this.collectionID).orderBy("time").get().then((querySnapshot) => {
					querySnapshot.forEach((doc) => {
						// doc.data() is never undefined for query doc snapshots
						console.log(doc)
						this.queue.push({
							id: doc.id,
							text: doc.data().name
						})
					});
				});

			}
		},
		removeTodo (idToRemove) {
			db.collection(this.collectionID).doc(idToRemove).delete().then(function() {
				console.log("Document successfully deleted!");
			}).catch(function(error) {
				console.error("Error removing document: ", error);
			})
			this.queue = this.queue.filter(todo => {
				return todo.id !== idToRemove
			})
		},
		clearQueue () {
			functions.httpsCallable('clearQueue')({collectionID: this.collectionID}).then(function(result) {
				console.log("Queue cleared!")
				console.log(result)
			})
		},
		addTenToQueue () {
			functions.httpsCallable('addToQueue')({collectionID: this.collectionID}).then(function(result) {
				console.log("Queue appended!")
				console.log(result)
			})
		}
	}
}
</script>
<style scoped>
	ul {
		list-style-type: none;
	}
</style>