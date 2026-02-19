import {
  Text,
  View,
  Image,
  TouchableOpacity,
  ScrollView,
  StatusBar,
} from 'react-native';
import React, { useState } from 'react';
import Modal from 'react-native-modal';
import { COLORS, icons, images } from '../../constants';
import styles from './styles';
import EditProfile from '../../component/EditProfile';
import { LogoutApi } from '../../redux/actions/authActions';
import { connect } from 'react-redux';
import Loader from '../../component/modalLoading';
import { http2 } from '../../services/api';
import LoginBox from '../../component/loginBox';
import { GetFaqApi, GetNotificationApi } from '../../redux/actions/homeActions';
import Share from 'react-native-share';
import fileBase64 from '../../services/fileBase64';


const Profile = ({ navigation, LogoutApi, GetFaqApi, GetNotificationApi, getuser, token, GetPrivacyPolicyApi }) => {
  const [firstImg, setFirstImg] = useState(null);
  const [isModalVisible, setModalVisible] = useState(false);
  const [loader, setLoader] = useState(false)

  const share = () => {
    // url: base64Img
    const options = {
      message: "Hi there, We are Easy Solution Services, We provide repair & service, installation & uninstallation of fitness equipments like treadmill, excercise bike, cross trainer and etc. Download app https://play.google.com/store/apps/details?id=com.ess.indiaonline",
      url: fileBase64?.logo
    };
    Share.open(options)
      .then(res => {
        console.log(res);
      })
      .catch(err => {
        console.log(err);
      });
  };

  // console.log("getuser data : ", getuser?.fullName)
  return (
    <ScrollView keyboardShouldPersistTaps="handled" showsVerticalScrollIndicator={false} style={styles.container}>
      <StatusBar backgroundColor={COLORS.primary} barStyle={'light-content'} />
      <Loader loading={loader} />
      {token ?
        <View style={styles.innercontainer}>
          <View style={{ justifyContent: 'center', alignItems: 'center' }}>
            <Modal
              isVisible={isModalVisible}
              animationIn={'fadeInDown'}
              backdropOpacity={0.1}>
              <View style={styles.box2}>
                <Text style={styles.text5}>Logout</Text>
                <Text style={styles.text9}></Text>
                <Text style={styles.text6}>Are You Want to Logout</Text>
                <View style={{ flexDirection: 'row', gap: 20 }}>
                  <TouchableOpacity
                    onPress={() => setModalVisible(false)}
                    style={styles.text7}>
                    <Text style={styles.text3}>Cancel</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={() => {
                      setModalVisible(false),
                        LogoutApi()
                      // navigation.navigate('SignIn');
                    }}
                    style={styles.text8}>
                    <Text style={styles.text4}>Yes</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </Modal>
          </View>
          <View style={styles.box1}>
            <View style={styles.imgpickerbox}>
              <View>
                <Image
                  source={getuser?.image ? { uri: http2 + getuser?.image } : images.profile}
                  style={styles.img}
                />
              </View>
            </View>

            <Text style={styles.text1}>{getuser?.fullName}</Text>
            <Text style={styles.text2}>+91{getuser?.phoneNumber}</Text>
            <View style={styles.line}></View>
            <EditProfile
              text={'Edit Profile'}
              profileimage={icons.Profile}
              onPress={() => navigation.navigate('EditProfile')}
            />
            <EditProfile
              text={'Notification'}
              profileimage={icons.Notification}
              coverimage={styles.resizeimg}
              onPress={() => navigation?.navigate('NotificationView')}
            />

            <EditProfile
              text="Privacy Policy"
              coverimage={styles.resizeimg}
              profileimage={icons.Lock}
              onPress={() => navigation.navigate('PrivacyPolicy')}
            // onPress={() => GetPrivacyPolicyApi(navigation, (data) => setLoader(data))}
            />
            <EditProfile
              text="FAQ"
              profileimage={icons.faq}
              onPress={() => GetFaqApi(navigation, (data) => setLoader(data))}
            // onPress={() => navigation.navigate('HelpCenter1')}
            />
             <EditProfile
              text="Chat With Us"
              profileimage={icons.chat1}
              onPress={() => navigation.navigate('SupportChat')}
            />
            <EditProfile
              text="Help Center"
              profileimage={icons.Info}
              onPress={() => navigation.navigate('HelpCenter')}
            />
            <EditProfile
              text={'Invite Friends'}
              profileimage={icons.threepeople}
              onPress={share}
            />
            <EditProfile
              text={'Log Out'}
              profileimage={icons.Logout}
              coverimage={styles.resizeimg}
              t1={{ color: COLORS.primary }}
              onPress={() => setModalVisible(true)}
            />
          </View>
        </View>
        :
        <LoginBox />
      }
    </ScrollView>
  );
};

const mapStateToProps = state => ({
  getuser: state.auth.getuser,
  token: state.auth.token,
});

const mapDispatchToProps = {
  LogoutApi,
  GetFaqApi,
  GetNotificationApi,
};

export default connect(mapStateToProps, mapDispatchToProps)(Profile);
