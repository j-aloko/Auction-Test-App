export const autoBidReducer = (state, action) => {
  switch (action.type) {
    case "GET_AUTOBID_START":
      return {
        autoBids: [],
        isFetching: true,
        error: false,
      };
    case "GET_AUTOBID_SUCCESS":
      return {
        autoBids: action.payload,
        isFetching: false,
        error: false,
      };
    case "GET_AUTOBID_FAILURE":
      return {
        autoBids: [],
        isFetching: false,
        error: true,
      };
    case "CREATE_AUTOBID_START":
      return {
        ...state,
        isFetching: true,
        error: false,
      };
    case "CREATE_AUTOBID_SUCCESS":
      return {
        autoBids: [...state.autoBids, action.payload],
        isFetching: false,
        error: false,
      };
    case "CREATE_AUTOBID_FAILURE":
      return {
        ...state,
        isFetching: false,
        error: true,
      };

    default:
      return { ...state };
  }
};
