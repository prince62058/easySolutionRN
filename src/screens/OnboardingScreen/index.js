import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  SafeAreaView,
  Dimensions,
  StatusBar,
  FlatList,
  Image,
  StyleSheet,
} from 'react-native';
import { COLORS, images, icons, data } from '../../constants';
import { ONBOARDING } from '../../redux/types';
import { useDispatch } from 'react-redux';
const { width, height } = Dimensions.get('window');

const OnBoardingScreen = ({ navigation }) => {
  const [currentSlideIndex, setCurrentSlideIndex] = React.useState(0);
  const dispatch = useDispatch()

  const Slide = ({ item }) => {
    return (
      <View style={{ alignItems: 'center' }}>
        <Image
          source={item.img}
          style={{ height: height * 0.556, width: width }}
        />
        <Text
          style={{
            color: COLORS.black,
            fontSize: 32,
            textAlign: 'center',
            width: width * 0.83,
            fontFamily: 'Poppins-Bold-800',
          }}>
          {item.title}
        </Text>
        <Text
          style={{
            width,
            color: '#535763',
            fontSize: 15,
            textAlign: 'center',
            maxWidth: '90%',
            marginTop: 8,
            lineHeight: 23,
            fontFamily: 'Poppins-Regular-400',
          }}>
          {item.subTitle}
        </Text>
      </View>
    );
  };
  const ref = React.useRef(null);

  const Footer = () => {
    return (
      <View
        style={{
          height: height * 0.2,
          justifyContent: 'space-between',
          paddingHorizontal: 20,
        }}>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'center',
            marginTop: 25,
          }}>
          {data.OnBoardingData.map((_, index) => (
            <View
              key={index}
              style={[
                style.indicator,
                currentSlideIndex == index && { backgroundColor: '#EC2F07' },
              ]}
            />
          ))}
        </View>
        <View style={{ marginBottom: 45, alignItems: 'center' }}>
          {currentSlideIndex == data.OnBoardingData.length - 1 ? (
            <View style={{ flexDirection: 'row' }}>
              <TouchableOpacity
                style={[style.btn]}
                onPress={() => {
                  navigation.navigate("StackNavigator")
                  dispatch({
                    type: ONBOARDING,
                    payload: false,
                  })
                }}
              // onPress={() => navigation.replace('MobileNo')}
              >
                <Text
                  style={{
                    fontSize: 16,
                    fontWeight: 'bold',
                    color: COLORS.white,
                  }}>
                  Get Started
                </Text>
              </TouchableOpacity>
            </View>
          ) : (
            <View style={{ flexDirection: 'row' }}>
              <TouchableOpacity style={[style.next]} onPress={goNextSlide}>
                <Image
                  source={icons.sign}
                  resizeMode="contain"
                  style={style.next_icon}
                />
              </TouchableOpacity>
            </View>
          )}
        </View>
      </View>
    );
  };

  const updateCurrentSlideIndex = e => {
    const contentOffsetX = e.nativeEvent.contentOffset.x;
    const currentIndex = Math.round(contentOffsetX / width);
    // console.log(currentIndex)
    setCurrentSlideIndex(currentIndex);
  };

  const goNextSlide = () => {
    const nextSlideIndex = currentSlideIndex + 1;
    if (nextSlideIndex != data.OnBoardingData.length) {
      const offset = nextSlideIndex * width;
      ref?.current?.scrollToOffset({ offset });
      setCurrentSlideIndex(nextSlideIndex);
    }
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.white }}>
      <StatusBar backgroundColor={COLORS.white} barStyle={'dark-content'} />
      <FlatList
        ref={ref}
        onMomentumScrollEnd={updateCurrentSlideIndex}
        pagingEnabled
        data={data.OnBoardingData}
        contentContainerStyle={{ height: height * 0.78 }}
        horizontal
        showsHorizontalScrollIndicator={false}
        renderItem={({ item }) => <Slide item={item} />}
      />
      <Footer />
    </SafeAreaView>
  );
};
export default OnBoardingScreen;

const style = StyleSheet.create({
  indicator: {
    height: 8,
    width: 8,
    borderRadius: 10,
    backgroundColor: '#F8B0A1',
    marginHorizontal: 5,
  },
  btn: {
    // flex:1,
    width: '50%',
    height: 50,
    borderRadius: 8,
    backgroundColor: COLORS.primary,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 10,
    shadowColor: COLORS.primary,
  },
  next_icon: {
    width: width * 0.08,
    height: height * 0.04,
  },
  next: {
    width: width * 0.14,
    height: height * 0.07,
    backgroundColor: COLORS.primary,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 1000,
  },
});
