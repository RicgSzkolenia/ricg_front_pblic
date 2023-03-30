import {applyMiddleware, createStore} from "redux";
import {composeWithDevTools} from 'redux-devtools-extension';
import rootReducer from "./reducers/rootReducer";
import thunk from 'redux-thunk';
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";


export type storeState = ReturnType<typeof store.getState>

export const getState = () => {
    return store.getState()
}

export function configureStore() {
    let store = createStore(rootReducer, composeWithDevTools(
        applyMiddleware(thunk)
    ))

    return store;
}



export const store = configureStore();

export type AppState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export const useAppDispatch: () => AppDispatch = useDispatch
export const useAppSelector: TypedUseSelectorHook<AppState> = useSelector