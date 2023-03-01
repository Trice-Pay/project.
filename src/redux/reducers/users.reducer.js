import { userConstants } from '../constants'
import { success, failure } from '../../utilities'

const initialState = {
  isRequesting: false,
}

const usersReducer = (state = initialState, action) => {
  switch (action.type) {
    case userConstants.LOGIN:
      return { ...state, isRequesting: true }
    case success(userConstants.LOGIN):
    case failure(userConstants.LOGIN):
      return { ...state, isRequesting: false }

    case userConstants.SIGN_UP:
      return { ...state, isRequesting: true }
    case success(userConstants.SIGN_UP):
    case failure(userConstants.SIGN_UP):
      return { ...state, isRequesting: false }

    case userConstants.VERIFY_EMAIL:
      return { ...state, isRequesting: true }
    case success(userConstants.VERIFY_EMAIL):
    case failure(userConstants.VERIFY_EMAIL):
      return { ...state, isRequesting: false }

    case userConstants.RESEND_CODE:
      return { ...state, isRequesting: false }
    case success(userConstants.RESEND_CODE):
    case failure(userConstants.RESEND_CODE):
      return { ...state, isRequesting: false }

    case userConstants.FORGOT_PASSWORD:
      return { ...state, isRequesting: true }
    case success(userConstants.FORGOT_PASSWORD):
    case failure(userConstants.FORGOT_PASSWORD):
      return { ...state, isRequesting: false }

    case userConstants.UPDATE_PASSWORD:
      return { ...state, isRequesting: true }
    case success(userConstants.UPDATE_PASSWORD):
    case failure(userConstants.UPDATE_PASSWORD):
      return { ...state, isRequesting: false }

    case userConstants.CHANGE_PASSWORD:
      return { ...state, isRequesting: true }
    case success(userConstants.CHANGE_PASSWORD):
    case failure(userConstants.CHANGE_PASSWORD):
      return { ...state, isRequesting: false }

    case userConstants.UPDATE_USER:
      return { ...state, isRequesting: true }
    case success(userConstants.UPDATE_USER):
    case failure(userConstants.UPDATE_USER):
      return { ...state, isRequesting: false }

    case userConstants.Generate_Access_Token_From_Refresh_Token:
      return { ...state, isRequesting: true }
    case success(userConstants.Generate_Access_Token_From_Refresh_Token):
    case failure(userConstants.Generate_Access_Token_From_Refresh_Token):
      return { ...state, isRequesting: false }

    case userConstants.SHOW_LOADER:
      return { ...state, isRequesting: true }
    default:
      return state
  }
}
export default usersReducer
