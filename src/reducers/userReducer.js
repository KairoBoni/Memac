const initialState = {
  userId: null, 
};

export const userReducer = (state = initialState, action) => {
    switch (action.type) {
    case 'LOGIN':
      return {...state, userId: action.payload};
    case 'LOGOUT':
      return initialState;
    default:
      return state;
    }
};