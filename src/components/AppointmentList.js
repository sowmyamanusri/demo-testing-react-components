import Appointment from './Appointment';
import { useState } from 'react';

const initial_appointments = [
	{
		id: 1,
		person: 'Terence',
		date: '7 Nov',
		description: 'Ask about his dog',
		confirmed: false,
	},
	{
		id: 2,
		person: 'Jemima',
		date: '7 Nov',
		description: 'Discuss world peace',
		confirmed: true,
	},
];

const AppointmentList = () => {
	const [appointments, setAppointments] = useState(initial_appointments);

	const confirmAppt = (id) => {
		const appts = [...appointments];
		appts.find((a) => a.id === id).confirmed = true;
		setAppointments(appts);
	};

	return (
		<section>
			<h2>Appointments</h2>
			{appointments && (
				<section className='appointmentList'>
					{appointments.map((a) => (
						<Appointment
							key={a.id}
							id={a.id}
							description={a.description}
							date={a.date}
							person={a.person}
							confirmed={a.confirmed}
							onMarkConfirmed={(id) => confirmAppt(id)}
						/>
					))}
				</section>
			)}
		</section>
	);
};

export default AppointmentList;
