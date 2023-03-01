/**
 *  Import action creator constants & dependencies
 */
import { needsConstants } from '../constants'
import { API_URLS } from '../../configs/url'


export const begin_add_Wallet = data => ({
  type: needsConstants.Add_Wallet,
  payload: data
})

export function add_Wallet(params) {
  return async dispatch => {
    try {
      const response = await dispatch(begin_add_Wallet(params))
      if (response.payload) {
        const data = response.payload
        return data
      }

      throw response
    } catch (error) {
      throw error.response
    }
  }
}

export const beginTransList = data => ({
  type: needsConstants.Exchange_Covalent_Transactions,
  payload: {
    request: {
      url: API_URLS.Exchange_Covalent_Transactions,
      method: 'post',
      data,
    },
  },
})

export function  exchange_Covalent_Trans_List(params) {
  return async dispatch => {
    try {
      const response = await dispatch(beginTransList(params))
      if (response.payload) {
        const data = response.payload
        return data
      }

      throw response
    } catch (error) {
      throw error.response
    }
  }
}



//wallet

export const getProfile = data => ({
  type: needsConstants.GET_PROFILE,
  payload: {
    request: {
      url: API_URLS.MY_PROFILE,
      method: 'post',
      data,
    },
  },
})

export const getPushNotiStatus = data => ({
  type: needsConstants.PUSH_NOTIFICATION_STATUS,
  payload: {
    request: {
      url: API_URLS.PUSH_NOTIFICATION_STATUS,
      method: 'post',
      data,
    },
  },
})

export const getSmsNotiStatus = data => ({
  type: needsConstants.SMS_NOTIFICATION_STATUS,
  payload: {
    request: {
      url: API_URLS.SMS_NOTIFICATION_STATUS,
      method: 'post',
      data,
    },
  },
})

export const getPromoNotiStatus = data => ({
  type: needsConstants.PROMOTIONAL_NOTIFICATION_STATUS,
  payload: {
    request: {
      url: API_URLS.PROMOTIONAL_NOTIFICATION_STATUS,
      method: 'post',
      data,
    },
  },
})

export const beginuploadImage = data => ({
  type: needsConstants.UPLOAD_IMAGE,
  payload: {
    request: {
      url: API_URLS.UPLOAD_IMAGE,
      method: 'post',
      headers: {
        'Content-Type': 'multipart/form-data'
      },
      data,
    },
  },
})

export const begingen2FA = data => ({
  type: needsConstants.GENERATE_2FA,
  payload: {
    request: {
      url: API_URLS.GENERATE_2FA,
      method: 'post',
      data,
    },
  },
})

export const beginupdate2FA = data => ({
  type: needsConstants.UPDATE_2FA,
  payload: {
    request: {
      url: API_URLS.UPDATE_2FA,
      method: 'post',
      data,
    },
  },
})

export const beginverify2FA = data => ({
  type: needsConstants.VERIFY_2FA,
  payload: {
    request: {
      url: API_URLS.VERIFY_2FA,
      method: 'post',
      data,
    },
  },
})

export const genOtp_forProfile = data => ({
  type: needsConstants.Generate_Otp_For_Profile,
  payload: {
    request: {
      url: API_URLS.Generate_Otp_For_Profile,
      method: 'post',
      data,
    },
  },
})

export const crypto_Currencies = data => ({
  type: needsConstants.Exchange_Crypto_Currencies,
  payload: {
    request: {
      url: API_URLS.Exchange_Crypto_Currencies,
      method: 'post',
      data,
    },
  },
})

export const beginExchangeTrans = data => ({
  type: needsConstants.Exchange_Transaction,
  payload: {
    request: {
      url: API_URLS.Exchange_Transaction,
      method: 'post',
      data,
    },
  },
})

export const verifyUser2FA = data => ({
  type: needsConstants.VERIFY_USER_2FA,
})

export function exchange_Trans(params) {
  return async dispatch => {
    try {
      const response = await dispatch(beginExchangeTrans(params))
      if (response.payload) {
        const { data } = response.payload
        return data
      }

      throw response
    } catch (error) {
      console.log('action failed', error)
      throw error.response
    }
  }
}

export function gen2FA(params) {
  return async dispatch => {
    try {
      const response = await dispatch(begingen2FA(params))
      if (response.payload) {
        const { data } = response.payload
        return data
      }

      throw response
    } catch (error) {
      throw error.response
    }
  }
}

export function upDate2FA(params) {
  return async dispatch => {
    try {
      const response = await dispatch(beginupdate2FA(params))
      if (response.payload) {
        const { data } = response.payload
        return data
      }

      throw response
    } catch (error) {
      console.log('action failed', error)
      throw error.response
    }
  }
}

export function verify2FA(params) {
  return async dispatch => {
    try {
      const response = await dispatch(beginverify2FA(params))
      if (response.payload) {
        const { data } = response.payload
        return data
      }

      throw response
    } catch (error) {
      console.log('action failed', error)
      throw error.response
    }
  }
}

export function uploadImage(params) {
  return async dispatch => {
    try {
      const response = await dispatch(beginuploadImage(params))
      if (response.payload) {
        const { data } = response.payload
        return data
      }

      throw response
    } catch (error) {
      console.log('action failed', error)
      throw error.response
    }
  }
}


// export function getProfile(params) {
//   return async dispatch => {
//     try {
//       const response = await dispatch(begingetProfile(params))
//       if (response.payload) {
//         const { data } = response.payload
//         return data
//       }

//       throw response
//     } catch (error) {
//       console.log('action failed', error)
//       throw error.response
//     }
//   }
// }
