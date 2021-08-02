<template>
    <div>
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item>
                    <i class="el-icon-lx-cascades"></i> 用户列表
                </el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="container">
            <div class="handle-box">
                <el-form :inline="true" :model="query" class="demo-form-inline">
                    <el-form-item label="姓名">
                        <el-input v-model="query.userName" placeholder="姓名"></el-input>
                    </el-form-item>
                    <el-form-item label="登录账号">
                        <el-input v-model="query.loginName" placeholder="登录账号"></el-input>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" @click="addUserBtn">新增</el-button>
                        <el-button type="primary" @click="onSubmit">查询</el-button>
                    </el-form-item>
                </el-form>
            </div>
            <el-table
                    :data="tableData"
                    border
                    class="table"
                    ref="multipleTable"
                    header-cell-class-name="table-header"
                    @selection-change="handleSelectionChange"
            >
                <el-table-column type="selection" width="55" align="center"></el-table-column>
                <el-table-column prop="userId" label="userId" width="55" align="center"></el-table-column>
                <el-table-column prop="userName" label="用户姓名"></el-table-column>
                <el-table-column prop="mobile" label="电话"></el-table-column>
                <el-table-column prop="email" label="邮箱"></el-table-column>
                <el-table-column prop="loginName" label="登录账号"></el-table-column>
                <el-table-column prop="deptId" label="部门id"></el-table-column>
                <el-table-column prop="deptName" label="所属部门"></el-table-column>
                <el-table-column label="操作" width="180" align="center">
                    <template slot-scope="scope">
                        <el-button
                                type="text"
                                icon="el-icon-edit"
                                @click="handleEdit(scope.$index, scope.row)"
                        >编辑
                        </el-button>
                        <el-button
                                type="text"
                                icon="el-icon-delete"
                                class="red"
                                @click="handleDelete(scope.$index, scope.row)"
                        >删除
                        </el-button>
                    </template>
                </el-table-column>
            </el-table>
            <div class="pagination">
                <el-pagination
                        background
                        layout="total, prev, pager, next"
                        :current-page="query.currentPageNo"
                        :page-size="query.pageSize"
                        :total="pageTotal"
                        @current-change="handlePageChange"
                ></el-pagination>
            </div>
        </div>

        <!-- 编辑弹出框 -->
        <el-dialog title="编辑" :visible.sync="editVisible" width="30%">
            <el-form ref="form" :label-position="labelPosition" :model="form" label-width="70px">
                <el-form-item label="用户姓名">
                    <el-input v-model="form.userName"></el-input>
                </el-form-item>
                <el-form-item label="手机号">
                    <el-input v-model="form.mobile"></el-input>
                </el-form-item>
                <el-form-item label="邮箱">
                    <el-input v-model="form.email"></el-input>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="editVisible = false">取 消</el-button>
                <el-button type="primary" @click="saveEdit">确 定</el-button>
            </span>
        </el-dialog>
    </div>
</template>

<script>
    import {sys} from "../../../api/api";

    export default {
        name: 'basetable',
        data() {
            return {
                updateFlag:'',
                labelPosition: 'left',
                query: {
                    loginName: '',
                    userName: '',
                    currentPageNo: 1,
                    pageSize: 10
                },
                tableData: [],
                multipleSelection: [],
                delList: [],
                editVisible: false,
                pageTotal: 0,
                form: {},
                idx: -1,
                id: -1
            };
        },
        created() {
            this.getData();
        },
        methods: {
            onSubmit() {
                this.getData();
            },
            addUserBtn() {
                this.updateFlag = "add";
                this.form = {};
                this.editVisible = true;
            },
            getData() {
                sys.getUsers(this.query).then(res => {
                    console.log(res);
                    if (res.code != 0) {
                        this.$message.error('当前使用人数较多,请稍后再试!');
                        return;
                    }
                    this.tableData = res.data;
                    this.pageTotal = res.count;
                });
            },
            // 触发搜索按钮
            handleSearch() {
                this.$set(this.query, 'currentPageNo', 1);
                this.getData();
            },
            // 删除操作
            handleDelete(index, row) {
                // 二次确认删除
                this.$confirm('确定要删除吗？', '提示', {
                    type: 'warning'
                }).then(() => {
                    sys.delUsers({'userId': row.userId}).then(res => {
                        if (res.status != "0") {
                            this.$message.error('网络繁忙:'+res.msg);
                            return;
                        }
                        this.$message.success('删除成功');
                        // this.tableData.splice(index, 1);
                        this.getData();
                    });
                })
                    .catch(() => {
                    });
            },
            // 多选操作
            handleSelectionChange(val) {
                this.multipleSelection = val;
            },
            delAllSelection() {
                const length = this.multipleSelection.length;
                let str = '';
                this.delList = this.delList.concat(this.multipleSelection);
                for (let i = 0; i < length; i++) {
                    str += this.multipleSelection[i].name + ' ';
                }
                this.$message.error(`删除了${str}`);
                this.multipleSelection = [];
            },
            // 编辑操作
            handleEdit(index, row) {
                this.updateFlag = "edit"
                this.idx = index;
                this.form = row;
                this.editVisible = true;
            },
            // 保存编辑
            saveEdit() {
                this.editVisible = false;
                this.$message.success(`修改第 ${this.idx + 1} 行成功`);
                this.$set(this.tableData, this.idx, this.form);
                this.$set(this.form,"updateFlag",this.updateFlag);
                this.updateFlag = "";
                sys.editUsers(this.form).then(res => {
                    if (res.status != "0") {
                        this.$message.error('网络繁忙:'+res.msg);
                        return;
                    }
                    this.getData();
                });
            },
            // 分页导航
            handlePageChange(val) {
                this.$set(this.query, 'currentPageNo', val);
                this.getData();
            }
        }
    };
</script>

<style scoped>
    .handle-box {
        margin-bottom: 20px;
    }

    .handle-select {
        width: 120px;
    }

    .handle-input {
        width: 300px;
        display: inline-block;
    }

    .table {
        width: 100%;
        font-size: 14px;
    }

    .red {
        color: #ff0000;
    }

    .mr10 {
        margin-right: 10px;
    }

    .table-td-thumb {
        display: block;
        margin: auto;
        width: 40px;
        height: 40px;
    }
</style>
