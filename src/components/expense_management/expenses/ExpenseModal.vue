<template>
  <b-modal centered no-close-on-esc no-close-on-backdrop v-model="modal_object.status">
    <template v-slot:modal-title>
      <div v-if="expense.id == -1">Add Expense</div>
      <div v-else>Update Expense</div>
    </template>

    <b-row>
      <b-col md="12" class="mx-auto">
        <b-form id="role-form" @submit.prevent="submit">
          <b-form-group
            class="fweight-500"
            label="Expense Category:"
            label-for="expense_category"
          >
            <b-input-group size="sm">
              <b-form-select
                required
                size="sm"
                id="expense_category"
                class="c-input-np"
                v-model="expense.expense_category_id"
                :options="expense_categories"
                text-field="display_name"
                value-field="id"
              >
              </b-form-select>
            </b-input-group>
          </b-form-group>

          <b-form-group class="fweight-500" label="Amount:" label-for="amount">
            <b-input-group size="sm">
              <b-form-input
                required
                size="sm"
                id="amount"
                class="c-input-np"
                v-model="expense.amount"
                type="number"
                placeholder=""
                step="any"
              ></b-form-input>
            </b-input-group>
          </b-form-group>
          <b-form-group class="fweight-500" label="Entry Date:" label-for="entry_date">
            <b-input-group size="sm">
              <b-form-datepicker
                id="entry_date"
                required
                class="c-input-np"
                size="sm"
                v-model="expense.entry_date"
              ></b-form-datepicker>
            </b-input-group>
          </b-form-group>
        </b-form>
      </b-col>
    </b-row>
    <template v-slot:modal-footer>
      <div class="w-100 text-right">
        <b-button size="sm" class="mr-1" @click="modal_object.status = false">
          Close
        </b-button>
        <b-button form="role-form" size="sm" variant="primary" type="submit">
          Save
        </b-button>
      </div>
    </template>
  </b-modal>
</template>
<script>
import SwalAlert from "@/helper/mixins/swal_alert";
export default {
  name: "ExpenseModal",
  components: {},
  props: {
    modal_object: {
      type: Object,
    },
  },
  data() {
    return {
      expense: {},
      expense_categories: [],
    };
  },
  created() {},
  methods: {
    submit() {
      this.swalConfirmSubmit((data) => {
        if (data.value == true) {
          this.axios.post("api/expense/store", this.expense).then((response) => {
            this.modal_object.status = false;
            this.swalTransactionCompleted();
            this.$emit("saved");
          });
        }
      });
    },
    getExpenseCategories() {
      this.axios.get("api/expense_category").then((response) => {
        this.expense_categories = response.data.data;
      });
    },
  },
  watch: {
    modal_object: {
      handler(val) {
        this.expense = JSON.parse(JSON.stringify(this.modal_object.data));
        if (val.status) {
          this.getExpenseCategories();
        }
      },
      immediate: true,
      deep: true,
    },
  },
  mixins: [SwalAlert],
};
</script>
