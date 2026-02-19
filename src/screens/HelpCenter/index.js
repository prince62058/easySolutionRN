import { View, Text } from 'react-native'
import React from 'react'
import Contact from '../../component/Contact'
import styles from './styles'
import { icons } from '../../constants'
import { connect } from 'react-redux'
import { openUrl } from '../../services/fileSystem'



const HelpCenter = ({ companyData }) => {
    // console.log("companyData : ", companyData)
    return (
        <View style={styles.container}>
            {companyData?.phone && <Contact image={icons.g1} text={"Customer Service"} onPress={() => openUrl(`tel:${companyData?.phone}`)} />}
            {companyData?.whastapp && <Contact image={icons.g2} text={"Whatsapp"} onPress={() => openUrl(`whatsapp://send?text=hello&phone=${companyData?.whastapp}`)} />}
            {companyData?.facebook && <Contact image={icons.g4} text={"Facebook"} onPress={() => openUrl(companyData?.facebook)} />}
            {companyData?.twitter && <Contact image={icons.g5} text={"Twitter"} onPress={() => openUrl(companyData?.twitter)} />}
            {companyData?.instagram && <Contact image={icons.g6} text={"Instagram"} onPress={() => openUrl(companyData?.instagram)} />}
            {companyData?.instagram && <Contact icon={"google-my-business"} text={"Google My Business"} onPress={() => openUrl(companyData?.instagram)} />}
            {companyData?.youtube && <Contact icon={"youtube"} text={"Youtube"} onPress={() => openUrl(companyData?.youtube)} />}
            {companyData?.pinterest && <Contact icon={"pinterest"} text={"Pinterest"} onPress={() => openUrl(companyData?.pinterest)} />}
        </View>
    )
}

const mapStateToProps = state => ({
    companyData: state.home.companyData,

});

const mapDispatchToProps = {

};

export default connect(mapStateToProps, mapDispatchToProps)(HelpCenter);
