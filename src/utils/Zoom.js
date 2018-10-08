import React from 'react';
import { TouchableHighlight } from 'react-native';

export default class Zoom extends React.Component {

    state = {zoom: false};
    lastTap = 0;
    
    onPress = () => {
        const newTap = new Date().getTime(); 
        if (newTap - this.lastTap < 250) {
            this.setState({zoom: !this.state.zoom});
        }
        this.lastTap = newTap;

    };

    render() {
        return (
            <TouchableHighlight onPress={this.onPress}>
                { this.props.children }
            </TouchableHighlight>
        );
    }
}