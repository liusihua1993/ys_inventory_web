<template>
  <div class="parductDetails">
    <header>
      <h5>产品详情</h5>
    </header>
    <section>
      <el-form ref="form" :model="form" label-width="80px">
        <el-form-item label="产品名称">
          <el-input v-model="form.productName"></el-input>
        </el-form-item>
        <el-form-item label="产品数量">
          <el-input v-model="form.productNum" disabled ></el-input>
        </el-form-item>
        <el-form-item label="产品模板">
          <el-select v-model="form.productId" placeholder="请选择活动区域" disabled>
            <el-option label="区域一" value="shanghai"></el-option>
            <el-option label="区域二" value="beijing"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="产品描述">
          <el-input type="textarea" v-model="form.productDescription"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmit('form')">提交</el-button>
          <el-button @click="$router.push('/product')">取消</el-button>
        </el-form-item>
      </el-form>
    </section>
  </div>
</template>

<script>
import { productbian, productSave } from '../../api/api'
export default {
  data () {
    return {
      form: {
        productName: '',
        productId: '',
        productNum: 1,
        createUser: '范鑫',
        productDescription: ''
      },
      id: ''
    }
  },
  methods: {
    onSubmit(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          let x = {
            'productName': this.form.productName,
            'productDescription': this.form.productDescription,
            'productId': this.id
          }
          let config = {
            'Content-Type': 'application/json;charset=UTF-8'
          }
          // x = JSON.stringify(x);
          productSave(this.id, x).then((res) => {
            this.$message({
              message: '修改成功',
              type: 'success'
            });
            this.$router.push('/product');
          })
        } else {
          console.log('error submit!!');
          return false;
        }
      });
    },
    fromData() {
      let x = `${this.$route.query.id}`
      productbian(x).then((res) => {
        this.form = res.data;
      })
    }
  },
  created () {
    this.$store.state.defaultRouter = '/product';
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
