const initState = {
    isLoading: false,
}
const BlogReducer = (state = initState, action) => {
    switch (action?.type) {
        case "FETCH_BLOGS_REQUESTED":
            return {
                ...state,
                isLoading: true,
            };
        case "FETCH_BLOGS_RESPONSE":
            return {
                ...state,
                isLoading: false,
                data: action?.data
            };
        case "FETCH_BLOGS_ERROR":
            return {
                ...state,
                isLoading: false,
                isError: true,
                data: action?.data
            };
        case "SEARCH_BLOGS_REQUESTED":
            return {
                ...state,
                isLoading: true,
            };
        case "SEARCH_BLOGS_RESPONSE":
            return {
                ...state,
                isLoading: false,
                searchResult: action?.data
            };
        case "SEARCH_BLOGS_ERROR":
            return {
                ...state,
                isLoading: false,
                isError: true,
                searchResult: action?.data
            };
        case "FETCH_BLOG_DETAIL_REQUESTED":
            return {
                ...state,
                isLoading: true,
            };
        case "FETCH_BLOG_DETAIL_RESPONSE":
            return {
                ...state,
                isLoading: false,
                blogInfo: action?.data
            };
        // case "FETCH_BLOG_DETAIL_ERROR":
        //     return {
        //         ...state,
        //         isLoading: false,
        //         isError: true,
        //         blogInfo: action?.data
        //     };
        case "REGISTER_BLOG_REQUESTED":
            return {
                ...state,
                isLoading: true,
            };
        case "REGISTER_BLOG_RESPONSE":
            return {
                ...state,
                isLoading: false,
                registerBlogInfo: action?.data
            };
        case "REGISTER_BLOG_ERROR":
            return {
                ...state,
                isLoading: false,
                registerBlogInfo: action?.data
            };
        default:
            return state;
    }
}
export default BlogReducer;