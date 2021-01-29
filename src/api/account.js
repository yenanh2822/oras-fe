import request from '@/utils/request'

export function fetchAccountList() {
  return request({
    url: '/v1/account-management/accounts',
    method: 'get'
  })
}

export function fetchAccountListWithPagination(query) {
  return request({
    url: '/v1/account-management/accounts-paging?&name=' + query.name + '&status=' + query.status + '&role=' + query.role + '&numOfElement=' + query.limit + '&page=' + query.page + '&sort=' + query.sort,
    method: 'get'
  })
}

export function fetchAccount(id) {
  return request({
    url: '/v1/account-management/account/' + id,
    method: 'get'
  })
}

export function createAccount(data, method) {
  return request({
    url: '/v1/account-management/account',
    method: method,
    data: data
  })
}

export function updateAccount(data) {
  return request({
    url: '/v1/account-management/update-account',
    method: 'put',
    data: data
  })
}

export function updateAccountByAdmin(data, method) {
  return request({
    url: '/v1/account-management/account-by-admin',
    method: method,
    data: data
  })
}

export function changePassword(data) {
  return request({
    url: '/v1/account-management/change-password-account',
    method: 'put',
    data: data
  })
}

export function fetchCompanyList() {
  return request({
    url: '/v1/company-management/companies',
    method: 'get'
  })
}

export function fetchCompanyListWithPagination(query) {
  return request({
    url: '/v1/company-management/companies-paging?name=' + query.name + '&status=' + query.status + '&numOfElement=' + query.limit + '&page=' + query.page + '&sort=' + query.sort,
    method: 'get'
  })
}

export function fetchCompany(id) {
  return request({
    url: '/v1/company-management/company/' + id,
    method: 'get'
  })
}

export function updateCompany(data) {
  return request({
    url: '/v1/company-management/company-by-user',
    method: 'put',
    data: data
  })
}

export function updateCompanyByAdmin(data) {
  return request({
    url: '/v1/company-management/company-by-admin',
    method: 'put',
    data: data
  })
}

export function verifyCompany(id, email) {
  return request({
    url: '/v1/company-management/company/verify?id=' + id + '&email=' + email,
    method: 'put'
  })
}

export function rejectCompany(id, email) {
  return request({
    url: '/v1/company-management/company/reject?id=' + id + '&email=' + email,
    method: 'put'
  })
}

export function checkCompanyName(data) {
  return request({
    url: '/v1/company-management/check-company-name',
    method: 'get',
    params: data
  })
}

export function fetchAccountCompany(id) {
  return request({
    url: '/v1/company-management/company/account-company/' + id,
    method: 'get'
  })
}

export function updateCompanyAvatar(id, url) {
  return request({
    url: '/v1/company-management/change-avatar?id=' + id + '&avaUrl=' + url,
    method: 'put'
  })
}
