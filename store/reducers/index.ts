import initState from '@/store/state'
import actionTypes from '@/store/actionTypes'

interface StoreAction {
  type: string;
  payload: any;
}

// 设置本地持久化，redux持久化插件会影响服务端渲染
const setStorage = (field: string, payload: any) => {
  try {
    const reduxObj = localStorage.getItem('redux')
    const newData = Object.assign(JSON.parse(reduxObj), {
      [field]: JSON.stringify(payload)
    })
    localStorage.setItem('redux', JSON.stringify(newData))
  } catch (e) {
    localStorage.setItem('redux', JSON.stringify({}))
  }
}

const storeData = (
  state = initState,
  { type, payload }: StoreAction
): object => {
  if (!actionTypes[type]) return state
  const { field } = actionTypes[type]
  setStorage(field, payload)
  return {
    ...state,
    [field]: payload
  }
}

export default storeData
