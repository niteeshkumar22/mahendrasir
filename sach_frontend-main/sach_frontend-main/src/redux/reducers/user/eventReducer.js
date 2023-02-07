const initState = {
    isLoading: false,
    popUpShow:false,
    
}
const EventReducer = (state = initState, action) => {
    switch (action?.type) {
        case "FETCH_EVENTS_REQUESTED":
            return {
                ...state,
                isLoading: true,
            };
        case "TOGGLE_REGISTER_POPUP":
            return {
                ...state,
                popUpShow:!state.popUpShow,
            }    
        case "FETCH_EVENTS_RESPONSE":
            return {
                ...state,
                isLoading: false,
                data: action?.data
            };
        case "FETCH_EVENTS_ERROR":
            return {
                ...state,
                isLoading: false,
                isError: true,
                data: action?.data
            };
        case "SEARCH_EVENTS_REQUESTED":
            return {
                ...state,
                isLoading: true,
            };
        case "SEARCH_EVENTS_RESPONSE":
            return {
                ...state,
                isLoading: false,
                searchResult: action?.data
            };
        case "SEARCH_EVENTS_ERROR":
            return {
                ...state,
                isLoading: false,
                isError: true,
                searchResult: action?.data
            };
        case "FETCH_EVENT_DETAIL_REQUESTED":
            return {
                ...state,
                isLoading: true,
            };
        case "FETCH_EVENT_DETAIL_RESPONSE":
            return {
                ...state,
                isLoading: false,
                eventInfo: action?.data
            };
        case "FETCH_EVENT_DETAIL_ERROR":
            return {
                ...state,
                isLoading: false,
                isError: true,
                eventInfo: action?.data
            };
        case "REGISTER_EVENT_REQUESTED":
            return {
                ...state,
                isLoading: true,
            };
        case "REGISTER_EVENT_RESPONSE":
            return {
                ...state,
                isLoading: false,
                registerEventInfo: action?.data
            };
        case "REGISTER_EVENT_ERROR":
            return {
                ...state,
                isLoading: false,
                registerEventInfo: action?.data
            };
        default:
            return state;
    }
}
export default EventReducer;