<template>
    <div>
        <b-navbar id="navbar" toggleable="lg" type="dark" variant="default" class=" top-navbar">
            <b-navbar-brand href="#" class="brand py-0">Expense Manager</b-navbar-brand>
            <a @click="toggleSidebar" class="burger-container">
                <b-icon icon="list" font-scale="2"></b-icon>
            </a>
            <b-navbar-nav class="ml-auto">
                <b-nav-item-dropdown class="pp" right >
                    <template v-slot:button-content>
                        <span class="text-capitalize" style="letter-spacing: .8px;">Welcome {{ $store.getters.getUser }} </span>
                    </template>
                    <router-link tag="li" to="/account">
                        <a class="dropdown-item">
                            <i class="fa fa-fw fa-cogs"></i> My Account
                        </a>
                    </router-link>
                    <div class="dropdown-divider"></div>
                    <li @click="logout" style="cursor: pointer;">
                        <a class="dropdown-item">
                            <i class="fa fa-fw fa-power-off"></i> Sign Out
                        </a>
                    </li>
                </b-nav-item-dropdown>
            </b-navbar-nav>
        </b-navbar>
        <div class="wrapper">
            <nav id="sidebar" :class="{'inactive': sidebar_status }">
                <perfect-scrollbar>
          
                    <sidebar :child_class="'navbar-nav'" :menu_links="filtered_links"></sidebar>
                </perfect-scrollbar>
            </nav>
            <div id="content">
                <ol class="breadcrumb mb-0">
                    <template v-for="bc in bread_crumbs">
                        <li class="breadcrumb-item">
                            <router-link :to="bc.path">
                                {{ bc.name }}
                            </router-link>
                        </li>
                    </template>
                </ol>
                <div class="component_load container-fluid p-4" style="padding-top:3.5rem !important;">
                    <router-view></router-view>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import Sidebar from './nav/Sidebar'
    import {bus} from '@/main.js'

    export default {
        name: "Header",
        components: {
            Sidebar
        },
        data() {
            return {
                bread_crumbs: [],
                menu_search: '',
                // mainProps: {blank: true, width: 75, height: 75, class: 'm1'},
                sidebar_status: false,
                screen_dimension: {
                    height: 0,
                    width: 0
                },
                filtered_links: [],
                menu_links: [
                    {
                        name: 'Dashboard',
                        link: '/',
                        icon: 'fa-tachometer',
                        children: []
                    },
                    {
                        name: 'User Management',
                        role: 1,
                        link: '',
                        icon:'fa-users',
                        children: [
                            {
                                name: 'Roles',
                                role: 1,
                                link: '/user-management/roles',
                                icon: 'fa-file-text',
                                children: []
                            },
                            {
                                name: 'Users',
                                role: 1,
                                link: '/user-management/users',
                                icon: 'fa-user',
                                children: []
                            }
                        ]
                    },
                    {
                        name: 'Expense Management',
                        link: '',
                        icon:'fa-fire',
                        children: [
                            {
                                name: 'Expense Categories',
                                role: 1,
                                link: '/expense-management/expense-categories',
                                icon: 'fa-file-text',
                                children: []
                            },
                            {
                                name: 'Expenses',
                                link: '/expense-management/expenses',
                                icon: 'fa-money',
                                children: []
                            }
                        ]
                    }
                ]
            }
        },
        created() {
            bus.$on('breadcrumbs', (data) => {
                this.bread_crumbs = data;
            });
        },
        mounted() {
            this.$nextTick(() => {
                window.addEventListener('resize', this.onResize);
            });
        },
        watch: {
            screen_dimension: {
                handler(data) {
                    if (data.width <= 768) {
                        this.sidebar_status = true;
                    }
                },
                deep: true
            },
            menu_search: {
                handler(data) {
                    let filtered_routes = [];
                    filtered_routes = this.filterRoutes(data);
                    this.filtered_links = filtered_routes;
                },
                deep: true,
                immediate: true
            },
        },
        methods: {
            logout(){
                this.axios.post('api/users/logout').then(response => {
                    this.$store.dispatch('destroyStorageAction');
                    this.$router.push('/login');
                });
            },
            filterRoutes(data) {
                const search = data.toLowerCase().trim();
                if (!search) return this.menu_links;
                return this.menu_links.filter(link => {
                    return link.name.toLowerCase().indexOf(search) > -1;
                });
            },
            toggleSidebar() {
                this.sidebar_status = !this.sidebar_status;
            },
            onResize() {
                this.screen_dimension.width = window.innerWidth;
                this.screen_dimension.height = window.innerHeight;
            }
        }
    }
</script>

<style scoped>
    .burger-container {
        margin-top: 5px;
        color: #fff;
        cursor: pointer;
    }

    .burger-container:hover {
        color: #fff;
    }

    .wrapper {
        display: flex;
        align-items: stretch;
    }

    #sidebar {
        min-width: 230px;
        max-width: 230px;
        color: #fff;
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
        background-color: #f3f3f3;
        padding-bottom: 10%;
    }

    #sidebar.inactive {
        margin-left: -230px;
    }

    #sidebar {
        min-width: 230px;
        max-width: 230px;
        min-height: 250px;
        height: 100%;
        padding-bottom: 80px;
    }

    .breadcrumb {
        background-color: #fff;
        border-radius: 0px;
        border-bottom: 1px solid #c8ced3;
        border-left: 1px solid #c8ced3;
        padding: 0.5rem 1rem;
    }

    .breadcrumb .breadcrumb-item {
        font-size: .800rem;
    }

        nav#navbar {
        background-color: #05445E !important;
    }

    .sidebar-header {
        padding: 10px;
    }

    .top-navbar {
        border-bottom: 1px solid #189AB4;
    }

    .brand {
        font-weight: bold;
    }
</style>
