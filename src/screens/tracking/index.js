import React, { useState } from 'react';
import {
    Text,
    View,
    Image,
    FlatList,
    TouchableOpacity,
    Dimensions,
    ScrollView,
    StatusBar,
} from 'react-native';
import { COLORS, FONTS, data, icons, images } from '../../constants';
import { connect } from 'react-redux';
import Loader from './../../component/modalLoading/index';
import styles from './styles';
import Icons from '../../component/Icons';
const { height, width } = Dimensions.get('window');
import StepIndicator from 'react-native-step-indicator';

const Tracking = ({ navigation, route }) => {
    const [loading, setLoading] = useState(false);
    let status = route?.params?.status 
    // status = 'ORDERED'

    const labels = [
        'PENDING',
        'ORDERED',
        'ACCEPTED',
        // 'CANCELLED',
        'SHIPPED',
        'OUT OF DELIVERY',
        'DELIVERED',
        'RETURN REQUEST',
        'RETURN REQUEST APPROVED',
        'RETURNED',
        // 'MULTI STATUS'
    ];
    const statusList = [
        'PENDING',
        'ORDERED',
        'ACCEPTED',
        // 'CANCELLED',
        'SHIPPED',
        'OUT_OF_DELIVERY',
        'DELIVERED',
        'RETURN_REQUEST',
        'RETURN_REQUEST_APPROVED',
        'RETURNED',
        // 'MULTI_STATUS'
    ];
    const customStyles = {
        stepIndicatorSize: 15,
        currentStepIndicatorSize: 15,
        separatorStrokeWidth: 2,
        // currentStepStrokeWidth: 1,
        stepStrokeCurrentColor: COLORS.success,
        stepStrokeWidth: 0,
        stepStrokeFinishedColor: COLORS.success,
        stepStrokeUnFinishedColor: COLORS.success,
        stepIndicatorCurrentColor: COLORS.success,
        separatorFinishedColor: COLORS.success,
        separatorUnFinishedColor: '#aaaaaa',
        stepIndicatorFinishedColor: COLORS.success,
        stepIndicatorUnFinishedColor: '#9B9B9B',
        stepIndicatorLabelFontSize: 0,
        currentStepIndicatorLabelFontSize: 0,
        stepIndicatorLabelCurrentColor: COLORS.success,
        stepIndicatorLabelFinishedColor: COLORS.success,
        stepIndicatorLabelUnFinishedColor: '#9B9B9B',
        labelColor: '#9B9B9B',
        labelSize: 12,
        labelAlign: 'flex-start',
        labelFontFamily: FONTS.semiBold,
        currentStepLabelColor: COLORS.success,
    };

    console.log("tracking : ", status)
    return (
        <View style={styles.container}>
            <StatusBar backgroundColor={COLORS.white} barStyle={'dark-content'} />
            <Loader loading={loading} />
        
            <View style={styles.track_container}>
                <StepIndicator
                    customStyles={customStyles}
                    currentPosition={statusList?.findIndex(i=> i == status) > 5 ? statusList?.findIndex(i=> i == status) - 6 : statusList?.findIndex(i=> i == status)}
                    labels={statusList?.findIndex(i=> i == status) > 5 ? labels?.slice(6) : labels?.slice(0,6)}
                    stepCount={statusList?.findIndex(i=> i == status) > 5 ? labels?.slice(6)?.length : labels?.slice(0,6)?.length}
                    // currentPosition={statusList?.findIndex(i=> i == status) > 6 ? statusList?.findIndex(i=> i == status) - 7 : statusList?.findIndex(i=> i == status)}
                    // labels={statusList?.findIndex(i=> i == status) > 6 ? labels?.slice(6) : labels?.slice(0,6)}
                    // stepCount={statusList?.findIndex(i=> i == status) > 6 ? labels?.slice(6)?.length : labels?.slice(0,6)?.length}
                    direction="vertical"
                />
            </View>
        </View>
    );
};

export default Tracking;