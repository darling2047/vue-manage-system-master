<template>
    <div>
       <!-- <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item>
                    <i class="el-icon-lx-cascades"></i> 房屋基础信息列表
                </el-breadcrumb-item>
            </el-breadcrumb>
        </div>-->
        <div class="container">
            <div class="handle-box">
                <el-form :inline="true" :model="query" class="demo-form-inline">
                    <el-form-item label="房间名称">
                        <el-input v-model="query.roomName" placeholder="姓名"></el-input>
                    </el-form-item>
                    <!--<el-form-item label="月份">
                        <el-select v-model="query.month" placeholder="月份" class="handle-select mr10" clearable>
                            <el-option key="1" label="202302" value="202302"></el-option>
                            <el-option key="2" label="202303" value="202303"></el-option>
                            <el-option key="3" label="202304" value="202304"></el-option>
                            <el-option key="4" label="202305" value="202305"></el-option>
                        </el-select>
                    </el-form-item>-->
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
                <el-table-column prop="proName" label="省份" align="center"></el-table-column>
                <el-table-column prop="cityName" label="地市" align="center"></el-table-column>
                <el-table-column prop="countyName" label="区县" align="center"></el-table-column>
                <el-table-column prop="area" label="区域" align="center"></el-table-column>
                <el-table-column prop="roomName" label="房屋名称" width="200" align="center"></el-table-column>
                <el-table-column prop="roomType" label="房型" align="center"></el-table-column>
                <el-table-column prop="typeLevel" label="床数" align="center"></el-table-column>
                <el-table-column prop="tgfd" label="托管房东"></el-table-column>
                <el-table-column prop="interactWay" label="合作方式" width="100"></el-table-column>
                <el-table-column prop="contractStartDate" label="合同开始日期" width="130"></el-table-column>
                <el-table-column prop="contractEndDate" label="合同结束日期" width="130"></el-table-column>
                <el-table-column prop="payWay" label="付款方式"></el-table-column>
                <el-table-column prop="fkyf" label="付款月份"></el-table-column>
                <el-table-column prop="zfyq" label="支付时间要求" width="110"></el-table-column>
                <el-table-column prop="jzrq" label="交租日期"></el-table-column>
                <el-table-column prop="htzj" label="合同租金"></el-table-column>
                <el-table-column prop="actualZj" label="实际租金"></el-table-column>
                <el-table-column prop="contractDeposit" label="合同押金"></el-table-column>
                <el-table-column prop="wyj" label="违约金" align="center" width="310"></el-table-column>
                <el-table-column prop="autoXz" label="是否自动续租" align="center" width="110"></el-table-column>
                <el-table-column prop="jzStartDate" label="最近交租开始时间" align="center" width="150"></el-table-column>
                <el-table-column prop="jzEndDate" label="最近交租结束时间" align="center" width="150"></el-table-column>
                <el-table-column prop="baiduUrl" label="百度网盘链接" align="center" :show-overflow-tooltip="true" width="210"></el-table-column>
                <el-table-column prop="baiduRemark" label="百度网盘备注" align="center" width="110"></el-table-column>
                <el-table-column prop="fzLiablePerson" label="房租负责人" align="center" width="100"></el-table-column>
                <el-table-column prop="lookLiablePerson" label="看房负责人" align="center" width="100"></el-table-column>
                <el-table-column prop="zfLiablePerson" label="租房负责人" align="center" width="100"></el-table-column>
                <el-table-column prop="remarkOne" label="备注1" align="center":show-overflow-tooltip="true"></el-table-column>
                <el-table-column prop="remarkThree" label="备注3" align="center":show-overflow-tooltip="true"></el-table-column>
                <el-table-column prop="address" label="详细地址" align="center":show-overflow-tooltip="true"></el-table-column>
                <el-table-column prop="location" label="经纬度" align="center" width="160"></el-table-column>
                <el-table-column prop="electricNumber" label="电号" align="center"></el-table-column>
                <el-table-column prop="electricFee" label="缴费金额" align="center"></el-table-column>
                <el-table-column prop="waterNumber" label="水号" align="center"></el-table-column>
                <el-table-column prop="waterFee" label="缴费金额" align="center"></el-table-column>
                <el-table-column prop="airNumber" label="气号" align="center"></el-table-column>
                <el-table-column prop="airFee" label="缴费金额" align="center"></el-table-column>
                <el-table-column prop="bedType" label="床型" align="center" width="220"></el-table-column>
                <el-table-column prop="sofaBed" label="沙发床" align="center"></el-table-column>
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
        <el-dialog title="编辑" :visible.sync="editVisible" width="50%">
            <el-form ref="form" :label-position="left" :model="form" label-width="130px">
                <el-row>
                    <el-col :span="8">
                        <el-form-item label="省份" >
                            <el-input v-model="form.proName"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="8">
                        <el-form-item label="地市" >
                            <el-input v-model="form.cityName"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="8">
                        <el-form-item label="区县" >
                            <el-input v-model="form.countyName"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="8">
                        <el-form-item label="区域" >
                            <el-input v-model="form.area"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="8">
                        <el-form-item label="房屋名称">
                            <el-input v-model="form.roomName"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="8">
                        <el-form-item label="房型">
                            <el-input v-model="form.roomType"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="8">
                        <el-form-item label="床数">
                            <el-input v-model="form.typeLevel"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="8">
                        <el-form-item label="房租">
                            <el-input v-model="form.actualZj"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="8">
                        <el-form-item label="托管房东">
                            <el-select v-model="form.tgfd" placeholder="托管房东"
                                       style="width: 100%" class="handle-select mr10" clearable remote
                                       filterable :remote-method="remoteMethod">
                                <el-option :label="item.name" :value="item.name" v-for="item in seleData"
                                           :key="item.name"></el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                    <el-col :span="8">
                        <el-form-item label="合作方式">
                            <el-input v-model="form.interactWay"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="8">
                        <el-form-item label="合同开始日期">
                            <el-date-picker
                                    v-model="form.contractStartDate"
                                    type="date"
                                    style="width: 100%"
                                    value-format="yyyy-MM-dd"
                                    placeholder="合同开始日期">
                            </el-date-picker>
                        </el-form-item>
                    </el-col>
                    <el-col :span="8">
                        <el-form-item label="合同结束日期">
                            <el-date-picker
                                    v-model="form.contractEndDate"
                                    type="date"
                                    style="width: 100%"
                                    value-format="yyyy-MM-dd"
                                    placeholder="合同结束日期">
                            </el-date-picker>
                        </el-form-item>
                    </el-col>
                    <el-col :span="8">
                        <el-form-item label="付款方式">
                            <el-input v-model="form.payWay"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="8">
                        <el-form-item label="付款月份">
                            <el-input v-model="form.fkyf"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="8">
                        <el-form-item label="支付时间要求">
                            <el-input v-model="form.zfyq"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="8">
                        <el-form-item label="交租日期">
                            <el-date-picker
                                    v-model="form.jzrq"
                                    type="date"
                                    style="width: 100%"
                                    value-format="yyyy-MM-dd"
                                    placeholder="合同结束日期">
                            </el-date-picker>
                        </el-form-item>
                    </el-col>
                    <el-col :span="8">
                        <el-form-item label="合同租金">
                            <el-input v-model="form.htzj"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="8">
                        <el-form-item label="合同押金">
                            <el-input v-model="form.contractDeposit"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="8">
                        <el-form-item label="违约金">
                            <el-input v-model="form.wyj"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="8">
                        <el-form-item label="最近交租开始时间" >
                            <el-date-picker
                                    v-model="form.jzStartDate"
                                    type="date"
                                    style="width: 100%"
                                    value-format="yyyy-MM-dd"
                                    placeholder="最近交租开始时间">
                            </el-date-picker>
                        </el-form-item>
                    </el-col>
                    <el-col :span="8">
                        <el-form-item label="最近交租结束时间" >
                            <el-date-picker
                                    v-model="form.jzEndDate"
                                    type="date"
                                    style="width: 100%"
                                    value-format="yyyy-MM-dd"
                                    placeholder="最近交租结束时间">
                            </el-date-picker>
                        </el-form-item>
                    </el-col>
                    <el-col :span="8">
                        <el-form-item label="网盘链接">
                            <el-input v-model="form.baiduUrl"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="8">
                        <el-form-item label="网盘备注">
                            <el-input v-model="form.baiduRemark"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="8">
                        <el-form-item label="房租负责人">
                            <el-input v-model="form.fzLiablePerson"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="8">
                        <el-form-item label="看房负责人">
                            <el-input v-model="form.lookLiablePerson"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="8">
                        <el-form-item label="租房负责人">
                            <el-input v-model="form.zfLiablePerson"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="8">
                        <el-form-item label="备注1">
                            <el-input v-model="form.remarkOne"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="8">
                        <el-form-item label="备注3">
                            <el-input v-model="form.remarkThree"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="8">
                        <el-form-item label="详细地址">
                            <el-input v-model="form.address"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="8">
                        <el-form-item label="经纬度">
                            <el-input v-model="form.location"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="8">
                        <el-form-item label="电号">
                            <el-input v-model="form.electricNumber"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="8">
                        <el-form-item label="缴费金额">
                            <el-input v-model="form.electricFee"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="8">
                        <el-form-item label="水号">
                            <el-input v-model="form.waterNumber"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="8">
                        <el-form-item label="缴费金额">
                            <el-input v-model="form.waterFee"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="8">
                        <el-form-item label="气号">
                            <el-input v-model="form.airNumber"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="8">
                        <el-form-item label="缴费金额">
                            <el-input v-model="form.airFee"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="8">
                        <el-form-item label="床型">
                            <el-input v-model="form.bedType"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="8">
                        <el-form-item label="沙发床">
                            <el-input v-model="form.sofaBed"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="8">
                        <el-form-item label="是否自动续租">
                            <el-radio v-model="form.autoXz" label="是">是</el-radio>
                            <el-radio v-model="form.autoXz" label="否">否</el-radio>
                        </el-form-item>
                    </el-col>
                </el-row>
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
                sys.getBaseRooms(this.query).then(res => {
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
                    // 'http://127.0.0.1:9090/room/downLoad?' +
                    'http://112.124.56.76:9090/room/downLoad?' +
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
                    sys.delBaseRoom({'id': row.id}).then(res => {
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
                this.updateFlag = "";
                sys.editBaseRoom(this.form).then(res => {
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
