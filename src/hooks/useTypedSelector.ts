import { TypedUseSelectorHook } from "react-redux";
import { RootState } from "../store/redcers/rootReducer";
import { useSelector } from "react-redux";

export const useTypedSelector: TypedUseSelectorHook<RootState> = useSelector;
