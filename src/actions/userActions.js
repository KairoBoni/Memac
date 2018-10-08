import firebase from 'react-native-firebase';
import { AccessToken, LoginManager } from 'react-native-fbsdk';
import NavigationService from '../utils/NavigationService';

export const login = async (email, password) => {
    await firebase
        .auth()
        .signInAndRetrieveDataWithEmailAndPassword(email, password)
        .catch(error => {console.log(error);});
    
    if(firebase.auth()._user) {
        return await getUserId(firebase.auth()._user._user.email);
    } else {
        return null;
    }
};

export const getUserId = async email => {

    let userId = '';
    await firebase
        .database()
        .ref(`Users/`)
        .once("value", async data => {
            const _userId = data._childKeys.find(key => 
                a = (data._value[key].email === email) 
                    ? data._value[key].userId 
                    : false               
            );
            userId = (_userId) 
                ? _userId 
                : setUserId(email, firebase.auth()._user._user.uid)
        });
    return userId
};

export const signUp = async (email, password) => {
    await firebase
        .auth()
        .createUserAndRetrieveDataWithEmailAndPassword(email, password)
        .catch(error => {alert(error);});

    return setUserId(email, firebase.auth()._user._user.uid);
};

setUserId = async (email, userId) => {
    await firebase
        .database()
        .ref(`Users/${userId}/`)
        .set({email, userId})
        .catch(error => this.setState({errorMessage: error.message}));
    return (userId);
};

export const signOut = async () => {
    firebase
        .auth()
        .signOut()
        .catch(error => alert(error));
};

export const getNotifications = async userId => {
    await firebase.messaging().requestPermission();
    const token = await firebase.messaging().getToken();
    await firebase
        .database()
        .ref(`Notifications/${userId}/`)
        .set({token})
        .catch(error => this.setState({errorMessage: error.message}));
};

export const fbLogin = async () => {
    await LoginManager.logInWithReadPermissions(['public_profile', 'email', 'user_friends']).then(async () => {
        const data = await AccessToken.getCurrentAccessToken();
        const credential = firebase.auth.FacebookAuthProvider.credential(data.accessToken);
        firebase.auth().signInAndRetrieveDataWithCredential(credential);
    }).catch (error => {console.log(error);});

    if(firebase.auth()._user) {
        return await getUserId(firebase.auth()._user._user.email);
    } else {
        return null;
    }
};

export const listenAuthStatus = dispatch => {
    let userId = null;
    firebase.auth().onAuthStateChanged(async user => {
        if (user) {
            userId = await getUserId(user._user.email);
            NavigationService.navigate('MainContainer');
            this.notificationListener = firebase.notifications().onNotification((notification) => {

                // Process your notification as required
                const {
                    body,
                    data,
                    notificationId,
                    sound,
                    subtitle,
                    title
                } = notification;
                console.log("LOG: ", title, body, JSON.stringify(data))
            });
            
        } else {
            NavigationService.navigate('LoginContainer');
        }
        dispatch(userId);
    });
};