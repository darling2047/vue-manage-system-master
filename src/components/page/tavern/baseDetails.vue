<template>
    <div>
       <!-- <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item>
                    <i class="el-icon-lx-cascades"></i> 结算核查清单
                </el-breadcrumb-item>
            </el-breadcrumb>
        </div>-->
        <el-tabs type="border-card">
            <el-tab-pane label="保洁列表">
                <bjList ref='bjList'></bjList>
            </el-tab-pane>
            <el-tab-pane label="钉钉报销品类列表">
                <dingBxList ref="dingBxList"></dingBxList>
            </el-tab-pane>
        </el-tabs>

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
    import bjList from './bjList';
    import dingBxList from './dingBxList';
    export default {
        name: 'basetable',
        data() {
            return {
                seleData: [],
                updateFlag: '',
                labelPosition: 'left',
                query: {
                    roomName: '',
                    month: '',
                    tgfd: '',
                    currentPageNo: 1,
                    pageSize: 15
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
            this.getTgfd();
        },
        components:{
            bjList,
            dingBxList
        },
        methods: {
            remoteMethod(query) {
                this.loading = true;
                this.getTgfd(query)
            },
            onSubmit() {
                this.getData();
            },
            onExport() {
                this.doExport();
            },
            addUserBtn() {
                this.updateFlag = "add";
                this.form = {};
                this.editVisible = true;
            },
            getData() {
                sys.getRoomList(this.query).then(res => {
                    console.log(res);
                    if (res.code != 0) {
                        this.$message.error('当前使用人数较多,请稍后再试!');
                        return;
                    }
                    this.tableData = res.data;
                    this.pageTotal = res.count;
                });
            },
            doExport() {
                window.open('http://112.124.56.76:9090/roomAudit/downLoad?' +
                    'roomName=' + this.query.roomName +
                    '&month=' + this.query.month +
                    '&tgfd=' + this.query.tgfd
                );
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
                            this.$message.error('网络繁忙:' + res.msg);
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
                this.$set(this.form, "updateFlag", this.updateFlag);
                this.updateFlag = "";
                sys.editUsers(this.form).then(res => {
                    if (res.status != "0") {
                        this.$message.error('网络繁忙:' + res.msg);
                        return;
                    }
                    this.getData();
                });
            },
            // 分页导航
            handlePageChange(val) {
                this.$set(this.query, 'currentPageNo', val);
                this.getData();
            },
            getTgfd(val) {
                this.seleData = []
                // let name = {'name': val}
                sys.getTgfd(val).then(res => {
                    console.log(res);
                    this.seleData = res;
                });
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
