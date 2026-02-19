import React from "react"

import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5'
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import Feather from 'react-native-vector-icons/Feather'
import Entypo from 'react-native-vector-icons/Entypo'
import AntDesign from 'react-native-vector-icons/AntDesign'
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons'
import EvilIcons from 'react-native-vector-icons/EvilIcons'
import Fontisto from 'react-native-vector-icons/Fontisto'
import Foundation from 'react-native-vector-icons/Foundation'
import Octicons from 'react-native-vector-icons/Octicons'
import Ionicons from 'react-native-vector-icons/Ionicons'
import Zocial from 'react-native-vector-icons/Zocial'
import { Image, StyleSheet } from "react-native"
import { icons, images } from "../../constants"




const Icons = ({ name, color, size, style }) => {
    switch (name) {
        // Bottom tab icons 
        case 'home':
            return <Image source={icons.home}
                style={[{ tintColor: color, height: size, width: size }, style]}
                resizeMode="contain"
            />
        case 'home_outline':
            return <Image source={icons.home_outline}
                style={[{ tintColor: color, height: size, width: size }, style]}
                resizeMode="contain"
            />
        case 'service':
            return <Image source={icons.service}
                style={[{ tintColor: color, height: size, width: size }, style]}
                resizeMode="contain"
            />
        case 'profile':
            return <Image source={icons.profile}
                style={[{ tintColor: color, height: size, width: size }, style]}
                resizeMode="contain"
            />
        case 'profile_outline':
            return <Image source={icons.profile_outline}
                style={[{ tintColor: color, height: size, width: size }, style]}
                resizeMode="contain"
            />
        case 'support':
            return <Image source={icons.support}
                style={[{ tintColor: color, height: size, width: size }, style]}
                resizeMode="contain"
            />
        case 'support_outline':
            return <Image source={icons.support_outline}
                style={[{ tintColor: color, height: size, width: size }, style]}
                resizeMode="contain"
            />
        case 'order':
            return <Image source={icons.order}
                style={[{ tintColor: color, height: size, width: size }, style]}
                resizeMode="contain"
            />
        case 'order_outline':
            return <Image source={icons.order_outline}
                style={[{ tintColor: color, height: size, width: size }, style]}
                resizeMode="contain"
            />
        case 'service_outline':
            return <Image source={icons.service_outline}
                style={[{ tintColor: color, height: size, width: size }, style]}
                resizeMode="contain"
            />
        case 'rate_outline':
            return <Image source={icons.rate_outline}
                style={[{ tintColor: color, height: size, width: size }, style]}
                resizeMode="contain"
            />

        // Account page icons
        case 'delete1':
            return <Image source={icons.delete1}
                style={[{ tintColor: color, height: size, width: size }, style]}
                resizeMode="contain"
            />
        case 'logout':
            return <Image source={icons.logout}
                style={[{ tintColor: color, height: size, width: size }, style]}
                resizeMode="contain"
            />
        // case 'edit':
        //     return <Image source={icons.edit}
        //         style={[{ tintColor: color, height: size, width: size }, style]}
        //         resizeMode="contain"
        //     />
        case 'policy':
            return <Image source={icons.policy}
                style={[{ tintColor: color, height: size, width: size }, style]}
                resizeMode="contain"
            />









        // socail icons
        case 'google':
            return <Image source={icons.google}
                style={[{ tintColor: color, height: size, width: size }, style]}
                resizeMode="contain"
            />


        // icons
        case 'google-my-business':
            return <MaterialCommunityIcons style={StyleSheet.create(style)} name="google-my-business" size={size} color={color} />
        case 'email_outline':
            return <MaterialCommunityIcons style={StyleSheet.create(style)} name="email-outline" size={size} color={color} />
        case 'call_outline':
            return <Ionicons style={StyleSheet.create(style)} name="call-outline" size={size} color={color} />
        case 'chatbox':
            return <Ionicons style={StyleSheet.create(style)} name="chatbox-ellipses-outline" size={size} color={color} />
        case 'download':
            return <Feather style={StyleSheet.create(style)} name="download" size={size} color={color} />
        case 'arrow-forward-circle':
            return <Ionicons style={StyleSheet.create(style)} name="arrow-forward-circle" size={size} color={color} />

        // default icons
        case 'playcircleo':
            return <AntDesign style={StyleSheet.create(style)} name="playcircleo" size={size} color={color} />
        case 'pausecircleo':
            return <AntDesign style={StyleSheet.create(style)} name="pausecircleo" size={size} color={color} />
        case 'edit':
            return <MaterialIcons style={StyleSheet.create(style)} name="edit" size={size} color={color} />
        case 'notifications':
            return <MaterialIcons style={StyleSheet.create(style)} name="notifications-none" size={size} color={color} />
        case 'camera':
            return <FontAwesome style={StyleSheet.create(style)} name="camera" size={size} color={color} />
        case 'down':
            return <AntDesign style={StyleSheet.create(style)} name="caretdown" size={size} color={color} />
        case 'right':
            return <Entypo style={StyleSheet.create(style)} name="chevron-right" size={size} color={color} />
        case 'up-outline':
            return <Ionicons style={StyleSheet.create(style)} name="chevron-up-outline" size={size} color={color} />
        case 'down-outline':
            return <Ionicons style={StyleSheet.create(style)} name="chevron-down-outline" size={size} color={color} />
        case 'heart':
            return <AntDesign style={StyleSheet.create(style)} name="hearto" size={size} color={color} />
        case 'threeDots':
            return <Entypo style={StyleSheet.create(style)} name="dots-three-horizontal" size={size} color={color} />
        case 'cancel':
            return <MaterialCommunityIcons style={StyleSheet.create(style)} name="cancel" size={size} color={color} />
        case 'menu':
            return <Feather style={StyleSheet.create(style)} name="menu" size={size} color={color} />
        case 'edit1':
            return <FontAwesome5 style={StyleSheet.create(style)} name="edit" size={size} color={color} />
        case 'checkmark':
            return <Ionicons style={StyleSheet.create(style)} name="checkmark-circle-outline" size={size} color={color} />
        case 'delete':
            return <MaterialCommunityIcons style={StyleSheet.create(style)} name="delete" size={size} color={color} />
        case 'plus':
            return <Entypo style={StyleSheet.create(style)} name="plus" size={size} color={color} />
        case 'minus':
            return <Entypo style={StyleSheet.create(style)} name="minus" size={size} color={color} />
        case 'back':
            return <Ionicons style={StyleSheet.create(style)} name="arrow-back" size={size} color={color} />
        case 'headphone':
            return <Feather style={StyleSheet.create(style)} name="headphones" size={size} color={color} />
        case 'location':
            return <Ionicons style={StyleSheet.create(style)} name="location-sharp" size={size} color={color} />
        case 'email-outline':
            return <Feather style={StyleSheet.create(style)} name="mail" size={size} color={color} />
        case 'call':
            return <Ionicons style={StyleSheet.create(style)} name="ios-call" size={size} color={color} />
        case 'close':
            return <AntDesign style={StyleSheet.create(style)} name="close" size={size} color={color} />
        case 'lock-outline':
            return <SimpleLineIcons style={StyleSheet.create(style)} name="lock" size={size} color={color} />
        case 'eye-off-outline':
            return <Ionicons style={StyleSheet.create(style)} name="eye-off-outline" size={size} color={color} />
        case 'eye-outline':
            return <Ionicons style={StyleSheet.create(style)} name="eye-outline" size={size} color={color} />
        case 'eye-off':
            return <Ionicons style={StyleSheet.create(style)} name="eye-off" size={size} color={color} />
        case 'eye':
            return <Ionicons style={StyleSheet.create(style)} name="eye" size={size} color={color} />
        case 'email':
            return <Zocial style={StyleSheet.create(style)} name="email" size={size} color={color} />
        case 'lock':
            return <Fontisto style={StyleSheet.create(style)} name="locked" size={size} color={color} />
        case 'user':
            return <FontAwesome5 style={StyleSheet.create(style)} name="user-alt" size={size} color={color} />
        case 'setting':
            return <Ionicons style={StyleSheet.create(style)} name="settings" size={size} color={color} />

        // star icons
        case 'star-fill':
            return <FontAwesome style={StyleSheet.create(style)} name="star" size={size} color={color} />
        case 'star-half':
            return <FontAwesome style={StyleSheet.create(style)} name="star-half-o" size={size} color={color} />
        case 'star-outline':
            return <FontAwesome style={StyleSheet.create(style)} name="star-o" size={size} color={color} />

        // social icons
        case 'apple':
            return <FontAwesome style={StyleSheet.create(style)} name="apple" size={size} color={color} />
        // case 'google':
        //     return <AntDesign style={StyleSheet.create(style)} name="google" size={size} color={color} />
        case 'twitter-circle':
            return <Entypo style={StyleSheet.create(style)} name="twitter-with-circle" size={size} color={color} />
        case 'facebook':
            return <FontAwesome style={StyleSheet.create(style)} name="facebook" size={size} color={color} />
        case 'facebook-circle':
            return <Entypo style={StyleSheet.create(style)} name="facebook-with-circle" size={size} color={color} />
        case 'instagram-circle':
            return <Entypo style={StyleSheet.create(style)} name="instagram-with-circle" size={size} color={color} />
        case 'youtube-circle':
            return <Entypo style={StyleSheet.create(style)} name="youtube-with-circle" size={size} color={color} />
        case 'youtube':
            return <Entypo style={StyleSheet.create(style)} name="youtube" size={size} color={color} />
            case 'pinterest':
                return <Entypo style={StyleSheet.create(style)} name="pinterest" size={size} color={color} />

        default:
            return <MaterialIcons style={StyleSheet.create(style)} name="logout" size={size} color={color} />
    }
}

Icons.defaultProps = {
    style: null,
    color: null
}

export default Icons