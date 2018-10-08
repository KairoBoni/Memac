import React from 'react';
import {Animated, StyleSheet, Dimensions, PanResponder, TouchableOpacity, View, Text} from 'react-native';
import PresentationElementContainer from '../containers/PresentationElementContainer';
export default class Presentation extends React.Component {

    position = new Animated.Value(0);
    lastTouch = 0;

    panResponder = PanResponder.create({
        onStartShouldSetPanResponder: () => true,
        onPanResponderMove: (ev, gst) => {
            this.position.setValue(gst.dx);
        },
        onPanResponderStart: () => {
            let thisTouch = new Date().getTime();
            if (thisTouch - this.lastTouch < 200) {
                this.props.zoom();
            }
            this.lastTouch = thisTouch;
        },
        onPanResponderRelease: (ev, gst) => {
            const width = Dimensions.get('window').width; //screen width
            const dir = Math.sign(gst.dx); //direction
            const delta = Math.abs(gst.dx); //intensity
            if (delta > width * 0.42) {
                Animated.timing(this.position, {toValue: width * dir, duration: 1000 * delta / width}).start(() => {
                    this.props.changeIndex(dir);
                    Animated.timing(this.position, {toValue: 0, duration: 1000 * delta / width}).start();
                });
            } else {
                Animated.timing(
                    this.position,
                    { toValue: 0, duration: 800}
                ).start();
            }
        },
    });

    render() {
        const {
            ready, 
            status,
            zoomed,
            memoryCount,
        } = this.props;
        const isReady = ready && status;
        
        if (!zoomed) {
            return (
                <View>
                    <Animated.View 
                        style={[styles.container, {left: this.position}]}
                        {...this.panResponder.panHandlers}
                    >
                        {memoryCount > 0 && 
                            <View style={styles.presentation}>                            
                                <PresentationElementContainer zoomed={zoomed}/>
                            </View>         
                        }
                    </Animated.View>
                    <TouchableOpacity 
                        onPress={() => {
                            if (isReady){
                                this.props.delete(this.props);
                            }
                        }}
                        style={styles.forgetButton} 
                    >
                        {memoryCount > 0 && 
                            <Text style={[styles.forgetButtonText, !isReady && {color: '#aaa'}]}>
                                Forget
                            </Text>
                        }
                    </TouchableOpacity>  
                </View>
            );
        } else {
            return (
                <Animated.View
                    style={{left: this.position}}
                    {...this.panResponder.panHandlers}
                >
                    <PresentationElementContainer zoomed={zoomed}/> 
                </Animated.View>
            );
        }
    }
}

const windowHeight = Dimensions.get('window').height;
const windowWidth = Dimensions.get('window').width;

const styles = StyleSheet.create({
    container: {
        flexGrow: 0,
        flexShrink: 0,
        height: windowHeight * 0.6,
        width: windowWidth * 0.6,
        alignSelf: 'center',
    },
    presentation: {
        flexGrow: 0,
        flexShrink: 0,
        height: windowHeight * 0.6,
        width: windowWidth * 0.6,
        alignSelf: 'center',
    },
    forgetButton: {
        margin: 8,
        marginBottom: 15,
    },
    forgetButtonText: {
        color: 'red',
        alignSelf: 'center',
        fontSize: 16,
    },
});