import React from 'react';
import {StyleSheet, Text, TextInput, View, TouchableOpacity, TouchableWithoutFeedback, Keyboard, ImageBackground, ScrollView, Dimensions} from 'react-native';
import NavigationService from '../../utils/NavigationService';
import AwesomeAlert from 'react-native-awesome-alerts';

export default class Diary extends React.Component {

    state = {messageHeight: 47.5, showAlert: false, title: ''};
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
            mood, 
            message,
            updateMood,
            updateMessage,
            sendMessage,
        } = this.props;
        const {showAlert} = this.state;
        const isReady = mood && true;
        
        return (
            <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
                <ImageBackground style={styles.background} source={require('../../images/diaryBackground.jpg')}>
                    <ScrollView>
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
                        <View style={styles.container}>
                            <Text>
                                Write down the memory
                            </Text>
                            <TextInput
                                style={[styles.messageInput, {height: Math.max(47.5, this.state.messageHeight)}]}
                                onChangeText={message => {updateMessage(message);}}
                                value={message}
                                multiline={true}
                                editable={isReady}
                                onContentSizeChange={event => {this.setState({messageHeight: event.nativeEvent.contentSize.height})}}
                            />
                        </View>
                        <TouchableOpacity 
                            onPress={() => {
                                if (isReady && message) {
                                    this.setState({title: sendMessage(this.props)}, () => {
                                        this.showAlert();
                                        this.timer = setInterval(() => {
                                            this.hideAlert();
                                        }, 3000);
                                    });
                                }
                            }} 
                            style={styles.sendMessageButton}
                        >
                            <Text style={[styles.sendMessageButtonText, !(isReady  && message) && {color: '#aaa'}]}>
                                Send
                            </Text>
                        </TouchableOpacity>
                    </ScrollView>
                    <AwesomeAlert
                        show={showAlert}
                        showProgress={false}
                        title={this.state.title}
                        closeOnTouchOutside={false}
                        closeOnHardwareBackPress={false}
                        showConfirmButton={true}
                        confirmText="Ok"
                        confirmButtonColor="#EE8B75"
                        onConfirmPressed={() => {
                            this.hideAlert();
                            clearInterval(this.timer);
                        }}
                    />
                </ImageBackground>
            </TouchableWithoutFeedback>
        );
    }
}

const windowHeight = Dimensions.get('window').height;
const windowWidth = Dimensions.get('window').width;

const styles = StyleSheet.create({
    background: {
        height: windowHeight, 
        width: windowWidth, 
    },
    moodInput: {
    },
    messageInput: {
    },
    backButton: {
        height: windowWidth * 0.16,
        width: windowWidth * 0.16,
        alignSelf: 'flex-start',
    },
    backButtonText: {
        height: windowWidth * 0.16,
        width: windowWidth * 0.16,
        borderRadius: windowWidth * 0.08,
        borderWidth: 1,
        alignSelf: 'center',
        fontSize: 18,
    },
    sendMessageButton: {
        margin: 8,
        marginBottom: 15,
        alignSelf: 'center',
    },
    sendMessageButtonText: {
        fontSize: 16,
        color: '#c7e',
        marginBottom: 20,
    },
    container: {
        marginHorizontal: 20,
        marginVertical: 10,
    }
});