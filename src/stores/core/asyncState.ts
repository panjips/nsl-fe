export type InitialState = { state: "init" };
export type LoadingState = { state: "loading" };
export type SuccessState<T> = { state: "success"; data: T };
export type ErrorState<E = string> = { state: "error"; error: E };

export type ViewState<T, E = string> = InitialState | LoadingState | SuccessState<T> | ErrorState<E>;

export const initialState = (): InitialState => ({ state: "init" });
export const loadingState = (): LoadingState => ({ state: "loading" });
export const successState = <T>(data: T): SuccessState<T> => ({
    state: "success",
    data,
});
export const errorState = <E = string>(error: E): ErrorState<E> => ({
    state: "error",
    error,
});

export const isInitial = <T, E>(state: ViewState<T, E>): state is InitialState => state.state === "init";
export const isLoading = <T, E>(state: ViewState<T, E>): state is LoadingState => state.state === "loading";
export const isSuccess = <T, E>(state: ViewState<T, E>): state is SuccessState<T> => state.state === "success";
export const isError = <T, E>(state: ViewState<T, E>): state is ErrorState<E> => state.state === "error";

export const getData = <T, E>(state: ViewState<T, E>): T | undefined => (isSuccess(state) ? state.data : undefined);

export const getError = <T, E>(state: ViewState<T, E>): E | undefined => (isError(state) ? state.error : undefined);
