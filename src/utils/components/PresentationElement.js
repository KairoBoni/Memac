import React from 'react';
import {Image, Text, StyleSheet, View, StatusBar} from 'react-native';
import Video from 'react-native-video';

export default class PresentationElement extends React.Component {

    componentDidUpdate() {
        if ((this.props.index >= this.props.memories.length)) {
            this.props.updateIndex();
        }
    }

    render() {
        const {
            memories,
            memoryCount, 
            index,
            zoomed,
            text,
            fetchText
        } = this.props;

        if (memories){
            if (index < memoryCount){    
                if (memories[index][1].type === 'image/jpeg') {
                    return (
                        <View>
                            {zoomed && <StatusBar hidden />}
                            <Image
                                style={styles.image}
                                source={{uri: memories[index][1].url}}
                            />    
                        </View>      
                    );
                
                } else if (memories[index][1].type === 'video/mp4') {
                    return (
                        <View>
                            {zoomed && <StatusBar hidden />}
                            <Video
                                repeat
                                source={{uri: memories[index][1].url}}
                                style={styles.video}
                                resizeMode={'cover'}
                            />         
                        </View>
                    );
                } else /*if (memories[index][1].type === 'text/txt')*/{
                    fetchText(memories, index);
                    return (
                        <View>
                            {zoomed && <StatusBar hidden />}
                            <Text style={[styles.text, zoomed && {borderRadius: 0, borderWidth: 0}]}>
                                {text}
                            </Text>
                        </View>
                    );
                } 
            }
        }
        return (<View></View>);
    }
}

const styles = StyleSheet.create({
    image: {
        height: '100%',
        width: '100%',
    },
    video: {
        height: '100%',
        width: '100%',
    },
    text: {
        height: '100%',
        width: '100%',
        borderRadius: 5,
        backgroundColor: '#ffd299',
        borderWidth: 1,
        borderColor: '#543206',
    },
});