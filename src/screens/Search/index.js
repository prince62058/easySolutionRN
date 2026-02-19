// import { StyleSheet, Text, View, Image, TextInput, TouchableOpacity, Dimensions, StatusBar } from 'react-native'
// const { height, width } = Dimensions.get("window")
// import React from 'react'
// import { FONTS, icons } from '../../constants'
// import styles from './styles'
// import { connect } from 'react-redux'

// const Search = ({navigation, }) => {
//     return (
//         <View style={styles.container}>
//             <View style={styles.box1}>
//                 <Text style={styles.text1}>
//                     Recent
//                 </Text>
//                 <TouchableOpacity>
//                     <Text style={styles.text2}>
//                         See All
//                     </Text>
//                 </TouchableOpacity>
//             </View>
//             <View>
//                 <Image source={icons.linesearch} style={styles.img}></Image>
//             </View>
//         </View>
//     )
// }

// const mapStateToProps = state => ({
//     getbyProductid: state.category.getbyProductid,
//     userstate: state.blacklist.userstate,
//   });

//   const mapDispatchToProps = {

//   };

//   export default connect(mapStateToProps, mapDispatchToProps)(Search);

import React, {useState, useEffect} from 'react';
import {
  Image,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StatusBar,
  FlatList,
  ScrollView,
  ActivityIndicator,
  Dimensions,
} from 'react-native';
import {COLORS, FONTS, SIZES} from './../../constants';
import styles from './styles';
import {icons, images} from './../../constants';
import {connect, useDispatch} from 'react-redux';
import {http2} from '../../services/api';
import {GetByProductIdApi, SearchApi} from '../../redux/actions/categoryAction';
import Loader from '../../component/modalLoading';
import Cart from '../../component/Cart';
import {SEARCH_DATA} from '../../redux/types';

const Search = ({navigation, SearchApi, GetByProductIdApi, searchData}) => {
  const [loading, setLoading] = useState(false);
  const [loading1, setLoading1] = useState(false);
  const [loadingIndicator, setLoadingIndicator] = useState(false);
  const [title, setTitle] = useState(null);
  const [refresh, setRefresh] = useState(false);
  const [page, setPage] = useState(1);

  const dispatch = useDispatch();

  React.useLayoutEffect(() => {
    navigation?.setOptions({
      headerTitle: () => (
        <View style={styles.search_box}>
          <Image source={icons.Search} style={styles.homeheaderimg3} />
          <TextInput
            placeholder="Search"
            style={styles.t1}
            placeholderTextColor={COLORS.gray}
            value={title}
            onChangeText={text => {
              setTitle(text), SearchApi(page, text, data => setLoading(data));
            }}
          />
        </View>
      ),
    });
  }, [navigation, title, page]);
  useEffect(() => {
    handleSearchData();
  }, []);

  const handleSearchData = () => {
    if (title == null) {
      dispatch({
        type: SEARCH_DATA,
        payload: null,
      });
    }
  };

  const onRefresh = () => {
    setPage(1);
    setRefresh(true);
    SearchApi(1, title);
    setRefresh(false);
  };

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor={COLORS.primary} barStyle="light-content" />
      <Loader loading={loadingIndicator} />

      {loading ? (
        <View style={{flex: 1, justifyContent: 'center'}}>
          <ActivityIndicator size={'large'} color={COLORS.primary} />
        </View>
      ) : searchData?.[0] ? (
        <View>
          <FlatList
            data={searchData}
            renderItem={({item, index}) => (
              <Cart
                key={index}
                mt={index == 0 ? SIZES.height * 0.01 : 0}
                img={{uri: http2 + item?.thumnail}}
                title={item?.title}
                desc={item?.subtitle}
                price={item?.price}
                rate={item?.reviewRating}
                onPress={() =>
                  GetByProductIdApi(item?._id, navigation, data =>
                    setLoadingIndicator(data),
                  )
                }
              />
            )}
            showsVerticalScrollIndicator={false}
            keyboardShouldPersistTaps={'handled'}
            key={({item, index}) => item._id}
            onEndReached={() => {
              if (searchData?.length >= 20 && title) {
                // console.log('reached', page + 1);
                SearchApi(page + 1, title, data => setLoading1(data));
                setPage(page + 1);
              }
            }}
            refreshing={refresh}
            onRefresh={onRefresh}
            ListFooterComponent={() => {
              return (
                <View>
                  {loading1 && (
                    <ActivityIndicator
                      color={COLORS.primary}
                      size={'large'}
                      style={{marginBottom: SIZES.height * 0.02}}
                    />
                  )}
                </View>
              );
            }}
          />
        </View>
      ) : (
        <>
          {title ? (
            <View style={styles.box2}>
              <Image source={images.notfound} style={styles.img1} />

              <Text style={[styles.text3, {fontSize: 25, color: COLORS.black}]}>
                Not Found
              </Text>
              <Text style={styles.text3}>
                Sorry, the keyword you entered cannot be found, please check
                agagin or search with another keyword.
              </Text>
            </View>
          ) : (
            <View style={styles.box3}>
              <Image source={images.search} style={styles.img2} />

              <Text style={styles.text4}>You can search here</Text>
            </View>
          )}
        </>
      )}
    </View>
  );
};
const mapStateToProps = state => ({
  searchData: state.category.searchData,
});

const mapDispatchToProps = {
  SearchApi,
  GetByProductIdApi,
};

export default connect(mapStateToProps, mapDispatchToProps)(Search);
