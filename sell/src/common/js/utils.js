/**
 * 解析url中的参数?id=12345&a=b
 * return obj={id:123,a:b}
 */
export default function urlParse() {
  let url = window.location.search
  let obj = {}
  let reg = /[?&][^?&]+=[^?&]+/g
// [?&]匹配？或者&  ^?&拼配？或者&后面的数字和字母，结果['?id=12345','&a=b']
  let arr = url.match(reg)
  if (arr) {
   arr.forEach((item) => {
       let tempArr = item.substr(1).split('=')
       let key = decodeURIComponent(tempArr[0])
       let value = decodeURIComponent(tempArr[1])
       obj[key] = value
   })
   return obj
  }
}
