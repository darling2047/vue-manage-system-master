<template>
    <div>
        <!-- <div class="crumbs">
             <el-breadcrumb separator="/">
                 <el-breadcrumb-item>
                     <i class="el-icon-lx-cascades"></i> 不可分摊费用列表
                 </el-breadcrumb-item>
             </el-breadcrumb>
         </div>-->
        <div class="container">
            <div class="handle-box">
                <el-form :inline="true" :model="query" class="demo-form-inline">
                    <el-form-item label="房间名称">
                        <el-input v-model="query.roomName" placeholder="姓名"></el-input>
                    </el-form-item>
                    <el-form-item label="月份">
                        <el-select v-model="query.month" placeholder="月份" class="handle-select mr10" clearable>
                            <el-option key="1" label="202302" value="202302"></el-option>
                            <el-option key="2" label="202303" value="202303"></el-option>
                            <el-option key="3" label="202304" value="202304"></el-option>
                            <el-option key="4" label="202305" value="202305"></el-option>
                            <el-option key="5" label="202306" value="202306"></el-option>
                            <el-option key="6" label="202307" value="202307"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="托管房东">
                        <el-select v-model="query.tgfd" placeholder="托管房东" class="handle-select mr10" clearable remote
                                   filterable :remote-method="remoteMethod">
                            <el-option :label="item.name" :value="item.name" v-for="item in seleData"
                                       :key="item.name"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" @click="onSubmit">查询</el-button>
                        <el-button type="primary" @click="addRoomBtn">新增</el-button>
                        <el-button type="primary" @click="onExport">导出</el-button>
                        <el-button type="primary" size="small" @click="openBatchDialog()">导入</el-button>
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
                    height="900"
            >
                <!--<el-table-column type="selection" width="55" align="center"></el-table-column>-->
                <el-table-column prop="id" label="id" align="center" style="display: none"></el-table-column>
                <el-table-column prop="tgfd" label="托管房东"></el-table-column>
                <el-table-column prop="finishTime" label="审批完成时间" width="100"></el-table-column>
                <el-table-column prop="promoter" label="发起人姓名" width="100"></el-table-column>
                <el-table-column prop="area" label="区域" width="130"></el-table-column>
                <el-table-column prop="bxType" label="报销品类"></el-table-column>
                <el-table-column prop="roomName" label="房屋名称" width="200" align="center"></el-table-column>
                <el-table-column prop="amount" label="报销金额"></el-table-column>
                <el-table-column prop="remark" label="费用说明" width="280"></el-table-column>
                <el-table-column prop="month" label="月份"></el-table-column>
                <el-table-column prop="creator" label="创建人"></el-table-column>
                <el-table-column prop="createTime" label="创建时间" align="center" width="160"></el-table-column>
                <el-table-column label="操作" width="180" align="center" fixed="right">
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
            <el-form ref="form" :label-position="labelPosition" :model="form" label-width="100px">
                <el-form-item label="房屋名称" >
                    <el-input v-model="form.roomName"></el-input>
                </el-form-item>
                <el-form-item label="托管房东">
                    <el-select v-model="form.tgfd" placeholder="托管房东" class="handle-select mr10" clearable remote
                               filterable :remote-method="remoteMethod">
                        <el-option :label="item.name" :value="item.name" v-for="item in seleData"
                                   :key="item.name"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="区域" >
                    <el-input v-model="form.area"></el-input>
                </el-form-item>
                <el-form-item label="审批完成时间" >
                    <el-input v-model="form.finishTime"></el-input>
                </el-form-item>
                <el-form-item label="发起人姓名" >
                    <el-input v-model="form.promoter"></el-input>
                </el-form-item>
                <el-form-item label="报销品类">
                    <el-input v-model="form.bxType"></el-input>
                </el-form-item>
                <el-form-item label="报销金额">
                    <el-input v-model="form.amount"></el-input>
                </el-form-item>
                <el-form-item label="费用说明">
                    <el-input v-model="form.remark"></el-input>
                </el-form-item>
                <el-form-item label="月份">
                    <el-input v-model="form.month"></el-input>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="editVisible = false">取 消</el-button>
                <el-button type="primary" @click="saveEdit">确 定</el-button>
            </span>
        </el-dialog>
        <el-dialog title="批量导入" :visible.sync="batchVisible" center :close-on-click-modal="false">
            <div class="batchCon">

                <div class="batchCon-upload">
                    <el-upload
                            ref="uploadRef"
                            class="uploadButton"
                            :action="pushAction"
                            list-type="text"
                            size="small"
                            drag
                            :with-credentials='true'
                            :file-list="fileList"
                            :multiple='false'
                            :auto-upload='false'
                            :on-success="(response, file, fileList) => handleAvatarSuccess('head', response, file, fileList)"
                            :show-file-list="true">
                        <i class="el-icon-upload"></i>
                        <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
                        <div class="el-upload__tip" slot="tip">只能上传excel文件，且不超过10M</div>
                    </el-upload>
                </div>
            </div>
            <div class="dialog-footer" slot="footer" style="textAlign:center">
                <el-button type='primary' @click='uploadSubmit'>上传</el-button>
                <el-button type="primary" @click="downLoadModel">模板下载</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
    import {sys} from "../../../api/api";

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
                batchVisible: false,
                pushAction: "",
                fileList : [],
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
            addRoomBtn() {
                this.updateFlag = "add";
                this.form = {};
                this.editVisible = true;
            },
            getData() {
                sys.getBkftResult(this.query).then(res => {
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
                window.open(
                    'http://112.124.56.76:9090/roomBkft/downLoad?' +
                    // 'http://127.0.0.1:9090/roomBkft/downLoad?' +
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
                    sys.delBkftRoom({'id': row.id}).then(res => {
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
                this.$message.success(`修改成功`);
                this.$set(this.tableData, this.idx, this.form);
                this.$set(this.form, "updateFlag", this.updateFlag);
                if (this.updateFlag == 'add') {
                    sys.addBkftRoom(this.form).then(res => {
                        if (res.status != "0") {
                            this.$message.error('网络繁忙:' + res.msg);
                            return;
                        }
                    });
                }
                if (this.updateFlag == 'edit') {
                    this.form.createTime = null;
                    sys.updateBkftRoom(this.form).then(res => {
                        if (res.status != "0") {
                            this.$message.error('网络繁忙:' + res.msg);
                            return;
                        }
                    });
                }
                this.getData();
                this.updateFlag = "";
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
            },
            openBatchDialog(data) {
                this.batchType = data;
                this.batchVisible = true;
                this.fileList = [];
                this.pushAction = 'http://112.124.56.76:9090/roomBkft/bkftImport';
                // this.pushAction = 'http://localhost:9090/roomBkft/bkftImport';
            },
            downLoadModel() {
                window.open('http://112.124.56.76:9090/roomBkft/templateExport?')
                // window.open('http://localhost:9090/roomBkft/templateExport?')
            },
            handleAvatarSuccess(field, response, file, fileList) {
                if (response.status === 0) {
                    this.$message.success('批量导入成功');
                    this.getData();
                }
                // this.$forceUpdate();
            },
            uploadSubmit() {
                this.$refs.uploadRef.submit();
                this.batchVisible = false;
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


    .batchCon .batchCon-model {
        color: #409eff;
        margin-bottom: 10px;
        cursor: pointer;
    }


    .batchCon .batchCon-upload /deep/.el-upload {
        width: 100%;
    }

    .batchCon .batchCon-upload  /deep/.el-upload-dragger {
        width: 100%;
    }
</style>
