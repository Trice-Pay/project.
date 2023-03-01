import { StyleSheet } from 'react-native';
import { colors, Fonts } from '../../../Res';

export default StyleSheet.create({
    root: { padding: 20, minHeight: 300 },
    title: {
        textAlign: 'center', fontSize: 30, color: colors.white,
        paddingBottom: 20,
        fontFamily: Fonts.SourceSansProSemiBold
    },
    txt: {
        textAlign: 'center', fontSize: 17, color: colors.white,
        lineHeight: 24,
        fontFamily: Fonts.SourceSansProRegular
    },
    fieldRow: {
        marginTop: 20,
        flexDirection: 'row',
        paddingRight: 10
    },
    cell: {
        width: 55,
        height: 55,
        lineHeight: 55,
        fontSize: 30,
        fontWeight: '700',
        textAlign: 'center',
        marginLeft: 8,
        borderRadius: 6,
        backgroundColor: '#eee',
    },
    toggle: {
        lineHeight: 55,
        fontSize: 18,
        textAlign: 'center',
        textDecorationLine: "underline",
        color: colors.white,
        fontFamily: Fonts.SourceSansProRegular
    },
    focusCell: {
        borderColor: '#000',
    },
    resbtn: {
        borderColor: colors.white,
        borderWidth: 2,
        marginTop: 25,

    },
    restext: {
        fontSize: 18,
        fontFamily: Fonts.SourceSansProSemiBold
    }
});