import { createAction, createSlice } from "@reduxjs/toolkit";
import commentService from "../services/commentService";

const commentsSlice = createSlice({
    name: "comments",
    initialState: {
        entities: null,
        isLoading: true,
        error: null
    },
    reducers: {
        commentsRequested: (state) => {
            state.isLoading = true;
        },
        commentsReceved: (state, action) => {
            state.entities = action.payload;
            state.isLoading = false;
        },
        commentsRequestFiled: (state, action) => {
            state.error = action.payload;
            state.isLoading = false;
        },
        commentAdded: (state, action) => {
            state.entities.push(action.payload);
        },
        commentAddFailed: (state, action) => {
            state.error = action.payload;
        },
        commentDeleted: (state, action) => {
            state.entities = state.entities.filter(
                (c) => c._id !== action.payload
            );
        },
        commentDeleteFailed: (state, action) => {
            state.error = action.payload;
        }
    }
});

const { reducer: commentsReducer, actions } = commentsSlice;
const {
    commentsRequested,
    commentsReceved,
    commentsRequestFiled,
    commentAdded,
    commentAddFailed,
    commentDeleted,
    commentDeleteFailed
} = actions;

const commentRequestAdd = createAction("comments/addRequest");
const commentRequestDelete = createAction("comments/deleteRequest");

export const addComment = (payload) => async (dispatch) => {
    dispatch(commentRequestAdd());
    try {
        const { content } = await commentService.createComment(payload);
        dispatch(commentAdded(content));
    } catch (error) {
        dispatch(commentAddFailed(error.message));
    }
};
export const deleteComment = (commentId) => async (dispatch) => {
    dispatch(commentRequestDelete());
    try {
        const { content } = await commentService.removeComment(commentId);
        if (content === null) {
            dispatch(commentDeleted(commentId));
        } else {
            dispatch(commentDeleteFailed(commentId));
        }
    } catch (error) {
        dispatch(commentDeleteFailed(error.message));
    }
};
export const loadCommentsList = (userId) => async (dispatch) => {
    dispatch(commentsRequested());
    try {
        const { content } = await commentService.getComments(userId);
        dispatch(commentsReceved(content));
    } catch (error) {
        dispatch(commentsRequestFiled(error.message));
    }
};
export const getComments = () => (state) => state.comments.entities;
export const getCommentsLoadingStatus = () => (state) =>
    state.comments.isLoading;

export default commentsReducer;
