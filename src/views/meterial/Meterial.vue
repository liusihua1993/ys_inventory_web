<template>
    <div class="parduct">
        <el-col :span="24">
            <!-- 头部筛选条件 -->
            <el-col :span="24" class="searchMain">
                <p class="searchText">原料名称</p>
                <el-input v-model="secchInput" class="searchInput" clearable placeholder="请输入原料名称"></el-input>
                <el-button @click="searchName">搜索</el-button>
                <el-button @click="createMeterial">新增</el-button>
                <el-button @click="exportMeterialStockExcel">库存导出</el-button>
                <el-button @click="exportMeterialInitExcel">数据模板</el-button>
            </el-col>
            <!-- 表格 -->
            <el-col :span="24">
                <el-table
                        :data="tableData"
                        border
                        style="width: 100%">
                    <el-table-column
                            fixed
                            prop="materialName"
                            label="原料名称"
                            show-overflow-tooltip
                            width="150">
                    </el-table-column>
                    <el-table-column
                            prop="materialNum"
                            show-overflow-tooltip
                            label="原料数量">
                    </el-table-column>
                    <el-table-column
                            prop="createTime"
                            show-overflow-tooltip
                            label="创建时间">
                    </el-table-column>
                    <el-table-column
                            prop="createUser"
                            show-overflow-tooltip
                            label="创建人">
                    </el-table-column>
                    <el-table-column
                            fixed="right"
                            label="操作"
                            width="200">
                        <template slot-scope="scope">
                            <el-button @click="toDetails(scope.row)" type="text" size="small">编辑</el-button>
                            <el-button @click="metnum(scope.row)" type="text" size="small">
                                修改原料数量
                            </el-button>
                            <el-button type="text" size="small" @click="deleteMeterial(scope.row)">删除</el-button>
                        </template>
                    </el-table-column>
                </el-table>
                <!-- 分页 -->
                <el-pagination
                        @size-change="handleSizeChange"
                        @current-change="handleCurrentChange"
                        :current-page="page"
                        :page-sizes="[10, 20, 50]"
                        :page-size="limit"
                        layout="total, sizes, prev, pager, next, jumper"
                        :total="total">
                </el-pagination>
            </el-col>
            <!-- 弹框 -->
            <el-dialog
                    title="提示"
                    :visible.sync="dialogVisible"
                    width="30%"
                    :before-close="handleClose">
                <el-form ref="formLabelAlign" :label-position="labelPosition" label-width="80px"
                         :model="formLabelAlign">
                    <el-form-item
                            label="原料名称"
                            prop="materialName"
                            :rules="[
              {required: true, message: '请输入原料名称', trigger: 'blur'}
            ]"
                    >
                        <el-input v-model="formLabelAlign.materialName"></el-input>
                    </el-form-item>
                    <el-form-item
                            label="剩余数量"
                            prop="materialNum"
                            :rules="[
              { required: true, message: '数量不能为空'},
              { type: 'number', message: '数量必须为数字值'}
            ]"
                    >
                        <el-input v-model.number="formLabelAlign.materialNum"></el-input>
                    </el-form-item>
                    <el-form-item
                            label="原料描述"
                            prop="materialDescription"
                            :rules="[
              {required: true, message: '请输入原料描述', trigger: 'blur'}
            ]"
                    >
                        <el-input type="textarea" v-model="formLabelAlign.materialDescription"></el-input>
                    </el-form-item>
                    <el-button @click="dialogVisible = false">取 消</el-button>
                    <el-button type="primary" @click="submitForm('formLabelAlign')" :loading="isDisable">确 定</el-button>
                </el-form>
            </el-dialog>
            <!-- 修改原料数量 -->
            <el-dialog
                    title="修改原料数量"
                    :visible.sync="dialogVisible1"
                    width="30%"
                    :before-close="handleClose">
                <el-form ref="forms" :label-position="labelPosition" label-width="80px" :model="forms">
                    <el-form-item
                            label="原有数量"
                            prop="materialNum"
                            :rules="[
              { required: true, message: '数量不能为空'},
              { type: 'number', message: '数量必须为数字值'}
            ]"
                    >
                        <el-input disabled v-model.number="forms.materialNums"></el-input>
                    </el-form-item>
                    <el-form-item
                            label="新增数量"
                            prop="materialNum"
                            :rules="[
              { required: true, message: '数量不能为空'},
              { type: 'number', message: '数量必须为数字值'}
            ]"
                    >
                        <el-input v-model.number="forms.materialNum"></el-input>
                    </el-form-item>
                    <el-button size="mini" @click="dialogVisible = false">取 消</el-button>
                    <el-button size="mini" type="primary" @click="numsave('forms')" :loading="isDisable">确 定</el-button>
                </el-form>
            </el-dialog>
        </el-col>
    </div>
</template>

<script>
    import {meterialList, deleteMeterial, meterialCreate, updateMater} from '../../api/api'

    export default {
        data() {
            return {
                tableData: [],
                secchInput: '', // 搜索框内容
                page: 1, // 当前页,
                limit: 10,
                total: 0,
                dialogVisible: false, // 弹框显示隐藏,
                dialogVisible1: false,
                labelPosition: 'left',
                formLabelAlign: {
                    materialName: '',
                    materialNum: '',
                    materialDescription: ''
                },
                forms: {
                    materialId: '',
                    materialNum: 0,
                    materialNums: ''
                },
                isDisable: false
            }
        },
        methods: {
            metnum(val) {
                this.dialogVisible1 = true;
                this.forms.materialId = val.materialId;
                this.forms.materialNums = val.materialNum;
            },
            numsave(val) {
                this.isDisable = true;
                this.dialogVisible1 = false;
                //let num = parseInt(this.forms.materialNum);
                let x = {
                    "materialId": this.forms.materialId,
                    "materialNum": this.forms.materialNum
                }
                updateMater(x).then((res) => {
                    console.log(res)
                    this.$message({
                        message: '修改成功',
                        type: 'success'
                    });
                    this.list();
                    this.isDisable = false;
                }).catch(error => {
                    this.$message.error(error);
                    console.log(error, "失败了");
                    this.isDisable = false;
                })
            },
            // 原料列表
            list() {
                let x = `materialName=${this.secchInput}&page=${this.page}&limit=${this.limit}`
                meterialList(x).then((res) => {
                    this.total = Number(res.data.total);
                    this.page = res.data.page;
                    this.limit = res.data.limit;
                    this.tableData = res.data.data;
                })

            },
            // 跳转到原料详情
            toDetails(row) {
                this.$router.push({
                    path: '/meterialDetails',
                    query: {
                        id: row.materialId
                    }
                })
            },
            // 删除原料
            deleteMeterial(row) {
                let x = `${row.materialId}/${row.updateTime}`;
                this.$confirm('确定删除？', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    deleteMeterial(x).then((res) => {
                        this.list();
                    })
                    this.$message({
                        type: 'success',
                        message: '删除成功!'
                    });
                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消删除'
                    });
                });

            },
            handleSizeChange(val) {
                this.limit=val;
                this.list();
                console.log(`每页 ${val} 条`);
            },
            handleCurrentChange(val) {
                this.page=val;
                this.list();
                console.log(`当前页: ${val}`);
            },
            // 点击搜索
            searchName() {
                this.list();
            },
            // 新增原料
            createMeterial() {
                this.dialogVisible = true
            },


            exportMeterialStockExcel() {
                window.location.href = this.$store.state.exportMeterialStockExcel
            },
            exportMeterialInitExcel() {
                window.location.href = this.$store.state.exportMeterialInitExcel
            },
            handleClose(done) {
                this.$confirm('确认关闭？')
                    .then(_ => {
                        done();
                    })
                    .catch(_ => {
                    });
            },
            submitForm(formName) {
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        this.isDisable = true;
                        let x = this.formLabelAlign;
                        meterialCreate(x).then((res) => {
                            this.$message({
                                message: '新增成功',
                                type: 'success'
                            });
                            this.isDisable = false;
                            this.dialogVisible = false;
                            this.list();
                        }).catch(error => {
                            this.isDisable = false;
                            this.$message.error(error);
                            console.log(error, "失败了");
                        })
                    }
                });
            },
        },
        mounted() {
            this.list();
        }
    }
</script>

<style lang="scss" scoped>
    .parduct {
        padding: 20px;
        height: 100%;
        min-width: 700px;
        .searchMain {
            display: flex;
            align-items: center;
            justify-content: left;
            margin-bottom: 20px;
            .searchText {
                padding-right: 20px;
            }
            .searchInput {
                min-width: 200px;
                max-width: 55%;
                margin-right: 20px;
            }

        }
        .el-table {
            margin-bottom: 20px;
        }
    }
</style>
