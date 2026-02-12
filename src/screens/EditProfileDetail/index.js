import {
  View,
  Text,
  TextInput,
  Image,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import React, {useEffect, useState, useRef} from 'react';
import styles from './styles';
import {COLORS, SIZES, icons, images} from '../../constants';
import Button from '../../component/Button';
import {connect} from 'react-redux';
import InputText from '../../component/InputText';
import {launchImageLibrary} from 'react-native-image-picker';
import Icons from '../../component/Icons';
import Loader from '../../component/modalLoading';
import {RNToasty} from 'react-native-toasty';
import {UpdateProfileApi} from '../../redux/actions/authActions';
import {http2} from '../../services/api';
import {Formik} from 'formik';
import * as yup from 'yup';

const EditProfileDetail = ({navigation, getuser, UpdateProfileApi}) => {
  const [loader, setLoader] = useState(false);
  const [error, setError] = useState('');
  const [image, setImage] = useState(images.profile);
  const [pic, setPic] = useState();
  const formikRef = useRef();

  const [postData, setPostData] = useState({
    fullName: getuser?.fullName || null,
    email: getuser?.email || null,
    image: http2 + getuser?.image || null,
  });

  const handleChange = (name, value) => {
    setPostData({
      ...postData,
      [name]: value,
    });
  };

  const handleSubmit = () => {
    UpdateProfileApi(postData, navigation, data => setLoader(data));
    // if (postData?.image) {
    //   UpdateProfileApi(postData, navigation, (data) => setLoader(data))
    // } else {
    //   RNToasty.Error({
    //     title: "Please select profile picture"
    //   })
    // }
  };

  const Picker = () => {
    const options = {
      mediaType: 'photo',
      includeBase64: false,
      maxHeight: 600,
      maxWidth: 600,
    };

    launchImageLibrary(options, response => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.errorCode) {
        console.log('ImagePicker Error: ', response.errorMessage);
      } else {
        const selectedImage = response.assets[0];
        setPic({
          uri: selectedImage.uri,
          name:
            selectedImage.fileName ||
            Date.now() + '-' + selectedImage.uri.slice(-10),
          type: selectedImage.type,
        });
        setImage({uri: selectedImage.uri});
      }
    });
  };

  useEffect(() => {
    if (getuser?.image) {
      setImage({uri: http2 + getuser?.image});
      setPic({
        uri: http2 + getuser?.image,
        name:
          getuser?.image?.filename ||
          Date.now() + '-' + getuser?.image?.slice(-10),
        type: 'image/jpeg',
      });
      // handleChange("image", http2 + getuser?.image)
      // formikRef?.current?.setFieldValue(
      //   "image", {
      //   uri: http2 + getuser?.image,
      //   name: getuser?.image?.filename || Date.now() + "-" + getuser?.image?.slice(-10),
      //   type: 'image/jpeg'
      // });
    }
  }, [getuser]);

  const validationSchema = yup.object().shape({
    fullName: yup.string().required('Name is required'),
    // dob: yup.string().required('Date of Birth is required'),
    email: yup.string().email('Invalid email'),
    // image: yup.object(),
  });

  console.log('get user ; ', postData, getuser);

  return (
    <View style={styles.container}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps={'handled'}>
        <Loader loading={loader} />

        <View style={styles.imgpickerbox}>
          <TouchableOpacity onPress={() => Picker()} activeOpacity={0.6}>
            <Image source={image} style={styles.img} />
            <View style={styles.edit_btn}>
              <Icons
                name={'edit'}
                size={SIZES.width * 0.06}
                color={COLORS.white}
              />
            </View>
            {/* <Image source={images.camerabase} style={styles.imgpicker} /> */}
          </TouchableOpacity>
        </View>

        <Formik
          innerRef={formikRef}
          validationSchema={validationSchema}
          initialValues={postData}
          onSubmit={values =>
            UpdateProfileApi({...values, image: pic}, navigation, data =>
              setLoader(data),
            )
          }>
          {({
            handleChange,
            handleSubmit,
            handleBlur,
            setFieldValue,
            values,
            errors,
            touched,
          }) => (
            <>
              <InputText
                placeholder="Full Name"
                value={values?.fullName}
                onChangeText={handleChange('fullName')}
                onBlur={handleBlur('name')}
                error={touched?.name && errors?.name}
              />
              <InputText
                placeholder="Email"
                value={values?.email}
                onChangeText={handleChange('email')}
                onBlur={handleBlur('email')}
                error={touched?.email && errors?.email}
              />
              <InputText
                placeholder="Phone Number"
                value={`${getuser?.phoneNumber}`}
                editable={false}
              />

              <Button t1={'Update'} t2={styles.btn} onPress={handleSubmit} />
            </>
          )}
        </Formik>
      </ScrollView>
    </View>
  );
};

const mapStateToProps = state => ({
  getuser: state.auth.getuser,
});

const mapDispatchToProps = {
  UpdateProfileApi,
};

export default connect(mapStateToProps, mapDispatchToProps)(EditProfileDetail);
