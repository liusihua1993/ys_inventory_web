<template>
  <div class="parductDetails">
    <header>
      <h5>产品详情</h5>
    </header>
    <section>
      <el-form ref="form" :model="form" label-width="80px">
        <el-form-item label="原料名称">
          <el-input v-model="form.materialName"></el-input>
        </el-form-item>
        <el-form-item label="原料数量">
          <el-input v-model="form.materialNum" disabled ></el-input>
        </el-form-item>
        <el-form-item label="原料描述">
          <el-input type="textarea" v-model="form.materialDescription"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmit('form')">提交</el-button>
          <el-button @click="$router.push('/meterial')">取消</el-button>
        </el-form-item>
      </el-form>
    </section>
  </div>
</template>

<script>
import { meterialbian, meterialSave } from '../../api/api'
export default {
  data () {
    return {
      form: {},
      id: ''
    }
  },
  methods: {
    onSubmit(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          let x = {
            'materialName': this.form.materialName,
            'materialDescription': this.form.materialDescription,
            'materialId': this.id
          }
          meterialSave(this.id, x).then((res) => {
            this.$message({
              message: '修改成功',
              type: 'success'
            });
            this.$router.push('/meterial');
          })
        } else {
          console.log('error submit!!');
          return false;
        }
      });
    },
    fromData() {
      let x = `${this.$route.query.id}`
      meterialbian(x).then((res) => {
        this.form = res.data;
      })
    }
  },
  created () {
    this.$store.state.defaultRouter = '/meterial';
  },
  mounted () {
    this.id = this.$route.query.id;
    this.fromData();
  }
}
</script>

<style lang="scss" scoped>
.parductDetails{
  width: 100%;
  min-width: 700px;
  padding: 0 20px;
  header{
    width: 100%;
    height: 60px;
    margin-bottom: 20px;
    border-bottom: 1px solid #ccc;
    display: flex;
    align-items: center;
    justify-content: space-between;
    h5{
      font-size: 16px;
    }
    .el-button{
      float: right;
      padding: 5px 10px;
    }
  }
}
</style>
