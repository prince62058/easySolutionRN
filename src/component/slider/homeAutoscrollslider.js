import React, { useState, useRef, useEffect } from 'react';
import {
  Dimensions,
  FlatList,
  Image,
  Text,
  View,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import { SIZES, icons, images } from '../../constants';
import { FONTS, COLORS } from '../../constants';
import { connect } from 'react-redux';
import { http2 } from '../../services/api';
const { width, height } = Dimensions.get('window');
import Video from 'react-native-video'
import Icons from '../Icons';

const HomeSlider = ({
  onPress,
  datalist,
  navigation,
  imageKey,
  source,
  resizeMode,
  imageStyle,
}) => {
  const [dataState, setDataState] = useState(datalist);
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
  const [paused, setPaused] = useState(false)
  const ref = useRef(null);


  const useInterval = (callback, delay) => {
    const savedCallback = useRef(); //null ref a raha

    useEffect(() => {
      savedCallback.current = callback;
    }, [callback]);

    useEffect(() => {
      const tick = () => {
        savedCallback.current();
      };
      if (delay !== null) {
        let id = setInterval(tick, delay);
        return () => clearInterval(id);
      }
    }, [delay]);
  };

  // useInterval(() => {
  //   goNextSlide();
  //   if (currentSlideIndex == datalist?.length - 1) {
  //     ref?.current?.scrollToOffset(0);
  //     setCurrentSlideIndex(0);
  //   }
  // }, 5000);

  const updateCurrentSlideIndex = e => {
    const contentOffsetX = e.nativeEvent.contentOffset.x;
    const currentIndex = Math.round(contentOffsetX / width);
    // setCurrentSlideIndex(currentIndex);
    setPaused(false)
    if (currentIndex % datalist.length === datalist.length - 1) {
      setCurrentSlideIndex(currentIndex),
        setDataState(dataState => [...dataState, ...datalist]);
    } else {
      // console.log(currentIndex, 'else');
      setCurrentSlideIndex(currentIndex);
    }
  };

  const goNextSlide = () => {
    const nextSlideIndex = currentSlideIndex + 1;
    if (nextSlideIndex != datalist?.length) {
      const offset = nextSlideIndex * width;
      ref?.current?.scrollToOffset({ offset });
      setCurrentSlideIndex(nextSlideIndex);
    }
  };

  console.log("paused index : ", paused)

  return (
    <View>
      <FlatList
        data={dataState}
        horizontal
        showsHorizontalScrollIndicator={false}
        pagingEnabled={true}
        onMomentumScrollEnd={updateCurrentSlideIndex}
        ref={ref}
        renderItem={({ item, index }) => (
          item[imageKey]?.endsWith('.mp4') ?
            <TouchableOpacity disabled={true}
              key={index}
              onPress={onPress}
              activeOpacity={0.6}
              
              style={styles.scrollBox}>
              <Video
                paused={paused}
                source={{ uri: http2 + item[imageKey] }}
                // ref={ref}
                // onProgress={x => {
                //   setProgress(x)
                // }}
                muted={false}
                style={styles?.scrollVideo}
                resizeMode={"cover"}
                repeat={false}
                onLoad={() => setPaused(true)}
                // rate={playSpeed}
                volume={1}
              />
              <TouchableOpacity style={styles.playbtn} onPress={() => setPaused(!paused) }>
                <Icons name={paused ? 'playcircleo' : 'pausecircleo' } size={SIZES.width * .08} color={COLORS.white} />
              </TouchableOpacity>
            </TouchableOpacity>
            :
            <TouchableOpacity disabled={true}
              key={index}
              onPress={onPress}
              activeOpacity={0.6}
              style={styles.scrollBox}>
              <Image source={{ uri: http2 + item[imageKey] }} style={[styles.scrollImage, imageStyle]} />
            </TouchableOpacity>
        )}
      />

      <View style={styles.dotbox}>
        {datalist?.map((item, index) => (
          <View
            key={index}
            style={{
              ...styles.dotstyle,
              backgroundColor:
                currentSlideIndex % datalist.length === index ? COLORS.primary : COLORS.gray20,
            }}></View>
        ))}
      </View>
    </View>
  );
};

HomeSlider.defaultProps = {
  resizeMode: 'cover'
}

export default HomeSlider;
const styles = StyleSheet.create({
  scrollBox: {
    width: width,
    backgroundColor: COLORS.white,
    alignSelf: 'center',
  },
  scrollImage: {
    width: width * 0.92,
    height: height * 0.2,
    resizeMode: 'cover',
    // resizeMode: 'contain',
    alignSelf: 'center',
    borderRadius: 10,
  },
  scrollVideo: {
    width: width * 0.92,
    height: height * 0.2,
    alignSelf: 'center',
    borderRadius: 10,
  },

  dotbox: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: height * 0.01,
  },
  dotstyle: {
    height: height * 0.011,
    width: width * 0.022,
    marginRight: width * 0.01,
    borderRadius: 7,
  },
  playbtn: {
    position: 'absolute',
    top: height * 0.075,
    left: width * 0.48,
    zIndex: 1,
    // backgroundColor: COLORS.lightGray
  },
});
