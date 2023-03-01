import { needsConstants } from '../constants'
import { success, failure } from '../../utilities'

const initialState = {
  isRequesting: false,
  list: [],
  categoriesList: [],
  isverify2FA: false
}

const needsReducer = (state = initialState, action) => {
  switch (action.type) {

    case needsConstants.GET_PROFILE:
      return { ...state, isRequesting: true }
    case success(needsConstants.GET_PROFILE):
    case failure(needsConstants.GET_PROFILE):
      return { ...state, isRequesting: false }

    case needsConstants.PUSH_NOTIFICATION_STATUS:
      return { ...state, isRequesting: true }
    case success(needsConstants.PUSH_NOTIFICATION_STATUS):
    case failure(needsConstants.PUSH_NOTIFICATION_STATUS):
      return { ...state, isRequesting: false }

    case needsConstants.SMS_NOTIFICATION_STATUS:
      return { ...state, isRequesting: true }
    case success(needsConstants.SMS_NOTIFICATION_STATUS):
    case failure(needsConstants.SMS_NOTIFICATION_STATUS):
      return { ...state, isRequesting: false }

    case needsConstants.PROMOTIONAL_NOTIFICATION_STATUS:
      return { ...state, isRequesting: true }
    case success(needsConstants.PROMOTIONAL_NOTIFICATION_STATUS):
    case failure(needsConstants.PROMOTIONAL_NOTIFICATION_STATUS):
      return { ...state, isRequesting: false }

    case needsConstants.UPLOAD_IMAGE:
      return { ...state, isRequesting: true }
    case success(needsConstants.UPLOAD_IMAGE):
    case failure(needsConstants.UPLOAD_IMAGE):
      return { ...state, isRequesting: false }

    case needsConstants.GENERATE_2FA:
      return { ...state, isRequesting: true }
    case success(needsConstants.GENERATE_2FA):
    case failure(needsConstants.GENERATE_2FA):
      return { ...state, isRequesting: false }

    case needsConstants.UPDATE_2FA:
      return { ...state, isRequesting: true }
    case success(needsConstants.UPDATE_2FA):
    case failure(needsConstants.UPDATE_2FA):
      return { ...state, isRequesting: false }

    case needsConstants.VERIFY_2FA:
      return { ...state, isRequesting: true }
    case success(needsConstants.VERIFY_2FA):
    case failure(needsConstants.VERIFY_2FA):
      return { ...state, isRequesting: false }

    case needsConstants.Generate_Otp_For_Profile:
      return { ...state, isRequesting: true }
    case success(needsConstants.Generate_Otp_For_Profile):
    case failure(needsConstants.Generate_Otp_For_Profile):
      return { ...state, isRequesting: false }

    case needsConstants.Exchange_Crypto_Currencies:
      return { ...state, isRequesting: true }
    case success(needsConstants.Exchange_Crypto_Currencies):
    case failure(needsConstants.Exchange_Crypto_Currencies):
      return { ...state, isRequesting: false }

    case needsConstants.Exchange_Transaction:
      return { ...state, isRequesting: true }
    case success(needsConstants.Exchange_Transaction):
    case failure(needsConstants.Exchange_Transaction):
      return { ...state, isRequesting: false }

    case needsConstants.VERIFY_USER_2FA:
      return { ...state, isverify2FA: true }


    case needsConstants.Add_Wallet: {
      const data = action.payload
      return { ...state, isRequesting: false, categoriesList: [...state.categoriesList, action.payload] }
    } 
    case success(needsConstants.Add_Wallet):
    case failure(needsConstants.Add_Wallet):
      return { ...state, isRequesting: false }
      

      case needsConstants.Exchange_Covalent_Transactions:
        return { ...state, isRequesting: true }
      case success(needsConstants.Exchange_Covalent_Transactions):
      case failure(needsConstants.Exchange_Covalent_Transactions):
        return { ...state, isRequesting: false }
  

    // case needsConstants.GET_CATEGORIES: {
    //   return { ...state, isRequesting: true }
    // }
    // case success(needsConstants.GET_CATEGORIES): {
    //   const { data = [] } = action.payload?.data?.result?.categories
    //   return { ...state, categoriesList: data, isRequesting: false }
    // }
    // case failure(needsConstants.GET_CATEGORIES):
    //   return { ...state, isRequesting: false }


    // case needsConstants.GET_NEEDS:
    //   return { ...state, isRequesting: true }
    // case success(needsConstants.GET_NEEDS): {
    //   const { data } = action.payload?.data?.result?.needs
    //   if (!data.data || !data.data?.length)
    //     return { ...state, list: [], isRequesting: false }

    //   const list = data.data.map(item => ({
    //     ...item,
    //     images: item.images.map(image => ({
    //       ...image,
    //       image_path: `${action.payload?.data?.result.base_path}/${image.image_path}`,
    //     })),
    //   }))
    //   return { ...state, list, isRequesting: false }
    // }
    // case failure(needsConstants.GET_NEEDS): {
    //   return { ...state, isRequesting: false }
    // }

    default:
      return state
  }
}
export default needsReducer
