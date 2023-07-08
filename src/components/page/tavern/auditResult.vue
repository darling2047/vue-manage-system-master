<template>
    <div>
        <!-- <div class="crumbs">
             <el-breadcrumb separator="/">
                 <el-breadcrumb-item>
                     <i class="el-icon-lx-cascades"></i> 房屋清算列表(可编辑)
                 </el-breadcrumb-item>
             </el-breadcrumb>
         </div>-->
        <div class="container">
            <div class="handle-box">
                <el-form :inline="true" :model="query" class="demo-form-inline">
                    <el-form-item label="房间名称">
                        <el-input v-model="query.roomName" placeholder="房间名称"></el-input>
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
                        <!--
                                                <el-button type="primary" @click="addUserBtn">新增</el-button>
                        -->
                        <el-button type="primary" @click="onSubmit">查询</el-button>
                        <el-button type="primary" @click="onExport">导出</el-button>
                        <el-button type="primary" size="small" @click="openBatchDialog()">导入</el-button>
                    </el-form-item>
                </el-form>
            </div>
            <span style="color: red;font-size:12px">
                {{lastUppdateTime}}
            </span>
            <vxe-table
                    :data="tableData"
                    :tooltip-config="{enterable: true}"
                    @cell-mouseleave="mouseLeave($event)"
                    border
                    class="table"
                    ref="multipleTable"
                    header-cell-class-name="table-header"
                    @selection-change="handleSelectionChange"
                    show-summary
                    :summary-method="getSummaries"
                    :edit-config="{trigger: 'click', mode: 'cell', showStatus: true}"
            >
                <!--<el-table-column type="selection" width="55" align="center"></el-table-column>-->
                <vxe-table-column field="id" title="编号" align="center"width="55" ></vxe-table-column>
                <vxe-table-column field="month" title="月份" align="center" width="100"></vxe-table-column>
                <vxe-table-column field="opTime" title="数据账期" align="center" width="120"></vxe-table-column>
                <vxe-table-column field="proName" title="省份" align="center" width="100"></vxe-table-column>
                <vxe-table-column field="cityName" title="地市" align="center" width="100"></vxe-table-column>
                <vxe-table-column field="countyName" title="区县" align="center" width="100"></vxe-table-column>
                <vxe-table-column field="area" title="区域" align="center" width="120"></vxe-table-column>
                <vxe-table-column field="roomName" title="房屋名称" width="200" align="center"></vxe-table-column>
                <vxe-table-column field="roomType" title="房型" align="center" width="90"></vxe-table-column>
                <vxe-table-column field="rzDays" title="入住天数" align="center" width="90"></vxe-table-column>
                <vxe-table-column field="priceClean" title="平台打款" width="90"></vxe-table-column>
                <vxe-table-column field="actualZj" title="房租" width="90"
                                  :edit-render="{name: 'input', attrs: {type: 'text'}}">
                   <!-- <template slot-scope="scope">
                        {{ scope.actualZj }}({{ scope.actualZj }})
                    </template>-->
                </vxe-table-column>
                <vxe-table-column field="khFee" title="客耗品" width="90"
                                  :edit-render="{name: 'input', attrs: {type: 'text'}}"></vxe-table-column>
                <vxe-table-column field="bjFee" title="保洁" width="90"
                                  :edit-render="{name: 'input', attrs: {type: 'text'}}"></vxe-table-column>
                <vxe-table-column field="bcExpend" title="布草开支" width="100"
                                  :edit-render="{name: 'input', attrs: {type: 'text'}}"></vxe-table-column>
                <vxe-table-column field="dailyExpend" title="日常开支" width="100"
                                  :edit-render="{name: 'input', attrs: {type: 'text'}}"></vxe-table-column>
                <vxe-table-column field="sumExpend" title="开支总计" width="100"
                                  :edit-render="{name: 'input', attrs: {type: 'text'}}"></vxe-table-column>
                <vxe-table-column field="commission" title="佣金" width="90"
                                  :edit-render="{name: 'input', attrs: {type: 'text'}}"></vxe-table-column>
                <vxe-table-column field="netProfits" title="净利润" width="90"
                                  :edit-render="{name: 'input', attrs: {type: 'text'}}"></vxe-table-column>
                <!--<vxe-table-column field="jinFee" title="金总收款金额"width="90"></vxe-table-column>-->
                <vxe-table-column field="settlementAmount" title="结算金额" width="90"
                                  :edit-render="{name: 'input', attrs: {type: 'text'}}"></vxe-table-column>
                <vxe-table-column field="remark" title="备注" width="200" align="center"></vxe-table-column>
                <vxe-table-column field="updatorName" title="修改人" align="center" width="120"></vxe-table-column>
                <vxe-table-column field="updateTime" title="修改时间" align="center" width="160"></vxe-table-column>
                <vxe-table-column title="操作" width="180" align="center" fixed="right">
                    <template slot-scope="scope">
                        <el-button
                                type="text"
                                icon="el-icon-edit"
                                @click="handleEdit(scope.$index, scope.row)"
                        >刷新
                        </el-button>
                        <el-button
                                type="text"
                                icon="el-icon-save"
                                @click="handleUpdate(scope.$index, scope.row)"
                        >保存
                        </el-button>
                    </template>
                </vxe-table-column>
            </vxe-table>
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
    import {BigNumber} from 'bignumber.js';

    export default {
        name: 'basetable',
        data() {
            return {
                seleData: [],
                updateFlag: '',
                pushAction: '',
                fileList : [],
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
                pageTotal: 0,
                form: {},
                idx: -1,
                id: -1,
                lastUppdateTime:""
            };
        },
        created() {
            this.getData();
            this.getTgfd();
            this.getLastUpdate();
        },
        methods: {
            remoteMethod(query) {
                this.loading = true;
                this.getTgfd(query)
            },
            onSubmit() {
                this.getData();
                this.getLastUpdate();
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
                sys.getAuditResult(this.query).then(res => {
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
                window.open('http://112.124.56.76:9090/auditResult/downLoad?' +
                // window.open('http://localhost:9090/auditResult/downLoad?' +
                    'roomName=' + this.query.roomName +
                    '&month=' + this.query.month +
                    '&tgfd=' + this.query.tgfd
                );
            },
            // 触发搜索按钮
            handleSearch() {
                this.$set(this.query, 'currentPageNo', 1);
                this.getData();
                this.getLastUpdate();
            },
            // 删除操作
            handleUpdate(index, row) {
                // 二次确认删除
                this.$confirm('请确认是否点击刷新按钮，点击确定继续操作？', '提示', {
                    type: 'warning'
                }).then(() => {
                    sys.updateResult(this.form).then(res => {
                        if (res.status != "0") {
                            this.$message.error('网络繁忙:' + res.msg);
                            return;
                        } else {
                            this.$message.success('修改成功!');
                        }
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
                debugger
                let zj = BigNumber(row.actualZj.replace(",", ""));
                if (!zj.c) {
                    zj = BigNumber(0);
                }
                let kh = BigNumber(row.khFee);
                if (!kh.c) {
                    kh = BigNumber(0);
                }
                let bj = BigNumber(row.bjFee);
                if (!bj.c) {
                    bj = BigNumber(0);
                }
                let bc = BigNumber(row.bcExpend);
                if (!bc.c) {
                    bc = BigNumber(0);
                }
                let daily = BigNumber(row.dailyExpend);
                if (!daily.c) {
                    daily = BigNumber(0);
                }
                let sum = zj.plus(kh).plus(bj).plus(bc).plus(daily);
                row.sumExpend = sum.toNumber();
                this.idx = index;
                this.form = row;
                // this.editVisible = true;
                this.$set(this.tableData, this.idx, this.form);
                this.$set(this.form, "updateFlag", this.updateFlag);
                this.updateFlag = "";
                debugger;
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
                this.getLastUpdate();
            },
            getTgfd(val) {
                this.seleData = []
                // let name = {'name': val}
                sys.getTgfd(val).then(res => {
                    console.log(res);
                    this.seleData = res;
                });
            },
            getLastUpdate() {
                sys.getLastUpdate(this.query).then(res => {
                    if (res.status != 0) {
                        this.$message.error('当前使用人数较多,请稍后再试!');
                        return;
                    }
                    this.lastUppdateTime = "数据最后更新时间："+res.obj;
                });
            },
            getSummaries(param) {
                const {columns, data} = param;
                const sums = [];
                columns.forEach((column, index) => {
                    if (index === 0) {
                        sums[index] = '总价';
                        return;
                    }
                    let label = column.label
                    if (label == '月份' || label == '数据账期') {
                        return;
                    }
                    if (label == '布草开支') {
                        debugger
                    }
                    const values = data.map(item => Number(item[column.property]));
                    if (!values.every(value => isNaN(value))) {
                        sums[index] = values.reduce((prev, curr) => {
                            const value = Number(curr);
                            if (!isNaN(value)) {
                                return prev + curr;
                            } else {
                                return prev;
                            }
                        }, 0);
                        sums[index];// += ' 元';
                    } else {
                        sums[index] = '';
                    }
                });

                return sums;
            },
            mouseLeave(row) {
                // let a = row.cell;
                // debugger;
                // alert(a)
            },
            openBatchDialog(data) {
                this.batchType = data;
                this.batchVisible = true;
                this.fileList = [];
                this.pushAction = 'http://112.124.56.76:9090/auditResult/resultImport';
                // this.pushAction = 'http://localhost:9090/auditResult/resultImport';
            },
            downLoadModel() {
                window.open('http://112.124.56.76:9090/auditResult/templateExport?')
                // window.open('http://localhost:9090/auditResult/templateExport?')
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
