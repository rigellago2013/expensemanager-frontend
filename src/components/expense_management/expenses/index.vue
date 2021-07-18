<template>
    <div class="animated fadeIn">
        <b-row>
            <b-col>
                <b-card class="shadow">
                    <b-row class="d-flex justify-content-between align-items-center pb-2">
                        <b-col class="pb-2">
                            <b-button class="c-btn-primary" size="sm" @click="newExpense"><i
                                    class="fa fa-fw fa-plus-square"></i> New Expense
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
                    <expense-modal @saved="getAll" :modal_object="modal_object"></expense-modal>
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
                                    <div>
                                        <i class="fa fa-fw fa-edit c-text-success text-success"
                                           @click="updateExpense(row)"></i>

                                        <i  class="fa fa-fw fa-trash c-text-danger text-danger"
                                            title="Delete Role"
                                            @click="deleteExpense(row)"></i>
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
    import ExpenseModal from "./ExpenseModal";
    import BreadCrumbs from '@/helper/mixins/breadcrumbs'
    import SwalAlert from '@/helper/mixins/swal_alert';
    export default {
        name: "ExpensesIndex",
        components:{
            ExpenseModal
        },
        data(){
            return{
                fields:[
                    {
                        label: '',
                        key: 'actions'
                    },
                    {
                        label: 'Expense Category',
                        key: 'expense_category.display_name'
                    },
                    {
                        label: 'Amount',
                        key: 'amount',
                    },
                    {
                        label: 'Entry Date',
                        key: 'entry_date'
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
                this.axios.get('api/expense').then(
                    response => {
                        this.items = response.data.data;
                        this.isBusy = false;
                    }
                )
            },
            newExpense(){
                this.modal_object.status = true;
                this.modal_object.data = {
                    id: -1,
                    role_id:1,
                    name:'',
                    email:'',
                    password:''
                }
            },
            updateExpense(row){
                this.modal_object.status = true;
                this.modal_object.data = row.item;
            },
            deleteExpense(row){
                this.swalConfirmDelete((data) => {
                    if(data.value){
                        this.axios.delete('api/expense/delete', { data: {id:row.item.id} }).then(
                            response => {
                                this.isBusy = false;
                                this.getAll();
                                this.swal_transaction_completed_data.text = "Expense successfully deleted!"
                                this.swalTransactionCompleted();
                            }
                        )
                    }
                })
            }
        },
        created(){
            this.getAll();
        },
        mixins:[BreadCrumbs, SwalAlert]
    }
</script>

<style scoped>

</style>
