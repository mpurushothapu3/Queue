<template>
	<div>
		<div>
			<BaseInputText
				v-model="newTodoText"
				placeholder="Name"
				@keydown.enter="addTodo"
				@submit="addTodo"
				buttonText="Add"
			/>

		</div>
		<div>
			<ul v-if="todos.length">
				<Queuee
					v-for="todo in todos"
					:key="todo.id"
					:name="todo"
					@remove="removeTodo"
				/>
			</ul>
			<p v-else>
				Nothing left in the list. Add a new todo in the input above.
			</p>
		</div>
	</div>
</template>


<script>
import BaseInputText from './BaseInputText.vue'
import Queuee from './Queuee.vue'
import {db} from '../firebase.js'

export default {
	components: {
		BaseInputText, Queuee
	},
  data () {
    return {
		newTodoText: '',
		todos: [],
		submitted:  false
    }
  },
  mounted () {
	db.collection("queue").orderBy("time").get().then((querySnapshot) => {
		querySnapshot.forEach((doc) => {
			// doc.data() is never undefined for query doc snapshots
			// console.log(doc)
			this.todos.push({
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
				try {
				db.collection("queue").add({
					name: trimmedText,
					time: Date.now()
				}).then(function() {
					console.log("Success");
				}).catch(function(error) {
					console.error("Error adding document: ", error);
				})}
				catch(error) {console.log(error)}
				console.log(db.collection("queue"))
				console.log(trimmedText)
				this.todos = []
				db.collection("queue").orderBy("time").get().then((querySnapshot) => {
					querySnapshot.forEach((doc) => {
						// doc.data() is never undefined for query doc snapshots
						console.log(doc)
						this.todos.push({
							id: doc.id,
							text: doc.data().name
						})
					});
				});


				this.newTodoText = ''
				this.submitted = true
			}
		},
		removeTodo (idToRemove) {
			db.collection("queue").doc(idToRemove).delete().then(function() {
				console.log("Document successfully deleted!");
			}).catch(function(error) {
				console.error("Error removing document: ", error);
			})
			this.todos = this.todos.filter(todo => {
				return todo.id !== idToRemove
			})
		}
	}
}
</script>