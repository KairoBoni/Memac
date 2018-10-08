import React from 'react';
import { TouchableHighlight } from 'react-native';

export default class Zoom extends React.Component {

    state = {zoom: false};
    lastPress = 0;
    
    onPress = () => {
        let newTap = new Date().getTime(); 
        let delta = newTap - this.lastPress;
        this.lastPress = newTap;
        console.log(delta);
        if (delta < 200) {
            //zoom in/out
            this.setState({zoom: !this.state.zoom});
        }
    };

    render() {
        console.log(this.state);
        return (
            <TouchableHighlight onPress={this.onPress}>
                { this.props.children }
            </TouchableHighlight>
        );
    }
}