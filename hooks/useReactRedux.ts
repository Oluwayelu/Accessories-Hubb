import { IState } from "interface";
import { useSelector, useDispatch, TypedUseSelectorHook } from "react-redux";
import type { AppDispatch, AppState } from "redux/store";

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<IState> = useSelector;
