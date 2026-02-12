import React from 'react';
import { Image, StyleSheet, Text, View } from 'react-native'
import { COLORS, FONTS, SIZES, icons, images } from '../../constants';
import Stars from 'react-native-stars';
import Icons from '../Icons';


const RatingCard = ({ source, name, message, rating, stars }) => {
    return (
        <View style={styles.card}>
            <View style={styles.topRow}>
                {source ?
                    <Image source={source} style={styles.image} resizeMode="contain" />
                    :
                    <View style={styles.image} />
                }

                <View >
                    <Text style={styles.name}>{name}</Text>
                    <View style={styles.row}>
                        {/* <Text style={styles.ratingText}>{rating}</Text> */}
                        <Stars
                            display={rating ? rating : 0}
                            count={5}
                            spacing={3}
                            half={true}
                            fullStar={<Icons name={'star-fill'} size={SIZES.width * .04} color={COLORS.yellow} />}
                            emptyStar={<Icons name={'star-outline'} size={SIZES.width * .04} color={"#9B9B9B"} />}
                            halfStar={<Icons name={'star-half'} size={SIZES.width * .04} color={COLORS.yellow} />}
                            disabled={true}
                        />
                    </View>
                </View>
            </View>
            <View style={styles.textBox}>
                <Text style={styles.message}>{message}</Text>
            </View>
        </View>
    )
}

RatingCard.defaultProps = {
    source: images.profile,
    name: "",
    message: "",
    rating: 0,
    stars: 5,
}

export default RatingCard;

const styles = StyleSheet.create({
    card: {
        // width: SIZES.width * .92,
        width: SIZES.width,
        // alignItems: "center",
        justifyContent: 'center',
        alignSelf: "center",
        backgroundColor: COLORS.white,
        // elevation: 2,
        // borderRadius: 12,
        // borderWidth: 1,
        borderBottomWidth: 1,
        borderColor: COLORS.gray20,
        marginBottom: SIZES.height * .02,
        paddingVertical: SIZES.height * .01,
        paddingHorizontal: SIZES.width * .04,
    },

    topRow: {
        // width: SIZES.width * .8,
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: SIZES.height * .01,
    },

    row: {
        flexDirection: 'row',
        alignItems: 'center',
    },

    image: {
        width: SIZES.width * .12,
        height: SIZES.width * .12,
        borderRadius: SIZES.width * .12,
        marginRight: SIZES.width * .03,
        backgroundColor: COLORS.gray10,
    },

    name: {
        fontFamily: FONTS.medium,
        fontSize: SIZES.width * .04,
        // marginBottom: -3,
        color: COLORS.black,
    },

    ratingText: {
        fontFamily: FONTS.regular,
        fontSize: SIZES.width * .038,
        color: COLORS.black,
        marginBottom: -4,
    },

    textBox: {
        // width: SIZES.width * .8,
        marginBottom: SIZES.height * .01,
    },

    message: {
        fontFamily: 'Poppins Regular 400',
        fontSize: SIZES.width * .036,
        marginBottom: -3,
        color: COLORS.black,
    },

})