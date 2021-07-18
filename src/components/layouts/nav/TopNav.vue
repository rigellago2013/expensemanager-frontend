<template>
    <li :class="{'active':is_active}">
        <a @click.self="open" class="dropdown-item parent"
           v-if="obj.children.length > 0 && checkRole(obj)">
            <i class="fa fa-fw link-icon" :class="obj.icon"></i> {{ obj.name }}
            <i @click.self="open" :class="{'open':is_active}"
               class="parent-dropdown-icon fa fa-fw fa-plus pull-right"></i>
        </a>
        <router-link v-if="obj.children.length == 0 && checkRole(obj)" :to="obj.link" class="dropdown-item" @click.native="crumbs(obj)">
            <i class="fa fa-fw link-icon" :class="obj.icon"></i> {{ obj.name }}
        </router-link>
        <ul class="sub-menu" v-if="obj.children.length > 0" :class="{'open':is_active}" >
            <template
                    v-for="(child, index) in obj.children"
            >
                <top-nav :key="index" :obj="child"></top-nav>
            </template>
        </ul>
    </li>
</template>

<script>
    export default {
        name: "TopNav",
        props: ['obj'],
        components: {
        },
        data() {
            return {
                is_active: false
            }
        },
        created(){
        },
        methods: {
            checkRole(obj){
                if(!obj.hasOwnProperty('role')){
                    return true;
                }else{
                    if(obj.role == parseInt(this.$store.getters.getRole)){
                        return true;
                    }else{
                        return false;
                    }
                }
            },
            crumbs(obj){
            },
            open() {
                this.is_active = !this.is_active;
            }
        }
    }
</script>

<style scoped>

</style>
