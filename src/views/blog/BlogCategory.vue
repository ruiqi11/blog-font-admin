<template>
  <div>
    <el-button type="danger"
               @click="showEdit('add')"
               v-if="userInfo.roleType==1">新增分类</el-button>
    <Table :columns="columns"
           :showPagination="false"
           :dataSource="tableData"
           :fetch="loadDataList"
           :options="tableOptions">
      <template #cover="{index,row}">
        <Cover :cover="row.cover"></Cover>
      </template>
      <template #op="{index,row}"
                v-if="userInfo.roleType==1">
        <div class="op">
          <a href="javascript:void(0)"
             class="a-link"
             @click="showEdit('update',row)">修改</a>
          <el-divider direction="vertical" />
          <a href="javascript:void(0)"
             class="a-link"
             @click="del(row)">删除</a>
          <el-divider direction="vertical" />
          <a href="javascript:void(0)"
             :class="[index==0?'not-allow':'a-link']"
             @click="changeSort(index,'up')">上移</a>
          <el-divider direction="vertical" />
          <a href="javascript:void(0)"
             :class="[index==tableData.list.length-1?'not-allow':'a-link']"
             @click="changeSort(index,'down')">下移</a>
        </div>
      </template>
    </Table>
  </div>
</template>

<script setup>
import { getCurrentInstance, ref, reactive, nextTick } from "vue"

const { proxy } = getCurrentInstance();

const api = {
  "loadDataList": "/category/loadAllCategory4Blog",
  "saveCategory": "/category/saveCategory4Blog",
  "delCategory": "category/delCategory4Blog",
  "changeSort": "category/changeCategorySort4Blog"
}

const userInfo = ref(proxy.VueCookies.get("userInfo") || {});

const columns = [{
  label: "封面",
  prop: "cover",
  width: 100,
  scopedSlots: "cover",
}, {
  label: "名称",
  prop: "categoryName",
  width: 200,
}, {
  label: "简介",
  prop: "categoryDesc",
}, {
  label: "博客数量",
  prop: "blogCount",
  width: 100,
}, {
  label: "操作",
  prop: "op",
  width: 200,
  scopedSlots: "op",
}]

const tableData = reactive({})
const tableOptions = {
  extHeight: 10,
}

const loadDataList = async () => {
  let result = await proxy.Request({
    url: api.loadDataList
  })
  if (!result) {
    return
  }
  tableData.list = result.data;
}

//删除
const del = (data) => {
  proxy.Confirm(`你确定要删除${data.categoryName}`, async () => {
    let result = await proxy.Request({
      url: api.delCategory,
      params: {
        categoryId: data.categoryId,
      }
    })
    if (!result) {
      return;
    }
    loadDataList();
  })
}

//修改排序
const changeSort = async (index, type) => {
  let categoryList = tableData.list;
  if (type === "down" && index === categoryList.length - 1 || type === "up" && index === 0) {
    return;
  }
  let temp = categoryList[index];
  let number = type == "down" ? 1 : -1;
  categoryList.splice(index, 1);
  categoryList.splice(index + number, 0, temp);
  let result = await proxy.Request({
    url: api.changeSort,
    dataType: "json",
    params: categoryList,
  })

  if (!result) {
    return;
  }
  proxy.Message.success("重新排序成功");
  loadDataList();
}
</script>

<style lang="scss">
</style>
