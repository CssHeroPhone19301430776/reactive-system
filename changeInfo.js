import observe from "./index.js"

const userInfo = {
  name: 'CssHero',
  age: 20
}

observe(userInfo)


function setName (name) {
  userInfo.name = name
  document.getElementById('name').innerText = userInfo.name
}

function setAge (age) {
  userInfo.age = age
  document.getElementById('age').innerText = userInfo.age
}

setAge(10)
setName('CssHero123')