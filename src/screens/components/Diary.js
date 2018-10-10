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
                                maxLength={40}
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
                                onContentSizeChange={event => {this.setState({messageHeight: event.nativeEvent.contentSize.height})}}
                            />
                        </View>
                        <TouchableOpacity 
                            onPress={() => {
                                if (message) {
                                    this.setState({title: sendMessage(this.props)}, () => {
                                        this.showAlert();
                                        this.timer = setInterval(() => {
                                            this.hideAlert();
                                        }, 1800);
                                    });
                                }
                            }} 
                            style={styles.sendMessageButton}
                        >
                            <Text style={[styles.sendMessageButtonText, !(mood  && message) && styles.unavaible]}>
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
        height: 47.5,
        marginVertical: 4,
    },
    messageInput: {
        marginVertical: 4,
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
    },
    sendMessageButton: {
        alignSelf: 'center',
    },
    sendMessageButtonText: {
        height: lesserDimension * 0.2,
        width: lesserDimension * 0.2,
        borderRadius: lesserDimension * 0.1,
        fontSize: 20,
        textAlign: 'center',
        textAlignVertical: 'center',
    },
    container: {
        marginHorizontal: 20,
        marginVertical: 10,
    },
    unavaible: {
        color: '#aaac',
        backgroundColor: '#333c',
    },
});