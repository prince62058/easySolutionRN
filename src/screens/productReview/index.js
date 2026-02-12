import React, { useState } from 'react';
import {
  View,
  Text,
  Dimensions,
  TouchableOpacity,
  StyleSheet,
  Image,
  ScrollView,
  ActivityIndicator,
  FlatList,
  StatusBar,
} from 'react-native';
import { COLORS, FONTS, SIZES, images } from './../../constants';
import styles from './styles';
import { connect } from 'react-redux';
import { GetAllReviewApi } from '../../redux/actions/categoryAction';
import RatingCard from '../../component/card/RatingCard';
import { http2 } from '../../services/api';

const { width, height } = Dimensions.get('window');

const ProductReview = ({ navigation, route, allReview, GetAllReviewApi }) => {
  const [loading, setLoading] = useState(false)
  const [refresh, setRefresh] = useState(false)
  const [page, setPage] = useState(1)
  const productId = route?.params?.id || null

  const onRefresh = () => {
    setPage(1)
    setRefresh(true)
    GetAllReviewApi(1, productId)
    setRefresh(false)
  }

  return (
    <View style={styles.mainContainer}>
      <StatusBar backgroundColor={COLORS.primary} barStyle="light-content" />
      {/* Reviews */}

      <FlatList
        data={allReview}
        renderItem={({ item, index }) => (
          <RatingCard
            key={item._id}
            name={item?.userId?.fullName}
            source={item?.userId?.image ? { uri: http2 + item?.userId?.image } : images.profile}
            rating={item.rating}
            message={item.comment}
          />
        )}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps={'handled'}
        key={({ item, index }) => item._id}
        onEndReached={() => {
          if (allReview?.length >= 20) {
            // console.log('reached', page + 1);
            GetAllReviewApi(page + 1, productId, (data) => setLoading(data))
            setPage(page + 1)
          }
        }}
        refreshing={refresh}
        onRefresh={onRefresh}
        ListFooterComponent={() => {
          return (
            <View>
              {loading && <ActivityIndicator color={COLORS.primary} size={'large'} style={{ marginBottom: SIZES.height * .02 }} />}
            </View>
          )
        }}
      />
    </View>
  );
};
const mapStateToProps = state => ({
  allReview: state.category.allReview,
});

const mapDispatchToProps = {
  GetAllReviewApi,
};

export default connect(mapStateToProps, mapDispatchToProps)(ProductReview);
