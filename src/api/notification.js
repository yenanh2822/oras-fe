import request from '@/utils/request'

export function getNewNotification(id, role) {
  return request({
    url: '/v1/notification-management/new-account-notifications?id=' + id + '&role=' + role,
    method: 'get'
  })
}

export function setAsReadNotification(ids) {
  return request({
    url: '/v1/notification-management/read-notification/',
    method: 'put',
    data: ids
  })
}
