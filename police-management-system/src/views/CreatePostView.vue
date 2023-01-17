<template>
    <h2>Create a new post</h2>
    <form v-on:submit.prevent="handleCreatePost" >
        <label>
            Title: 
            <input
                v-bind:value="newPost.title"
                v-on:input="newPost.title = $event.target.value"
            />
        </label>
        <label>
            Content:
            <textarea rows="6" v-model="newPost.content"></textarea>
        </label>
        <button>Publish new post</button>
    </form>
    <p>{{ newPost.title }}</p>
</template>

<script>
    import db from '../firebase/db';
    import { addDoc, collection } from 'firebase/firestore'

    export default {
        data() {
            return {
                newPost: {
                    title: '',
                    content: '',
                    author: 'john@doe.com'
                },
            }
        },
        methods: {
            async handleCreatePost() {
                console.log('Attempting to create Post')
                // validation
                if (!this.newPost.title.trim() ||
                    !this.newPost.content.trim()                
                ) return;

                // create a new post
                console.log('make request to create post -> ', this.newPost);
                try {
                    // create or update
                    // const result = await setDoc(doc(db, "posts", "3"), { ...this.newPost })
                    // create
                    const result = await addDoc(collection(db, "posts"), { ...this.newPost })
                    console.log(result);
                } catch (err) {
                    console.error(err);
                }
                this.newPost.title = '';
                this.newPost.content = '';
            }
        }
    }
</script>

<style>
    form {
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 1rem;
    }
</style>