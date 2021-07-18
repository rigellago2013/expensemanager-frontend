<template>
    <b-modal centered no-close-on-esc no-close-on-backdrop v-model="modal_object.status">
        <template v-slot:modal-title>
            <div v-if="user.id == -1">
                New User
            </div>
            <div v-else>
                Edit User
            </div>
        </template>

        <b-row>
            <b-col md="12" class="mx-auto">
                <b-form id="role-form" @submit.prevent="submit">
                    <b-form-group
                            class="fweight-500"
                            label="Name:"
                            label-for="name"
                    >
                        <b-input-group size="sm">
                            <b-form-input
                                    required
                                    size="sm"
                                    id="name"
                                    class="c-input-np"
                                    v-model="user.name"
                                    type="text"
                                    placeholder=""
                            ></b-form-input>
                        </b-input-group>
                    </b-form-group>

                    <b-form-group
                            class="fweight-500"
                            label="Email:"
                            label-for="email"
                    >
                        <b-input-group size="sm">
                            <b-form-input
                                    required
                                    size="sm"
                                    id="email"
                                    class="c-input-np"
                                    v-model="user.email"
                                    type="email"
                                    placeholder=""
                            ></b-form-input>
                        </b-input-group>
                    </b-form-group>

                    <b-form-group
                            class="fweight-500"
                            label="Password:"
                            label-for="password"
                    >
                        <b-input-group size="sm">
                            <b-form-input
                                    required
                                    size="sm"
                                    id="password"
                                    class="c-input-np"
                                    v-model="user.password"
                                    type="password"
                                    placeholder=""
                            ></b-form-input>
                        </b-input-group>
                    </b-form-group>

                    <b-form-group
                            class="fweight-500"
                            label="Role:"
                            label-for="role"
                    >
                        <b-input-group size="sm">
                            <b-form-select
                                    required
                                    size="sm"
                                    id="role"
                                    class="c-input-np"
                                    v-model="user.role_id"
                                    :options="roles"
                                    text-field="display_name"
                                    value-field="id"
                            >
                            </b-form-select>
                        </b-input-group>
                    </b-form-group>
                </b-form>
            </b-col>
        </b-row>

        <template v-slot:modal-footer>
            <div class="w-100 text-right">
                <b-button
                        size="sm"
                        class="mr-1"
                        @click="modal_object.status=false"
                >
                    Close
                </b-button>
                <b-button
                        form="role-form"
                        size="sm"
                        variant="primary"
                        type="submit"
                >
                    Save
                </b-button>
            </div>
        </template>

    </b-modal>
</template>

<script>
    import SwalAlert from '@/helper/mixins/swal_alert';
    export default {
        name: "UserModal",
        components: {
        },
        props: {
            modal_object: {
                type: Object,
            }
        },
        data() {
            return {
                user: {},
                roles:[]
            }
        },
        created(){

        },
        methods: {
            submit() {
                this.swalConfirmSubmit((data) => {
                    if (data.value == true) {
                        this.axios.post('api/users/store', this.user).then(
                            response => {
                                this.modal_object.status = false;
                                this.swalTransactionCompleted();
                                this.$emit('saved');
                            }
                        ).catch(error=>{
                            this.swal_transaction_error_data.text="The email has already been taken.";
                            this.swalRequestError();
                        });;
                    }
                });
            },
            getRoles(){
                this.axios.get('api/roles').then(response => {
                    this.roles = response.data.data;
                });
            }
        },
        watch: {
            modal_object: {
                handler(val) {
                    this.user = JSON.parse(JSON.stringify(this.modal_object.data));
                    if(val.status){
                        this.getRoles();
                    }
                },
                immediate: true,
                deep: true
            }
        },
        mixins: [SwalAlert]

    }
</script>

