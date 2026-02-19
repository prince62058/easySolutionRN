import {
  View,
  Text,
  TouchableOpacity,
  Image,
  FlatList,
  Dimensions,
  ScrollView,
  ImageBackground,
} from 'react-native';
import React, {useState} from 'react';
import styles from './styles';
import {COLORS, FONTS, icons} from '../../constants';
import Button from './../Button/index';

const {width, height} = Dimensions.get('window');
const ProductDes = ({data}) => {
  const [switchs, setSwitchs] = useState(1);
  return (
    <View>
      <View style={styles.box19}>
        <View style={styles.box20}>
          <Image source={icons.productdesign} style={styles.img5} />
          <Text style={styles.text22}>Free Delivery</Text>
          <Text style={styles.text23}>₹40</Text>
          <Text style={styles.text24}>Delivery by 30 Jun, Friday</Text>
        </View>
        <View style={styles.box20}>
          <Image source={icons.productarrow} style={styles.img5} />
          <Text style={styles.text22}>10 Days Return Policy</Text>
        </View>
        <View style={styles.box20}>
          <Image source={icons.productdiscount} style={styles.img5} />
          <Text style={[styles.text22, {width: width * 0.74}]}>
            View best available offers
          </Text>
          <TouchableOpacity>
            <Image source={icons.profilearrow} style={styles.img7} />
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.border}></View>

      <View style={styles.box18}>
        <TouchableOpacity
          onPress={() => setSwitchs(1)}
          style={[
            styles.t3,
            switchs == 1 && {
              borderBottomColor: '#EE2761',
              borderBottomWidth: 2,
            },
          ]}>
          <Text style={styles.switchtext}>Description</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => setSwitchs(2)}
          style={[
            styles.t3,
            switchs == 2 && {
              borderBottomColor: '#EE2761',
              borderBottomWidth: 2,
            },
          ]}>
          <Text style={styles.switchtext}>Specification</Text>
        </TouchableOpacity>
      </View>

      {switchs == 1 && (
        <Text style={styles.contain}>
          {data?.description || 'No description available.'}
        </Text>
      )}
      {switchs == 2 && (
        <Text style={styles.contain}>
          {data?.specification || 'No specification available.'}
        </Text>
      )}

      {/* <View style={styles.box6}>
        <Button
          t2={styles.addbtn}
          t3={{color: COLORS.black}}
          onPress={onPress}
          t1={'Add To Cart'}
        />
        <Button t2={styles.buybtn} onPress={onPress} t1={'Buy Now'} />
      </View> */}
    </View>
  );
};
export default ProductDes;
