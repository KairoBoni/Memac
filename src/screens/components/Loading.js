import React from 'react';
import {ActivityIndicator, StyleSheet, ImageBackground} from 'react-native';

export default class Loading extends React.Component {

    componentDidMount() {
        this.props.listenAuthStatus();
    }
    
    render() {
        return (
            <ImageBackground style={[styles.container, {height: '100%', width: '100%'}]} source={require('../../images/background.jpg')}>
                <ActivityIndicator size="large" color="#fac"/>
            </ImageBackground>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    }
});