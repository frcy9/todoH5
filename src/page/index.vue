<template>
  <div class="index-page">
    <el-table :data="todoList" style="width: 60%" class="fl">
      <el-table-column prop="id" label="id"></el-table-column>
      <el-table-column prop="name" label="名称"></el-table-column>
      <el-table-column prop="content" label="内容"></el-table-column>
      <el-table-column prop="create_time" label="创建时间"></el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button type="text" @click="del(scope.row)">删除</el-button>
          <el-button type="text" @click="update(scope.row)">编辑</el-button>
        </template>
      </el-table-column>
    </el-table>

    <el-form ref="ruleForm" label-width="100px" class="fl">
      <el-form-item label="名称" prop="pass">
        <el-input type="text" v-model="todoForm.name"></el-input>
      </el-form-item>
      <el-form-item label="内容" prop="pass">
        <el-input type="text" v-model="todoForm.todoContent"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="add()">新增</el-button>
      </el-form-item>
    </el-form>


    <el-dialog title="编辑" :visible.sync="dialogVisible" width="50%" :before-close="handleClose">
      <el-form ref="ruleForm" label-width="100px">
        <el-form-item label="名称" prop="pass">
          <el-input type="text" v-model="dialogForm.name"></el-input>
        </el-form-item>
        <el-form-item label="内容" prop="pass">
          <el-input type="text" v-model="dialogForm.todoContent"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="editSubmit">确 定</el-button>
      </div>
    </el-dialog>

  </div>
</template>

<script type="text/ecmascript-6">
  export default {
    components: {},
    name: 'index',
    data() {
      return{
        todoList: [],
        todoForm: {
          name: '',
          todoContent: '',
        },
        dialogForm: {
          id: '',
          name: '',
          todoContent: '',
        },
        dialogVisible: false
      }
    },
    created() {
      this.getTodoList()
    },
    methods: {
      async getTodoList() {
        let res = await this.$api.get('/todo/list?limit=10&page=1')
        if(res.code == 1) {
          this.todoList = res.data.data
        }
      },
      async add() {
        let res = await this.$api.post('/todo/add', this.todoForm)
        if (res.code == 1) {
          this.todoForm = this.$options.data().todoForm
          this.getTodoList()
        }
      },
      async del(data) {
        let res = await this.$api.post('/todo/delete', {
          id: data.id
        })
        if (res.code == 1) {
          this.getTodoList()
        }
      },
      async update(data) {
        this.dialogForm.id = data.id
        this.dialogForm.name = data.name
        this.dialogForm.todoContent = data.content
        this.dialogVisible = true
      },
      async editSubmit() {
        let res = await this.$api.post('/todo/update', this.dialogForm)
        if (res.code == 1) {
          this.dialogVisible = false
          this.dialogForm = this.$options.data().dialogForm
          this.getTodoList()
        }
      },
      handleClose() {
        this.dialogVisible = false
      }
    },
  }
</script>

<style lang="scss">
  .index-page{padding: 100px;
    .fl{float: left;}
    .fr{float: right;}
  }
</style>
