import { StyleSheet } from 'react-native'
import { colors } from '../../../Res'

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.blue,
  },
  wrapper: {
    flex: 1,
    height: '100%',
    backgroundColor: colors.white,
    marginTop: 20,
    borderTopRightRadius: 20,
    borderTopLeftRadius: 20,
  },
  form: {
    flex: 1,
    padding: 20,
  },
  input: {
    marginBottom: 20,
  },
  continueWith: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  textSeparator: {
    flex: 1,
    height: 1,
    marginTop: 34,
    marginBottom: 36,
    backgroundColor: colors.blue,
  },
  seperatorTextStyle: {
    paddingHorizontal: 10,
    textAlign: 'center',
    color: colors.gray,
    marginTop: 25,
    marginBottom: 29,
  },
  socialConnects: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 70,
  },
  btnStyle: {
    flexDirection: 'row',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: colors.bordergray,
    borderRadius: 12,
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 30,
  },
  fbText: {
    marginLeft: 13,
  },
  camera: {
    width: 38, 
    height: 38,
    backgroundColor: colors.white,
    top: -35,
    left:75,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 20,
    borderColor: colors.darktextgray,
  }
})

export default styles
