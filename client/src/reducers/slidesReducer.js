import { types } from "../types/types";

const initialState = {
  slides: [],
  slideCurrentSlides: [],
  slideThereIsMoreSlides: false,
  slideIsAddingCurrent: false,
  slideIsLoadingCurrent: false,
  slideQuery: {
    from: 1,
    limit: process.env.REACT_APP_ADMIN_SLIDES_QUERY_LIMIT,
  },
};

export const slidesReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.slideLoadAllSlides:
      return {
        ...state,
        slides: action.payload.slides,
        slideThereIsMoreSlides: action.payload.slideThereIsMoreSlides,
        slideQuery: {
          from: action.payload.slides.length + 1,
          limit: state.slideQuery.limit,
        },
      };
    case types.slideAddMoreAllSlides:
      return {
        ...state,
        slides: state.slides.concat(action.payload.slides),
        slideThereIsMoreSlides: action.payload.slideThereIsMoreSlides,
        slideQuery: {
          from: state.slideQuery.from + action.payload.slides.length,
          limit: state.slideQuery.limit,
        },
      };
    case types.slideUpload:
      return {
        ...state,
        slides: [...action.payload, ...state.slides],
        slideQuery: {
          from: state.slideQuery.from + 1,
          limit: state.slideQuery.limit,
        },
      };
    case types.slideAddToCurrentSlides:
      return {
        ...state,
        slides: state.slides.filter(
          (slide) => slide.id !== action.payload.slide.id
        ),
        slideCurrentSlides: state.slideCurrentSlides.concat([
          action.payload.slide,
        ]),
        slideQuery: {
          ...state.slideQuery,
          from: state.slideQuery.from - 1,
        },
      };
    case types.slideLoadCurrentSlides:
      return {
        ...state,
        slideCurrentSlides: action.payload,
      };
    case types.slideDelete:
      return {
        ...state,
        slides: state.slides.filter((slide) => slide.id !== action.payload.id),
        slideQuery: {
          ...state.slideQuery,
          from: action.payload
            ? state.slideQuery.from - 1
            : state.slideQuery.from,
        },
      };
    default:
      return state;
  }
};
