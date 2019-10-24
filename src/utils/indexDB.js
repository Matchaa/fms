import store from '../store'
// 创建一个数据库
// 新对象储存空间newStore参数：newStore.name、newStore.key、newStore.index
// newStore.index:[{name,key,unique}]
const openDB = function() {
  var request = window.indexedDB.open('fms', store.state.indexDBVersion)

  // 创建一个对象仓库
  // request.onupgradeneeded = function(event) {
  //   var db = event.target.result
  //   if (storeName) {
  //     if (!db.objectStoreNames.contains(storeName)) {
  //       var store = db.createObjectStore(storeName, {
  //         keyPath: storeKey || 'id'
  //       })
  //       if (storeIndex) {
  //         for (let index of storeIndex) {
  //           store.createIndex(index.name, index.key, { unique: index.unique })
  //         }
  //       }
  //     }
  //   }
  // }
  return new Promise((resolve, reject) => {
    request.onsuccess = function(event) {
      resolve(event.target.result)
    }
    request.onerror = function(e) {
      reject(e.currentTarget.error.message)
      console.log(e.currentTarget.error.message)
    }
  })
}
// 获取全部数据
const getData = function(storeName, param = {}) {
  return openDB(storeName).then(db => {
    var store = db.transaction(storeName, 'readonly').objectStore(storeName)
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
          cursor.continue()
        } else {
          const { pageSize, pageIndex, search } = param
          // const func = data => {}
          if (pageSize && pageIndex) {
            data = data.filter(
              (item, index) =>
                index >= pageSize * (pageIndex - 1) &&
                index < pageSize * pageIndex
            )
          }
          if (search) {
            data = data.filter(item =>
              search.reduce(
                (accumulator, currentValue) =>
                  accumulator &&
                  (currentValue.value === '' ||
                    item[currentValue.name] === currentValue.value),
                true
              )
            )
          }
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
    console.log(db)

    var store = db.transaction(storename, 'readwrite').objectStore(storename)
    var request = store.put(data)
    return new Promise((resolve, reject) => {
      request.onerror = () => {
        console.error('PUT添加数据报错')
        reject()
      }
      request.onsuccess = () => {
        console.log('putsuccess')
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
