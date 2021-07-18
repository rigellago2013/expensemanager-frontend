import {bus} from '@/main.js';
export default {
    data() {
        return {
        }
    },
    created() {
        document.title = this.$route.name+' - Expense Manager';
        bus.$emit('breadcrumbs', this.$route.matched)
    }
}

