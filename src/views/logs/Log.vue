<template>
    <div class="log">
        <el-form :inline="true" :model="formInline" ref="formInline" class="demo-form-inline" size="mini">
            <el-form-item label="日期范围" prop="value4">
                <el-date-picker
                        v-model="value4"
                        type="datetimerange"
                        :picker-options="pickerOptions2"
                        range-separator="至"
                        start-placeholder="开始日期"
                        end-placeholder="结束日期"
                        value-format="yyyy-MM-dd HH:mm:ss">
                </el-date-picker>
            </el-form-item>


            <el-form-item label="模块名称" prop="templateName">
                <el-input v-model="formInline.templateName" placeholder="模块名称"></el-input>
            </el-form-item>
            <el-form-item label="操作人" prop="user">
                <el-input v-model="formInline.user" placeholder="操作人"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button @click="onSubmit">搜索</el-button>
                <el-button @click="resetForm('formInline')">重置</el-button>
            </el-form-item>
        </el-form>

        <el-table
                :data="tableData"
                border
                style="width: 100%">
            <el-table-column
                    fixed
                    prop="operator"
                    label="操作人"
                    show-overflow-tooltip
                    width="150">
            </el-table-column>
            <el-table-column
                    prop="content"
                    show-overflow-tooltip
                    label="具体操作">
            </el-table-column>
            <el-table-column
                    prop="operationTime"
                    show-overflow-tooltip
                    label="操作时间">
            </el-table-column>
            <el-table-column
                    prop="ip"
                    show-overflow-tooltip
                    label="IP地址">
            </el-table-column>
        </el-table>
        <el-pagination
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
                :page-sizes="[10, 15, 20, 50]"
                :page-size="limit"
                layout="total, sizes, prev, pager, next, jumper"
                :total="total">
        </el-pagination>
    </div>
</template>

<script>
    import {logList, logdownload} from '../../api/api'

    export default {
        name: 'Logs',
        data() {
            return {
                formInline: {
                    user: '',
                    region: '',
                    templateName: ''
                },
                tableData: [{
                    operator: '',
                    content: '',
                    operationTime: '',
                    ip: ''
                }],
                page: 1, // 当前页,
                limit: 10,
                total: 0,
                pickerOptions2: {
                    shortcuts: [{
                        text: '最近一周',
                        onClick(picker) {
                            const end = new Date();
                            const start = new Date();
                            start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
                            picker.$emit('pick', [start, end]);
                        }
                    },
                        {
                            text: '最近一个月',
                            onClick(picker) {
                                const end = new Date();
                                const start = new Date();
                                start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
                                picker.$emit('pick', [start, end]);
                            }
                        },
                        {
                            text: '最近三个月',
                            onClick(picker) {
                                const end = new Date();
                                const start = new Date();
                                start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
                                picker.$emit('pick', [start, end]);
                            }
                        }]
                },
                value4: ''
            }
        },
        methods: {
            onSubmit() {
                this.logList();
            },
            logList() {
                let x = `page=${this.page}&limit=${this.limit}&moduleame=${this.formInline.templateName}&operator=${this.formInline.user}&operationTimeStart=${this.value4[0] || ''}&operationTimeEnd=${this.value4[1] || ''}`
                logList(x).then((res) => {
                    let datas = res.data;
                    this.total = datas.total;
                    this.page = datas.page;
                    this.limit = datas.limit;
                    this.tableData = datas.data;
                })
            },
            handleSizeChange(val) {
                this.limit = val;
                this.logList();
            },
            handleCurrentChange(val) {
                this.page = val;
                this.logList();
            },
            xxx(val) {
                console.log(val)
            },
            resetForm(formName) {
                this.formInline.user = '';
                this.formInline.region = '';
                this.formInline.templateName = '';
                this.value4 = '';
            },
            download() {
                let x = `module_name=${this.formInline.templateName}&operator=${this.formInline.user}&operationTimeStart=${this.value4[0] || ''}&operationTimeEnd=${this.value4[1] || ''}`
                logdownload(x).then((res) => {
                    let datas = res.data;
                })
            }
        },
        mounted() {
            this.logList();
        }
    }
</script>

<style lang="scss" scoped>
    .log {
        padding: 20px;
        min-width: 1160px;
    }
</style>
