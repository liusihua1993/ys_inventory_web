<template>
    <div class="parductDetails">
        <header>
            <h5>产品模板编辑</h5>
        </header>
        <section>
            <el-form ref="form" :model="form" label-width="80px">
                <el-form-item label="模板名称">
                    <el-input v-model="form.productTempName"></el-input>
                </el-form-item>
                <div v-for="(domain, index) in form.productTempMaterialList" :key="domain.ptOrder">
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
                            label="原料数量"
                            :prop="'productTempMaterialList.' + index + '.materialNum'"
                            :rules="
                [
                  {required: true, message: '原料数量不能为空'},
                  { type: 'number', message: '数量必须为数字值'}
                ]
              ">
                        <el-input class="tempinput" v-model.number="domain.materialNum"></el-input>
                    </el-form-item>
                </div>
                <el-form-item label="模板描述">
                    <el-input type="textarea" v-model="form.productTempDescribe"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="onSubmit('form')" :disabled="isDisable">保存</el-button>
                    <el-button @click="$router.go(-1)">取消</el-button>
                    <el-button @click="addDomain">新增原料种类</el-button>
                </el-form-item>
            </el-form>
        </section>
    </div>
</template>

<script>
    import {productTempbian, productTempSave, meterialList} from '../../api/api'

    export default {
        data() {
            return {
                form: {
                    productTempName: '',
                    productTempMaterialList: [{
                        materialId: '',
                        materialNum: 1,
                        ptOrder: '1'
                    }],
                    productTempDescribe: ''
                },
                id: '',
                templaList: [],
                isDisable: false
            }
        },
        methods: {
            onSubmit(formName) {
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        this.isDisable = true;
                        let x = this.form;
                        let config = {
                            'Content-Type': 'application/json;charset=UTF-8'
                        }
                        productTempSave(this.id, x).then((res) => {
                            this.$message({
                                message: '修改成功',
                                type: 'success'
                            });
                            //this.isDisable = false;
                            this.$router.push('/parductTemplate');
                        }).catch(error => {
                            this.$message.error(error);
                            console.log(error, "失败了");
                            this.isDisable = false;
                        })
                    }
                })
            },
            fromData() {
                let x = `${this.$route.query.id}`
                productTempbian(x).then((res) => {
                    this.form = res.data;
                })
            },
            meterialList() {
                let x = '';
                meterialList(x).then(res => {
                    this.templaList = res.data.data;
                })
            },
            addDomain() {
                this.form.productTempMaterialList.push({
                    materialId: '',
                    materialNum: 1,
                    ptOrder: this.form.productTempMaterialList.length + 1
                });
            },
            removeDomain(item) {
                var index = this.form.productTempMaterialList.indexOf(item)
                if (index !== -1) {
                    this.form.productTempMaterialList.splice(index, 1)
                }
            },
        },
        created() {
            this.$store.state.defaultRouter = '/parductTemplate';
        },
        mounted() {
            this.id = this.$route.query.id;
            this.fromData();
            this.meterialList();
        }
    }
</script>

<style lang="scss" scoped>
    .parductDetails {
        width: 100%;
        min-width: 700px;
        padding: 0 20px;
        header {
            width: 100%;
            height: 60px;
            margin-bottom: 20px;
            border-bottom: 1px solid #ccc;
            display: flex;
            align-items: center;
            justify-content: space-between;
            h5 {
                font-size: 16px;
            }
            .el-button {
                float: right;
                padding: 5px 10px;
            }
        }
    }
</style>
