import firebase from 'react-native-firebase';
import ImagePicker from 'react-native-image-picker';
import {Platform} from 'react-native';
import RNFS from 'react-native-fs';

export const sendMessage = (id, mood, message, dispatch) => {

    timeStamp = new Date().getTime();
    const path = RNFS.TemporaryDirectoryPath + '/' + timeStamp + '.txt';

    RNFS.writeFile(path, message, 'utf8')
        .then(sendMemory(id, mood, path, 'text/txt', dispatch, timeStamp))
        .then(RNFS.unlink(path))
        .catch(err => {alert(err.message);});

    return 'Sending...';
};

export const selectImage = dispatch => {
    const options = {
        title: null,
        takePhotoButtonTitle: 'Take a photograph',
        chooseFromLibraryButtonTitle: 'Get from the album',
        cancelButtonTitle: 'Cancel',
        mediaType: 'photo',
    };

    ImagePicker.showImagePicker(options, response => {

        if (response.didCancel) {
            console.log('User cancelled video picker');
        }
        else if (response.error) {
            console.log('ImagePicker Error: ', response.error);
        }
        else if (response.customButton) {
            console.log('User tapped custom button: ', response.customButton);
        }
        else {
            dispatch({uri: response.uri, type: 'image/jpeg'});
        }
    });
};

export const selectVideo = dispatch => {
    const options = {
        title: null,
        takePhotoButtonTitle: 'Record a film',
        chooseFromLibraryButtonTitle: 'Get recorded film',
        cancelButtonTitle: 'Cancel',
        mediaType: 'video',
    };

    ImagePicker.showImagePicker(options, (response) => {
  
        if (response.didCancel) {
            console.log('User cancelled video picker');
        }
        else if (response.error) {
            console.log('ImagePicker Error: ', response.error);
        }
        else if (response.customButton) {
            console.log('User tapped custom button: ', response.customButton);
        }
        else {
            dispatch({uri: response.uri, type: 'video/mp4'});
        }
    });
};

export const sendMemory = (id, mood, uri, type, dispatch, timeStamp = new Date().getTime()) => {

    const ref = firebase.storage().ref('Memories').child(`/${id}/${uri.match(/\/(?:.(?!\/))+$/i)[0]}`);
    const uploadUri = Platform.OS === 'ios' ? uri.replace('file://', '') : uri;
    ref.put(uploadUri, {contentType: type})
        .then(() => ref.getDownloadURL())
        .then(url => {
            firebase
                .database()
                .ref(`Memories/${id}/${timeStamp}/`)
                .set({mood: mood, url, ref, type: type})
                .then(dispatch({response: null, type: null}))
                .catch(error => {alert("There was an error: ", error);});
        })
        .catch(error => {alert(error);});
    
    return 'Sending...';
};

export const searchMemory = async (id, mood, dispatch) => {
    firebase
        .database()
        .ref(`Memories/${id}/`)
        .once("value", data => {
            if (!data.exists()) {
                dispatch([]);
            } else {
                const mood_entries = Object.entries(data._value).filter(element => {
                    return (mood) ? 
                        (element[1].mood === mood) ? 
                            true
                            :false
                    :true
                });
                dispatch(mood_entries);
            }
        }, (error) => {
            alert(error.code);
        });  
};

export const deleteMemory = (id, child, cb) => {
    firebase
        .database()
        .ref(`Memories/${id}`)
        .child(child)
        .remove()
        .then(cb)
};
