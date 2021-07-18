export default {
    data(){
        return{
            swal_confirm_submit_data:{
                title: 'Please confirm your submission.',
                text: "Your changes will be saved after this process.",
                showCancelButton: true,
                confirmButtonColor: '#007bff',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Yes, save it!',
                cancelButtonText: 'Wait, im not done yet!'
            },
            swal_confirm_delete_data:{
                title: 'Delete this record?',
                text: "This process is irreversible.",
                showCancelButton: true,
                confirmButtonColor: '#007bff',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Yes, delete!',
                cancelButtonText: 'No, I dont want to delete it!'
            },
            swal_transaction_completed_data:{
                icon: 'success',
                title: 'Transaction Completed!',
                text: "Data Successfully Saved.",
                type: "success",
                timer: 1500
            },
            swal_transaction_warning_data:{
                icon: 'warning',
                title: 'Warning!',
                text: "Complete all necessary fields!",
                type: "warning"
            },
            swal_transaction_error_data:{
                title: 'Error!',
                text: "Please contact your Administrator.",
                type: "error"
            }
        }
    },
    methods:{
        swalConfirmSubmit(callback){
            this.$swal(this.swal_confirm_submit_data).then((result) => {
                callback(result);
            })
        },
        swalFieldsRequired(){
            this.$swal.fire(
                'Error!',
                'Please fill out all required fields',
            )
        },
        swalRequestError(){
            this.$swal.fire(
                this.swal_transaction_error_data.title,
                this.swal_transaction_error_data.text
            )
        },
        swalTransactionCompleted(){
            this.$swal.fire(this.swal_transaction_completed_data);
        },
        swalConfirmDelete(callback){
            this.$swal(this.swal_confirm_delete_data).then((result) => {
                callback(result);
            })
        },
        swalTransactionWarning(){
            this.$swal.fire(this.swal_transaction_warning_data);
        }
    }
}