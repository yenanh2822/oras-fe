<template>
  <div style="margin-top: 30px">
    <div v-for="post in list" :key="post.id" class="list" :post="post">
      <div class="box">
        <article class="media">
          <div class="media-left">
            <figure class="image is-64x64">
              <div class="candidate">
                <p style="text-align: center">
                  <strong class="numOfCand">{{ post.totalApplication }}</strong><br>
                  <span>Candidates</span>
                </p>
              </div>
              <!-- <el-button type="primary">Job</el-button> -->
              <button class="myBtn">Job</button>
            </figure>
          </div>
          <div class="media-content">
            <div class="content">
              <router-link :to="'/job/candidates/' + post.id">
                <strong class="title">{{ post.title }}</strong><br>
              </router-link>
              <br>
              <span>Salary: </span><span>{{ post.currency }} </span>
              <strong>{{ post.salaryFrom }} - {{ post.salaryTo }}</strong><br>
              <!-- <small>{{ post.vacancies }}</small> -->
              <span>Vacancies: </span>{{ post.vacancies }}
              <span style="margin-left: 20px">Deadline: </span>{{ post.applyTo }}
            </div>
            <div class="level-left">
              <a class="level-item">
                <span class="icon is-small"><i class="fas fa-heart" /></span>
                <span class="likes">{{ post.likes }}</span>
              </a>
            </div>
          </div>
        </article>
      </div>
    </div>
  </div>
</template>

<script>
import { fetchOpenJobList } from '@/api/job'

export default {
  name: 'OpenJobList',
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
      }
    }
  },
  created() {
    this.getList()
  },
  methods: {
    getList() {
    //   this.$vs.loading()
      this.listLoading = true
      fetchOpenJobList().then(response => {
        this.list = response.data
        // this.total = response.data.total
        this.listLoading = false
      })
    }
  }
}
</script>

<style lang="scss" scoped>

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
  color:#0073d1;
}

.content small {
  color: #00d1b2;
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
  background-color: #1890ff;
  color: white;
  border: #1890ff;
  border-radius: 3px;
  padding: 10px;
}

.level-item {
  padding-left: 10px;
  color: #00d1b2;
}

input:focus {
  border-color: #00d1b2;
}

.likes {
  padding: 0 7.5px;
}

input {
  font-weight: bold;
}

.tweets-move {
  transition: transform 1s;
}
</style>
