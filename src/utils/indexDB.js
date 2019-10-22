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
// 添加数据，add添加新值
const addData = function(storename, data) {
  openDB().then(db => {
    console.log(db, 'add')

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
// 获取全部数据
const getData = function(store) {
  const { name, key } = store
  return openDB({ name: name, key: key }).then(db => {
    var store = db.transaction(name, 'readonly').objectStore(name)
    // var range = IDBKeyRange.lowerBound(0, true)
    const request = store.openCursor()
    let data = []
    return new Promise((resolve, reject) => {
      request.onerror = () => {
        console.log('通过KEY获取数据报错')
        reject()
      }
      request.addEventListener('success', e => {
        const cursor = e.target.result
        if (cursor) {
          data.push(cursor.value)
          // console.log(cursor.value, data)
          cursor.continue()
        } else {
          resolve(data)
        }
      })
    })

    //   return new Promise((resolve, reject) => {
    //     request.onerror = () => {
    //       console.log('通过KEY获取数据报错')
    //       reject()
    //     }
    //     request.onsuccess = event => {
    //       console.log(event)
    //       const cursor = event.target.result
    //       if (cursor) {
    //         console.log(cursor.value)
    //         cursor.continue()
    //       }
    //       var result = event.target.result
    //       resolve(result)
    //     }
    //   })
  })
}
// 更新旧值
const putData = function(db, storename, dataArr, callback) {
  var store = db.transaction(storename, 'readwrite').objectStore(storename)
  for (var i = 0, len = dataArr.length; i < len; i++) {
    var request = store.put(dataArr[i])
    request.onerror = function() {
      console.error('PUT添加数据报错')
    }
    request.onsuccess = function() {
      if (callback && typeof callback === 'function') {
        callback()
      }
    }
  }
}

export default {
  install: function(Vue) {
    Vue.prototype.$db = {
      openDB,
      addData,
      getData
    }
  }
}
