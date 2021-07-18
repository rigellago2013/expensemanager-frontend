<template >
    <ul class="navbar-nav">
        <template v-for="(menu, index) in menu_links">
            <top-nav :key="index" :obj="menu"></top-nav >
        </template>
    </ul>
</template>

<script>
    import TopNav from './TopNav';
    export default {
        name: "Sidebar",
        props: {
            child_class: {
                type: String
            },
            menu_links: {
                type: Array,
                required: true
            }
        },
        components: {
            TopNav
        }
    }
</script>

<style scoped>

</style>
