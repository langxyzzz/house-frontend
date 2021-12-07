<template>
  <div class="house-item">
    <div class="house-cover">
      <el-image style="width: 100%; height: 100%;" :src="houseInfoData.src" fit="fill">
      </el-image>
    </div>
    <div class="house-info">
      <div class="house-title">
        {{ houseInfoData.title }}
      </div>
      <div class="house-info-item">
        {{ houseInfoData.houseType }}｜{{ houseInfoData.flatNumber }}｜{{ houseInfoData.floor }}｜{{ houseInfoData.createUser }}
      </div>
      <div class="house-info-item">
        {{ houseInfoData.communityName }}｜{{ houseInfoData.address }}
      </div>
      <div>
        {{ houseInfoData.towards }}｜{{ houseInfoData.roomYear }}｜{{ houseInfoData.propertyYear }}
      </div>
    </div>
  </div>
</template>

<script>

export default {
  name: 'HouseInfo',
  props: {
    houseInfoData: {
      type: Object
    }
  },
  data() {
    return {}
  }
}
</script>

<style lang="less" scoped>
.house-item {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  width: 33.33%;
  height: 200px;
  padding: 10px;
  .house-cover{
    width: 44%;
    margin-right: 10px;
  }
  .house-info {
    width: 56%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    padding: 5px ;
    .house-title{
      font-size: 20px;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
    .house-info-item{
      color: #797979;
    }
  }
}
</style>
