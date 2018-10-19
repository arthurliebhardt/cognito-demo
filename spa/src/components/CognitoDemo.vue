<template>
    <div>
        <!--Yeah I know, this is a terrible application - but hey, it's a quickly put together demo!-->
        <div class="py-5 text-center">
            <h2>Demo App</h2>
            <div v-if="!isLoggedIn()">
                <p class="lead">Err, who are you again? Maybe you should log in.</p>
                <button @click="authenticate()">Login</button>
            </div>
            <div v-if="isLoggedIn()">
                <p class="lead">Oh, it's you.</p>
            </div>
        </div>
        <CannedRequest :config="config('ping')" />
        <CannedRequest :config="config('echo')" />
    </div>
</template>

<script>
    import CannedRequest from "./CannedRequest.vue";
    import axios from 'axios';

    const configs = {
        ping: {
            name: "Ping",
            description: "An unauthenticated endpoint, it always loves it when you drop past and say hello.",
            url: "https://ID.execute-api.REGION.amazonaws.com/STAGE/ping"
        },
        echo: {
            name: "Token Echo",
            description: "Returns a decoded version of the JWT token received in a request. If it was valid, of course.",
            url: "https://ID.execute-api.REGION.amazonaws.com/STAGE/echo"
        },
    };

    export default {
        name: 'CognitoDemo',
        components: {
            CannedRequest
        },
        methods: {
            authenticate: function () {
                const this_ = this;
                this.$auth.authenticate('cognito').then(data => {
                    this_.token = data.access_token;

                    // Register request interceptor
                    if( this.interceptorId !== null ) {
                        axios.interceptors.request.eject(this.interceptorId);
                    }
                    this_.interceptorId = axios.interceptors.request.use(function (config) {
                        config.headers['Authorization'] = "Bearer " + data.access_token;
                        return config;
                    }, function (error) {
                        return Promise.reject(error);
                    });
                })
            },
            isLoggedIn: function () {
                return this.token !== null;
            },
            config: function(key) {
                return configs[key]
            }
        },
        data() {
            return {
                interceptorId: null,
                token: null
            };
        }
    }
</script>

<style>
</style>
