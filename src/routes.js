import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

import Login from '@/components/login/index'
import MyAccount from '@/components/account/index'
import Dashboard from '@/components/dashboard/index'
import UserManagement from '@/components/user_management/index'
import Roles from '@/components/user_management/roles/index'
import Users from '@/components/user_management/users/index'
import ExpenseManagement from '@/components/expense_management/index'
import ExpenseCategories from '@/components/expense_management/expense_categories/index'
import Expenses from '@/components/expense_management/expenses/index'

export default new Router({
    routes: [
        {
            name: 'Login',
            path: '/login',
            component: Login
        },
        {
            name: 'Dashboard',
            path: '/',
            component: Dashboard,
            meta: {
                requiresAuth: true
            }
        },
        {
            name: 'My Account',
            path: '/account',
            component: MyAccount,
            meta: {
                requiresAuth: true
            }
        },
        {
            name: 'User Management',
            path: '/user-management',
            component: UserManagement,
            meta: {
                requiresAuth: true,
            },
            redirect: { name: 'Roles' },
            children: [
                {
                    name: 'Roles',
                    path: 'roles',
                    component: Roles
                },
                {
                    name: 'Users',
                    path: 'users',
                    component: Users
                },
            ]
        },
        {
            name: 'Expense Management',
            path: '/expense-management',
            component: ExpenseManagement,
            meta: {
                requiresAuth: true,
            },
            redirect: { name: 'Expense Categories' },
            children: [
                {
                    name: 'Expense Categories',
                    path: 'expense-categories',
                    component: ExpenseCategories
                },
                {
                    name: 'Expenses',
                    path: 'expenses',
                    component: Expenses
                }
            ]
        },


    ],
    base: '/',
    mode: 'history',
    linkActiveClass: "",
    linkExactActiveClass: "exact-active",
});
