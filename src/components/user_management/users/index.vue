<template>
    <div class="animated fadeIn">
        <b-row>
            <b-col>
                <b-card class="shadow">
                    <b-row class="d-flex justify-content-between align-items-center pb-2">
                        <b-col class="pb-2">
                            <b-button class="c-btn-primary" size="sm" @click="newUser"><i
                                    class="fa fa-fw fa-plus-square"></i> New User
                            </b-button>
                        </b-col>
                        <b-col md="3" class="pb-2">
                            <b-form-input
                                    class="c-input no-border-radius"
                                    size="sm"
                                    type="text"
                                    required
                                    placeholder="Search..."
                            ></b-form-input>
                        </b-col>
                    </b-row>
                    <user-modal @saved="getAll" :modal_object="modal_object"></user-modal>
                    <b-row>
                        <b-col>
                            <b-table tbody-tr-class="c-table-width" :busy="isBusy" responsive class="c-table" :hover="true" show-empty :striped="false"
                                     :items="items" :fields="fields">
                                <template v-slot:table-busy>
                                    <div class="text-center my-2">
                                        <b-spinner class="align-middle" style="font-size: 13px;"></b-spinner>
                                    </div>
                                </template>
                                <template v-slot:cell(actions)="row">
                                    <div v-if="row.item.role_id != user_role.administrator">
                                        <i class="fa fa-fw fa-edit c-text-success text-success"
                                           @click="updateUser(row)"></i>

                                        <i  class="fa fa-fw fa-trash c-text-danger text-danger"
                                                title="Delete Role"
                                                @click="deleteUser(row)"></i>
                                    </div>
                                </template>
                            </b-table>
                        </b-col>
                    </b-row>
                </b-card>
            </b-col>
        </b-row>
    </div>
</template>

<script>
    import {user_roles} from "../../../config";
    import UserModal from "./UserModal";
    import BreadCrumbs from '@/helper/mixins/breadcrumbs'
    import SwalAlert from '@/helper/mixins/swal_alert';
    export default {
        name: "UsersIndex",
        components:{
            UserModal
        },
        data(){
            return{
                user_role: user_roles,
                fields:[
                    {
                        label: '',
                        key: 'actions'
                    },
                    {
                        label: 'Name',
                        key: 'name'
                    },
                    {
                        label: 'Email Address',
                        key: 'email',
                    },
                    {
                        label: 'Role',
                        key: 'role.display_name'
                    },
                    {
                        label: 'Created At',
                        key: 'created_at'
                    }
                ],
                items:[],
                isBusy:false,
                modal_object: {
                    status: false,
                    data: {}
                }
            }
        },
        methods:{
            getAll(){
                this.isBusy = true;
                this.axios.get('api/users').then(
                    response => {
                        console.log(response)
                        this.items = response.data.data;
                        this.isBusy = false;
                    }
                )
            },
            newUser(){
                this.modal_object.status = true;
                this.modal_object.data = {
                    id: -1,
                    role_id:1,
                    name:'',
                    email:'',
                    password:''
                }
            },
            updateUser(row){
                this.modal_object.status = true;
                this.modal_object.data = row.item;
            },
            deleteUser(row){
                this.swalConfirmDelete((data) => {
                    if(data.value){
                        this.axios.delete('api/user/delete', { data: {id:row.item.id} }).then(
                            response => {
                                this.isBusy = false;
                                this.getAll();
                                this.swal_transaction_completed_data.text = "User's successfully deleted!"
                                this.swalTransactionCompleted();
                            }
                        ).catch(error => {
                            this.swal_transaction_warning_data.text = "Unable to delete, User already created a transaction!";
                            this.swalTransactionWarning();
                        });
                    }
                })
            }
        },
        created(){
            if(parseInt(this.$store.getters.getRole) != user_roles.administrator){
                this.$router.push('/');
            }
            this.getAll();
        },
        mixins:[BreadCrumbs, SwalAlert]
    }
</script>

<style scoped>

</style>
