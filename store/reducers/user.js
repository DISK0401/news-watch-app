const initialState = {
  clips: [],
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case 'ADD_CLIP':
      return {
        ...state,
        clips: [...state.clips, action.clip],
      };
    case 'DELETE_CLIP':
      alert(state.clips[0]);
      //   alert(action.clip.url);
      return {
        ...state,
        clips: state.clips.filter((clip) => clip.url !== action.clip.url),
      };
    default:
      return state;
  }
};

export default reducer;
