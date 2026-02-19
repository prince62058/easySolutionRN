import { View, Text, Image, TouchableOpacity } from 'react-native'
import React from 'react'
import styles from './styles'
import { icons } from '../../constants'

const UpcomingNew = ({ navigation }) => {
    return (
        <View style={styles.container}>
            <View style={styles.box1}>
                <Image source={icons.Upcominglogo} style={styles.img} />
                <Text style={styles.text1}>
                    You have no upcoming booking

                </Text>
                <Text style={styles.text2}>
                    You do not have a upcoming booking. Make a new booking by clicking the button below

                </Text>
                <TouchableOpacity style={styles.t1} onPress={() => navigation.navigate("")}>
                    <Text style={styles.text3}>
                        Make New Booking
                    </Text>
                    <Image source={icons.sign} style={styles.img2} />


                </TouchableOpacity>


            </View>

        </View>
    )
}

export default UpcomingNew