import request from '@/utils/request'

export function login(data) {
  return request({
    url: '/login',
    method: 'post',
    data: data
  })
}

export function getInfo(email, token) {
  return request({
    url: '/v1/account-management/account-by-email',
    method: 'get',
    params: { email }
  })
}

export function signup(data) {
  return request({
    url: '/v1/account-management/signup',
    method: 'post',
    headers: { 'Content-Type': 'application/json' },
    data: data
  })
}

export function resetPassword(email) {
  return request({
    url: '/v1/account-management/reset-password/' + email,
    method: 'post'
  })
}

export function resendConfirmationEmail(email) {
  return request({
    url: '/v1/account-management/resend-email?email=' + email,
    method: 'get'
  })
}

export function activateAccount(id) {
  return request({
    url: '/v1/account-management/activate-by-account-id/' + id,
    method: 'put'
  })
}

export function deactivateAccount(id) {
  return request({
    url: '/v1/account-management/deactivate-account/' + id,
    method: 'put'
  })
}

export function fetchAccountData(id) {
  return request({
    url: '/v1/account-management/account/' + id,
    method: 'get'
  })
}

export function fetchActivities(id) {
  return request({
    url: '/v1/activity-management/activity-by-creator-id/' + id,
    method: 'get'
  })
}
