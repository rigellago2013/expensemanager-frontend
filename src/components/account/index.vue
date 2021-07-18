<template>
    <div class="animated fadeIn">
        <b-row>
            <b-col md="5">
                <b-card no-body>
                    <template v-slot:header>
                        <div class="d-flex justify-content-between align-items-center">
                            <h4 class="mb-0">Change Password
                            </h4>
                        </div>
                    </template>
                    <b-card-body>
                        <b-card-text>
                            <b-form id="password-form" @submit.prevent="submit">
                                <b-form-group
                                        class="fweight-500"
                                        label="Old Password:"
                                        label-for="old_password"
                                >
                                    <b-input-group size="sm">
                                        <b-form-input
                                                required
                                                size="sm"
                                                id="old_password"
                                                class="c-input-np"
                                                v-model="password.old_password"
                                                type="password"
                                                placeholder=""
                                        ></b-form-input>
                                    </b-input-group>
                                </b-form-group>
                                <b-form-group
                                        class="fweight-500"
                                        label="New Password:"
                                        label-for="new_password"
                                >
                                    <b-input-group size="sm">
                                        <b-form-input
                                                required
                                                size="sm"
                                                id="new_password"
                                                class="c-input-np"
                                                v-model="password.new_password"
                                                type="password"
                                                placeholder=""
                                        ></b-form-input>
                                    </b-input-group>
                                </b-form-group>
                            </b-form>
                        </b-card-text>
                    </b-card-body>
                    <template v-slot:footer>
                        <div class="text-right">
                            <b-button
                                    form="password-form"
                                    size="sm"
                                    variant="primary"
                                    type="submit"
                            >
                                Save
                            </b-button>
                        </div>
                    </template>
                </b-card>
            </b-col>
        </b-row>
    </div>
</template>

<script>
    import SwalAlert from '@/helper/mixins/swal_alert';
    import BreadCrumbs from '@/helper/mixins/breadcrumbs'
    export default {
        name: "MyAccountIndex",
        data(){
            return{
                password:{
                   old_password:'',
                   new_password:''
                }
            }
        },
        methods:{
            submit(){
                this.swalConfirmSubmit(data => {
                    if(data.value){
                        this.axios.post('/api/users/change-password', this.password).then(
                            response => {
                                this.swal_transaction_completed_data.text = "Password's successfully updated!"
                                this.swalTransactionCompleted();
                                this.password = {
                                    old_password:'',
                                    new_password:''
                                }
                            }
                        ).catch(error=>{
                            this.swal_transaction_error_data.text="Incorrect old password!";
                            this.swalRequestError();
                        });
                    }
                });

            }
        },
        mixins:[BreadCrumbs, SwalAlert]
    }
</script>

<style scoped>

</style>
