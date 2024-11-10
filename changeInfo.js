const userInfo = {
  name: 'CssHero',
  age: 20
}

observe(userInfo)

// 切换数据的函数
function setName () {
  document.getElementById('name').innerText = 'name：'+userInfo.name
}
function setAge () {
  document.getElementById('age').innerText = 'age：'+userInfo.age
}

autoRun(setName)
autoRun(setAge)