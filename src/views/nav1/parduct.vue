<template>
    <div class="parduct">
        <el-col :span="24">
            <!-- 头部筛选条件 -->
            <el-col :span="24" class="secchMain">
                <p class="secchText">产品名称</p>
                <el-input v-model="secchInput" class="secchInput" clearable placeholder="请输入产品名称"></el-input>
                <el-button @click="serchName">搜索</el-button>
                <el-button @click="createMeterial">新增</el-button>
                <el-button @click="exportProductInitExcel">数据模板</el-button>
                <!--<el-button v-on:click="importData($event)">上传数据</el-button>-->
            </el-col>
            <!-- 表格 -->
            <el-col :span="24">
                <el-table
                        :data="tableData"
                        border
                        style="width: 100%">
                    <el-table-column
                            fixed
                            prop="productName"
                            label="产品名称"
                            show-overflow-tooltip
                            width="150">
                    </el-table-column>
                    <el-table-column
                            prop="productNum"
                            show-overflow-tooltip
                            label="产品数量">
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
                            <el-button @click="viewProductStorage(scope.row)" type="text" size="small">入库</el-button>
                            <el-button @click="viewProductOutgoing(scope.row)" type="text" size="small">出库</el-button>
                            <el-button @click="handleClick(scope.row)" type="text" size="small">编辑</el-button>
                            <el-button type="text" size="small" @click="deleteproduct(scope.row)">删除</el-button>
                        </template>
                    </el-table-column>
                </el-table>
                <!-- 分页 -->
                <el-pagination
                        @size-change="handleSizeChange"
                        @current-change="handleCurrentChange"
                        :current-page="page"
                        :page-sizes="[10, 15, 20, 50]"
                        :page-size="limit"
                        layout="total, sizes, prev, pager, next, jumper"
                        :total="total">
                </el-pagination>
            </el-col>
        </el-col>
        <!-- 新增 -->
        <el-dialog
                title="新增"
                :visible.sync="dialogVisible"
                width="30%"
                :before-close="handleClose">
            <el-form ref="formLabelAlign" :label-position="labelPosition" label-width="80px" :model="formLabelAlign">
                <el-form-item
                        label="产品名称"
                        prop="productName"
                        :rules="[
              {required: true, message: '请输入产品名称', trigger: 'blur'}
            ]"
                >
                    <el-input v-model="formLabelAlign.productName"></el-input>
                </el-form-item>
                <el-form-item
                        label="产品数量"
                        prop="productNum"
                        :rules="[
              { required: true, message: '数量不能为空'},
              { type: 'number', message: '数量必须为数字值'}
            ]"
                >
                    <el-input v-model.number="formLabelAlign.productNum"></el-input>
                </el-form-item>
                <el-form-item
                        label="产品描述"
                        prop="productDescription"
                        :rules="[
              {required: true, message: '请输入产品描述', trigger: 'blur'}
            ]"
                >
                    <el-input type="textarea" v-model="formLabelAlign.productDescription"></el-input>
                </el-form-item>

                <el-button @click="dialogVisible = false">取 消</el-button>
                <el-button type="primary" @click="submitForm('formLabelAlign')">确 定</el-button>
            </el-form>
        </el-dialog>

        <!-- 入库 -->
        <el-dialog
                title="入库"
                :visible.sync="dialogVisible2"
                width="30%"
                :before-close="handleClose">
            <el-form ref="forms" :label-position="labelPosition" label-width="120px" :model="forms">
                <el-form-item
                        label="产品库存数量"
                        prop="productNum"
                        :rules="[
              { required: true, message: '数量不能为空'},
              { type: 'number', message: '数量必须为数字值'}
            ]"
                >
                    <el-input disabled v-model.number="forms.productNums"></el-input>
                </el-form-item>

                <el-form-item label="产品模板"
                              :rules="[
              { required: true, message: '产品模板不能为空'},
            ]"
                >
                    <el-select v-model="forms.productTempId" filterable placeholder="请选择">
                        <el-option v-for="(item, index) in templaList" :key="index" :label="item.productTempName"
                                   :value="item.productTempId"></el-option>
                    </el-select>
                </el-form-item>

                <el-form-item
                        label="产品入库数量"
                        prop="productNum"
                        :rules="[
              { required: true, message: '数量不能为空'},
              { type: 'number', message: '数量必须为数字值'}
            ]"
                >
                    <el-input v-model.number="forms.productNum"></el-input>
                </el-form-item>
                <el-button size="mini" @click="dialogVisible2 = false">取 消</el-button>
                <el-button size="mini" type="primary" @click="productStorage('forms')" :disabled="isDisable">确 定
                </el-button>
            </el-form>
        </el-dialog>

        <!-- 出库 -->
        <el-dialog
                title="出库"
                :visible.sync="dialogVisible1"
                width="30%"
                :before-close="handleClose">
            <el-form ref="forms" :label-position="labelPosition" label-width="120px" :model="forms">
                <el-form-item
                        label="产品库存数量"
                        prop="productNum"
                        :rules="[
              { required: true, message: '数量不能为空'},
              { type: 'number', message: '数量必须为数字值'}
            ]"
                >
                    <el-input disabled v-model.number="forms.productNums"></el-input>
                </el-form-item>
                <el-form-item
                        label="产品出库数量"
                        prop="productNum"
                        :rules="[
              { required: true, message: '数量不能为空'},
              { type: 'number', message: '数量必须为数字值'}
            ]"
                >
                    <el-input v-model.number="forms.productNum"></el-input>
                </el-form-item>
                <el-button size="mini" @click="dialogVisible1 = false">取 消</el-button>
                <el-button size="mini" type="primary" @click="productOutgoing('forms')" :disabled="isDisable">确 定
                </el-button>
            </el-form>
        </el-dialog>
    </div>
</template>

<script>
    import {
        productStorage,
        productOutgoing,
        productList,
        productTempList,
        productCreate,
        deleteproduct
    } from '../../api/api'

    export default {
        data() {
            return {
                tableData: [],
                secchInput: '', // 搜索框内容
                page: 1, // 当前页,
                limit: 0,
                total: 0,
                dialogVisible: false, // 弹框显示隐藏,
                dialogVisible1: false, // 弹框显示隐藏,
                dialogVisible2: false,
                labelPosition: 'left',
                formLabelAlign: {
                    productName: '',
                    productNum: '',
                    productDescription: '',
                    productTempId: ''
                },
                templaList: [],
                forms: {
                    materialId: '',
                    productNum: 0,
                    productTempId: '',
                    productNums: ''
                },
                disabled: false
            }
        },
        methods: {
            viewProductStorage(val) {
                this.dialogVisible2 = true;
                this.forms.productId = val.productId;
                this.forms.productNums = val.productNum;
            },
            productStorage(val) {
                this.dialogVisible2 = false;
                this.isDisable = true;
                let x = {
                    "productId": this.forms.productId,
                    "productNum": this.forms.productNum,
                    "productTempId": this.forms.productTempId
                }
                productStorage(x).then((res) => {
                    console.log(res)
                    this.$message({
                        message: '入库成功',
                        type: 'success'
                    });
                    this.isDisable = false;
                    this.list();
                })
            },
            viewProductOutgoing(val) {
                this.dialogVisible1 = true;
                this.forms.productId = val.productId;
                this.forms.productNums = val.productNum;
            },
            productOutgoing(val) {
                this.dialogVisible1 = false;
                this.isDisable = true;
                let x = {
                    "productId": this.forms.productId,
                    "productNum": this.forms.productNum
                }
                productOutgoing(x).then((res) => {
                    console.log(res)
                    this.$message({
                        message: '出库成功',
                        type: 'success'
                    });
                    this.isDisable = false;
                    this.list();
                })
            },
            list() {
                let x = `productName=${this.secchInput}&page=${this.page}&limit=${this.limit}`
                productList(x).then((res) => {
                    this.total = Number(res.data.total);
                    this.page = res.data.page;
                    this.limit = res.data.limit;
                    this.tableData = res.data.data;
                })
            },
            productTempList() {
                let x = '';
                productTempList(x).then(res => {
                    this.templaList = res.data.data;
                })
            },
            handleClick(row) {
                this.$router.push({
                    path: '/productDetails',
                    query: {
                        id: row.productId
                    }
                })
            },
            handleSizeChange(val) {
                console.log(`每页 ${val} 条`);
            },
            handleCurrentChange(val) {
                console.log(`当前页: ${val}`);
            },
            // 点击搜索
            serchName() {
                this.list();
            },
            exportProductInitExcel(){
                window.location.href="http://47.104.172.218:8087/excel/productInitExport"
            },

            // 新增原料
            createMeterial() {
                this.dialogVisible = true
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
                this.dialogVisible = false;
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        let x = this.formLabelAlign;
                        productCreate(x).then((res) => {
                            this.$message({
                                message: '新增成功',
                                type: 'success'
                            });
                            this.list();
                            this.dialogVisible = false;
                        })
                    } else {
                        console.log('error submit!!');
                        return false;
                    }
                });
            },
            // 删除产品
            deleteproduct(row) {
                let x = `${row.productId}/${row.updateTime}`;
                this.$confirm('确定删除？', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    deleteproduct(x).then((res) => {
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
        },
        mounted() {
            this.list();
            this.productTempList();
        }
    }
</script>

<style lang="scss" scoped>
    .parduct {
        padding: 20px;
        height: 100%;
        min-width: 700px;
        .secchMain {
            display: flex;
            align-items: center;
            justify-content: left;
            margin-bottom: 20px;
            .secchText {
                padding-right: 20px;
            }
            .secchInput {
                min-width: 200px;
                max-width: 60%;
                margin-right: 20px;
            }

        }
        .el-table {
            margin-bottom: 20px;
        }
    }
</style>
