import React from 'react';
import {StyleSheet, Text, TextInput, ImageBackground, TouchableOpacity, TouchableWithoutFeedback, Keyboard, Dimensions} from 'react-native';
import NavigationService from '../../utils/NavigationService';
import PresentationContainer from '../../utils/containers/PresentationContainer';

export default class Remember extends React.Component {

    onDelete = async (param) => {
        if (param.memories) {
            this.props.deleteMemory(this.props.id, param.memories[param.index][0], this.props.mood);
        }
    };

    state = {zoomed: false};

    zoom = () => {
        this.setState({zoomed: !this.state.zoomed});
    }

    render() {
        const {
            searchMemory,
            updateMood,
            mood,
            id,
        } = this.props;
        
        const isReady = mood && true;

        if (!this.state.zoomed) {
            return (
                <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
                    <ImageBackground style={styles.mainView} source={require('../../images/rememberBackground.jpg')}>
                        <TouchableOpacity 
                            onPress={() => {
                                NavigationService.goBack();
                                PlaySound('transition');
                            }}
                            style={styles.backButton}
                        >    
                            <Text style={styles.backButtonText}>
                                Back
                            </Text>
                        </TouchableOpacity>
                        <TextInput
                            style={styles.moodInput}
                            onChangeText={mood => {updateMood(mood);}}
                            value={mood}
                        />
                        <TouchableOpacity 
                            onPress={() => {if(isReady) {searchMemory(id, mood);}}}
                            style={styles.searchButton} 
                        >
                            <Text style={styles.searchButtonText}>
                                Search
                            </Text>
                        </TouchableOpacity>
                        <PresentationContainer
                            delete={this.onDelete.bind(this)}
                            zoom={this.zoom.bind(this)}
                            zoomed={this.state.zoomed}
                        />                
                    </ImageBackground>
                </TouchableWithoutFeedback>
            );
        } else {
            return(
                <PresentationContainer
                    delete={this.onDelete.bind(this)}
                    zoom={this.zoom.bind(this)}
                    zoomed={this.state.zoomed}
                    style={styles.fullscreen}
                />
            );
        }
    }
}

const windowHeight = Dimensions.get('window').height;
const windowWidth = Dimensions.get('window').width;

const styles = StyleSheet.create({
    fullscreen: {
        height: windowHeight,
        width: windowWidth,
    },
    mainView: {
        height: windowHeight,
    },
    backButton: {
        width: '15%',
        margin: 8,
        marginBottom: 15,
    },
    backButtonText: {
        alignSelf: 'center',
        fontSize: 16,
    },
    searchButton: {
        margin: 8,
        marginBottom: 15,
    },
    searchButtonText: {
        alignSelf: 'center',
        fontSize: 16,
    },
    moodInput:{
        marginHorizontal: 20,
        marginVertical: 10,
    },    
});