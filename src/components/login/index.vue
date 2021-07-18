<template>
    <b-row class="login-container">
        <b-col>
            <div class="container h-100">
                <div class="row justify-content-center align-items-center" style="height: 75%;">
                    <b-form @submit.prevent="submit" class="col-lg-4 col-md-12 col-9">
                        <h3 class="text-white ml-3 font-weight-bold">Login</h3>
                        <p class="text-white ml-3">Hello let's get started</p>
                        <b-card class="shadow" style="padding:10px 20px; border-radius: 20px;">

                            <b-form-group
                                    style="color: #929292;"
                                    class="fweight-500"
                                    label="Username"
                                    label-for="username"
                            >
                                <b-input-group size="sm">
                                    <b-form-input
                                            style="color: #929292;"
                                            :readonly="loading"
                                            required
                                            size="sm"
                                            id="username"
                                            v-model="login.username"
                                            type="text"
                                            placeholder=""
                                    ></b-form-input>
                                    <b-input-group-append>
                                        <b-button variant="outline-secondary" style="border-color:#ced4da;">
                                            <i class="fa fa-fw fa-user"></i>
                                        </b-button>
                                    </b-input-group-append>
                                </b-input-group>
                            </b-form-group>

                            <b-form-group
                                    style="color: #929292;"
                                    class="fweight-500"
                                    label="Password"
                                    label-for="password"
                            >
                                <b-input-group size="sm">
                                    <b-form-input
                                            style="color: #929292;"
                                            :readonly="loading"
                                            required
                                            size="sm"
                                            id="password"
                                            v-model="login.password"
                                            type="password"
                                            placeholder=""
                                    ></b-form-input>
                                    <b-input-group-append>
                                        <b-button variant="outline-secondary" style="border-color:#ced4da;">
                                            <i class="fa fa-fw fa-lock"></i>
                                        </b-button>
                                    </b-input-group-append>
                                </b-input-group>
                            </b-form-group>
                            <b-row>
                                <b-col class="text-right">
                                    <b-button type="submit" size="sm" class="login-btn">
                                            <span v-if="!loading">
                                                <i class="fa fa-fw fa-chevron-circle-right"></i> Login
                                            </span>
                                        <span v-else>
                                              <i class="fa fa-spinner fa-pulse fa-fw"></i> Logging In
                                            </span>
                                    </b-button>
                                </b-col>
                            </b-row>
                        </b-card>
                        <b-row v-if="message != ''" style="margin-top:15px; text-align: center;">
                            <b-col>
                                <b-alert variant="danger" show>{{ message }}</b-alert>
                            </b-col>
                        </b-row>
                    </b-form>
                </div>
            </div>

        </b-col>
    </b-row>
</template>

<script>
    import {bus} from "@/main";
    import {client_details} from "../../config";

    export default {
        name: "LoginIndex",
        data() {
            return {
                loading: false,
                login: {
                    username: '',
                    password: '',
                    grant_type: 'password',
                    client_id: client_details.CLIENT_ID,
                    client_secret: client_details.CLIENT_SECRET
                },
                message:''
            }
        },
        methods: {
            submit() {
                this.loading = true;
                this.axios.post('oauth/token', this.login).then(response => {
                    this.$store.dispatch('loginAction', JSON.parse(JSON.stringify(response.data)));
                    this.axios.get('api/users/me').then(response => {
                        this.$nextTick(function () {
                            this.$store.dispatch('setUserAction', JSON.parse(JSON.stringify(response.data)));
                            this.$nextTick(function () {
                                this.loading = false;
                                this.$router.push('/');
                            });
                        });
                    });
                }).catch(error => {
                    this.loading = false;
                    this.message = 'Incorrect username or password!';
                });
            }
        },
        created() {
            if(this.$store.getters.isLoggedInStatus == true){
                this.$router.push('/');
            }
            document.title = 'Login'
        }
    }
</script>

<style scoped>
    .login-container {
        background: rgb(133, 133, 242);
        background: linear-gradient(40deg, rgba(133, 133, 242, 1) 50%, rgba(123, 212, 250, 1) 100%);
        height: 100vh;
    }

    .login-btn {
        background: linear-gradient(2deg, rgba(133, 133, 242, 1) 3%, rgba(123, 212, 250, 1) 100%);
        padding: 5px 25px 5px 20px;
        border: unset;
        border-radius: 15px;
        font-weight: 400;
        text-transform: uppercase;
        font-size: 13.5px;
    }
</style>
