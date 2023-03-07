import { csrfFetch } from "./csrf";

const initialState = {}

const LOAD = 'reviews/LOAD';
const LOAD_CURR = 'reviews/LOAD_CURR';
const ADD_ONE = 'reviews/ADD_ONE';
const CREATE = 'reviews/CREATE';
const UPDATE = 'reviews/UPDATE';
const DELETE = 'reviews/DELETE';

export const loadReviews = (list) => ({
    type: LOAD,
    list
})

export const loadCurrentReviews = (list) => ({
    type: LOAD_CURR,
    list
})

export const addOneReview = (review) => ({
    type: ADD_ONE,
    review
})

export const createReview = (review) => ({
    type: CREATE,
    review
})

export const updateReview = (review) => ({
    type: UPDATE,
    review
})

export const deleteReview = (reviewId) => ({
    type: DELETE,
    reviewId
})

export const getReviews = (spotId) => async dispatch => {
    const res = await csrfFetch(`/api/spots/${spotId}/reviews`);

    console.log(spotId);

    if (res.ok) {
        const list = await res.json();
        // console.log(list);
        dispatch(loadReviews(list))
    }
}

export const getCurrReviews = () => async dispatch => {
    const res = await csrfFetch('api/reviews/current');

    if(res.ok) {
        const currList = await res.json();
        dispatch(loadCurrentReviews(currList))
    }
}

export const createNewReview = (spotId, rev) => async dispatch => {
    const res = await csrfFetch(`/api/spots/${spotId}`, {
        method: 'POST',
        body: JSON.stringify(rev)
    })

    if(res.ok) {
        const review = await res.json();
        dispatch(createReview(review))
    }
}

export const deleteReviewById = (reviewId) => async dispatch => {
    const res = await csrfFetch(`/api/reviews/${reviewId}`, {
        method: 'DELETE',
    });

    if (res.ok) {
        const message = await res.json();
        console.log(message);
        dispatch(deleteReview(reviewId));
    }
}

const reviewReducer = (state = initialState, action) => {
    let newState;

    switch (action.type) {
        case LOAD:
            newState = {...state, ...action.list.Reviews}

            return newState;
        case LOAD_CURR:
            newState = {...state, 'currReviews': action.list.Reviews}

            return newState;
        case CREATE:
            newState = {...state}

            newState.reviews.push(action.review)

            return newState
        case DELETE:
            newState = state;
            newState.reviews = Object.values(state.reviews).filter(review => review.id !== action.reviewId)
            console.log(newState);
            return newState;
        default:
            return state;
    }
}

export default reviewReducer
