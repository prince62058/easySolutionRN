import {
  View,
  Text,
  ScrollView,
  Dimensions,
  Image,
  TouchableOpacity,
} from 'react-native';
import React, { useState, useEffect } from 'react';
import styles from './styles';
import InputText from '../../component/InputText';
import Button from '../../component/Button';
import { connect } from 'react-redux';
import MapView, { Marker, MarkerAnimated, PROVIDER_GOOGLE } from 'react-native-maps';
import { CreateAddressApi, UpdateAddressApi } from './../../redux/actions/addressAction';
import { COLORS, icons, images, FONTS } from './../../constants';
import { Formik } from 'formik';
import * as yup from 'yup';
import Loader from './../../component/modalLoading/index';
import axios from 'axios';

const { width, height } = Dimensions.get('window');

const SaveAddress = ({ navigation, CreateAddressApi, UpdateAddressApi, getpincode, getuser, route }) => {
  const [title, setTitle] = useState('Done');
  const [desc, setDesc] = useState('Your Location here');
  const [region, setRegion] = useState();
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [coordinates, setCoordinates] = useState({
    latitude: 23.264714952674804,
    longitude: 77.42099764991664,
    latitudeDelta: 0.1,
    longitudeDelta: 0.1,
  })

  const onRegionChange = e => {
    setCoordinates(e);
  }

  const address = route?.params?.address || null

 useEffect(() => {
  navigation?.setOptions({
    headerTitle: address ? "Edit Address" : "Add Address"
  })
 },[address])

  const AddressValidationSchema = yup.object().shape({
    firstName: yup.string().required('Please enter first name'),
    lastName: yup.string().required('Please enter last name'),
    mobile: yup.string().length(10, ({ length }) => `Mobile number must be ${length} digits`)
      .required('Mobile number is Required'),
    address: yup.string().required(' Address is Required'),
    apartment: yup.string().required('Apartment is Required'),
    landmark: yup.string().required('Landmark is Required'),
    latitude: yup.string().required('Latitude is Required'),
    longitude: yup.string().required('Longitude is Required'),
    pinCode: yup.string().length(6, ({ length }) => `Pincode must be ${length} digits`)
      .required('Please enter pinCode'),
  });

  const [pincodeData, setPincodeData] = useState({});
  const GetPincodeApi = async pincode => {
    axios.get(`https://api.postalpincode.in/pincode/${pincode}`)
      .then(async response => {
        if (response?.data?.[0]?.Status == 'Success') {
          setError(false)
          setPincodeData(response.data?.[0]?.PostOffice[0]);
          // console.log('pincode is data : ',response.data?.[0]?.PostOffice[0]);
        } else {
          setError(true)
          console.log('pincode is not found');
        }
      })
      .catch(error => {
        console.log('pincode error : ', error?.response);
      });
  };

  useEffect(() => {
    if (address?.pinCode)
      GetPincodeApi(address?.pinCode)
  }, [address])

  const [postData, setPostData] = useState({
    firstName: address?.firstName || '',
    lastName: address?.lastName || '',
    mobile: address?.mobile ? `${address?.mobile}` : '',
    customerId: getuser?._id,
    address: address?.address || '',
    apartment: address?.apartment || '',
    landmark: address?.landmark || '',
    area: address?.area || '',
    city: address?.city || '',
    latitude: 23.264714952674804,
    longitude: 77.42099764991664,
    pinCode: address?.pinCode ? `${address?.pinCode}` : '',
    state: address?.state || '',
    country: address?.country || '',
  });

  const handleCheck = values => {
    if (
      // pincodeData?.Block &&
      pincodeData?.State &&
      pincodeData?.District &&
      pincodeData?.Country
    ) {
      const post = {
        ...values,
        latitude: coordinates?.latitude,
        longitude: coordinates?.longitude,
        customerId: getuser?._id,
        city: pincodeData?.District,
        // city: 'Bhopal',
        state: pincodeData?.State,
        // area: pincodeData?.District,
        country: pincodeData?.Country,
      };
      if (address) {
        UpdateAddressApi(address?._id, post, navigation, data => setLoading(data));
      } else {
        CreateAddressApi(post, navigation, data => setLoading(data));
      }
      console.log('PostDtata---', post);
    }
  };

  // console.log('address?.pinCode---', address?.pinCode, pincodeData);

  return (
    <View style={styles.container}>
      <ScrollView
        style={styles.innercontainer}
        keyboardShouldPersistTaps={'handled'}
        showsVerticalScrollIndicator={false}>
        {/* <Loader loading={loading} /> */}
        <View style={{ marginVertical: height * 0.02 }}>
          <MapView
            provider={PROVIDER_GOOGLE}
            initialRegion={coordinates}
            onRegionChange={onRegionChange}
            style={styles.mapview}>
            <Marker
              draggable={true} 
              coordinate={coordinates}
              pinColor={COLORS.black}
              title={title}
              description={desc}>
              {/* <TouchableOpacity>
                <Image source={icons.pin} style={styles.mapimage} />
              </TouchableOpacity> */}
            </Marker>
          </MapView>
        </View>
        <Formik
          validationSchema={AddressValidationSchema}
          initialValues={postData}
          onSubmit={values => {
            handleCheck(values);
          }}>
          {({
            setFieldValue,
            handleChange,
            setFieldTouched,
            handleSubmit,
            values,
            errors,
            touched,
          }) => {
            return (
              <>
                <InputText
                  placeholder={'Enter First Name'}
                  onChangeText={handleChange('firstName')}
                  value={values.firstName}
                  onFocus={() => setFieldTouched("firstName")}
                  error={touched.firstName && errors.firstName}
                />
                <InputText
                  placeholder={'Enter Last Name'}
                  onChangeText={handleChange('lastName')}
                  value={values.lastName}
                  onFocus={() => setFieldTouched("lastName")}
                  error={touched.lastName && errors.lastName}
                />
                <InputText
                  placeholder={'Enter Your Mobile Number'}
                  keyboardType="numeric"
                  onChangeText={handleChange('mobile')}
                  value={values?.mobile}
                  maxLength={10}
                  onFocus={() => setFieldTouched("mobile")}
                  error={touched.mobile && errors.mobile}
                />
                <InputText
                  placeholder={'Enter Your address'}
                  onChangeText={handleChange('address')}
                  value={values.address}
                  onFocus={() => setFieldTouched("address")}
                  error={touched.address && errors.address}
                />
                <InputText
                  placeholder={'Flat No. / Apartment'}
                  onChangeText={handleChange('apartment')}
                  value={values.apartment}
                  onFocus={() => setFieldTouched("apartment")}
                  error={touched.apartment && errors.apartment}
                />
                <InputText
                  placeholder={'Enter landmark'}
                  onChangeText={handleChange('landmark')}
                  value={values.landmark}
                  onFocus={() => setFieldTouched("landmark")}
                  error={touched.landmark && errors.landmark}
                />
                  <InputText
                  placeholder={'Enter area'}
                  value={values.area}
                  // editable={false}
                  onFocus={() => setFieldTouched("area")}
                  errors={errors && errors.area}
                  onChangeText={handleChange('area')}
                />
                <InputText
                  placeholder={'PinCode'}
                  onChangeText={pincode => {
                    setError(false)
                    setFieldValue('pinCode', pincode);
                    if (pincode?.length == 6) {
                      GetPincodeApi(pincode);
                    }
                  }}
                  value={values.pinCode}
                  keyboardType={'numeric'}
                  maxLength={6}
                  onFocus={() => setFieldTouched("pinCode")}
                  error={error ? "Please enter valid pincode" : (touched?.pinCode && errors?.pinCode)}
                />
              
                <InputText
                  placeholder={'City'}
                  value={values.pinCode?.length == 6 ? pincodeData?.District : ''}
                  errors={errors && errors.city}
                  editable={false}
                  onChangeText={() => setFieldValue('city', pincodeData?.District)}
                />
                <InputText
                  placeholder={'Country'}
                  value={
                    values.pinCode?.length == 6 ? pincodeData?.Country : ''
                  }
                  errors={errors && errors.country}
                  editable={false}
                  onChangeText={() =>
                    setFieldValue('country', pincodeData?.Country)
                  }
                />
                <InputText
                  placeholder={'State'}
                  value={values.pinCode?.length == 6 ? pincodeData?.State : ''}
                  errors={errors && errors.state}
                  onChangeText={() =>
                    setFieldValue('state', pincodeData?.State)
                  }
                  editable={false}
                />

                <Button t1={'Save'} load={loading} t2={styles.btn} onPress={handleSubmit} />
              </>
            );
          }}
        </Formik>
      </ScrollView>
    </View>
  );
};

const mapStateToProps = state => ({
  getuser: state.auth.getuser,
  getpincode: state.address.getpincode,
});

const mapDispatchToProps = {
  CreateAddressApi,
  UpdateAddressApi,
  // GetPincodeApi,
};

export default connect(mapStateToProps, mapDispatchToProps)(SaveAddress);
