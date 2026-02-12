import { View, Text, Dimensions, ScrollView } from 'react-native';
import React, { useState } from 'react';
import styles from './styles';
import { FONTS, COLORS } from '../../constants';
import Help from '../../component/Help';
import { connect } from 'react-redux';

const FAQ = ({ navigation, faq }) => {
 

  console.log("faq data : ", faq)
  return (
    <View style={styles.container}>
      <ScrollView>
        <View style={styles.box1}>
          <Text style={styles.text1}>FAQ</Text>
          <View style={styles.line}></View>
          {faq && faq?.map((item) => (
            <Help key={item._id} text={item.question} description={item.answer} />
          ))}

          
        </View>
      </ScrollView>
    </View>
  );
};

const mapStateToProps = state => ({
  faq: state.home.faq,

});

const mapDispatchToProps = {

};

export default connect(mapStateToProps, mapDispatchToProps)(FAQ);

