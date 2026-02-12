import { StyleSheet, Text, View, Image, TouchableOpacity, Dimensions } from 'react-native'
const { height, width } = Dimensions.get('window')
import React, { useState } from 'react'
import { COLORS, FONTS, icons } from '../../constants'
import Collapsible from 'react-native-collapsible';

const Help = ({ text, description }) => {
    const [isCollapsed, setisCollapsed] = useState(true)
    return (
        <View style={styles.main}>
            <TouchableOpacity onPress={() => setisCollapsed(!isCollapsed)}>
                <View style={styles.box1}>
                    <Text style={styles.text1}>
                        {text}
                    </Text>
                    <Image source={isCollapsed ? icons.helppolygondwon : icons.helppolygon} style={styles.img2} />
                </View>
            </TouchableOpacity>
            <Collapsible collapsed={isCollapsed}>
                <View style={styles.box3}></View>
                <View style={styles.box2}>
                    <Text style={styles.text2}>
                      {description}
                    </Text>
                </View>
            </Collapsible>
        </View>
    )
}

export default Help

const styles = StyleSheet.create({

    img2: {
        height: width * 0.04,
        width: width * 0.04,
        resizeMode:'contain'
    },
    main: {
        // marginLeft: -width * 0.01,
        marginTop: width * 0.03,
        elevation: 1,
        backgroundColor: COLORS.white,
        borderRadius: 8,

    },
    box1: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: width * 0.9,
        marginVertical: height * 0.01,
        alignItems: 'center',
        height: height * 0.04,

    },
    box3: {
        height: height * 0.001,
        // width: width * 0.89,
        // marginLeft: width * 0.05,
        backgroundColor: '#ADA4A5',
        marginTop: height * 0.01,
    },
    text1: {
        fontSize: 14,
        fontFamily: FONTS.regular,
        color: COLORS.black,
        marginLeft: width * 0.03,
        marginBottom: -5,
    },
    box2: {
        justifyContent: 'center',
        // alignItems: 'center',
        width: width * 0.9,
        marginTop: width * 0.02,
        marginBottom: width * 0.03,
    },
    text2: {
        marginLeft: width * 0.04,
        fontSize: 12,
        fontFamily: FONTS.light,
        color: COLORS.gray
    }

})