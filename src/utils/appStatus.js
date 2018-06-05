import Cookies from 'js-cookie'

// sidebar开关状态
export function getSidebarOpenStatus () {
  return +Cookies.get('sidebarOpenStatus')
}

export function setSidebarOpenStatus (status) {
  return Cookies.set('sidebarOpenStatus', status)
}

export function removeSidebarOpenStatus () {
  return Cookies.remove('sidebarOpenStatus')
}

// sidebar最小化状态
export function getSidebarMinStatus () {
  return +Cookies.get('sidebarMinStatus')
}

export function setSidebarMinStatus (status) {
  return Cookies.set('sidebarMinStatus', status)
}

export function removeSidebarMinStatus () {
  return Cookies.remove('sidebarMinStatus')
}
// 屏幕尺寸信息
export function getScreenSize () {
  return Cookies.get('screenSize')
}

export function setScreenSize (screenSize) {
  return Cookies.set('screenSize', screenSize)
}

export function removeScreenSize () {
  return Cookies.remove('screenSize')
}

export function removeAppStatus () {
  removeSidebarOpenStatus()
  removeSidebarMinStatus()
  removeScreenSize()
}
