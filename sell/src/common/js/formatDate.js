export default function formatDate (date, fmt) {
    // 传入一个new Date出来的实例，fmt是日期的格式
    // /(y+)/匹配一个或者多个y
    // RegExp.$1获取正则表达式中第一个括号内匹配的结果
    // (date.getFullYear() + '').substr(4 - RegExp.$1.length) 获取到date的年份并且从0的位置开始截取
    if (/(y+)/.test(fmt)) {
        fmt = fmt.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length))
    }
    let o = {
        'M+': date.getMonth() + 1,
        'd+': date.getDate(),
        'h+': date.getHours(),
        'm+': date.getMinutes(),
        's+': date.getSeconds()
    }
    for (let k in o) {
        if (new RegExp(`(${k})`).test(fmt)) {
            let str = o[k] + ''
            // RegExp.$1.length === 1判断匹配的结果是不是两位，如果不是就加上0，substr()默认从0的位置开始攫取
            fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? str : padLeftZero(str))
        }
    }
    return fmt
}
function padLeftZero (str) {
    return ('00' + str).substr(str.length)
}
