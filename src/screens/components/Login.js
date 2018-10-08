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
    fbButton: {
        height: 48,
        width: 48,
        borderRadius: 7,
        marginLeft: 15,
    },
    appLogo: {
        height: 128,
        width: 128,
    },
    loginContainer: {
        flex: 0,
        width: '90%',
        margin: 8,
        flexDirection: 'row',
        alignItems: 'stretch',
        height: 48,
    },
    loginButton: {
        flex: 1,
        backgroundColor: '#edee' ,
        borderWidth: 1,
        borderColor: 'gray',
        borderRadius: 7,
        paddingVertical: 3,
        paddingHorizontal: 7,
    },
    loginButtonText: {
        fontSize: 16,
        textAlign: 'center',
    },
    registerContainer: {
        flex: 0,
        width: '90%',
        margin: 8,
        flexDirection: 'column',
        justifyContent: 'space-around',
        height: 48,
    },
    registerButton: {
        flex: 1,
        backgroundColor: '#edee' ,
        borderWidth: 1,
        borderColor: 'gray',
        borderRadius: 7,
        paddingVertical: 3,
        paddingHorizontal: 7,
    },
    registerButtonText: {
        fontSize: 16,
        textAlign: 'center',
    },
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    inputContainer: {
        marginVertical: 40,
    },
    textInput: {
        fontFamily: 'roboto',
        height: 48,
        width: '90%',
        borderColor: 'gray',
        marginTop: 8,
    }
});