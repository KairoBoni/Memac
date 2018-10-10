import React from 'react';
import { StyleSheet, Text, TextInput, View, TouchableOpacity, Image, ImageBackground } from 'react-native';

export default class Login extends React.Component {

    state = { email: 'jorgeluizsvi@gmail.com', password: '123456'};

    render() {
        const {
            login,
            signUp,
            fbLogin,
        } = this.props;
        
        return (
            <ImageBackground style={[styles.container, {height: '100%', width: '100%'}]} source={require('../../images/loginBackground.jpg')}>
                <Image 
                    source={require('../../images/logo.png')}
                    style={styles.appLogo}
                />
                <TextInput
                    style={styles.textInput}
                    autoCapitalize="none"
                    placeholder="Email"
                    onChangeText={email => {this.setState({email});}}
                    value={this.state.email}
                />
                <TextInput
                    secureTextEntry
                    style={styles.textInput}
                    autoCapitalize="none"
                    placeholder="Password"
                    onChangeText={password => {this.setState({password});}}
                    value={this.state.password}
                />
                <View style={styles.loginContainer}>
                    <TouchableOpacity  style={styles.loginButton} onPress={() => {
                        login(this.state.email, this.state.password);
                        PlaySound('transition');
                    }} >
                        <Text style={styles.loginButtonText}>
                            Login
                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => {
                        fbLogin();
                        PlaySound('transition');
                    }} >
                        <Image 
                            source={require('../../images/fb.png')}
                            style={styles.fbButton}
                        />
                    </TouchableOpacity>
                </View>
                <View style={styles.registerContainer}>
                    <TouchableOpacity style={styles.registerButton} onPress={() => {
                        signUp(this.state.email, this.state.password);
                        PlaySound('transition');
                    }} >
                        <Text style={styles.registerButtonText}>
                            Sign Up
                        </Text>
                    </TouchableOpacity>
                </View>
            </ImageBackground>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    appLogo: {
        height: 128,
        width: 128,
    },
    loginContainer: {
        flex: 0,
        height: 48,
        width: '90%',
        margin: 4,
        flexDirection: 'row',
        alignItems: 'stretch',
    },
    loginButton: {
        flex: 1,
        height: 48,
    },
    loginButtonText: {
        fontSize: 16,
        height: 48,
    },
    fbButton: {
        height: 48,
        width: 48,
        borderRadius: 7,
        marginLeft: 15,
    },
    registerContainer: {
        flex: 0,
        height: 48,
        width: '90%',
        margin: 4,
        flexDirection: 'column',
        justifyContent: 'space-around',
    },
    registerButton: {
        flex: 1,
        height: 48,
    },
    registerButtonText: {
        fontSize: 16,
        height: 48,
    },
    textInput: {
        height: 48,
        width: '90%',
        borderColor: 'gray',
        margin: 4,
    }
});