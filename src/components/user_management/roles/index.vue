<template>
    <div class="animated fadeIn">
        <b-row>
            <b-col>
                <b-card class="shadow">
                    <b-row class="d-flex justify-content-between align-items-center pb-2">
                        <b-col class="pb-2">
                            <b-button class="c-btn-primary" size="sm" @click="newRole"><i
                                    class="fa fa-fw fa-plus-square"></i> New Role
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
                    <role-modal @saved="getAll" :modal_object="modal_object"></role-modal>
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
                                    <div v-if="row.item.id != user_role.administrator">
                                        <i class="fa fa-fw fa-edit c-text-success text-success"
                                           title="Update Role"
                                           @click="updateRole(row)"></i>

                                        <i  class="fa fa-fw fa-trash c-text-danger text-danger"
                                           title="Delete Role"
                                           @click="deleteRole(row)"></i>
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
    import RoleModal from "./RoleModal";
    import BreadCrumbs from '@/helper/mixins/breadcrumbs'
    import SwalAlert from '@/helper/mixins/swal_alert';
    export default {
        name: "RolesIndex",
        components:{
             RoleModal
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
                        label: 'Display Name',
                        key: 'display_name'
                    },
                    {
                        label: 'Description',
                        key: 'description',
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
                this.axios.get('api/roles').then(
                    response => {
                        this.items = response.data.data;
                        this.isBusy = false;
                    }
                )
            },
            newRole(){
                this.modal_object.status = true;
                this.modal_object.data = {
                    id: -1,
                    display_name:'User',
                    description:'Can add expenses'
                }
            },
            updateRole(row){
                this.modal_object.status = true;
                this.modal_object.data = row.item;
            },
            deleteRole(row){
                this.swalConfirmDelete((data) => {
                       if(data.value){
                           this.axios.delete('api/roles/destroy', { data: {id:row.item.id} }).then(
                               response => {
                                   this.isBusy = false;
                                   this.getAll();
                                   this.swal_transaction_completed_data.text = "Role's successfully deleted!"
                                   this.swalTransactionCompleted();
                               }
                           ).catch(error => {
                               this.swal_transaction_warning_data.text = "Unable to delete, This role was already used!";
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
