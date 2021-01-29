<template>
  <el-card style="margin-bottom:20px;">
    <div slot="header" class="clearfix">
      <span style="font-size: 1.5em">{{ $t('profile.profile') }}</span>
    </div>

    <div class="user-profile">
      <div class="box-center">
        <pan-thumb :image="user && user.avatar" :height="'100px'" :width="'100px'" :hoverable="false" />
      </div>
      <div style="text-align: center">
        <i v-if="user.role === 'user'" class="my-icon text-muted el-icon-camera-solid" @click="imageCropperShow = true" />
      </div>
      <div class="box-center" style="margin-top: 20px">
        <div class="user-name text-center">{{ user && user.fullname }}</div>
        <div class="user-role text-center text-muted">{{ user && user.role === 'admin' ? user.role : '' }}</div>
      </div>
    </div>

    <div class="user-bio">
      <div class="user-education user-bio-section">
        <div class="user-bio-section-header">
          <span style="font-size: 1.2em">{{ $t('profile.contact') }}</span>
        </div>
        <div class="user-bio-section-body">
          <div class="text-muted">
            <p><svg-icon icon-class="email" /><span style="margin-left: 20px">{{ user && user.email }}</span></p>
          </div>
          <div class="text-muted">
            <p><svg-icon icon-class="telephone" /><span style="margin-left: 20px">{{ user && user.phone }}</span></p>
          </div>
        </div>
      </div>
    </div>

    <image-uploader
      v-model="imageCropperShow"
      url="https://oras-api.herokuapp.com/v1/s3-management/uploadFile"
      method="post"
      field="file"
      :width="300"
      :height="300"
      img-format="png"
      lang-type="en"
      @crop-success="cropSuccess"
      @crop-upload-success="cropUploadSuccess"
      @crop-upload-fail="cropUploadFail"
    />
  </el-card>
</template>

<script>
import ImageUploader from 'vue-image-crop-upload'
import PanThumb from '@/components/PanThumb'

import { updateCompanyAvatar } from '@/api/account'

export default {
  components: { PanThumb, ImageUploader },
  props: {
    user: {
      type: Object,
      default: () => {
        return {
          fullname: '',
          role: '',
          email: '',
          phoneNo: '',
          avatar: '',
          company: ''
        }
      }
    }
  },
  data() {
    return {
      imageCropperShow: false
    }
  },
  methods: {
    close() {
      this.imageCropperShow = false
    },
    cropSuccess(imgDataUrl) {
      console.log('-------- crop success --------')
      this.imgDataUrl = imgDataUrl
    },
    cropUploadSuccess(jsonData) {
      console.log('-------- upload success --------')
      console.log(jsonData.url)
      this.user.avatar = jsonData.url
      this.$store.dispatch('user/updateAvatar', jsonData.url)
        .then(() => {
          console.log('update avatar successfully!')
        })
      updateCompanyAvatar(this.user.company.id, jsonData.url).then(response => {
        console.log(response)
      })
    },
    cropUploadFail(status) {
      console.log('-------- upload fail --------')
      console.log(status)
    }
  }
}
</script>

<style lang="scss" scoped>
.box-center {
  margin: 0 auto;
  display: table;
}

.text-muted {
  color: #777;
}

.user-profile {
  .my-icon {
    cursor: pointer;
    font-size: 25px;
  }

  .user-name {
    font-weight: bold;
  }

  .box-center {
    padding-top: 10px;
  }

  .user-role {
    padding-top: 10px;
    font-weight: 400;
    font-size: 14px;
  }

  .box-social {
    padding-top: 30px;

    .el-table {
      border-top: 1px solid #dfe6ec;
    }
  }

  .user-follow {
    padding-top: 20px;
  }
}

.user-bio {
  margin-top: 20px;
  color: #606266;

  span {
    padding-left: 4px;
  }

  .user-bio-section {
    font-size: 14px;
    padding: 15px 0;

    .user-bio-section-header {
      border-bottom: 1px solid #dfe6ec;
      padding-bottom: 10px;
      margin-bottom: 10px;
      font-weight: bold;
    }
  }
}
</style>
