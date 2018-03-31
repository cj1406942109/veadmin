export function getScreenSize (screenWidth) {
  let screenSize = ''
  if (screenWidth < 768) {
    screenSize = {id: 0, desc: 'xs'}
  } else if (screenWidth < 992) {
    screenSize = {id: 1, desc: 'sm'}
  } else if (screenWidth < 1200) {
    screenSize = {id: 2, desc: 'md'}
  } else if (screenWidth < 1920) {
    screenSize = {id: 3, desc: 'lg'}
  } else {
    screenSize = {id: 4, desc: 'xl'}
  }
  return screenSize
}
