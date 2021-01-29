import Cookies from 'js-cookie'

const TokenKey = 'User-Token'
const UserKey = 'User-Id'
const AccountKey = 'Account-Id'

export function getToken() {
  return Cookies.get(TokenKey)
}

export function setToken(token) {
  return Cookies.set(TokenKey, token)
}

export function removeToken() {
  return Cookies.remove(TokenKey)
}

export function getUserId() {
  return Cookies.get(UserKey)
}

export function setUserId(UserId) {
  return Cookies.set(UserKey, UserId)
}

export function removeUserId() {
  return Cookies.remove(UserKey)
}

export function getAccountId() {
  return Cookies.get(AccountKey)
}

export function setAccountId(AccountId) {
  return Cookies.set(AccountKey, AccountId)
}

export function removeAccountId() {
  return Cookies.remove(AccountKey)
}
