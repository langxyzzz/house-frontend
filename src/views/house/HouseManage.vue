<template>
  <div class="app-container">
    <div class="filter-container">
      <el-button v-waves class="filter-item" type="primary" icon="el-icon-search" @click="handleSearch">
        查询
      </el-button>
      <el-button v-waves class="filter-item" type="primary" icon="el-icon-search" @click="handleCreate">
        新建
      </el-button>
    </div>
    <div class="house-list">
      <template v-for="(item, key) in houseInfo">
        <house-info :key="key" :house-info-data="item" style=" cursor: pointer" class="house-info"/>
      </template>
    </div>

    <pagination v-show="total>0" :total="total" :page.sync="listQuery.page" :limit.sync="listQuery.limit" @pagination="getList" />

    <el-dialog :title="textMap[dialogStatus]" :visible.sync="dialogFormVisible">
      <el-form ref="dataForm" :model="temp" label-position="left" label-width="70px" style="width: 1000px; margin-left:50px;">
        <el-row>
          <el-col :span="24">
            <el-form-item label="标题" prop="title">
              <el-input v-model="temp.title" style="width: 867px" />
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="区域名称" prop="areaName">
              <el-input v-model="temp.areaName" style="width: 200px" />
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="街道名称" prop="streetName">
              <el-input v-model="temp.streetName" style="width: 200px" />
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="小区名称" prop="communityName">
              <el-input v-model="temp.communityName" style="width: 200px" />
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item label="地址" prop="address">
              <el-input v-model="temp.address" style="width: 867px" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="户型" prop="houseType">
              <el-input v-model="temp.houseType" style="width: 367px" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="单元号" prop="unitNumber">
              <el-input v-model="temp.unitNumber" style="width: 367px" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="楼层" prop="floor">
              <el-input v-model="temp.floor" style="width: 367px" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="朝向" prop="towards">
              <el-input v-model="temp.towards" style="width: 367px" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="面积" prop="flatNumber">
              <el-input v-model="temp.flatNumber" style="width: 367px" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="装修程度" prop="furnishLevel">
              <el-input v-model="temp.furnishLevel" style="width: 367px" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="房屋年限" prop="roomYear">
              <el-input v-model="temp.roomYear" style="width: 367px" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="产权年限" prop="propertyYear">
              <el-input v-model="temp.propertyYear" style="width: 367px" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="价格" prop="price">
              <el-input v-model="temp.price" style="width: 367px" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="税务情况" prop="taxSituation">
              <el-input v-model="temp.taxSituation" style="width: 367px" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="状态" prop="state">
              <el-input v-model="temp.state" style="width: 367px" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="联系电话" prop="tel">
              <el-input v-model="temp.tel" style="width: 367px" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="房主" prop="homeownerName">
              <el-input v-model="temp.homeownerName" style="width: 367px" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="房主电话" prop="homeownerTel">
              <el-input v-model="temp.homeownerTel" style="width: 367px" />
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item label="备注" prop="remark">
              <el-input v-model="temp.remark" type="textarea" style="width: 867px" />
            </el-form-item>
          </el-col>
          <el-col>
            <el-form-item label="封面" prop="remark">
              <el-upload
                class="avatar-uploader"
                action="https://jsonplaceholder.typicode.com/posts/"
                :show-file-list="false"
                :on-success="handleCoverSuccess"
                :before-upload="beforeCoverUpload"
              >
                <el-image v-if="coverUrl" :src="coverUrl" class="avatar" fit="fill" />
                <i v-else class="el-icon-plus avatar-uploader-icon" />
              </el-upload>
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item label="备注" prop="remark">
              <div style="display: flex; flex-wrap: wrap">
                <template v-if="resUrls.length > 0">
                  <div v-for="(item, index, key) in resUrls" :key="key" style=" cursor: pointer" @mouseover="resMouseOver(index)" @mouseleave="resMouseLeave(index)">
                    <el-image
                      v-if="item.show === false"
                      :src="item.itemUrl"
                      class="avatar"
                      fit="fill"
                    >
                    </el-image>
                    <i v-if="item.show" :key="key" class="el-icon-delete avatar-uploader-icon" style="background: #e7e7e7;"/>
                  </div>
                </template>
                <el-upload
                  class="avatar-uploader"
                  action="https://jsonplaceholder.typicode.com/posts/"
                  :show-file-list="false"
                  :on-success="handleResSuccess"
                  :before-upload="beforeResUpload"
                >
                  <i class="el-icon-plus avatar-uploader-icon" />
                </el-upload>
              </div>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">
          取消
        </el-button>
        <el-button type="primary" @click="dialogStatus==='create'?createData():updateData()">
          提交
        </el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>

import HouseInfo from '@/views/house/components/HouseInfo'
import waves from '@/directive/waves'
import { fetchList } from '@/api/area'
import Pagination from '@/components/Pagination'
export default {
  name: 'HouseManage',
  components: { Pagination, HouseInfo },
  directives: { waves },
  data() {
    return {
      list: null,
      total: 10,
      listLoading: true,
      listQuery: {
        page: 1,
        limit: 20,
        sort: '+id'
      },
      dialogFormVisible: false,
      dialogStatus: '',
      textMap: {
        update: '修改',
        create: '创建'
      },
      temp: {
        id: undefined,
        areaName: ''
      },
      imageCropperShow: false,
      imageCropperKey: 0,
      coverUrl: 'https://cube.elemecdn.com/6/94/4d3ea53c084bad6931a56d5158a48jpeg.jpeg',
      resUrls: [
        {
          itemUrl: 'https://cube.elemecdn.com/6/94/4d3ea53c084bad6931a56d5158a48jpeg.jpeg',
          show: false
        },
        {
          itemUrl: 'https://cube.elemecdn.com/6/94/4d3ea53c084bad6931a56d5158a48jpeg.jpeg',
          show: false
        },
        {
          itemUrl: 'https://cube.elemecdn.com/6/94/4d3ea53c084bad6931a56d5158a48jpeg.jpeg',
          show: false
        },
        {
          itemUrl: 'https://cube.elemecdn.com/6/94/4d3ea53c084bad6931a56d5158a48jpeg.jpeg',
          show: false
        },
        {
          itemUrl: 'https://cube.elemecdn.com/6/94/4d3ea53c084bad6931a56d5158a48jpeg.jpeg',
          show: false
        },
        {
          itemUrl: 'https://cube.elemecdn.com/6/94/4d3ea53c084bad6931a56d5158a48jpeg.jpeg',
          show: false
        },
        {
          itemUrl: 'https://cube.elemecdn.com/6/94/4d3ea53c084bad6931a56d5158a48jpeg.jpeg',
          show: false
        },
        {
          itemUrl: 'https://cube.elemecdn.com/6/94/4d3ea53c084bad6931a56d5158a48jpeg.jpeg',
          show: false
        },
        {
          itemUrl: 'https://cube.elemecdn.com/6/94/4d3ea53c084bad6931a56d5158a48jpeg.jpeg',
          show: false
        }
      ],
      houseInfo: [
        {
          src: 'https://cube.elemecdn.com/6/94/4d3ea53c084bad6931a56d5158a48jpeg.jpeg',
          title: '鑫丰中心里精装一室一厅 拎包即住 万达旁',
          houseType: '1室1厅',
          flatNumber: '85平米',
          floor: '高层(共27层)',
          createUser: '郎项羽',
          communityName: '  清河湾',
          address: '浑南区彩霞街5-28号',
          towards: ' 南北',
          roomYear: '房屋年限',
          propertyYear: '产权年限',
          coverSrc: 'https://cube.elemecdn.com/6/94/4d3ea53c084bad6931a56d5158a48jpeg.jpeg'
        },
        {
          src: 'https://cube.elemecdn.com/6/94/4d3ea53c084bad6931a56d5158a48jpeg.jpeg',
          title: '鑫丰中心里精装一室一厅 拎包即住 万达旁',
          houseType: '1室1厅',
          flatNumber: '85平米',
          floor: '高层(共27层)',
          createUser: '郎项羽',
          communityName: '  清河湾',
          address: '浑南区彩霞街5-28号',
          towards: ' 南北',
          roomYear: '房屋年限',
          propertyYear: '产权年限',
          coverSrc: 'https://cube.elemecdn.com/6/94/4d3ea53c084bad6931a56d5158a48jpeg.jpeg'
        },
        {
          src: 'https://cube.elemecdn.com/6/94/4d3ea53c084bad6931a56d5158a48jpeg.jpeg',
          title: '鑫丰中心里精装一室一厅 拎包即住 万达旁',
          houseType: '1室1厅',
          flatNumber: '85平米',
          floor: '高层(共27层)',
          createUser: '郎项羽',
          communityName: '  清河湾',
          address: '浑南区彩霞街5-28号',
          towards: ' 南北',
          roomYear: '房屋年限',
          propertyYear: '产权年限',
          coverSrc: 'https://cube.elemecdn.com/6/94/4d3ea53c084bad6931a56d5158a48jpeg.jpeg'
        },
        {
          src: 'https://cube.elemecdn.com/6/94/4d3ea53c084bad6931a56d5158a48jpeg.jpeg',
          title: '鑫丰中心里精装一室一厅 拎包即住 万达旁',
          houseType: '1室1厅',
          flatNumber: '85平米',
          floor: '高层(共27层)',
          createUser: '郎项羽',
          communityName: '  清河湾',
          address: '浑南区彩霞街5-28号',
          towards: ' 南北',
          roomYear: '房屋年限',
          propertyYear: '产权年限',
          coverSrc: 'https://cube.elemecdn.com/6/94/4d3ea53c084bad6931a56d5158a48jpeg.jpeg'
        },
        {
          src: 'https://cube.elemecdn.com/6/94/4d3ea53c084bad6931a56d5158a48jpeg.jpeg',
          title: '鑫丰中心里精装一室一厅 拎包即住 万达旁',
          houseType: '1室1厅',
          flatNumber: '85平米',
          floor: '高层(共27层)',
          createUser: '郎项羽',
          communityName: '  清河湾',
          address: '浑南区彩霞街5-28号',
          towards: ' 南北',
          roomYear: '房屋年限',
          propertyYear: '产权年限',
          coverSrc: 'https://cube.elemecdn.com/6/94/4d3ea53c084bad6931a56d5158a48jpeg.jpeg'
        },
        {
          src: 'https://cube.elemecdn.com/6/94/4d3ea53c084bad6931a56d5158a48jpeg.jpeg',
          title: '鑫丰中心里精装一室一厅 拎包即住 万达旁',
          houseType: '1室1厅',
          flatNumber: '85平米',
          floor: '高层(共27层)',
          createUser: '郎项羽',
          communityName: '  清河湾',
          address: '浑南区彩霞街5-28号',
          towards: ' 南北',
          roomYear: '房屋年限',
          propertyYear: '产权年限',
          coverSrc: 'https://cube.elemecdn.com/6/94/4d3ea53c084bad6931a56d5158a48jpeg.jpeg'
        },
        {
          src: 'https://cube.elemecdn.com/6/94/4d3ea53c084bad6931a56d5158a48jpeg.jpeg',
          title: '鑫丰中心里精装一室一厅 拎包即住 万达旁',
          houseType: '1室1厅',
          flatNumber: '85平米',
          floor: '高层(共27层)',
          createUser: '郎项羽',
          communityName: '  清河湾',
          address: '浑南区彩霞街5-28号',
          towards: ' 南北',
          roomYear: '房屋年限',
          propertyYear: '产权年限',
          coverSrc: 'https://cube.elemecdn.com/6/94/4d3ea53c084bad6931a56d5158a48jpeg.jpeg'
        },
        {
          src: 'https://cube.elemecdn.com/6/94/4d3ea53c084bad6931a56d5158a48jpeg.jpeg',
          title: '鑫丰中心里精装一室一厅 拎包即住 万达旁',
          houseType: '1室1厅',
          flatNumber: '85平米',
          floor: '高层(共27层)',
          createUser: '郎项羽',
          communityName: '  清河湾',
          address: '浑南区彩霞街5-28号',
          towards: ' 南北',
          roomYear: '房屋年限',
          propertyYear: '产权年限',
          coverSrc: 'https://cube.elemecdn.com/6/94/4d3ea53c084bad6931a56d5158a48jpeg.jpeg'
        },
        {
          src: 'https://cube.elemecdn.com/6/94/4d3ea53c084bad6931a56d5158a48jpeg.jpeg',
          title: '鑫丰中心里精装一室一厅 拎包即住 万达旁',
          houseType: '1室1厅',
          flatNumber: '85平米',
          floor: '高层(共27层)',
          createUser: '郎项羽',
          communityName: '  清河湾',
          address: '浑南区彩霞街5-28号',
          towards: ' 南北',
          roomYear: '房屋年限',
          propertyYear: '产权年限',
          coverSrc: 'https://cube.elemecdn.com/6/94/4d3ea53c084bad6931a56d5158a48jpeg.jpeg'
        },
        {
          src: 'https://cube.elemecdn.com/6/94/4d3ea53c084bad6931a56d5158a48jpeg.jpeg',
          title: '鑫丰中心里精装一室一厅 拎包即住 万达旁',
          houseType: '1室1厅',
          flatNumber: '85平米',
          floor: '高层(共27层)',
          createUser: '郎项羽',
          communityName: '  清河湾',
          address: '浑南区彩霞街5-28号',
          towards: ' 南北',
          roomYear: '房屋年限',
          propertyYear: '产权年限',
          coverSrc: 'https://cube.elemecdn.com/6/94/4d3ea53c084bad6931a56d5158a48jpeg.jpeg'
        },
        {
          src: 'https://cube.elemecdn.com/6/94/4d3ea53c084bad6931a56d5158a48jpeg.jpeg',
          title: '鑫丰中心里精装一室一厅 拎包即住 万达旁',
          houseType: '1室1厅',
          flatNumber: '85平米',
          floor: '高层(共27层)',
          createUser: '郎项羽',
          communityName: '  清河湾',
          address: '浑南区彩霞街5-28号',
          towards: ' 南北',
          roomYear: '房屋年限',
          propertyYear: '产权年限',
          coverSrc: 'https://cube.elemecdn.com/6/94/4d3ea53c084bad6931a56d5158a48jpeg.jpeg'
        },
        {
          src: 'https://cube.elemecdn.com/6/94/4d3ea53c084bad6931a56d5158a48jpeg.jpeg',
          title: '鑫丰中心里精装一室一厅 拎包即住 万达旁',
          houseType: '1室1厅',
          flatNumber: '85平米',
          floor: '高层(共27层)',
          createUser: '郎项羽',
          communityName: '  清河湾',
          address: '浑南区彩霞街5-28号',
          towards: ' 南北',
          roomYear: '房屋年限',
          propertyYear: '产权年限',
          coverSrc: 'https://cube.elemecdn.com/6/94/4d3ea53c084bad6931a56d5158a48jpeg.jpeg'
        },
        {
          src: 'https://cube.elemecdn.com/6/94/4d3ea53c084bad6931a56d5158a48jpeg.jpeg',
          title: '鑫丰中心里精装一室一厅 拎包即住 万达旁',
          houseType: '1室1厅',
          flatNumber: '85平米',
          floor: '高层(共27层)',
          createUser: '郎项羽',
          communityName: '  清河湾',
          address: '浑南区彩霞街5-28号',
          towards: ' 南北',
          roomYear: '房屋年限',
          propertyYear: '产权年限',
          coverSrc: 'https://cube.elemecdn.com/6/94/4d3ea53c084bad6931a56d5158a48jpeg.jpeg'
        },
        {
          src: 'https://cube.elemecdn.com/6/94/4d3ea53c084bad6931a56d5158a48jpeg.jpeg',
          title: '鑫丰中心里精装一室一厅 拎包即住 万达旁',
          houseType: '1室1厅',
          flatNumber: '85平米',
          floor: '高层(共27层)',
          createUser: '郎项羽',
          communityName: '  清河湾',
          address: '浑南区彩霞街5-28号',
          towards: ' 南北',
          roomYear: '房屋年限',
          propertyYear: '产权年限',
          coverSrc: 'https://cube.elemecdn.com/6/94/4d3ea53c084bad6931a56d5158a48jpeg.jpeg'
        },
        {
          src: 'https://cube.elemecdn.com/6/94/4d3ea53c084bad6931a56d5158a48jpeg.jpeg',
          title: '鑫丰中心里精装一室一厅 拎包即住 万达旁',
          houseType: '1室1厅',
          flatNumber: '85平米',
          floor: '高层(共27层)',
          createUser: '郎项羽',
          communityName: '  清河湾',
          address: '浑南区彩霞街5-28号',
          towards: ' 南北',
          roomYear: '房屋年限',
          propertyYear: '产权年限',
          coverSrc: 'https://cube.elemecdn.com/6/94/4d3ea53c084bad6931a56d5158a48jpeg.jpeg'
        }
      ]
    }
  },
  methods: {
    getList() {
      this.listLoading = true
      fetchList(this.listQuery).then(response => {
        this.list = response.data.items
        this.total = 10

        setTimeout(() => {
          this.listLoading = false
        }, 1.5 * 1000)
      })
    },
    resetTemp() {
      this.temp = {
        id: undefined,
        areaName: ''
      }
    },
    handleSearch() {
      console.log('124')
    },
    handleCreate() {
      this.resetTemp()
      this.dialogStatus = 'create'
      this.dialogFormVisible = true
      this.$nextTick(() => {
        this.$refs['dataForm'].clearValidate()
      })
    },
    createData() {
      console.log('124')
    },
    updateData() {
      console.log('244')
    },
    cropSuccess(resData) {
      this.imageCropperShow = false
      this.imageCropperKey = this.imageCropperKey + 1
      this.image = resData.files.avatar
    },
    close() {
      this.imageCropperShow = false
    },
    handleCoverSuccess() {
      console.log(124214)
    },
    handleResSuccess() {
      console.log(214124)
    },
    beforeCoverUpload() {
      console.log(5325)
    },
    beforeResUpload() {
      console.log(5345)
    },
    resMouseOver(index) {
      this.resUrls[index].show = true
      console.log(this.resUrls)
    },
    resMouseLeave(index) {
      this.resUrls[index].show = false
      console.log(this.resUrls)
    }
  }
}
</script>

<style lang="less" scoped>
  .house-list{
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    width: 100%;
    .house-info:hover {
      border: 1px #797979 solid;
      background: #d0d0d0;
    }
  }
  .avatar-uploader {
    .el-upload:hover {
      border-color: #409EFF;
    }
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }
  .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }
</style>
