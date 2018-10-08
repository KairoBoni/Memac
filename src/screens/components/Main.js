import React from 'react';
import {StyleSheet, TouchableOpacity, Image, Text, ImageBackground, View} from 'react-native';
import NavigationService from '../../utils/NavigationService';
import {PlaySound} from 'react-native-play-sound';

export default class Main extends React.Component {

    render() {
        const {
            ready,
            signOut,
            changeSeason,
        } = this.props;
        const isReady = ready && true;

        return (        
            <ImageBackground style={{height: '100%', width: '100%'}} source={require('../../images/background.jpg')}>
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
                            changeSeason();
                        }} 
                    >    
                        <Text style={styles.changeSeasonButtonText}>
                            Change Season
                        </Text>
                    </TouchableOpacity>
                </View>
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
                    <Text style={styles.subtitle}>
                        Diary
                    </Text>
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
                    <Text style={styles.subtitle}>
                        Camera
                    </Text>
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
                    <Text style={styles.subtitle}>
                        Album
                    </Text>
                </TouchableOpacity>
            </ImageBackground>
        );
    }
}

const styles = StyleSheet.create({
    fieldContainer: {
        alignItems: 'center',
        alignSelf: 'center',
        marginTop: 20,
    },
    image: {
        height: 115,
        width: 115,
    },
    subtitle: {
        color: '#777',
        margin: 8,
        fontSize: 12,
    },
    topBar: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    signOutButton: {
        marginTop: 8,
        marginBottom: 15,
        width: '25%',
    },
    signOutButtonText: {
        fontSize: 16,
        textAlign: 'center',
    },
    changeSeasonButton: {
        marginTop: 8,
        marginBottom: 15,
        width: '40%',
    },
    changeSeasonButtonText: {
        fontSize: 16,
        textAlign: 'center',
    },
});