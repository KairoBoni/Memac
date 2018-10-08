import {NavigationActions} from 'react-navigation';

let _navigator;

setTopLevelNavigator = navigatorRef => {
    _navigator = navigatorRef;
};

navigate = (routeName, params) => {
    _navigator.dispatch(NavigationActions.navigate({routeName, params}));
};

goBack = () => {
    _navigator.dispatch(NavigationActions.back());
};

//add more

export default {
    navigate,
    setTopLevelNavigator,
    goBack,
};