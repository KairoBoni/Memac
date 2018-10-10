import React from 'react';
import {StyleSheet, Text, TextInput, ImageBackground, TouchableOpacity, TouchableWithoutFeedback, Keyboard, Dimensions, View} from 'react-native';
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

    componentDidMount() {
        this.props.searchMemory(this.props.id, this.props.mood);
    }

    render() {
        const {
            searchMemory,
            updateMood,
            mood,
            id,
        } = this.props;
        
        if (!this.state.zoomed) {
            return (
                <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
                    <ImageBackground style={styles.background} source={require('../../images/rememberBackground.jpg')}>
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
                        <View style={styles.container}>
                            <TextInput
                                style={styles.moodInput}
                                onChangeText={mood => {
                                    updateMood(mood);
                                    searchMemory(id, mood);
                                }}
                                value={mood}
                            />
                        </View>
                            
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
const lesserDimension = (windowHeight > windowWidth)
    ? windowWidth : windowHeight;

const styles = StyleSheet.create({
    fullscreen: {
        height: windowHeight,
        width: windowWidth,
    },
    background: {
        height: windowHeight, 
        width: windowWidth, 
    },
    moodInput: {
        height: 47.5,
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
    container: {
        marginHorizontal: 20,
        marginVertical: 10,
    },
});