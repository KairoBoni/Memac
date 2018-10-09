import React from 'react';
import {StyleSheet, Text, View, TouchableOpacity, TextInput, Dimensions, TouchableWithoutFeedback, Keyboard, Image, ImageBackground} from 'react-native';
import NavigationService from '../../utils/NavigationService';
import AwesomeAlert from 'react-native-awesome-alerts';

export default class Camera extends React.Component {

    state = {showAlert: false, title: ''};
    timer = null;

    showAlert = () => {
        this.setState({
            showAlert: true
        });
    };
     
    hideAlert = () => {
        this.setState({
            showAlert: false
        });
    };

    render() {
        const {
            id,
            mood,
            uri,
            type,
            updateMood,
            selectImage,
            selectVideo,
            sendMemory,
        } = this.props;
        const {showAlert} = this.state;
        const isReady = mood && true;
        
        return (
            <TouchableWithoutFeedback onPress= {Keyboard.dismiss} accessible={false}>
                <ImageBackground style={styles.background} source={require('../../images/cameraBackground.jpg')}>
                    <View style={styles.topBar}>
                        <TouchableOpacity 
                            onPress={() => {
                                clearInterval(this.timer);
                                NavigationService.goBack();
                                PlaySound('transition');
                            }}
                            style={styles.backButton}
                        >    
                            <Text style={styles.backButtonText}>
                                Back
                            </Text>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.container}>
                        <Text>
                            What's the mood of the memory?
                        </Text>
                        <TextInput
                            style={styles.moodInput} 
                            onChangeText={mood => {updateMood(mood);}}
                            value={mood}
                            editable={isReady}
                        />
                    </View>
                    <View style={styles.sideBySideIcons}>
                        <TouchableOpacity 
                            onPress={() => {selectImage();}}
                        >
                            <Image
                                source={require('../../images/photo.png')}
                                style={styles.selectButton}
                            />
                        </TouchableOpacity>
                        <TouchableOpacity 
                            onPress={() => {selectVideo();}}
                        >
                            <Image
                                source={require('../../images/film.png')}
                                style={styles.selectButton}
                            />
                        </TouchableOpacity>
                    </View>
                    <TouchableOpacity 
                        onPress={() => {
                            if ((isReady && uri)) {
                                this.setState({title: sendMemory(id, mood, uri, type)}, () => {
                                    this.showAlert();
                                    this.timer = setInterval(() => {
                                        this.hideAlert();
                                    }, 1800);
                                });
                            }
                        }}
                        style={styles.sendButton} 
                    >
                        {type === 'video/mp4' && 
                            <Text style={[styles.sendButtonText, !(isReady && uri) && styles.unavaible]}>
                                Send Video
                            </Text>
                        }
                        {type === 'image/jpeg' && 
                            <Text style={[styles.sendButtonText, !(isReady && uri) && styles.unavaible]}>
                                Send Photo
                            </Text>
                        }
                        {type === null && 
                            <Text style={[styles.sendButtonText, styles.unavaible]}>
                                Send Memory
                            </Text>
                        }
                    </TouchableOpacity>

                    <AwesomeAlert
                        show={showAlert}
                        showProgress={false}
                        title={this.state.title}
                        closeOnTouchOutside={false}
                        closeOnHardwareBackPress={false}
                    />

                </ImageBackground>
            </TouchableWithoutFeedback>
        );
    }
}

const windowHeight = Dimensions.get('window').height;
const windowWidth = Dimensions.get('window').width;
const lesserDimension = (windowHeight > windowWidth)
    ? windowWidth : windowHeight;

const styles = StyleSheet.create({
    background: {
        height: windowHeight, 
        width: windowWidth, 
    },
    moodInput: {
        fontFamily: 'roboto',
        height: 47.5,
        marginVertical: 4,
    },
    sideBySideIcons: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginHorizontal: 25,
        marginVertical: 15,
    },
    backButton: {
        height: lesserDimension * 0.16,
        width: lesserDimension * 0.16,
        alignSelf: 'flex-start',
        margin: 8,
    },
    backButtonText: {
        height: lesserDimension * 0.16,
        width: lesserDimension * 0.16,
        borderRadius: lesserDimension * 0.08,
        fontSize: 18,
        textAlign: 'center',
        textAlignVertical: 'center',
        color: 'black',
    },
    topBar: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    sendButton: {
        marginTop: 5,
    },
    sendButtonText: {
        alignSelf: 'center',
        fontSize: 16,
        color: '#f77',  
    },
    selectButton: {
        height: lesserDimension * 0.2,
        width: lesserDimension * 0.2,
        borderWidth: 1,
        borderRadius: lesserDimension * 0.1,
        borderColor: '#edee', 
    },
    presentationContainer: {
        flexGrow: 0,
        flexShrink: 0,
        height: windowHeight * 0.6,
        width: windowWidth * 0.6,
        alignSelf: 'center',
    },
    container: {
        paddingHorizontal: 20,
        paddingVertical: 10,
    },
    image: {
        height: windowHeight * 0.6,
        width: windowWidth * 0.6,
        alignSelf: 'center',
    },
    unavaible: {
        color: '#aaac',
        backgroundColor: '#333c',
    },
});