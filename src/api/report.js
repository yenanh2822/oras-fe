import request from '@/utils/request'

export function fetchPanelData(accId) {
  return request({
    url: '/v1/report-management/job-statistic-by-creator-id/' + accId,
    method: 'get'
  })
}

export function fetchPanelDataForAdmin() {
  return request({
    url: '/v1/report-management/system-statistic',
    method: 'get'
  })
}

export function fetchHiredList(accId) {
  return request({
    url: '/v1/report-management/time-to-hire/' + accId,
    method: 'get'
  })
}

export function fetchCandidateStatus(accId) {
  return request({
    url: '/v1/report-management/candidate-of-job/' + accId,
    method: 'get'
  })
}

export function fetchAverageSalary(base) {
  return request({
    url: '/v1/report-management/average-salary-by-category/' + base,
    method: 'get'
  })
}

export function fetchAverageSalaryOfAccount(id, base) {
  return request({
    url: '/v1/report-management/system-user-salary-by-category/' + id + '/' + base,
    method: 'get'
  })
}

export function fetchJobByCategory() {
  return request({
    url: '/v1/report-management/total-post-by-category',
    method: 'get'
  })
}

export function fetchJobByCategoryOfAccount(id) {
  return request({
    url: '/v1/report-management/total-post-of-account-by-category/' + id,
    method: 'get'
  })
}

export function fetchCandidateByCategory() {
  return request({
    url: '/v1/report-management/total-application-by-category',
    method: 'get'
  })
}

export function fetchCandidateByCategoryOfAccount(id) {
  return request({
    url: '/v1/report-management/total-application-of-account-by-category/' + id,
    method: 'get'
  })
}

export function fetchTransactionOfAccount(id) {
  return request({
    url: '/v1/account-package-management/account-package-by-account-id/' + id,
    method: 'get'
  })
}

export function fetchPurchaseByMonth(year) {
  return request({
    url: '/v1/report-management/purchase-report/' + year,
    method: 'get'
  })
}

export function fetchPurchaseByMonthAccount(id, year) {
  return request({
    url: '/v1/report-management/account-purchase-report/' + id + '/' + year,
    method: 'get'
  })
}

export function fetchAccountByMonth(year) {
  return request({
    url: '/v1/report-management/account-report/' + year,
    method: 'get'
  })
}

export function fetchBuyByPackage() {
  return request({
    url: '/v1/report-management/package-report',
    method: 'get'
  })
}
