import { View, Text, ScrollView } from 'react-native'
import React from 'react'
import styles from './styles'
import { connect } from 'react-redux'
import RenderHTML from 'react-native-render-html'
import { SIZES } from '../../constants'

const PrivacyPolicy = ({ companyData }) => {
    const tagsStyles = {
        body: {
          whiteSpace: 'normal',
          color: 'gray'
        }
      };
    return (
        <View style={styles.container}>
            <ScrollView
                showsVerticalScrollIndicator={false}>

                <View style={styles.box1}>
                    {companyData?.privacy_policy &&
                        <RenderHTML
                            contentWidth={SIZES.width}
                            source={{
                                html: `${companyData?.privacy_policy}`
                            }}
                            tagsStyles={tagsStyles}
                        />
                    }
                    {/* <Text style={styles.text1}>{privacyPolicy?.name}</Text> */}
                    <Text style={styles.text2}>
                        {/* {privacyPolicy?.discription} */}
                    </Text>
                </View>

            </ScrollView>
        </View>
    )
}

const mapStateToProps = state => ({
    companyData: state.home.companyData,

});

const mapDispatchToProps = {

};

export default connect(mapStateToProps, mapDispatchToProps)(PrivacyPolicy);