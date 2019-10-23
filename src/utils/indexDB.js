import { Promise } from 'q'

// 创建一个数据库
// 新对象储存空间newStore参数：newStore.name、newStore.key、newStore.index
// newStore.index:[{name,key,unique}]
const openDB = function(newStore) {
  var request = window.indexedDB.open('fms')

  // 创建一个对象仓库
  request.onupgradeneeded = function(event) {
    var db = event.target.result
    if (newStore) {
      if (!db.objectStoreNames.contains(newStore.name)) {
        var store = db.createObjectStore(newStore.name, {
          keyPath: newStore.key
        })
        if (newStore.index) {
          for (let index of newStore.index) {
            store.createIndex(index.name, index.key, { unique: index.unique })
          }
        }
      }
    }
  }
  return new Promise((resolve, reject) => {
    request.onsuccess = function(event) {
      // db = event.target.result
      // if (callback && typeof callback === 'function') {
      //   callback(db||event.target.result)
      // }
      resolve(event.target.result)
    }
    request.onerror = function(e) {
      reject(e.currentTarget.error.message)
      console.log(e.currentTarget.error.message)
    }
  })
}
// 获取全部数据
const getData = function(storeObj, { pageSize, pageIndex, search }) {
  const { name } = storeObj
  return openDB(storeObj).then(db => {
    var store = db.transaction(name, 'readonly').objectStore(name)
    var range = IDBKeyRange.lowerBound(0)

    const request = store.openCursor(range, 'prev')
    let data = []
    return new Promise((resolve, reject) => {
      request.onerror = () => {
        console.log('获取数据报错')
        reject()
      }
      request.addEventListener('success', e => {
        const cursor = e.target.result
        if (cursor) {
          data.push(cursor.value)
          // console.log(cursor.value, data)
          cursor.continue()
        } else {
          const func = data => {
            return search.reduce(
              (accumulator, currentValue) =>
                accumulator &&
                (currentValue.value === '' ||
                  data[currentValue.name] === currentValue.value),
              true
            )
          }
          data = data.filter(
            (item, index) =>
              index >= pageSize * (pageIndex - 1) &&
              index < pageSize * pageIndex &&
              func(item)
          )
          resolve(data)
        }
      })
    })
  })
}
// 添加数据，add添加新值
const addData = function(storename, data) {
  return openDB().then(db => {
    var store = db.transaction(storename, 'readwrite').objectStore(storename)
    var request = store.add(data)
    return new Promise((resolve, reject) => {
      request.onerror = () => {
        console.error('ADD添加数据报错')
        reject()
      }
      request.onsuccess = () => {
        // if (callback && typeof callback === 'function') {
        //   callback()
        // }
        resolve()
      }
    })
  })
}
// 更新旧值
const putData = function(storename, data) {
  return openDB().then(db => {
    var store = db.transaction(storename, 'readwrite').objectStore(storename)
    var request = store.put(data)
    return new Promise((resolve, reject) => {
      request.onerror = () => {
        console.error('PUT添加数据报错')
        reject()
      }
      request.onsuccess = () => {
        resolve()
      }
    })
  })
}
// 删除数据
const deleteData = function(storename, key) {
  return openDB().then(db => {
    var store = db.transaction(storename, 'readwrite').objectStore(storename)
    var request = store.delete(key)
    return new Promise((resolve, reject) => {
      request.onerror = () => {
        console.error('删除数据错误')
        reject()
      }
      request.onsuccess = () => {
        console.log(111)

        resolve()
      }
    })
  })
}
// 清空数据
const clearData = function(storename) {
  return openDB().then(db => {
    var store = db.transaction(storename, 'readwrite').objectStore(storename)
    var request = store.clear()
    return new Promise((resolve, reject) => {
      request.onerror = () => {
        console.error('清空数据错误')
        reject()
      }
      request.onsuccess = () => {
        resolve()
      }
    })
  })
}
export default {
  install: function(Vue) {
    Vue.prototype.$db = {
      openDB,
      getData,
      addData,
      putData,
      deleteData,
      clearData
    }
  }
}
