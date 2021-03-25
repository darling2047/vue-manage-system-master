<template>
    <div>
        <template v-for="menu in this.menuData">
            <el-submenu :key="menu.index" :index="menu.index" v-if="menu.subs">
                <template slot="title">
                    <i :class="menu.icon"></i>
                    <span slot="title">{{menu.title}}</span>
                </template>
                <menu-tree :menuData="menu.subs"></menu-tree>
            </el-submenu>
            <el-menu-item :key="menu.index" :index="menu.index" v-else>
                <i :class="menu.icon"></i>
                <span slot="title">{{menu.title}}</span>
            </el-menu-item>
        </template>
    </div>
</template>

<script>
    export default {
        props: ['menuData'],
        name: 'MenuTree'
    }
</script>