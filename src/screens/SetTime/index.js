import {
  View,
  Text,
  Image,
  TouchableOpacity,
  TextInput,
  ScrollView,
  FlatList,
} from 'react-native';
import Modal from 'react-native-modal';
import React, { useState, useEffect } from 'react';
import styles from './styles';
import { COLORS, data, icons, images } from '../../constants';
import DatePicker from 'react-native-date-picker';
import Button from '../../component/Button';
import { formattedDate3, formattedDateServer, formattedDateServer2 } from './../../services/date';
import { connect } from 'react-redux';
import { GetAddressByIdApi } from './../../redux/actions/addressAction';
import { generateTimeArray } from '../../services/generateTimeArray';
import { RNToasty } from 'react-native-toasty';
import DateTimePicker from '@react-native-community/datetimepicker';


const SetTime = ({ navigation, route, GetAddressByIdApi, getaddressbyid, defaultAddress }) => {
  const [isModalVisible, setModalVisible] = useState(false);
  const [checked, setChecked] = React.useState('');
  const [date, setDate] = useState('');
  const [open, setOpen] = useState(false);
  const [timeList, setTimeList] = useState([]);

  useEffect(() => {
    GetAddressByIdApi();
  }, []);

  const handleTimeList = () => {
    if (date) {
      if (timeList?.[0]) {
        setModalVisible(!isModalVisible)
      } else {
        RNToasty.Error({
          title: 'Time schedule is not available on this date'
        })
      }
    } else {
      RNToasty.Error({
        title: 'Please select date first'
      })
    }
  }

  // console.log('timeList : ',date, route?.params?.data, checked);
  console.log('timeList : ', date, checked);

  return (
    <View style={styles.container}>
      <ScrollView
        style={styles.innercontainer}
        showsVerticalScrollIndicator={false}>
        {open && (
          <DateTimePicker
            value={new Date()}
            mode={'date'}
            textColor={COLORS.primary}
            minimumDate={new Date()}
            // display="spinner"
            onChange={(event, d) => {
              setOpen(false);
              if (event?.type == "set") {
                setDate(d.toISOString())
                // setDate(formattedDateServer2(d))
                setTimeList(generateTimeArray(d))
                setChecked('')
              }
              console.log('event : ', event)
            }}
          />
        )}
        {/* {open &&
          <DatePicker
            modal
            mode="date"
            open={open}
            date={new Date()}
            minimumDate={new Date()}
            androidVariant="nativeAndroid"
            onConfirm={d => {
              setOpen(false);
              setDate(d.toISOString())
              // setDate(formattedDateServer(d));
              setTimeList(generateTimeArray(d))
            }}
            onCancel={() => {
              setOpen(false);
            }}
          />
        } */}
        <TouchableOpacity onPress={() => setOpen(true)}>
          <View style={styles.box2}>
            <TextInput
              placeholderTextColor={COLORS.gray}
              placeholder={'Date'}
              // placeholderTextColor="black"
              editable={false}
              style={styles.text1}
              value={date ? formattedDateServer2(date) : ''}
            // value={`${date}`}
            />
            <Image source={icons.clcdown} style={styles.img} />
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          activeOpacity={0.7}
          // disabled={!date}

          onPress={handleTimeList}>
          <View style={styles.box2}>
            <TextInput
              placeholderTextColor={COLORS.gray}
              placeholder="Time Slot"
              editable={false}
              value={checked}
              style={styles.text1}
            />
            <Image source={icons.slottimedown} style={styles.img1} />
          </View>
        </TouchableOpacity>


        <Modal
          isVisible={isModalVisible}
          onBackdropPress={() => setModalVisible(false)}>
          <View style={styles.modalstyle}>
            <Text style={styles.text6}>Select Time</Text>
            <FlatList
              data={timeList}
              numColumns={4}
              showsVerticalScrollIndicator={false}
              renderItem={({ item, index }) => (
                <View
                  style={[
                    styles.modaldata,
                    {
                      backgroundColor:
                        checked == item.time ? COLORS.primary : COLORS.white,
                    },
                  ]}>
                  <TouchableOpacity onPress={() => { setChecked(item.time), setModalVisible(!isModalVisible) }}>
                    <Text
                      style={{
                        color: checked == item.time ? COLORS.white : COLORS.primary,
                        fontSize: 11,
                      }}>
                      {item.time}
                    </Text>
                  </TouchableOpacity>
                </View>
              )}
            />
          </View>
        </Modal>
        <Text style={styles.text5}>Address</Text>
        <View>
          <View style={styles.name}>
            <Image source={images.HomeLocation} style={styles.img3} />
            <TextInput editable={false} multiline={true} numberOfLines={3} value={`${defaultAddress?.address}, ${defaultAddress?.apartment}, ${defaultAddress?.area}, ${defaultAddress?.city}, ${defaultAddress?.landmark}, ${defaultAddress?.country}, ${defaultAddress?.state}, ${defaultAddress?.pinCode}`}
              style={styles.placeholder} />
          </View>
        </View>

        <Button
          t1={'Book Now'}
          t2={styles.btn}
          onPress={() => {
            if (date && checked) {
              navigation?.navigate("Payment", {
                data: {
                  ...route?.params?.data,
                  "time": checked || null,
                  "date": `${formattedDateServer2(date)}` || null,
                }
              })
            } else {
              RNToasty.Error({
                title: 'Please select date and time'
              })
            }
          }}
        // onPress={() => navigation.navigate('ServiceOrderSummery')}
        />
      </ScrollView>
      {/* <View style={styles.box3}>
        <Text style={styles.text3}>Location Detail</Text>
        <View style={styles.line}></View>
      </View> */}
    </View>
  );
};

const mapStateToProps = state => ({
  getaddressbyid: state.address.getaddressbyid,
  defaultAddress: state.blacklist.defaultAddress,
});

const mapDispatchToProps = {
  GetAddressByIdApi,
};

export default connect(mapStateToProps, mapDispatchToProps)(SetTime);
