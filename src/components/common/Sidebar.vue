<template>
    <div class="sidebar">
        <el-menu
            class="sidebar-el-menu"
            :default-active="onRoutes"
            :collapse="collapse"
            background-color="#324157"
            text-color="#bfcbd9"
            active-text-color="#20a0ff"
            unique-opened
            router
        >
            <!-- 引入组件 -->
            <menu-tree :menuData="items"></menu-tree>
        </el-menu>
    </div>
</template>

<script>
import bus from '../common/bus';
import {sys} from "../../api/api";
import MenuTree from '../../components/common/MentTree'
export default {
    components: {
        MenuTree
    },
    data() {
        return {
            collapse: false,
            items: []
        };
    },
    mounted : function () {
        sys.getMenus({userName:localStorage.getItem("ms_username")}).then(res => {
            if (res.status == 1) {
                this.$message({
                    message: res.msg,
                    type: "error",
                });
                return;
            }
            this.items = res.obj;
        });
    },
    computed: {
        onRoutes() {
            return this.$route.path.replace('/', '');
        }
    },
    created() {
        // 通过 Event Bus 进行组件间通信，来折叠侧边栏
        bus.$on('collapse', msg => {
            this.collapse = msg;
            bus.$emit('collapse-content', msg);
        });
    }
};
</script>

<style scoped>
.sidebar {
    display: block;
    position: absolute;
    left: 0;
    top: 70px;
    bottom: 0;
    overflow-y: scroll;
}
.sidebar::-webkit-scrollbar {
    width: 0;
}
.sidebar-el-menu:not(.el-menu--collapse) {
    width: 250px;
}
.sidebar > ul {
    height: 100%;
}
</style>
