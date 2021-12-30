import { IconButton, TextField } from '@material-ui/core';
import { EditRounded, SaveRounded, DeleteRounded } from '@material-ui/icons';
import { useState, KeyboardEvent } from 'react';
import { useDispatch } from 'react-redux';
import { deleteUserAC, updateUser } from '../users-reducer';
import s from './User.module.css';

type UserPropsType = {
	id: number
	name: string
	email: string
	phone: string
	website: string
	city: string
	street: string
	suite: string
	companyName: string
	isAdmin: boolean
};

export const User = (props: UserPropsType) => {
	const dispatch = useDispatch();
	const [editMode, setEditMode] = useState(false);
	const [name, setName] = useState(props.name);
	const [email, setEmail] = useState(props.email);
	const [phone, setPhone] = useState(props.phone);
	const [website, setWebsite] = useState(props.website);
	const [city, setCity] = useState(props.city);
	const [street, setStreet] = useState(props.street);
	const [suite, setSuite] = useState(props.suite);
	const [companyName, setCompanyName] = useState(props.companyName);
	const [error, setError] = useState<string | null>('');


	const validate = (arr: string[]) => {
		for (let i = 0; arr.length > i; i++) {
			const trimmed = arr[i].trim();
			if (trimmed.length < 100) {
				if (trimmed === '') {
					setError('required');
				}
			} else {
				setError('max value is no more then 100');
			}
		}
	};
	const onSave = () => {
		validate([name, email, phone, website, city, street, suite, companyName]);
		if (error === null) {
			dispatch(updateUser({ id: props.id, name, email, phone, website, city, street, suite, companyName, catchPhrase: '', username: '' }));
			setEditMode(false);
		}
	};
	const onDelete = () => {
		dispatch(deleteUserAC(props.id));
	};
	const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
		if (error !== null) {
			setError(null);
		}
		if (e.charCode === 13) {
			onSave();
		}
	};
	return (
		<tr className={s.wrapper}>
			{editMode
				?
				<>
					<td className={s.borderLine}>
						{props.id}
					</td>
					<td>
						<TextField
							label={'name'}
							value={name}
							onChange={(e) => setName(e.currentTarget.value)}
							autoFocus
							onKeyPress={onKeyPressHandler}
						/>
					</td>
					<td>
						<TextField
							label={'email'}
							value={email}
							onChange={(e) => setEmail(e.currentTarget.value)}
							onKeyPress={onKeyPressHandler}
						/>
					</td>
					<td>
						<TextField
							label={'phone'}
							value={phone}
							onChange={(e) => setPhone(e.currentTarget.value)}
							onKeyPress={onKeyPressHandler}
						/>
					</td>

					<td>
						<TextField
							label={'website'}
							value={website}
							onChange={(e) => setWebsite(e.currentTarget.value)}
							onKeyPress={onKeyPressHandler}
						/>
					</td>
					<td>
						<TextField
							label={'city'}
							value={city}
							onChange={(e) => setCity(e.currentTarget.value)}
							onKeyPress={onKeyPressHandler}
						/>
					</td>
					<td>
						<TextField
							label={'street'}
							value={street}
							onChange={(e) => setStreet(e.currentTarget.value)}
							onKeyPress={onKeyPressHandler}
						/>
					</td>
					<td>
						<TextField
							label={'suite'}
							value={suite}
							onChange={(e) => setSuite(e.currentTarget.value)}
							onKeyPress={onKeyPressHandler}
						/>
					</td>
					<td>
						<TextField
							label={'companyName'}
							value={companyName}
							onChange={(e) => setCompanyName(e.currentTarget.value)}
							onKeyPress={onKeyPressHandler}
						/>
					</td>
					<td>
						<div>
							<IconButton color={error ? 'secondary' : 'primary'} onClick={onSave}>
								<SaveRounded />
							</IconButton>
						</div>
					</td>
					{
						!props.isAdmin && (
							<td className={s.borderLine}>
								<div>
									<IconButton color={error ? 'secondary' : 'primary'} onClick={onSave}>
										<SaveRounded />
									</IconButton>
								</div>
							</td>
						)
					}

					<td className={s.borderLine}>
						<div>
							<IconButton color={error ? 'secondary' : 'primary'} onClick={onDelete}>
								<DeleteRounded />
							</IconButton>
						</div>
					</td>

				</>
				: <>
					<td className={s.borderLine}>{props.id}</td>
					<td className={s.borderLine}>{props.name}</td>
					<td className={s.borderLine}>{props.email}</td>
					<td className={s.borderLine}>{props.phone}</td>
					<td className={s.borderLine}>{props.website}</td>
					<td className={s.borderLine}>{props.city}</td>
					<td className={s.borderLine}>{props.street}</td>
					<td className={s.borderLine}>{props.suite}</td>
					<td className={s.borderLine}>{props.companyName}</td>
					<td className={props.isAdmin ? s.borderLine : s.dontShow}>
						<div  onClick={() => setEditMode(true)}>
							<IconButton color='primary'>
								<EditRounded />
							</IconButton>
						</div >
					</td>
					<td className={props.isAdmin ? s.borderLine : s.dontShow}>
						<div>
							<IconButton color={error ? 'secondary' : 'primary'} onClick={onDelete}>
								<DeleteRounded />
							</IconButton>
						</div>
					</td>
				</>
			}
		</tr>
	);
};