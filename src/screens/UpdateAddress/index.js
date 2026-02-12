import { View, Text, TouchableOpacity, FlatList, ActivityIndicator } from 'react-native';
import React, { useState, useEffect } from 'react';
import styles from './styles';
import Address from '../../component/Address';
import { connect } from 'react-redux';
import {
  GetAddressByUserIdApi,
  GetAddressByIdApi,
  DeleteAddressApi,
} from './../../redux/actions/addressAction';
import { DefaultAddress } from '../../redux/actions/blacklistAction';
import Loader from '../../component/modalLoading';
import { COLORS } from '../../constants';
import { useFocusEffect } from '@react-navigation/native';


const UpadateAddress = ({
  navigation, DeleteAddressApi,
  getaddressbyuserid,
  GetAddressByUserIdApi,
  getaddressbyid, DefaultAddress, defaultAddress,
  GetAddressByIdApi,
}) => {
  const[loading, setLoading] = useState(false);
  const [loader, setLoader] = useState(false);
  const [radioBtnid, setradioBtnid] = useState(defaultAddress?._id);

  useEffect(() => {
    GetAddressByUserIdApi(data => setLoading(data));
    // DefaultAddress(defaultAddress)
    GetAddressByIdApi(defaultAddress?._id);
  }, []);

  
  useFocusEffect(
    React.useCallback(() => {
      DefaultAddress(getaddressbyuserid?.find(i => i?._id == defaultAddress?._id))
    }, [])
  );

  // AIzaSyDDOhWEH6qIYmon2vqRrbsOmSdS4w-LoAQ   // map
  return (
    <View style={styles.container}>
      <Loader loading={loader} />
      {loading ?
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
          <ActivityIndicator size={'large'} color={COLORS.primary} />
        </View>
        :
        <>
          <TouchableOpacity activeOpacity={0.5}
            style={styles.t1}
            onPress={() => navigation.navigate('SaveAddress')}>
            <Text style={styles.text1}> Add Address</Text>
          </TouchableOpacity>

          <FlatList
            data={getaddressbyuserid}
            renderItem={({ item, index }) => (
              <Address
                key={index}
                firstname={item?.firstName}
                lastname={item?.lastName}
                mobile={item?.mobile}
                address={item?.address}
                apartment={item?.apartment}
                area={item?.area}
                city={item?.city}
                landmark={item?.landmark}
                country={item?.country}
                state={item?.state}
                pincode={item?.pinCode}
                onPress={() => {
                  DefaultAddress(item)
                  // GetAddressByIdApi(item?._id, navigation);
                  setradioBtnid(item?._id);
                  navigation?.goBack()
                }}
                deletePress={() => DeleteAddressApi(item?._id, (data) => setLoader(data))}
                checked={radioBtnid == item?._id ? true : false}
                onPressaddress={() => navigation?.navigate('SaveAddress', { address: item })}
              />
            )}
          />
        </>
      }
    </View>
  );
};

const mapStateToProps = state => ({
  getaddressbyuserid: state.address.getaddressbyuserid,
  getaddressbyid: state.address.getaddressbyid,
  defaultAddress: state.blacklist.defaultAddress,
});

const mapDispatchToProps = {
  GetAddressByUserIdApi,
  GetAddressByIdApi,
  DefaultAddress,
  DeleteAddressApi,
};

export default connect(mapStateToProps, mapDispatchToProps)(UpadateAddress);
