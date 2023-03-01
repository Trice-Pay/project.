import { applyMiddleware, } from 'redux'
import thunk from 'redux-thunk'
import { configureStore } from '@reduxjs/toolkit'
import { createDevTools } from '@redux-devtools/core'
import reducers from '../reducers'

import axios from 'axios'
import axiosMiddleware from 'redux-axios-middleware'

import * as RootNavigation from '../../MainNavigator/RootNavigation'
import AsyncStorage from '@react-native-async-storage/async-storage'
import Toast from 'react-native-toast-message'

const client = axios.create({
  baseURL: 'http://3.109.13.154:3000/',
  // 'https://03d6-2401-4900-1c2a-2728-5854-2a59-20fa-4934.ngrok.io',
  headers: {
    accept: 'application/json',
    //  'content-type': 'application/x-www-form-urlencoded',
  },
})



client.interceptors.request.use(
  async config => {
    const token = await AsyncStorage.getItem('access_token')
    console.log(token, "token")

    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  error => {
    return Promise.reject(error)
  },
)

const middlewareConfig = {
  interceptors: {
    request: [
      {
        success({ getState, dispatch, getSourceAction }, req) {
          let request = req
          if (request.method == 'post' || request.method == 'put') {
            request.data = request.data
          }
          return request
        },
      },
    ],
    response: [
      {
        success({ getState, dispatch, getSourceAction }, response) {
          return response
        },
        error({ getState, dispatch, getSourceAction }, error) {
          if (!axios.isCancel(error)) {
            httpHandleError(error.response)
          }

          return Promise.reject(error)
        },
      },
    ],
  },
}

const httpHandleError = error => {
  if (error.status == 401) {
    AsyncStorage.clear()
    RootNavigation.navigate('Login')
  }

  if (error.status == 500) {
    Toast.show({
      type: 'error',
      text1: error.data.error,
    })
    RootNavigation.navigate('Auth', { screen: 'Login' })
  }
  if (error.status == 403) {
    Toast.show({
      type: 'error',
      text1: error.data.error,
    })
    RootNavigation.navigate('Auth', { screen: 'Login' })
  }

  if (error.status == 422) {
    Toast.show({
      type: 'error',
      text1: error.data.error,
    })
  }

  if (error.status == 401) {
    Toast.show({
      type: 'error',
      text1: error.data.error,
    })
  }
  //422
  if (error.status == 400) {
    if (error.data && error.data.error) {
      if (typeof error.data.error === 'object') {
        var firstKey = ''
        for (var key in error.data.error) {
          firstKey = key
          break
        }

        if (error.data.error[firstKey]) {
          Toast.show({
            type: 'error',
            text1: 'Validation failed',
            text2: error.data.error[firstKey][0],
            text2NumberOfLines: 2
          })
        } else if (error.data.error[firstKey]) {
          Toast.show({
            type: 'error',
            text1: 'Validation failed',
            text2: error.data.error[firstKey],
            text2NumberOfLines: 2
          })
        }
      } else if (typeof error.data.error === 'string') {
        Toast.show({
          type: 'error',
          text1: 'Validation failed',
          text2: error.data.error,
          text2NumberOfLines: 2
        })
      }
    } else {
      Toast.show({
        type: 'error',
        text1: 'Something went wrong',
        text2NumberOfLines: 2
      })
    }
  }
}

const createStoreWithMiddleware = applyMiddleware(
  axiosMiddleware(client, middlewareConfig),
  thunk,
)(configureStore);

const Store = createStoreWithMiddleware({ reducer: reducers }, undefined);

export default Store;
