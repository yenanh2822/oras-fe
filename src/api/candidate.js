import request from '@/utils/request'
import axios from 'axios'

export function fetchTotalCandidate(jobId) {
  return request({
    url: '/v1/job-application-management/job-applications-by-job-id/' + jobId,
    method: 'get'
  })
}

export function fetchCandidateList(jobId, query) {
  return request({
    url: '/v1/job-application-management/job-applications-by-job-id?jobId=' + jobId + '&name=' + query.name + '&numOfElement=' + query.limit + '&page=' + query.page + '&sort=' + query.sort + '&status=' + query.status,
    method: 'get'
  })
}

export function fetchApplicationFromRP(id) {
  return request({
    url: '/v1/job-application-management/job-applications-openjob/' + id,
    method: 'get'
  })
}
const service = axios.create({
  // url = base url + request url
  baseURL: process.env.VUE_APP_BASE_API,
  withCredentials: true, // send cookies when cross-domain requests
  // credentials: 'same-origin',
  timeout: 180000000 // request timeout
})
export function rankCV(jobId, query) {
  return service.request({
    url: '/v1/job-application-management/job-application-rank-cv?jobId=' + jobId + '&name=' + query.name + '&numOfElement=' + query.limit + '&page=' + query.page + '&sort=' + query.sort + '&status=' + query.status,
    method: 'post'
  })
}
// export function rankCV(jobId, query) {
//   return service.request({
//     url: '/calc/similarity',
//     method: 'post',
//     data: { 'job_id': jobId }
//   })
// }

export function commentOnApplication(data) {
  return request({
    url: '/v1/job-application-management/job-application',
    method: 'put',
    data: data
  })
}

export function hireCandidate(id) {
  return request({
    url: '/v1/job-application-management/job-application/hire/' + id,
    method: 'put'
  })
}

export function dismissCandidate(id) {
  return request({
    url: '/v1/job-application-management/job-application/unhire/' + id,
    method: 'put'
  })
}
