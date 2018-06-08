import Cookies from 'js-cookie'

const TokenKey = 'VEAdmin-Token'

export function getToken () {
  return Cookies.get(TokenKey)
}

export function setToken (token) {
  return Cookies.set(TokenKey, token)
}

export function removeToken () {
  return Cookies.remove(TokenKey)
}

export function getUserId () {
  return Cookies.get('userId')
}

export function setUserId (id) {
  return Cookies.set('userId', id)
}

export function removeUserId () {
  return Cookies.remove('userId')
}

export function getUsername () {
  return Cookies.get('username')
}

export function setUsername (username) {
  return Cookies.set('username', username)
}

export function removeUsername () {
  return Cookies.remove('username')
}

export function removeUserInfo () {
  removeUserId()
  removeUsername()
}
