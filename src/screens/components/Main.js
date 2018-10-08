import React from 'react';
import {StyleSheet, TouchableOpacity, Image, Text, ImageBackground, View, Dimensions} from 'react-native';
import NavigationService from '../../utils/NavigationService';
import {PlaySound} from 'react-native-play-sound';

export default class Main extends React.Component {

    render() {
        const {
            ready,
            season,
            signOut,
            changeSeason,
        } = this.props;
        const isReady = ready && true;

        let path;

        if (season === 'Summer') {
            path = require('../../images/SummerBackground.jpg');
        } else if (season === 'Autumn') {
            path = require('../../images/AutumnBackground.jpg');
        } else if (season === 'Winter') {
            path = require('../../images/WinterBackground.jpg');
        } else /*if (season === 'Spring')*/ {
            path = require('../../images/SpringBackground.jpg');
        }

        return (        
            <ImageBackground style={{height: '100%', width: '100%'}} source={path}>
                <View style={styles.topBar}>
                    <TouchableOpacity 
                        style={styles.signOutButton} 
                        onPress={() => {
                            if (isReady) {
                                signOut();
                                NavigationService.navigate('LoadingContainer', {});
                                PlaySound('transition');
                            }
                        }} 
                    >    
                        <Text style={styles.signOutButtonText}>
                            Log Out
                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity 
                        style={styles.changeSeasonButton} 
                        onPress={() => {
                            console.log(path);
                            changeSeason();
                        }} 
                    >    
                        <Text style={styles.changeSeasonButtonText}>
                            Change Season
                        </Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.body}>
                    <TouchableOpacity 
                        onPress={() => {
                            NavigationService.navigate('DiaryContainer', {});
                            PlaySound('transition');
                        }} 
                        style={styles.fieldContainer}
                    >
                        <Image
                            style={styles.image}
                            source={require('../../images/diary.png')}
                        />
                    </TouchableOpacity>
                    <TouchableOpacity 
                        onPress={() => {
                            NavigationService.navigate('CameraContainer', {});
                            PlaySound('transition');
                        }} 
                        style={styles.fieldContainer}
                    >
                        <Image
                            style={styles.image}
                            source={require('../../images/camera.png')}
                        />
                    </TouchableOpacity>
                    <TouchableOpacity 
                        onPress={() => {
                            NavigationService.navigate('RememberContainer', {});
                            PlaySound('transition');
                        }} 
                        style={styles.fieldContainer}
                    >
                        <Image
                            style={styles.image}
                            source={require('../../images/album.png')}
                        />
                    </TouchableOpacity>
                </View>
            </ImageBackground>
        );
    }
}

const windowHeight = Dimensions.get('window').height;
const windowWidth = Dimensions.get('window').width;

const styles = StyleSheet.create({
    body: {
        flex: 1,
        justifyContent: 'space-evenly',
    },
    fieldContainer: {
        alignItems: 'center',
        alignSelf: 'center',
        marginHorizontal: windowWidth * 0.34,
    },
    image: {
        height: windowWidth * 0.32,
        width: windowWidth * 0.32,
        borderColor: '#edee',
        borderWidth: 2,
        borderRadius: windowWidth * 0.16,
    },
    topBar: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    signOutButton: {
        margin: 8,
        width: '20%',
    },
    signOutButtonText: {
        fontSize: 16,
        textAlign: 'center',
    },
    changeSeasonButton: {
        margin: 8,
        width: '35%',
    },
    changeSeasonButtonText: {
        fontSize: 16,
        textAlign: 'center',
    },
});