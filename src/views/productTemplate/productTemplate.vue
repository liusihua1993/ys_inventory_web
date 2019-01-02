<template>
    <div class="parduct">
        <el-col :span="24">
            <!-- 头部筛选条件 -->
            <el-col :span="24" class="secchMain">
                <p class="secchText">产品模板名称</p>
                <el-input v-model="secchInput" class="secchInput" clearable placeholder="请输入产品模板名称"></el-input>
                <el-button @click="serchName">搜索</el-button>
                <el-button @click="createMeterial">新增</el-button>
            </el-col>
            <!-- 表格 -->
            <el-col :span="24">
                <el-table
                        :data="tableData"
                        border
                        style="width: 100%">
                    <el-table-column
                            fixed
                            prop="productTempName"
                            label="产品模板名称"
                            show-overflow-tooltip
                            width="200">
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
                            width="150">
                        <template slot-scope="scope">
                            <el-button @click="handleClick(scope.row)" type="text" size="small">编辑</el-button>
                            <el-button type="text" size="small" @click="deleteProductTemp(scope.row)">删除</el-button>
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
        </el-col>
        <!-- 弹框 -->
        <el-dialog
                title="新增模板"
                :visible.sync="dialogVisible"
                width="60%"
                :before-close="handleClose">
            <el-form ref="formLabelAlign" :label-position="labelPosition" label-width="150px" :model="formLabelAlign">
                <el-form-item
                        label="模板名称"
                        prop="productTempName"
                        :rules="[
              {required: true, message: '请输入模板名称', trigger: 'blur'}
            ]"
                >
                    <el-input v-model="formLabelAlign.productTempName"></el-input>
                </el-form-item>

                <div v-for="(domain, index) in formLabelAlign.productTempMaterialList" :key="domain.ptOrder">
                    <el-form-item
                            label="所需原料"
                            :prop="'productTempMaterialList.' + index + '.materialId'"
                            :rules="
                [
                  {required: true, message: '请选择原料', trigger: 'change'}
                ]
              ">
                        <el-select v-model="domain.materialId" filterable placeholder="请选择原料">
                            <el-option v-for="(item, index) in templaList" :key="index" :label="item.materialName"
                                       :value="item.materialId"></el-option>
                        </el-select>
                        <el-button @click.prevent="removeDomain(domain)">-</el-button>
                    </el-form-item>

                    <el-form-item
                            label="所需原料数量"
                            :prop="'productTempMaterialList.' + index + '.materialNum'"
                            :rules="
                [
                  {required: true, message: '原料数量不能为空'},
                  { type: 'number', message: '数量必须为数字值'}
                ]
              ">
                        <el-input class="tempinput" v-model.number="domain.materialNum"></el-input>
                        <el-button @click.prevent="removeDomain(domain)">-</el-button>
                    </el-form-item>
                </div>
                <el-form-item
                        label="模板描述"
                        prop="productTempDescribe"
                        :rules="[
              {required: true, message: '请输入模板描述', trigger: 'blur'}
            ]"
                >
                    <el-input type="textarea" v-model="formLabelAlign.productTempDescribe"></el-input>
                </el-form-item>
                <el-button @click="dialogVisible = false">取 消</el-button>
                <el-button type="primary" @click="submitForm('formLabelAlign')" :disabled="isDisable">确 定</el-button>
                <el-button @click="addDomain">新增原料种类</el-button>
            </el-form>
        </el-dialog>
    </div>
</template>

<script>
    import {productTempList, meterialList, productTempCreate, deleteProductTemp} from '../../api/api'

    export default {
        data() {
            return {
                tableData: [],
                secchInput: '', // 搜索框内容
                page: 1, // 当前页,
                limit: 10,
                total: 0,
                dialogVisible: false, // 弹框显示隐藏,
                labelPosition: 'left',
                formLabelAlign: {
                    productTempName: '',
                    productTempDescribe: '',
                    productTempMaterialList: [{
                        materialId: '',
                        materialNum: 1,
                        ptOrder: '1'
                    }],
                },
                templaList: [],
                isDisable: false
            }
        },
        methods: {
            list() {
                let x = `productTempName=${this.secchInput}&page=${this.page}&limit=${this.limit}`
                productTempList(x).then((res) => {
                    this.total = Number(res.data.total);
                    this.page = res.data.page;
                    this.limit = res.data.limit;
                    this.tableData = res.data.data;
                })
            },
            meterialList() {
                let x = '';
                meterialList(x).then(res => {
                    this.templaList = res.data.data;
                })
            },
            handleClick(row) {
                this.$router.push({
                    path: '/productTemplate/TemplateDetails',
                    query: {
                        id: row.productTempId
                    }
                })
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
            serchName() {
                this.list();
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
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        this.isDisable = true;
                        let x = this.formLabelAlign;
                        productTempCreate(x).then((res) => {
                            this.$message({
                                message: '新增成功',
                                type: 'success'
                            });
                            this.isDisable = false;
                            this.list();
                            this.dialogVisible = false;
                        }).catch(error => {
                            this.$message.error(error);
                            console.log(error, "失败了");
                            this.isDisable = false;
                        })
                    }
                })
            },
            // 删除产品
            deleteProductTemp(row) {
                let x = `${row.productTempId}/${row.updateTime}`;
                this.$confirm('确定删除？', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    deleteProductTemp(x).then((res) => {
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

            }
            ,
            removeDomain(item) {
                var index = this.formLabelAlign.productTempMaterialList.indexOf(item)
                if (index !== -1) {
                    this.formLabelAlign.productTempMaterialList.splice(index, 1)
                }
            }
            ,
            addDomain() {
                this.formLabelAlign.productTempMaterialList.push({
                    materialId: '',
                    materialNum: 1,
                    ptOrder: this.formLabelAlign.productTempMaterialList.length + 1
                });
            }
        },
        mounted() {
            this.list();
            this.meterialList();
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
        .tempinput {
            width: 90% !important;
        }
    }
</style>
