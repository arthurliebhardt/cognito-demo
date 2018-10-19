<template>
    <div class="card request">
        <div class="card-header">
            {{config.name}}
            <button class="btn btn-info btn-sm float-right" @click="send()">Send Request</button>
        </div>
        <div class="card-body">
            <p class="card-text">{{config.description}}</p>
        </div>
        <div class="card-body" v-if="response !== null">
            <pre>{{response}}</pre>
        </div>
        <div class="card-body bg-danger" v-if="error !== null">
            <pre>
                {{error.message}}
            </pre>
        </div>
    </div>
</template>

<script>
    import axios from 'axios';

    export default {
        name: 'CannedRequest',
        props: [
            "config"
        ],
        methods: {
            send: function() {
                this.error = null;
                this.response = null;
                axios.get(this.config.url, {
                    responseType: null
                })
                    .then( r => this.response = r.data )
                    .catch( e => this.error = e )
            }
        },
        data() {
            return {
                error: null,
                response: null
            };
        }
    }
</script>

<style scoped>
    .request {
        margin-bottom: 20px;
    }
</style>
