import {STORE_KEY} from "../constants"

type Callback = (data?: unknown) => void | undefined

let store: Record<string, any> = {
  [STORE_KEY]: {
    watchMode: false
  }
}

window.chrome = {
  ...window.chrome,
  runtime: {
    ...window.chrome?.runtime || {},
    onInstalled: {
      addListener: (callback) => {
        callback && callback()
      }
    }
  },
  storage: {
    sync: {
      // TODO: we need to delete this file with an dependencies that fix development mode
      // are required because this api on dom are not setted. Only extension are decorated with storage api
      // @ts-ignore
      get: (key: string, callback: Callback) => {
        if (callback) {
          callback(store)
        }
      },
      // @ts-ignore
      set: (data: Record<string, any>, callback: Callback) => {
        store = {
          ...store,
          ...data
        }
        if (callback) {
          callback(store)
        }
      }
    }
  }
}

export {}
