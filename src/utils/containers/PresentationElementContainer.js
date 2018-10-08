import PresentationElement from '../components/PresentationElement';
import {connect} from 'react-redux';
 
const mapStateToProps = state => ({
    index: state.memory.index,
    memories: state.memory.memories,
    memoryCount: state.memory.memories.length,
    text: state.memory.text,
});

const mapDispatchToProps = dispatch => ({
    fetchText: (memories, index) => {
        fetch(memories[index][1].url).then(async resp => {
            dispatch({type: 'UPDATE_TEXT', payload: await resp.text()});
        });
    },
    updateIndex: () => {
        dispatch({type: 'CHANGE_INDEX', payload: 0});
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(PresentationElement);