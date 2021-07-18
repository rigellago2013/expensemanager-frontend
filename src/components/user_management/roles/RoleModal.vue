<template>
    <b-modal centered no-close-on-esc no-close-on-backdrop v-model="modal_object.status">
        <template v-slot:modal-title>
            <div v-if="role.id == -1">
                New Role
            </div>
            <div v-else>
                Edit Role
            </div>
        </template>

        <b-row>
            <b-col md="12" class="mx-auto">
                <b-form id="role-form" @submit.prevent="submit">
                    <b-form-group
                            class="fweight-500"
                            label="Display Name:"
                            label-for="display_name"
                    >
                        <b-input-group size="sm">
                            <b-form-input
                                    required
                                    size="sm"
                                    id="display_name"
                                    class="c-input-np"
                                    v-model="role.display_name"
                                    type="text"
                                    placeholder=""
                            ></b-form-input>
                        </b-input-group>
                    </b-form-group>

                    <b-form-group
                            class="fweight-500"
                            label="Description:"
                            label-for="description"
                    >
                        <b-input-group size="sm">
                            <b-form-input
                                    required
                                    size="sm"
                                    id="description"
                                    class="c-input-np"
                                    v-model="role.description"
                                    type="text"
                                    placeholder=""
                            ></b-form-input>
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
        name: "RoleModal",
        components: {
        },
        props: {
            modal_object: {
                type: Object,
            }
        },
        data() {
            return {
                role: {}
            }
        },
        methods: {
            submit() {
                this.swalConfirmSubmit((data) => {
                    if (data.value == true) {
                        this.axios.post('api/roles/store', this.role).then(
                            response => {
                                this.modal_object.status = false;
                                this.swalTransactionCompleted();
                                this.$emit('saved');
                            }
                        );
                    }
                });
            },
        },
        watch: {
            modal_object: {
                handler(val) {
                    this.role = JSON.parse(JSON.stringify(this.modal_object.data));
                },
                immediate: true,
                deep: true
            }
        },
        mixins: [SwalAlert]

    }
</script>

