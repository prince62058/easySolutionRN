import {View, Text, FlatList, Image, ScrollView} from 'react-native';
import React, {useEffect, useState} from 'react';
import styles from './styles';
import {data, images, COLORS, SIZES} from '../../constants';
import {
  GetParentCategoryApi,
  GetSubCategoryApi,
  GetByProductIdApi,
} from './../../redux/actions/categoryAction';
import {connect} from 'react-redux';
import {http2} from './../../services/api';
import Services from './../../component/Services/index';
import Cart from './../../component/Cart/index';
import Loader from './../../component/modalLoading/index';

const HomeServices = ({
  navigation,
  GetParentCategoryApi, userstate,
  getParentCategory,
  getsubCategory,
  GetSubCategoryApi,
  GetByProductIdApi,
}) => {
  const [loading, setLoading] = useState(false);
  const [redborder, setRedborder] = useState();
  useEffect(() => {
    if (getParentCategory?.[0]) {
      GetSubCategoryApi(
        getParentCategory?.[0]?._id,
        setRedborder(getParentCategory?.[0]?._id),
      );
    }
  }, []);

  

  navigation?.setOptions({
    title: userstate == "Services" ? "Service" : "Category"
  })

  // console.log("getParentCategory service : ", getParentCategory)

  return (
    <View style={styles.container}>
      <Loader loading={loading} />

      <ScrollView showsVerticalScrollIndicator={false}>
        {getParentCategory?.[0] ? (
          <View>
            <FlatList
              data={getParentCategory}
              horizontal
              showsHorizontalScrollIndicator={false}
              renderItem={({item, index}) => (
                <Services
                  key={index}
                  ml={index == 0 ? SIZES.width * .04 : SIZES.width * .02}
                  mr={index == getParentCategory?.length - 1 ? SIZES.width * .04 : 0 }
                  img={item?.icon ? { uri: http2 + item?.icon} : images?.no_image}
                  text={item?.name}
                  onPress={() => {
                    GetSubCategoryApi( item?._id, '', setRedborder(item?._id));
                  }}
                  checked={redborder == item?._id ? true : false}
                />
              )}
            />
            {getsubCategory?.[0] ? (
              <FlatList
                data={getsubCategory}
                showsHorizontalScrollIndicator={false}
                pagingEnabled={true}
                renderItem={({item, index}) => {
                  return (
                    <Cart
                      key={index}
                      img={item?.thumnail ? {uri: http2 + item?.thumnail} : images?.no_image}
                      title={item?.title}
                      desc={item?.subtitle}
                      price={item?.price}
                      rate={item?.reviewRating}
                      onPress={() =>
                        GetByProductIdApi(item?._id, navigation, data => setLoading(data))
                      }
                    />
                  );
                }}
              />
            ) : (
              <View>
                <Image source={images.notfound} style={styles.image} />
                <Text style={styles.text}>No Service found...</Text>
              </View>
            )}
          </View>
        ) : (
          <View>
            <Image source={images.notfound} style={styles.image} />
            <Text style={styles.text}>No More Services Here...</Text>
          </View>
        )}
      </ScrollView>
    </View>
  );
};

const mapStateToProps = state => ({
  getParentCategory: state.category.getParentCategory,
  getsubCategory: state.category.getsubCategory,
  userstate: state.blacklist.userstate,
});

const mapDispatchToProps = {
  GetParentCategoryApi,
  GetSubCategoryApi,
  GetByProductIdApi,
};

export default connect(mapStateToProps, mapDispatchToProps)(HomeServices);
