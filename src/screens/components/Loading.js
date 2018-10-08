import React from 'react';
import {Text, ActivityIndicator, StyleSheet, ImageBackground} from 'react-native';

export default class Loading extends React.Component {

    componentDidMount() {
        this.props.listenAuthStatus();
    }
    
    render() {
        return (
            <ImageBackground style={[styles.container, {height: '100%', width: '100%'}]} source={require('../../images/background.jpg')}>
                <Text style={styles.loadingText}>Loading</Text>
                <ActivityIndicator size="large" />
            </ImageBackground>
        );
    }
}

const styles = StyleSheet.create({
    loadingText: {
    },
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    }
});