<template>
  <div id="app">
    <index v-if="$store.getters.isLoggedInStatus"></index>
    <div v-if="!$store.getters.isLoggedInStatus">
      <router-view></router-view>
    </div>
  </div>
</template>
<script>
import { bus } from "@/main";
import Index from "./components/layouts/index";
export default {
  name: "app",
  components: {
    Index,
  },
  data() {
    return {};
  },
  created() {},
  methods: {},
};
</script>

<style>
body {
  overflow: hidden;
  color: #2c3e50 !important;
  font-size: 14px !important;
}

.swal2-header {
  padding-bottom: 1rem;
  border-bottom: 1px solid #797979;
}

h2#swal2-title {
  text-transform: uppercase;
  font-size: 1rem;
  font-weight: 500;
  letter-spacing: 0.7px;
}

.swal2-icon {
  zoom: 0.5 !important;
}

.swal2-html-container {
  font-size: 14px;
}

.breadcrumb-item a.exact-active {
  background-color: unset !important;
  color: #000 !important;
}

.font-weight-600 {
  font-weight: 600;
}

p {
  font-size: 14px;
}

h4 {
  font-size: 1.3125rem !important;
}

.pp .dropdown-menu {
  position: absolute !important;
}

.pp a {
  padding-top: 0px;
  padding-bottom: 0px;
}

.pp .dropdown-menu li a {
  font-size: 14px;
  text-transform: capitalize;
  padding: 0.35rem 0.5rem;
  color: #2c3e50;
}

.pp .dropdown-menu li i {
  width: 1.28571429em;
  color: #bfbfbf;
  text-align: center;
  margin-right: 10px;
}

.dropdown-item:hover,
.dropdown-item:focus {
  color: #fff !important;
  text-decoration: none;
  /*background-color: #2c3e50 !important;*/
  background-color: #05445e !important;
}

nav#sidebar ul.navbar-nav li > ul.sub-menu li a.exact-active {
  background-color: #05445e !important;
}

.dropdown-item:active {
  color: #fff !important;
  text-decoration: none;
  /*background-color: #2c3e50 !important;*/
  background-color: #05445e !important;
}

li a.exact-active {
  color: #fff !important;
  text-decoration: none;
  background-color: #3b5167 !important;
}

li a.exact-active {
  color: #fff !important;
}

nav#sidebar ul.navbar-nav li.active a.parent {
  /*background-color: #1f2f40;*/
  background-color: #05445e;
  color: #fff !important;
}

.parent-dropdown-icon.fa.fa-fw.fa-plus.pull-right {
  margin-top: 5px;
  font-size: 13px;
  transition: all 0.3s;
}

li.active a.dropdown-item.parent .parent-dropdown-icon.fa.fa-fw.fa-plus.pull-right.open {
  transform: rotate(45deg);
}

ul.sub-menu li a.dropdown-item {
  font-size: 12.5px !important;
  padding: 10px !important;
}

a.parent {
  cursor: pointer;
}

nav#sidebar ul.navbar-nav li a {
  padding: 10px;
  /*color: #e2e2e2 !important;*/
  color: #909090 !important;
  /*transition: all 0.3s;*/
  transition: max-height 0.3s;
  /*font-size: .898rem;*/
  font-size: 0.83rem;
  font-weight: 400;
}

nav#sidebar ul.navbar-nav li a.exact-active {
  background-color: #05445e !important;
  color: #fff !important;
}

nav#sidebar ul.navbar-nav li a:hover {
  background-color: #189ab4 !important;
  color: #fff !important;
}

nav#sidebar ul.navbar-nav li > ul.sub-menu li a:hover {
  background: #189ab4 !important;
}

nav#sidebar ul.navbar-nav li > ul.sub-menu li a {
  color: #fff !important;
  padding-left: 15px !important;
}

.sub-menu {
  max-height: 0px;
  overflow-y: hidden;
  /*display: none;*/
  /*background-color: #1f2f40;*/
  background-color: #189ab4;
  padding: 0px;
  list-style-type: none;
  /*transition:all 0.3s;*/
  -webkit-transition: max-height 0.3s ease-in-out;
  transition: max-height 0.3s ease-in-out;
}

.sub-menu.open {
  /*display:block;*/
  max-height: 1500px;
}

.link-icon {
  margin-right: 5px;
}

.ps {
  height: 100vh;
  max-height: 100%;
  padding-bottom: 80px;
}

.ps__rail-y:hover > .ps__thumb-y,
.ps__rail-y:focus > .ps__thumb-y,
.ps__rail-y.ps--clicking .ps__thumb-y {
  background-color: #999;
  width: 5px !important;
}

.ps__rail-y {
  width: 8px !important;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}

.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}

.card.bg-primary {
  border-color: #187da0;
  background-color: #20a8d8 !important;
}

.card.bg-info {
  border-color: #2eadd3;
  background-color: #63c2de !important;
}

.card.bg-warning {
  border-color: #c69500;
  background-color: #ffc107 !important;
}

.card.bg-danger {
  border-color: #f5302e;
  background-color: #f86c6b !important;
}

nav#navbar {
  background-color: #18a558 !important;
}

.sidebar-header {
  padding: 10px;
}

.top-navbar {
  /*border-bottom: 1px solid #c8ced3;*/
  border-bottom: 1px solid #9a67ea;
}

.brand {
  /*color: #2c3e50 !important;*/
  font-weight: bold;
}

.wrapper {
  display: flex;
  align-items: stretch;
}

#sidebar {
  min-width: 230px;
  max-width: 230px;
  color: #fff;
  /*background-color: #2c3e50;*/
  background-color: #fff;
  transition: all 0.5s;
}

#content {
  overflow-y: auto;
  max-height: 100vh;
  -webkit-box-flex: 1;
  -ms-flex: 1;
  flex: 1;
  min-width: 0;
  /*background-color: #e4e5e6;*/
  /*background-color: #efefef;*/
  background-color: #f3f3f3;
  padding-bottom: 10%;
}

#sidebar.inactive {
  margin-left: -230px;
}

#sidebar {
  /*padding: 10px;*/
  min-width: 230px;
  max-width: 230px;
  min-height: 250px;
  height: 100%;
  /*height: 100vh;*/
  /*overflow-y: auto;*/
  padding-bottom: 80px;
}

.breadcrumb {
  background-color: #fff;
  border-radius: 0px;
  border-bottom: 1px solid #c8ced3;
  border-left: 1px solid #c8ced3;
  padding: 0.5rem 1rem;
  position: fixed;
  width: 100%;
  z-index: 999;
}

.breadcrumb .breadcrumb-item {
  /*font-size: 14px;*/
  font-size: 0.8rem;
}

.progress-bar {
  background-color: #76cccd;
}

p.lbl-primary {
  color: #56a8e5;
  font-weight: 500;
  font-size: 13px;
}

p.lbl-warning {
  color: #f3a46b;
  font-weight: 500;
  font-size: 13px;
}

p.lbl-danger {
  color: #e55c5e;
  font-weight: 500;
  font-size: 13px;
}

p.lbl-amount {
  font-size: 1rem;
  font-weight: 700;
  letter-spacing: 0px;
}

.custom-tab ul li a {
  text-align: left;
  color: #6c757d;
  border-radius: 0 !important;
  border-top: 1px solid transparent !important;
  padding: 1.5rem;
}

.custom-tab ul li a:focus {
  outline: none;
}

.custom-tab ul li a.active:first-child {
}

.custom-tab ul li a.active:last-child {
}

a#__BVID__66___BV_tab_button__ {
  border-right: unset;
}

a#__BVID__59___BV_tab_button__ {
  border-left: unset;
}

.no-border-radius {
  border-radius: 0 !important;
}

.c-table thead tr th {
  font-weight: 500;
  border-top: unset;
  font-size: 13px;
  color: rgba(0, 0, 0, 0.6);
  border-bottom: thin solid rgba(0, 0, 0, 0.12);
}

.c-table-with-tb thead tr th {
  font-weight: 500;
  font-size: 13px;
  color: rgba(0, 0, 0, 0.6);
  border-bottom: thin solid rgba(0, 0, 0, 0.12);
}

.c-table-with-tb tbody tr,
.c-table tbody tr {
  outline: none;
}
.c-table-with-tb tbody tr.active_row,
.c-table tbody tr.active_row {
  background-color: rgba(0, 0, 0, 0.075);
}
.c-table-with-tb tbody tr td {
  font-size: 13.5px;
  border-top: thin solid rgba(0, 0, 0, 0.12);
  cursor: pointer;
  vertical-align: middle;
}

.c-table tbody tr td {
  font-size: 13px;
  /*font-size: 13.5px;*/
  border-top: thin solid rgba(0, 0, 0, 0.12);
  cursor: pointer;
  vertical-align: middle;
}

.c-btn-primary {
  background-color: #05445e !important;
  border-color: #05445e !important;
  font-size: 13px !important;
  text-transform: uppercase;
}

.c-btn {
  padding: 0.209rem 0.5rem !important;
}
.c-input {
  font-size: 13px !important;
  padding: 14.3px !important;
}
.c-input-np {
  font-size: 13px !important;
}

.c-text-success {
  color: #5ab55e;
}

.c-card-primary {
  background-color: #1867c0 !important;
  /*border-left: 10px solid #3C7FCA !important;*/
  color: #fff !important;
}

.c-card-info {
  background-color: #17a2b8 !important;
  /*border-left: 10px solid #1baec5 !important;*/
  color: #fff !important;
}

.c-card-success {
  background-color: #72a57e !important;
  /*border-left: 10px solid #80b38c !important;*/
  color: #fff !important;
}

.c-card-danger {
  background-color: #c51162 !important;
  /*border-left: 10px solid #ec1c7a !important;*/
  color: #fff !important;
}

.fweight-500 {
  font-weight: 500;
}

.fweight-500 label {
  margin-bottom: 3px;
}

.spinner-border {
  font-size: 7px !important;
  width: 1.5rem !important;
  height: 1.5rem !important;
}
tr.c-table-width td:last-child {
  width: 13%;
}
tr.c-table-width td {
  width: 25%;
}
tr.c-table-width td:first-child {
  width: 7%;
}
</style>
