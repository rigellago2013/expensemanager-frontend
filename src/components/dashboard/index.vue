<template>
  <div class="animated fadeIn">
    <b-row>
      <b-col md="6">
        <b-card no-body>
          <template v-slot:header>
            <div class="d-flex justify-content-between align-items-center">
              <h4 class="mb-0">My Expenses - Table</h4>
            </div>
          </template>
          <b-card-body>
            <b-card-text>
              <b-table striped hover :fields="fields" :items="items" show-empty></b-table>
            </b-card-text>
          </b-card-body>
        </b-card>
      </b-col>
      <b-col md="6">
        <b-card no-body>
          <template v-slot:header>
            <div class="d-flex justify-content-between align-items-center">
              <h4 class="mb-0">My Expenses - Chart</h4>
            </div>
          </template>
          <b-card-body>
            <b-card-text>
              <pie-chart
                :key="chart_key"
                :chartdata="pie_chartdata"
                :options="pie_options"
              ></pie-chart>
            </b-card-text>
          </b-card-body>
        </b-card>
      </b-col>
    </b-row>
  </div>
</template>

<script>
import BreadCrumbs from "@/helper/mixins/breadcrumbs";
import PieChart from "@/helper/charts/PieChart";
export default {
  name: "DashboardIndex",
  components: {
    PieChart,
  },
  data() {
    return {
      fields: [
        {
          label: "Expense Category",
          key: "display_name",
        },
        {
          label: "Total",
          key: "chart_data",
        },
      ],
      items: [],
      chart_key: 1,
      pie_chartdata: {
        hoverBackgroundColor: "red",
        labels: [],
        datasets: [
          {
            label: "Data One",
            backgroundColor: [],
            data: [],
          },
        ],
      },
      pie_options: {
        responsive: true,
        maintainAspectRatio: false,
        responsiveAnimationDuration: 0,
        aspectRatio: 1,
        hoverBorderWidth: 20,
      },
    };
  },
  methods: {
    generateHex(size) {
      let result = [];
      let hexRef = [
        "0",
        "1",
        "2",
        "3",
        "4",
        "5",
        "6",
        "7",
        "8",
        "9",
        "a",
        "b",
        "c",
        "d",
        "e",
        "f",
      ];
      for (let n = 0; n < size; n++) {
        result.push(hexRef[Math.floor(Math.random() * 16)]);
      }
      return result.join("");
    },
  },
  mounted() {
    this.axios.get("api/expense_category/chartdata").then((response) => {
      this.items = response.data;
      let chart_data = [];
      let display_name = [];
      let bgColor = [];
      response.data.forEach((data) => {
        display_name.push(data.display_name);
        chart_data.push(data.chart_data);
        bgColor.push("#" + this.generateHex(6));
      });
      this.pie_chartdata.labels = display_name;
      this.pie_chartdata.datasets[0].data = chart_data;
      this.pie_chartdata.datasets[0].backgroundColor = bgColor;
      this.chart_key++;
    });
  },
  mixins: [BreadCrumbs],
};
</script>

<style scoped>
.card {
  border-radius: 0px;
}
.card-description {
  font-size: 14px;
}
.card-description p {
  font-weight: 500;
  margin-bottom: 5px;
}
</style>
