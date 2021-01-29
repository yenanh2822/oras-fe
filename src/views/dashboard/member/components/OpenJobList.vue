<template>
  <div class="container">
    <div v-for="post in list" :key="post.id" class="list" :post="post">
      <div class="box">
        <article class="media">
          <div class="media-left">
            <figure class="image is-64x64">
              <div class="candidate">
                <p style="text-align: center">
                  <strong class="numOfCand">{{ post.totalApplication }}</strong><br>
                  <span>{{ $t('dashboard.candidate') }}</span>
                </p>
              </div>
              <button class="myBtn" @click="viewDetail(post)">{{ $t('dashboard.viewJob') }}</button>
            </figure>
          </div>
          <div class="media-content">
            <div class="content">
              <router-link :to="'/job/candidates/' + post.id">
                <strong class="title">{{ post.title }}</strong><br>
              </router-link>
              <br>
              <span>{{ $t('dashboard.salary') }}: </span><span>{{ post.currency | currencyFilter }} </span>
              <strong>{{ post.salaryFrom | toThousandFilter }} - {{ post.salaryTo | toThousandFilter }}</strong><br>
              <span>{{ $t('dashboard.vacancies') }}: </span>{{ post.vacancies }}
              <span style="margin-left: 20px">{{ $t('dashboard.published') }}: </span>{{ (new Date(post.applyFrom)).toLocaleString('en-GB') }}
              <!-- <span style="margin-left: 20px">Posted: </span>{{ post.createDate | timeAgo }} -->
              <span style="margin-left: 20px">{{ $t('dashboard.deadline') }}: </span>{{ (new Date(post.applyTo)).toLocaleString('en-GB') }}
            </div>
            <div class="level-left">
              <div class="level-item">
                <!-- <div class="description">{{ post.description }}</div> -->
              </div>
            </div>
          </div>
        </article>
      </div>
    </div>

    <el-dialog title="Job Detail" :visible.sync="dialogFormVisible">
      <el-form ref="dataForm" label-position="left" label-width="70px" style="width: 90%; margin-left:50px;">
        <el-form-item :label="$t('dashboard.title') + ':'" prop="title" label-width="100px" style="margin-bottom: 0px">
          <span>{{ temp.title }}</span>
        </el-form-item>
        <el-form-item :label="$t('dashboard.salary') + ':'" prop="salary" label-width="100px" style="margin-bottom: 0px">
          <span>{{ temp.currency | currencyFilter }} {{ temp.salaryFrom | toThousandFilter }} - {{ temp.salaryTo | toThousandFilter }}</span>
        </el-form-item>
        <el-form-item :label="$t('dashboard.vacancies') + ':'" prop="vacancies" label-width="100px" style="margin-bottom: 0px">
          <span>{{ temp.vacancies }}</span>
        </el-form-item>
        <el-form-item :label="$t('dashboard.created') + ':'" prop="created" label-width="100px" style="margin-bottom: 0px">
          <span>{{ (new Date(temp.createDate)).toLocaleString('en-GB') }}</span>
        </el-form-item>
        <el-form-item :label="$t('dashboard.published') + ':'" prop="published" label-width="100px" style="margin-bottom: 0px">
          <span>{{ (new Date(temp.applyFrom)).toLocaleString('en-GB') }}</span>
        </el-form-item>
        <el-form-item :label="$t('dashboard.deadline') + ':'" prop="deadline" label-width="100px" style="margin-bottom: 0px">
          <span>{{ (new Date(temp.applyTo)).toLocaleString('en-GB') }}</span>
        </el-form-item>
        <el-form-item :label="$t('dashboard.desc') + ':'" prop="description" label-width="100px" style="margin-bottom: 0px;">
          <!-- <span v-html="temp.description" /> -->
        </el-form-item>
        <el-form-item label="" prop="description" label-width="100px" style="margin-bottom: 0px; max-height: 320px; overflow-y: scroll">
          <span v-html="temp.description" />
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
import { fetchOpenJobByCreator } from '../../../../api/job'
// import { fetchApplicationFromRP } from '../../../../api/candidate'

export default {
  name: 'OpenJobList',
  components: { },
  data() {
    return {
      list: null,
      listLoading: true,
      listQuery: {
        page: 1,
        limit: 20,
        importance: undefined,
        title: undefined,
        type: undefined,
        sort: '+id'
      },
      temp: {
        id: undefined,
        title: '',
        salary: 0,
        vacancies: 0,
        created: '',
        published: '',
        deadline: '',
        description: '',
        status: 'published'
      },
      dialogFormVisible: false,
      dialogPvVisible: false,
      pvData: []
    }
  },
  computed: {
    accountId() {
      return this.$store.state.user.accId
    }
  },
  created() {
    // this.updateApplications()
    this.getList()
  },
  methods: {
    // updateApplications() {
    //   this.listLoading = true
    //   debugger
    //   fetchApplicationFromRP(this.jobId).then(response => {
    //     // this.list = response
    //     this.listLoading = false
    //   })
    // },
    getList() {
    //   this.$vs.loading()
      this.listLoading = true
      fetchOpenJobByCreator(this.accountId).then(response => {
        this.list = response.data
        // this.total = response.data.total

        // Just to simulate the time of the request
        setTimeout(() => {
          this.listLoading = false
        }, 1.5 * 1000)
      })
      // console.log(this.list.size())
    },
    viewDetail(job) {
      this.temp = Object.assign({}, job) // copy obj
      // this.temp.timestamp = new Date(this.temp.timestamp)
      this.dialogFormVisible = true
    }
  }
}
</script>

<style lang="scss" scoped>
.container {
  width: 1180px;
  margin: auto;
  margin-top: 30px;
}

.list {
  max-width: 100%;
  margin: 0 auto;
  padding-bottom: 15px;
}

.box {
  margin-bottom: 0;
  border-radius: 0;
  background-color: #fff;
  -webkit-box-shadow: 0 2px 3px rgba(10,10,10,.1), 0 0 0 1px rgba(10,10,10,.1);
  box-shadow: 0 2px 3px rgba(10,10,10,.1), 0 0 0 1px rgba(10,10,10,.1);
  color: #4a4a4a;
  display: block;
  padding: 1.25rem;
}

.media {
  -webkit-box-align: start;
  align-items: flex-start;
  display: flex;
  text-align: left;
}

.media-left {
  margin-right: 1em;
  flex-basis: auto;
  flex-grow: 0;
  flex-shrink: 0;
  padding: 0;
}

.is-64x64 {
  height: auto;
  width: 150px;
}
.image {
  display: block;
  position: relative;
  margin: 0;
}

.media-content {
  flex-basis: auto;
  -webkit-box-flex: 1;
  flex-grow: 1;
  flex-shrink: 1;
  overflow: auto;
  text-align: left;
}

.title {
  font-size: 24px;
  // color:#0073d1;
  color:#03ac71;
}

.content small {
  color: #4f5857;
}

.image img {
  border-radius: 5px;
  display: block;
  height: auto;
  width: 100%;
}

.image .numOfCand {
  font-size: 24px;
  color:#00d1b2;
}

.image .candidate {
  // border-radius: 5px;
  display: block;
  height: auto;
  width: 100%;
  border: 1px solid #c3c3c3;
}

.image .myBtn {
  width: 100%;
  margin-top: 10px;
  background-color: #03ac71;
  color: white;
  border: #03ac71;
  border-radius: 3px;
  padding: 10px;
  cursor: pointer;
}

.level-item {
  margin-top: 20px;
  // color: #00d1b2;
}

input:focus {
  border-color: #00d1b2;
}

.description {
  text-align: justify;
  // white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  line-height: 1.25em;
  height: 2.5em;
}

input {
  font-weight: bold;
}

.tweets-move {
  transition: transform 1s;
}
</style>
