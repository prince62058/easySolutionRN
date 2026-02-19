import React, {useState, useRef, useEffect} from 'react';
import {
  Text,
  View,
  Image,
  FlatList,
  TouchableOpacity,
  Dimensions,
  ScrollView,
  StatusBar,
} from 'react-native';
import {http2} from './../../services/api';
import {COLORS, data, icons, images} from '../../constants';
import styles from './styles';
import {connect} from 'react-redux';
import Loader from './../../component/modalLoading/index';
import Stars from 'react-native-stars';
import { GetAllReviewApi } from '../../redux/actions/categoryAction';


const AllReview = ({reviewData, GetAllReviewApi}) => {
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    GetAllReviewApi(data => setLoading(data));
  }, []);

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor={COLORS.white} barStyle={'dark-content'} />
      <Loader loading={loading} />
      <View>
        <FlatList
          data={reviewData}
          renderItem={({item, index}) => (
            <View style={styles.reviewbox}>
              <View style={styles.row}>
                <Image
                  source={{uri: http2 + item?.userId?.image}}
                  style={styles.reviewimg}
                />
                <Text style={styles.reviewtext}>{item?.userId?.fullName}</Text>
              </View>
              <View style={styles.row}>
                <Stars
                  default={item?.rating}
                  spacing={5}
                  starSize={12}
                  count={5}
                  fullStar={icons.fillstar}
                  emptyStar={icons.star}
                  disabled={true}
                />
                <Text style={styles.reviewtext}>{item?.rating}</Text>
              </View>
              <Text style={styles.reviewcontant}>{item?.message}</Text>
            </View>
          )}
        />
      </View>
    </View>
  );
};

const mapStateToProps = state => ({
  reviewData: state.order.reviewData,
});

const mapDispatchToProps = {
  GetAllReviewApi
};

export default connect(mapStateToProps, mapDispatchToProps)(AllReview);
