# reactive-system 分析

## 📚 概要

简单实现 Vue 的响应式原理，适合想要深入了解 vue 响应式本质的人群学习
[项目地址](https://github.com/CssHeroPhone19301430776/reactive-system)

## 🌱 项目代码分析

- index.html
  - 当 input 的值切换时，name 和 age 也会切换为对应的值

```html
<h3 id="name"></h3>
<h3 id="age"></h3>
<div>change name：<input type="text" oninput="userInfo.name = 'name：'+this.value" /></div>
<div>change age：<input type="text" oninput="userInfo.age = 'age：'+this.value" /></div>
```

- index.js
  - 使用 defineProperty 进行数据的拦截监听
  - funs 为当属性值修改时，需要调用的函数数组（里面保存的是一系列函数）
  - 当获取属性时，记录当前调用的函数放入 funs 中
  - 当修改属性时，便利每个 funs 的函数，因为每个函数都用到了 get（获取属性）
  - autoRun 则是用来便于 get 来找到当前调用的函数，把它放到 window 对象中

```js
function observe(obj) {
  for (let key in obj) {
    let internalValue = obj[key];
    const funs = new Set();
    Object.defineProperty(obj, key, {
      get() {
        if (window.__fn) {
          funs.add(window.__fn);
        }
        console.log(funs);

        return internalValue;
      },
      set(value) {
        internalValue = value;
        console.log(funs);

        for (const fn of funs) {
          fn();
        }
      },
    });
  }
  return obj;
}

function autoRun(fn) {
  window.__fn = fn;
  fn();
  window.__fn = null;
}
```

- changeInfo.js
  - observe 表示监听 userInfo 对象
  - autorun 调用，将会将依赖的函数放入到对应的 funs 中

```js
const userInfo = {
  name: 'CssHero',
  age: 20,
};

observe(userInfo);

// 切换数据的函数
function setName() {
  document.getElementById('name').innerText = 'name：' + userInfo.name;
}
function setAge() {
  document.getElementById('age').innerText = 'age：' + userInfo.age;
}

autoRun(setName);
autoRun(setAge);
```

## 👥 小结

经过实现简单的响应式，可以发现

`响应式的本质是 当数据变化时候，会自动运行一些相关函数`
