import { IState, AppDispatch, AppState } from "interface";
import { useSelector, useDispatch, TypedUseSelectorHook } from "react-redux";

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<IState> = useSelector;
