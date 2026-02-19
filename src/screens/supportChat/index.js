import React, {
  useEffect,
  useRef,
  useState,
  useCallback,
  useMemo,
  useLayoutEffect,
} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  Dimensions,
  TouchableOpacity,
  StatusBar,
  ScrollView,
  FlatList,
  TextInput,
  Keyboard,
  BackHandler,
  RefreshControl,
  Linking,
} from 'react-native';
import {COLORS, FONTS, images, icons, data, SIZES} from '../../constants';
import styles from './styles';
import {connect, useDispatch} from 'react-redux';
import {io} from 'socket.io-client';
import Modal from 'react-native-modal';
import Voice from '@react-native-community/voice';
import lottie from '../../constants/lottie';
import LottieView from 'lottie-react-native';
import {http2, socketURL} from '../../services/api';
import {
  useFocusEffect,
  useIsFocused,
  useNavigation,
} from '@react-navigation/native';
import {
  GetMsgApi,
  GetSupportQuestionsApi,
  GetThreadIdApi,
  SendMsgApi,
} from '../../redux/actions/chatAction';
import DocumentPicker from 'react-native-document-picker';
import Icons from '../../component/Icons';
import {ActivityIndicator} from 'react-native';
import Video from 'react-native-video';
import checkValidUrl from '../../utils/checkValidUrl';
const {height, width} = Dimensions.get('window');

// const MsgCard = ({ msg, time, cardStyle, source, onPress, fileType }) => {
//     const renderContent = () => {
//         switch (fileType) {
//             case 'image':
//                 return <Image source={source} style={styles.chatimage} />;
//             case 'video':
//                 return (
//                     <Video
//                         source={source}
//                         style={styles.videoPlayer}
//                         controls={true} // Show video controls
//                         resizeMode="cover"
//                     />
//                 );
//             case 'pdf':
//             case 'xl':
//             case 'apk':
//                 return (
//                     <TouchableOpacity onPress={onPress} style={styles.fileLink}>
//                         <Text style={styles.fileLinkText}>{`Open ${fileType.toUpperCase()} File`}</Text>
//                     </TouchableOpacity>
//                 );
//             default:
//                 return <Text style={styles.msgText}>{msg}</Text>;
//         }
//     };

//     return (
//         <TouchableOpacity
//             activeOpacity={0.5}
//             disabled={!source}
//             onPress={onPress}
//             style={[styles.msgCard, cardStyle]}
//         >
//             {renderContent()}
//         </TouchableOpacity>
//     );
// };

const SupportChat = ({
  navigation,
  SendMsgApi,
  GetMsgApi,
  userData,
  getMsgData,
  route,
  GetThreadIdApi,
  GetSupportQuestionsApi,
}) => {
  const dispatch = useDispatch();
  const [questionList, setQuestionList] = useState(null);
  const [threadData, setThreadData] = useState(null);
  const [micModal, setMicModal] = useState(false);
  const [imageSrc, setImageSrc] = useState(null);
  const [refresh, setRefresh] = useState(false);
  const [loading, setLoading] = useState(false);
  const [msgLoading, setMsgLoading] = useState(false);
  const [msgData, setMsgData] = useState([]);
  useLayoutEffect(() => {
    navigation?.setOptions({
      headerShown: imageSrc ? false : true,
    });
  }, [imageSrc]);

  // voice
  const speechStartHandler = e => {
    // console.log('speechStart successful', e);
  };

  const speechEndHandler = e => {
    // setLoading(false);
    setMicModal(false);
    console.log('stop handler', e);
  };

  const speechResultsHandler = e => {
    const text = e.value[0];
    handleChange('message', text);
  };

  const startRecording = async () => {
    // setLoading(true);
    try {
      await Voice.start('en-Us');
    } catch (error) {
      console.log('error', error);
    }
  };

  useEffect(() => {
    Voice.onSpeechStart = speechStartHandler;
    Voice.onSpeechEnd = speechEndHandler;
    Voice.onSpeechResults = speechResultsHandler;
    return () => {
      Voice.destroy().then(Voice.removeAllListeners);
    };
  }, []);
  //=====

  // msgcard

  const MsgCard = ({msg, time, cardStyle, source, onPress}) => {
    const getFileExtension = uri => {
      return uri?.split('.').pop().toLowerCase();
    };
    const fileExtension = source?.uri ? getFileExtension(source.uri) : null;

    const [isVideoPlaying, setIsVideoPlaying] = useState(false);

    const handlePress = () => {
      if (
        fileExtension === 'jpg' ||
        fileExtension === 'png' ||
        fileExtension === 'jpeg' ||
        fileExtension === 'gif' ||
        fileExtension === 'bmp' ||
        fileExtension === 'tiff' ||
        fileExtension === 'webp' ||
        fileExtension === 'ico'
      ) {
        // setImageSrc(source);
        Linking.openURL(source?.uri);
      } else if (
        fileExtension === 'mp4' ||
        fileExtension === 'mov' ||
        fileExtension === 'avi' ||
        fileExtension === 'mkv' ||
        fileExtension === 'wmv' ||
        fileExtension === 'flv' ||
        fileExtension === 'mpg' ||
        fileExtension === 'mpeg' ||
        fileExtension === '3gp' ||
        fileExtension === 'm4v' ||
        fileExtension === 'webm'
      ) {
        // setIsVideoPlaying(true);
        Linking.openURL(source?.uri);
      } else if (
        fileExtension === 'pdf' ||
        fileExtension === 'xl' ||
        fileExtension === 'apk' ||
        fileExtension === 'xlsx' ||
        fileExtension === 'xls' ||
        fileExtension === 'doc' ||
        fileExtension === 'docx' ||
        fileExtension === 'ppt' ||
        fileExtension === 'pptx' ||
        fileExtension === 'txt' ||
        fileExtension === 'csv' ||
        fileExtension === 'zip' ||
        fileExtension === 'rar' ||
        fileExtension === '7z' ||
        fileExtension === 'tar' ||
        fileExtension === 'gz' ||
        fileExtension === 'bz2' ||
        fileExtension === 'html' ||
        fileExtension === 'htm' ||
        fileExtension === 'css' ||
        fileExtension === 'js' ||
        fileExtension === 'json'
      ) {
        Linking.openURL(source?.uri);
        // Linking.openURL("https://satyakabir-bucket.sgp1.digitaloceanspaces.com/HomeService/17282841421761727859196456.mp4")
      } else if (checkValidUrl(msg)) {
        Linking.openURL(msg);
      }
      console.log('pressed: ', checkValidUrl(msg));
    };

    console.log(
      'source : ',
      checkValidUrl(msg),
      !source ? !checkValidUrl(msg) : !source,
    );

    return (
      <TouchableOpacity
        activeOpacity={0.5}
        disabled={!source ? !checkValidUrl(msg) : !source}
        onPress={handlePress}
        style={[styles.msgCard, cardStyle]}>
        {fileExtension === 'jpg' ||
        fileExtension === 'png' ||
        fileExtension === 'jpeg' ||
        fileExtension === 'gif' ||
        fileExtension === 'bmp' ||
        fileExtension === 'tiff' ||
        fileExtension === 'webp' ||
        fileExtension === 'ico' ? (
          <Image source={source} style={styles.chatimage} />
        ) : fileExtension === 'mp4' ||
          fileExtension === 'mov' ||
          fileExtension === 'avi' ||
          fileExtension === 'mkv' ||
          fileExtension === 'wmv' ||
          fileExtension === 'flv' ||
          fileExtension === 'mpg' ||
          fileExtension === 'mpeg' ||
          fileExtension === '3gp' ||
          fileExtension === 'm4v' ||
          fileExtension === 'webm' ? (
          isVideoPlaying ? (
            <Video
              source={source}
              style={styles.videoPlayer}
              controls={true}
              resizeMode="cover"
              onEnd={() => setIsVideoPlaying(false)}
            />
          ) : (
            <Image source={icons.video} style={styles.chatimage} />
          )
        ) : fileExtension === 'pdf' ||
          fileExtension === 'xl' ||
          fileExtension === 'apk' ||
          fileExtension === 'xlsx' ||
          fileExtension === 'xls' ||
          fileExtension === 'doc' ||
          fileExtension === 'docx' ||
          fileExtension === 'ppt' ||
          fileExtension === 'pptx' ||
          fileExtension === 'txt' ||
          fileExtension === 'csv' ||
          fileExtension === 'zip' ||
          fileExtension === 'rar' ||
          fileExtension === '7z' ||
          fileExtension === 'tar' ||
          fileExtension === 'gz' ||
          fileExtension === 'bz2' ||
          fileExtension === 'html' ||
          fileExtension === 'htm' ||
          fileExtension === 'css' ||
          fileExtension === 'js' ||
          fileExtension === 'json' ? (
          <Text style={styles.link}>{source?.uri}</Text>
        ) : checkValidUrl(msg) ? (
          <Text style={styles.link}>{msg}</Text>
        ) : (
          <Text style={styles.msgText}>{msg}</Text>
        )}
      </TouchableOpacity>
    );
  };

  const [postData, setPostData] = useState({
    from: userData?._id,
    message: '',
    // image: '',
    userType: 'USER',
    messageType: 'USER',
  });

  const handleChange = (name, value) => {
    setPostData({
      ...postData,
      [name]: value,
    });
  };

  // image picker
  const OnSelectImage = () => {
    // { allowMultiSelection: true }
    DocumentPicker.pick({
      type: [DocumentPicker.types.allFiles],
    })
      .then(async response => {
        // console.log("DocumentPicker res : ", response)
        // setIsImage(response?.[0])
        // let file = {
        //     uri: response?.[0]?.uri,
        //     name: response?.[0]?.filename || Date.now() + '-' + response?.[0]?.uri.slice(-10),
        //     type: response?.[0]?.type,
        // }
        let post = {
          from: userData?._id,
          message: '',
          image: response?.at(0),
          userType: 'USER',
          messageType: 'USER',
        };
        SendMsgApi(post, (data, res) => {
          setMsgLoading(data);
          if (res?.success) {
            if (threadData) {
              GetMsgApi(threadData?._id, (data, res) => {
                if (res?.success) {
                  setMsgData(res?.data);
                }
              });
            } else {
              GetThreadIdApi((data, res) => {
                if (res?.success && res?.data) {
                  GetMsgApi(res?.data?._id, (data, res) => {
                    if (res?.success) {
                      setMsgData(res?.data);
                    }
                  });
                  setThreadData(res?.data);
                } else if (!data) {
                  setThreadData(null);
                }
              });
            }
          }
        });
      })
      .catch(error => {
        console.log('DocumentPicker error : ', error);
      });
  };

  const scrollViewRef = useRef();

  const backAction = () => {
    if (imageSrc) {
      setImageSrc(null);
    } else {
      navigation?.goBack();
    }
    return true;
  };

  useFocusEffect(
    React.useCallback(() => {
      const backHandler = BackHandler.addEventListener(
        'hardwareBackPress',
        backAction,
      );

      return () => backHandler.remove();
    }, [imageSrc]),
  );

  useLayoutEffect(() => {
    setLoading(true);
    GetThreadIdApi((data, res) => {
      if (res?.success && res?.data?._id) {
        // setLoading(data)
        console.log('GetThreadIdApi response : ', res?.data?._id);
        GetMsgApi(res?.data?._id, (data, res) => {
          setLoading(data);
          if (res?.success) {
            setMsgData(res?.data);
          }
        });
        setThreadData(res?.data);
      } else if (!data) {
        setThreadData(null);
      }
    });
    GetSupportQuestionsApi((data, res) => {
      // setLoading(data)
      if (res?.success) {
        setQuestionList(res?.data);
      } else if (!data) {
        setQuestionList(null);
      }
    });
  }, []);

  useEffect(() => {
    socketAction();
  }, [threadData]);

  const socketAction = async () => {
    let socket;
    const SOCKET_URL = socketURL;
    socket = io(SOCKET_URL);
    // console.log("socket")
    socket.on('connect', () => {
      console.log('Connected to server');
    });

    socket.on(`newMessage/${threadData?._id}`, getMsg => {
      GetMsgApi(threadData?._id, (data, res) => {
        if (res?.success) {
          setMsgData(res?.data);
        }
      });

      // console.log("socket msg", getMsg)
    });

    socket.on('disconnect', () => {
      console.log('Disconnected from server');
    });
  };

  const handleSubmit = () => {
    SendMsgApi(
      {...postData, message: postData?.message?.trim()},
      (data, res) => {
        setMsgLoading(data);
        if (res?.success) {
          if (threadData) {
            GetMsgApi(threadData?._id, (data, res) => {
              if (res?.success) {
                setMsgData(res?.data);
              }
            });
          } else {
            GetThreadIdApi((data, res) => {
              if (res?.success && res?.data) {
                GetMsgApi(res?.data?._id, (data, res) => {
                  if (res?.success) {
                    setMsgData(res?.data);
                  }
                });
                setThreadData(res?.data);
              } else if (!data) {
                setThreadData(null);
              }
            });
          }
        }
      },
    );
    handleChange('message', null);
  };

  // console.log("msgData : ",msgData?.[1])

  const renderList = useMemo(() => {
    return (
      <ScrollView
        ref={scrollViewRef}
        keyboardShouldPersistTaps="handled"
        style={styles.innercontainer}
        onContentSizeChange={() => scrollViewRef?.current?.scrollToEnd()}>
        {questionList?.[0] && (
          <View style={[!msgData?.[0] && {height: SIZES.height * 0.85}]}>
            <View
              style={[
                styles.questionBox,
                !msgData?.[0] && {position: 'absolute', bottom: 0},
              ]}>
              <Text style={styles.questionText}>
                Please let me know what you need help with before I connect you
                with an agent.
              </Text>
              {questionList?.[0] &&
                questionList?.map((item, index) => (
                  <TouchableOpacity
                    activeOpacity={0.5}
                    key={index}
                    style={styles.questionRow}
                    onPress={() => {
                      let arr = msgData ? [...msgData] : [];
                      arr.push({
                        message: item?.question,
                        createdAt: new Date(),
                        from: userData?.data?._id,
                        messageType: 'USER',
                      });
                      arr.push({
                        message: item?.answer,
                        createdAt: new Date(),
                        from: userData?.data?._id,
                        messageType: 'ADMIN',
                      });
                      // dispatch({
                      //     type: GET_CHAT_MSG,
                      //     payload: arr
                      // })
                      setMsgData(arr);
                    }}>
                    <Text style={styles.question}>{item?.question}</Text>
                    <Icons name="right" size={24} color={COLORS.blue} />
                  </TouchableOpacity>
                ))}
            </View>
          </View>
        )}
        {msgData?.[0] &&
          msgData?.map((item, index) => (
            <MsgCard
              key={index}
              cardStyle={
                item?.messageType == 'ADMIN'
                  ? {borderTopLeftRadius: 0}
                  : {borderTopRightRadius: 0, alignSelf: 'flex-end'}
              }
              msg={item?.message}
              time={item?.createdAt}
              source={
                item?.image?.uri
                  ? item?.image
                  : item?.image
                  ? {uri: http2 + item?.image}
                  : null
              }
              onPress={() =>
                handlePress(
                  item?.image?.uri
                    ? item?.image
                    : item?.image
                    ? {uri: http2 + item?.image}
                    : null,
                )
              }
            />
          ))}
      </ScrollView>
    );
  }, [msgData, questionList]);

  // console.log("msgData : ", getMsgData?.[getMsgData?.length - 1])
  // console.log("getMsgData : ", questionList)

  return (
    <View style={styles.container}>
      <StatusBar
        backgroundColor={COLORS.primary}
        barStyle={'light-content'}
        hidden={imageSrc ? true : false}
      />
      {imageSrc && (
        <Image
          source={imageSrc}
          style={{
            width: SIZES.width,
            height: SIZES.height,
            position: 'absolute',
            zIndex: 99,
          }}
        />
      )}

      {loading ? (
        <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
          <ActivityIndicator size={'large'} color={COLORS.primary} />
        </View>
      ) : (
        <>
          {renderList}
          {/* {msgLoading && (
                        <View style={styles.gifBox}>
                            <Image source={lottie.dots} style={styles.gif} />
                        </View>
                    )} */}
        </>
      )}
      {/* input field */}
      <View>
        <View>
          <View style={[styles.row, {marginBottom: 8}]}>
            <View style={styles.inputbox}>
              <TextInput
                placeholder="Message..."
                placeholderTextColor={COLORS.gray50}
                style={[
                  styles.inputtext,
                  postData?.message && {width: width * 0.57},
                ]}
                // editable={show == true ? false : true}
                value={postData?.message}
                onChangeText={text => {
                  handleChange('message', text);
                }}
              />
              <TouchableOpacity
                // onPress={startRecording}
                onPress={() => {
                  setMicModal(true), startRecording();
                }}
                style={styles.micTouch}>
                <Image source={icons.mic} style={styles.fileattach2} />
              </TouchableOpacity>
              {/* {!postData?.message && */}
              <TouchableOpacity onPress={OnSelectImage} style={styles.micTouch}>
                <Image source={icons.fileattach2} style={styles.fileattach3} />
              </TouchableOpacity>
              {/* } */}
            </View>

            <TouchableOpacity
              disabled={postData?.message?.length > 0 ? false : true}
              onPress={() => {
                handleSubmit();
                // handleArrayChange({ message: postData?.message?.trim() })
                // Voice.onSpeechStart(() => Voice.start)
              }}>
              <Image source={icons.send} style={styles.sendimg} />
            </TouchableOpacity>
          </View>
        </View>
      </View>
      <Modal
        isVisible={micModal}
        backdropOpacity={0.3}
        animationOut={'slideOutDown'}
        onBackButtonPress={() => setMicModal(false)}
        onBackdropPress={() => setMicModal(false)}>
        <View style={styles.micModalMain}>
          <LottieView
            source={lottie.voiceSearch}
            autoPlay
            loop
            style={styles.voiceLotti}
          />
          <Text style={styles.speakText}>Speak Now</Text>
        </View>
      </Modal>
    </View>
  );
};

const mapStateToProps = state => ({
  userData: state.auth.getuser,
  getMsgData: state.chat.getMsgData,
});

const mapDispatchToProps = {
  SendMsgApi,
  GetMsgApi,
  GetThreadIdApi,
  GetSupportQuestionsApi,
};

export default connect(mapStateToProps, mapDispatchToProps)(SupportChat);

// import React, { useEffect, useRef, useState, useCallback, useMemo, useLayoutEffect } from 'react';
// import { StyleSheet, Text, View, Image, Dimensions, TouchableOpacity, StatusBar, ScrollView, FlatList, TextInput, Keyboard, BackHandler, RefreshControl, Linking, } from 'react-native';
// import { COLORS, FONTS, images, icons, data, SIZES } from '../../constants';
// import styles from './styles';
// import { connect, useDispatch } from 'react-redux';
// import { io } from "socket.io-client";
// import Modal from 'react-native-modal';
// import Voice from '@react-native-community/voice';
// import lottie from '../../constants/lottie';
// import LottieView from 'lottie-react-native'
// import { http2 } from '../../services/api';
// import { useFocusEffect, useIsFocused, useNavigation } from '@react-navigation/native';
// import { GetMsgApi, GetSupportQuestionsApi, GetThreadIdApi, SendMsgApi } from '../../redux/actions/chatAction';
// import DocumentPicker from 'react-native-document-picker'
// import Icons from '../../component/Icons';
// import { ActivityIndicator } from 'react-native';
// import Video from 'react-native-video';
// // import VideoPlayer from 'react-native-video-player';

// const { height, width } = Dimensions.get('window');

// const MsgCard = ({ msg, time, cardStyle, source, onPress }) => {
//     // let type = source?.slice(-3)
//     // console.log("source : ", source)
//     return (
//         <TouchableOpacity activeOpacity={0.5} disabled={source ? false : true}
//             //  onPress={() => navigation?.navigate("FullImage", {image: source})}
//             onPress={onPress}
//             style={[styles.msgCard, cardStyle]}>
//             {source ? <Image source={source} style={styles.chatimage} />
//                 :
//                 <Text style={styles.msgText}>{msg}</Text>
//             }
//             {/* <Text style={styles.msgTime}>{formatAMPM(time)}</Text> */}
//         </TouchableOpacity>
//     )
// }

// const MsgCard = ({ msg, time, cardStyle, source, onPress, fileType }) => {
//     const renderContent = () => {
//         switch (fileType) {
//             case 'image':
//                 return <Image source={source} style={styles.chatimage} />;
//             case 'video':
//                 return (
//                     <Video
//                         source={source}
//                         style={styles.videoPlayer}
//                         controls={true} // Show video controls
//                         resizeMode="cover"
//                     />
//                 );
//             case 'pdf':
//             case 'xl':
//             case 'apk':
//                 return (
//                     <TouchableOpacity onPress={onPress} style={styles.fileLink}>
//                         <Text style={styles.fileLinkText}>{`Open ${fileType.toUpperCase()} File`}</Text>
//                     </TouchableOpacity>
//                 );
//             default:
//                 return <Text style={styles.msgText}>{msg}</Text>;
//         }
//     };

//     return (
//         <TouchableOpacity
//             activeOpacity={0.5}
//             disabled={!source}
//             onPress={onPress}
//             style={[styles.msgCard, cardStyle]}
//         >
//             {renderContent()}
//         </TouchableOpacity>
//     );
// };

// const SupportChat = ({ navigation, SendMsgApi, GetMsgApi, userData, getMsgData, route, GetThreadIdApi, GetSupportQuestionsApi }) => {

//     const dispatch = useDispatch()
//     const [questionList, setQuestionList] = useState(null);
//     const [threadData, setThreadData] = useState(null)
//     const [micModal, setMicModal] = useState(false)
//     const [imageSrc, setImageSrc] = useState(null);
//     const [refresh, setRefresh] = useState(false)
//     const [loading, setLoading] = useState(false)
//     const [msgLoading, setMsgLoading] = useState(false)
//     const [msgData, setMsgData] = useState([])

//     navigation?.setOptions({
//         headerShown: imageSrc ? false : true
//     })

//     // voice
//     const speechStartHandler = e => {
//         console.log('speechStart successful', e);
//     };

//     const speechEndHandler = e => {
//         // setLoading(false);
//         setMicModal(false)
//         console.log('stop handler', e);
//     };

//     const speechResultsHandler = e => {
//         const text = e.value[0];
//         handleChange("message", text)
//     };

//     const startRecording = async () => {
//         // setLoading(true);
//         try {
//             await Voice.start('en-Us');
//         } catch (error) {
//             console.log('error', error);
//         }
//     };

//     useEffect(() => {
//         Voice.onSpeechStart = speechStartHandler;
//         Voice.onSpeechEnd = speechEndHandler;
//         Voice.onSpeechResults = speechResultsHandler;
//         return () => {
//             Voice.destroy().then(Voice.removeAllListeners);
//         };
//     }, []);
//     //=====

//     const [postData, setPostData] = useState({
//         'from': userData?._id,
//         'message': '',
//         // image: '',
//         "userType": 'USER',
//         "messageType": "USER"
//     })

//     const handleChange = (name, value) => {
//         setPostData({
//             ...postData,
//             [name]: value
//         })
//     }

//     // image picker

//     const getFileType = (mime) => {
//         if (mime.startsWith('image/')) return 'image'; // Handle all image types
//         if (mime.startsWith('video/')) return 'video'; // Handle all video types
//         if (mime === 'application/pdf') return 'pdf'; // PDF files
//         if (mime === 'application/vnd.android.package-archive') return 'apk'; // APK files
//         if (mime.includes('spreadsheet') || mime.includes('excel')) return 'xl'; // Excel files
//         return 'other'; // Any other type
//     };

//     const OnSelectImage = () => {
//         DocumentPicker.pick({ allowMultiSelection: true })
//             .then(async response => {
//                 response.forEach(async (file) => {
//                     const fileType = getFileType(file.mime); // Get the file type
//                     let post = {
//                         'from': userData?._id,
//                         'message': '',
//                         "userType": 'USER',
//                         "messageType": "USER",
//                         "file": {
//                             uri: file.uri,
//                             name: file.name || Date.now() + '-' + file.uri.slice(-10),
//                             type: file.mime,
//                         },
//                         "fileType": fileType // Include file type
//                     };
//                     // Sending message with file
//                     SendMsgApi(post, (data, res) => {
//                         setMsgLoading(data);
//                         if (res?.success) {
//                             // Fetch updated messages
//                             updateMessages();
//                         }
//                     });
//                 });
//             }).catch(error => {
//                 console.log("DocumentPicker error: ", error);
//             });
//     };

//     const scrollViewRef = useRef();

//     const backAction = () => {
//         if (imageSrc) {
//             setImageSrc(null)
//         } else {
//             navigation?.goBack()
//         }
//         return true;
//     };

//     useFocusEffect(
//         React.useCallback(() => {
//             const backHandler = BackHandler.addEventListener("hardwareBackPress", backAction);

//             return () => backHandler.remove();
//         }, [imageSrc])
//     );

//     useLayoutEffect(() => {
//         setLoading(true)

//         GetThreadIdApi((data, res) => {
//             if (res?.success && res?.data?._id) {
//                 // setLoading(data)
//                 // console.log("GetThreadIdApi response : ", res?.data?._id);
//                 GetMsgApi(res?.data?._id, (data, res) => {
//                     setLoading(data)
//                     if (res?.success) {
//                         setMsgData(res?.data)
//                     }
//                 })
//                 setThreadData(res?.data)

//             } else if (!data) {
//                 setThreadData(null)
//             }
//         })
//         GetSupportQuestionsApi((data, res) => {
//             // setLoading(data)
//             if (res?.success) {
//                 setQuestionList(res?.data)
//             } else if (!data) {
//                 setQuestionList(null)
//             }
//         })
//     }, [])

//     useEffect(() => {
//         socketAction()
//     }, [threadData])

//     const socketAction = async () => {

//         let socket
//         const SOCKET_URL = "https://api.essindiaonline.com"
//         socket = io(SOCKET_URL)
//         // console.log("socket")
//         socket.on("connect", () => {
//             console.log("Connected to server")
//         })

//         socket.on(`newMessage/${threadData?._id}`, (getMsg) => {
//             GetMsgApi(threadData?._id, (data, res) => {
//                 if (res?.success) {
//                     setMsgData(res?.data)
//                 }
//             })

//             console.log("socket msg", getMsg)
//         })

//         socket.on("disconnect", () => {
//             console.log("Disconnected from server")
//         })
//     }

//     const handleSubmit = () => {
//         SendMsgApi({ ...postData, message: postData?.message?.trim() }, (data, res) => {
//             setMsgLoading(data)
//             if (res?.success) {
//                 if(threadData){
//                     GetMsgApi(threadData?._id, (data, res) => {
//                         if (res?.success) {
//                             setMsgData(res?.data)
//                         }
//                     })
//                 }else {
//                     GetThreadIdApi((data, res) => {
//                         if (res?.success && res?.data) {
//                             GetMsgApi(res?.data?._id, (data, res) => {
//                                 if (res?.success) {
//                                     setMsgData(res?.data)
//                                 }
//                             })
//                             setThreadData(res?.data)
//                         } else if (!data) {
//                             setThreadData(null)
//                         }
//                     })
//                 }
//             }
//         })
//         handleChange("message", null)
//     }

//     // console.log("msgData : ", msgData, questionList?.[0], userData?._id)

//     const renderList = useMemo(() => {
//         return (
//             <ScrollView
//             showsVerticalScrollIndicator={false}
//                 ref={scrollViewRef}
//                 keyboardShouldPersistTaps="handled"
//                 style={styles.innercontainer}
//                 onContentSizeChange={() => scrollViewRef?.current?.scrollToEnd()}
//             >
//                 {questionList?.[0] &&
//                     <View style={[!msgData?.[0] && { height: SIZES.height * .85 }]}>
//                         <View style={[styles.questionBox, !msgData?.[0] && { position: 'absolute', bottom: 0 }]}>
//                             <Text style={styles.questionText}>Please let me know what you need help with before I connect you with an agent.</Text>
//                             {questionList?.[0]&& questionList?.map((item, index) => (
//                                 <TouchableOpacity activeOpacity={0.5} key={index} style={styles.questionRow}
//                                     onPress={() => {
//                                         let arr = msgData ? [...msgData] : []
//                                         arr.push({ message: item?.question, createdAt: new Date(), from: userData?.data?._id, messageType: 'USER' })
//                                         arr.push({ message: item?.answer, createdAt: new Date(), from: userData?.data?._id, messageType: 'ADMIN' })
//                                         // dispatch({
//                                         //     type: GET_CHAT_MSG,
//                                         //     payload: arr
//                                         // })
//                                         setMsgData(arr)
//                                     }}
//                                 >
//                                     <Text style={styles.question}>{item?.question}</Text>
//                                     <Icons name='right' size={24} color={COLORS.blue} />
//                                 </TouchableOpacity>
//                             ))}
//                         </View>
//                     </View>
//                 }
//                 {/* {msgData?.[0] && msgData?.map((item, index) => (
//                     <MsgCard
//                     key={index}
//                         cardStyle={item?.messageType == "ADMIN" ? { borderTopLeftRadius: 0, } : { borderTopRightRadius: 0, alignSelf: 'flex-end', }}
//                         msg={item?.message}
//                         time={item?.createdAt}
//                         source={item?.image?.uri ? item?.image : (item?.image ? { uri: http2 + item?.image } : null)}
//                         // onPress={() => {
//                         //     setImageSrc(item?.image?.uri ? item?.image : (item?.image ? { uri: http2 + item?.image } : null))
//                         // }}
//                     /> */}

// {msgData?.[0] && msgData?.map((item, index) => (
//                     <MsgCard
//                         key={index}
//                         cardStyle={item?.messageType == "ADMIN" ? { borderTopLeftRadius: 0, } : { borderTopRightRadius: 0, alignSelf: 'flex-end', }}
//                         msg={item?.message}
//                         time={item?.createdAt}
//                         source={item?.file ? { uri: item.file.uri } : null}
//                         fileType={item?.fileType}
//                         onPress={() => handleFileOpen(item)}
//                     />
//                 ))}
//             </ScrollView>
//         )
//     }, [msgData, questionList])

//     // console.log("msgData : ", getMsgData?.[getMsgData?.length - 1])
//     // console.log("getMsgData : ", questionList)

//     return (
//         <View style={styles.container}>
//             <StatusBar backgroundColor={COLORS.primary} barStyle={'light-content'} hidden={imageSrc ? true : false} />
//             {imageSrc && <Image source={imageSrc} style={{
//                 width: SIZES.width,
//                 height: SIZES.height,
//                 position: 'absolute',
//                 zIndex: 99
//             }} />}

//             {loading ?
//                 <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
//                     <ActivityIndicator size={'large'} color={COLORS.primary} />
//                 </View>
//                 :
//                 <>
//                     {renderList}
//                     {/* {msgLoading && (
//                         <View style={styles.gifBox}>
//                             <Image source={lottie.dots} style={styles.gif} />
//                         </View>
//                     )} */}
//                 </>
//             }

//             {/* input field */}
//             <View>
//                 <View >
//                     <View style={[styles.row, { marginBottom: 8 }]}>
//                         <View style={styles.inputbox}>

//                             <TextInput
//                                 placeholder="Message..."
//                                 placeholderTextColor={COLORS.gray50}
//                                 style={[
//                                     styles.inputtext, postData?.message && { width: width * 0.57, }
//                                 ]}
//                                 // editable={show == true ? false : true}
//                                 value={postData?.message}
//                                 onChangeText={(text) => { handleChange("message", text) }}
//                             />
//                             <TouchableOpacity
//                                 // onPress={startRecording}
//                                 onPress={() => { setMicModal(true), startRecording() }}
//                                 style={styles.micTouch}
//                             >
//                                 <Image source={icons.mic} style={styles.fileattach2} />
//                             </TouchableOpacity>
//                             {/* {!postData?.message && */}
//                             <TouchableOpacity
//                                 onPress={OnSelectImage}
//                                 style={styles.micTouch}
//                             >
//                                 <Image source={icons.fileattach2} style={styles.fileattach3} />
//                             </TouchableOpacity>
//                             {/* } */}
//                         </View>

//                         <TouchableOpacity disabled={postData?.message?.length > 0 ? false : true} onPress={() => {
//                             handleSubmit()
//                             // handleArrayChange({ message: postData?.message?.trim() })
//                             // Voice.onSpeechStart(() => Voice.start)
//                         }} >
//                             <Image source={icons.send} style={styles.sendimg} />
//                         </TouchableOpacity>

//                     </View>

//                 </View>

//             </View>

//             <Modal isVisible={micModal} backdropOpacity={0.3} animationOut={'slideOutDown'}
//                 onBackButtonPress={() => setMicModal(false)}
//                 onBackdropPress={() => setMicModal(false)}
//             >
//                 <View style={styles.micModalMain} >
//                     <LottieView source={lottie.voiceSearch} autoPlay loop style={styles.voiceLotti} />
//                     <Text style={styles.speakText}>Speak Now</Text>
//                 </View>

//             </Modal>

//         </View>
//     );
// };

// const mapStateToProps = state => ({
//     userData: state.auth.getuser,
//     getMsgData: state.chat.getMsgData
// });

// const mapDispatchToProps = {
//     SendMsgApi,
//     GetMsgApi,
//     GetThreadIdApi,
//     GetSupportQuestionsApi
// };

// export default connect(mapStateToProps, mapDispatchToProps)(SupportChat);
