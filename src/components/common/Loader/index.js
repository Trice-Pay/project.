import React from 'react'
import { View, ActivityIndicator } from 'react-native'
import styles from './styles'
import { colors } from '../../../Res'

const Loader = ({ isLoading = false }) => {
  if (isLoading) {
    return (
      <View style={{ ...styles.loader, zIndex: 100 }}>
        <ActivityIndicator size="large" color={colors.blue} />
      </View>
    )
  }
  return null
}

export default Loader
