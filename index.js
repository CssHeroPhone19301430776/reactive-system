function observe (obj) {
  for (let key in obj) {
    let internalValue = obj[key]
    const funs = new Set()
    Object.defineProperty(obj, key, {
      get () {   
        if (window.__fn) {
          funs.add(window.__fn)
        }
        console.log(funs);
        
        return internalValue
      },
      set (value) {
        internalValue = value
        console.log(funs);

        for (const fn of funs) {
          fn()
        }
      }
    })
  }
  return obj
}

function autoRun (fn) {
  window.__fn = fn
  fn()
  window.__fn = null
}