import { setAppErrorAC, setAppStatusAC } from './../../App/app-reducer';
import { Dispatch } from 'redux';
import { UserAPI, UsersResponseType } from '../../api/api';
import { AppThunkType, GetAppStateType } from '../../App/store';

const initialState = [] as UsersResponseType[];

export const usersReducer = (state = initialState, action: UsersActionTypes): InitialStateType => {
	switch (action.type) {
		case userReducerActions.GET_ALL_USERS:
			return [...action.params];
		case userReducerActions.ADD_USER:
			return [...state, action.params];
		case userReducerActions.UPDATE_USER:
			return [...action.params];
		case userReducerActions.DELETE_USER:
			return state.filter(u => u.id !== action.id);
		default:
			return state;
	}
};

//AC
const userReducerActions = {
	GET_ALL_USERS: 'users/GET_ALL_USERS',
	ADD_USER: 'users/ADD_USER',
	UPDATE_USER: 'users/UPDATE_USER',
	DELETE_USER: 'users/DELETE_USER'
} as const;
export const getAllUsersAC = (params: UsersResponseType[]) => ({ type: userReducerActions.GET_ALL_USERS, params } as const);
export const addUserAC = (params: UsersResponseType) => ({ type: userReducerActions.ADD_USER, params } as const);
export const updateUserAC = (params: UsersResponseType[]) => ({ type: userReducerActions.UPDATE_USER, params } as const);
export const deleteUserAC = (id: number) => ({ type: userReducerActions.DELETE_USER, id } as const);


//thunkC
export const getAllUsers =
	(): AppThunkType =>
		async (dispatch: Dispatch) => {
			
			dispatch(setAppStatusAC('loading'));
			try {
				const response = await UserAPI.getAllUsers();

				dispatch(getAllUsersAC(response.data));
				dispatch(setAppStatusAC('succeeded'));
			} catch (e) {
				dispatch(setAppErrorAC('something went wrong, please try later'));
				console.log(e);
			} finally {
				dispatch(setAppStatusAC('idle'));
			}
		};

export const updateUser =
	(user: UserType): AppThunkType =>
		async (dispatch: Dispatch, getState: GetAppStateType) => {
			dispatch(setAppStatusAC('loading'));
			try {
				const payload: UsersResponseType = {
					id: user.id,
					name: user.name,
					username: user.username,
					email: user.email,
					address: {
						street: user.street,
						suite: user.suite,
						city: user.city
					},
					phone: user.phone,
					website: user.website,
					company: {
						name: user.companyName,
						catchPhrase: user.catchPhrase
					}
				};
				const response = await UserAPI.updateUser(payload);
				const users = getState().users;
				const updated = users.map(u => u.id === user.id ? { ...response.data } : u);
				dispatch(updateUserAC(updated));
			} catch (e) {
				dispatch(setAppErrorAC('something went wrong, please try later'));
				console.log(e);
			} finally {
				dispatch(setAppStatusAC('idle'));
			}
		};

export const addUser =
	(user: Omit<UserType, 'id'>): AppThunkType =>
		async (dispatch: Dispatch) => {
			dispatch(setAppStatusAC('loading'));
			try {
				const payload: Omit<UsersResponseType, 'id'> = {
					name: user.name,
					username: user.username,
					email: user.email,
					address: {
						street: user.street,
						suite: user.suite,
						city: user.city
					},
					phone: user.phone,
					website: user.website,
					company: {
						name: user.companyName,
						catchPhrase: user.catchPhrase
					}
				};
				const response = await UserAPI.addUser(payload);
				dispatch(addUserAC(response.data));
				dispatch(setAppStatusAC('succeeded'));
			} catch (e) {
				dispatch(setAppErrorAC('something went wrong, please try later'));
				console.log(e);
			} finally {
				dispatch(setAppStatusAC('idle'));
			}
		};

export const deleteUser =
	(id: number): AppThunkType =>
		async (dispatch: Dispatch) => {
			dispatch(setAppStatusAC('loading'));
			try {
				const response = await UserAPI.deleteUser(id);
				dispatch(deleteUserAC(id));
				dispatch(setAppStatusAC('succeeded'));
			} catch (e) {
				dispatch(setAppErrorAC('something went wrong, please try later'));
				console.log(e);
			} finally {
				dispatch(setAppStatusAC('idle'));
			}
		};
//types
type InitialStateType = typeof initialState;


export type UserType = {
	id: number
	username: string
	name: string
	email: string
	phone: string
	website: string
	city: string
	street: string
	suite: string
	companyName: string
	catchPhrase: string
};

export type UsersActionTypes =
	| ReturnType<typeof getAllUsersAC>
	| ReturnType<typeof addUserAC>
	| ReturnType<typeof updateUserAC>
	| ReturnType<typeof deleteUserAC>


