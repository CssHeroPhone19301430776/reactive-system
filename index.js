export default function observe (obj) {
  for (let key in obj) {
    let internalValue = obj[key]
    Object.defineProperty(obj, key, {
      get () {
        return internalValue
      },

      set (value) {
        internalValue = value
      }
    })
  }
  return obj
}