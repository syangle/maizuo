
document.documentElement.style.fontSize =
    document.documentElement.clientWidth / 3.75 + 'px'

// 设置屏幕尺寸的宽度下的根元素的字体大小
window.onresize = function () {
  document.documentElement.style.fontSize =
        document.documentElement.clientWidth / 3.75 + 'px'
}
