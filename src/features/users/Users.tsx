import { IconButton } from '@material-ui/core';
import { AddCircleOutline } from '@material-ui/icons';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { UsersResponseType } from '../../api/api';
import { AppStateType } from '../../App/store';
import { PATH } from '../../components/routes/Pages';
import { User } from './User/User';
import s from './users.module.css';


export const Users = () => {
	const users = useSelector<AppStateType, UsersResponseType[]>(state => state.users);
	const loggedId = useSelector<AppStateType, number>(state => state.login.loggedId);
	const history = useHistory();
	const isAdmin = loggedId === 1;


	const routeChange = () => {
		history.push(PATH.ADD_USER);
	};
	const data = [
		{ name: 'Anom', age: 19, gender: 'Male' },
		{ name: 'Megha', age: 19, gender: 'Female' },
		{ name: 'Subham', age: 25, gender: 'Male' },
	];
	const titles = [
		'№',
		'name',
		'email',
		'phone',
		'website',
		'city',
		'street',
		'suite',
		'company name',
	];
	const adminList = [
		'№',
		'name',
		'email',
		'phone',
		'website',
		'city',
		'street',
		'suite',
		'company name',
		'edit',
		'delete'
	];
	return (
		<div className={s.wrapper}>
			<IconButton onClick={routeChange} color='primary'>
				<AddCircleOutline /> add user
			</IconButton>
			<table className={s.tableContainer}>
				<thead className={s.tableHeader}>
					<tr>
						{isAdmin
							? adminList.map((t, i) => {
								return <th key={i}>{t}</th>;
							})
							: titles.map((t, i) => {
								return <th key={i}>{t}</th>;
							})
						}
					</tr>
				</thead>
				<tbody className={s.tableBody}>
					{users &&
						users.map((item, i) => <User
							key={item.id}
							id={item.id}
							name={item.name}
							email={item.email}
							phone={item.phone}
							website={item.website}
							city={item.address.city}
							street={item.address.street}
							suite={item.address.suite}
							companyName={item.company.name}
							isAdmin={isAdmin}
						/>)}
				</tbody>
			</table>
		</div >
	);
};

