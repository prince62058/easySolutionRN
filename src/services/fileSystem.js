import RNFS from 'react-native-fs';
import Share from 'react-native-share';
import FileViewer from "react-native-file-viewer";
import { Platform, PermissionsAndroid, Linking, Alert } from 'react-native'


export const openUrl = async (url) => {
    const isSupported = await Linking.canOpenURL(url)
    if (isSupported) {
        await Linking.openURL(url);
    } else {
        Alert.alert(`Don't know how to open this url ${url}`)
    }
}

export const viewFileFromUrl = async (url, condtition, cb) => {
    cb && cb(true)
    var lastPart = url.split('/').pop();
    const localFile = `${RNFS.DownloadDirectoryPath}/${Date.now() + "-" + lastPart}`;
    console.log("url", localFile)

    if (Platform.OS === 'android') {
        // const granted = await PermissionsAndroid.requestMultiple([
        //     PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
        //     PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
        // ]);

        const granted = await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
        )
        console.log("granted", granted)
        if (granted) {
            const options = {
                fromUrl: url,
                toFile: localFile,
            };
            await RNFS.downloadFile(options)
                .promise.then(() => {
                    if (condtition == "download") {
                        cb && cb(false)
                        FileViewer.open(`file://${localFile}`, { showOpenWithDialog: true })
                            .then(() => {
                                // success
                                console.log("successass")
                            })
                            .catch(error => {
                                // error
                                console.log("rrrreeerr")

                            });

                    } else if (condtition == "share") {
                        cb && cb(false)
                        Share.open({
                            url: `file://${localFile}`,
                            title: "This is my report ",
                            // type: "pdf",
                            message: "sss"
                        })
                    }
                    console.log("localFile", localFile)
                })
                .then(() => {
                    cb && cb(false)
                    // success

                    console.log("success")
                })
                .catch((error) => {
                    cb && cb(false)
                    console.log("error asd", error)
                });
        } else {
            cb && cb(false)
            // Handle permission denied
            console.log('Permission denied');
        }
    } else {
        // Proceed with the download on iOS
        RNFS.downloadFile(options)
        cb && cb(false)
    }


};




export const fileViewer = async (url) => {
    var lastPart = url.split('/').pop();
    const localFile = `${RNFS.DownloadDirectoryPath}/${Date.now() + "-" + lastPart}`;
    console.log("url", localFile, url)

    FileViewer.open(`file://${localFile}`, { showOpenWithDialog: true })
        .then(() => {
            // success
            console.log("successass")
        })
        .catch(error => {
            // error
            console.log("rrrreeerr : ", error)

        });
}