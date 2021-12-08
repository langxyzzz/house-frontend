<template>
  <div class="page">
    <div class="top">
      <div class="cover">
        <el-image
          :src="coverUrl"
          fit="fill"
          style="width:100%; height: 500px"
        ></el-image>
      </div>
      <div class="info">
        <div>鑫丰中心里精装一室一厅 拎包即住 万达旁</div>
        <div>浑南区|彩霞街|清河湾</div>
        <div>沈阳市浑南区彩霞哦街清河弯</div>
        <div>两室一厅｜一单元</div>
        <div>24楼｜南北朝向</div>
        <div>87平｜精装修</div>
        <div>2015年｜产权30年</div>
        <div>100万｜满五年</div>
        <div>已成交｜15841028727</div>
        <div>郎项羽｜15841028727</div>
        <div>fgjdagsjajadsjkgjkladsjhkgahjfsghfadkjhgjhkfadhjkbajkhlafkjlhgjkhljkhlagjhklgajkhafjhgfjhlk</div>
      </div>
    </div>
    <div class="bottom">
      <div v-for="(item, key) in res" :key="key">
        <el-image
          :src="item"
          :preview-src-list="res"
          style="height: 200px"
          fit="fill">
        </el-image>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'HouseInfoDetail',
  data() {
    return {
      coverUrl: 'https://cube.elemecdn.com/6/94/4d3ea53c084bad6931a56d5158a48jpeg.jpeg',
      res: [
        'https://fuss10.elemecdn.com/8/27/f01c15bb73e1ef3793e64e6b7bbccjpeg.jpeg',
        'https://fuss10.elemecdn.com/1/8e/aeffeb4de74e2fde4bd74fc7b4486jpeg.jpeg',
        'https://fuss10.elemecdn.com/8/27/f01c15bb73e1ef3793e64e6b7bbccjpeg.jpeg',
        'https://fuss10.elemecdn.com/1/8e/aeffeb4de74e2fde4bd74fc7b4486jpeg.jpeg',
        'https://fuss10.elemecdn.com/8/27/f01c15bb73e1ef3793e64e6b7bbccjpeg.jpeg',
        'https://fuss10.elemecdn.com/1/8e/aeffeb4de74e2fde4bd74fc7b4486jpeg.jpeg'
      ]
    }
  }
}
</script>

<style lang="less" scoped>
  .page {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    padding: 0 10%;
    .top {
      display: flex;
      .cover {
        flex: 1;
        padding: 20px;
      }
      .info {
        padding: 30px 20px;
        flex: 1;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
      }
    }
    .bottom {
      padding: 5px 20px;
      height: 200px;
      display: flex;
      flex-direction: row;
      justify-content: center;
    }
  }
</style>
