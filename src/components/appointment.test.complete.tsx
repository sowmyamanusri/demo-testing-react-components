import Appointment, { AppointmentProps } from './appointment';

import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

describe('Appointment component', () => {
	it(`Given the required props,
		When the component is rendered,
		Then the appointment data should be present`, () => {
		const requiredProps: AppointmentProps = {
			// any props that are required, i.e. not marked as optional with '?'
			id: 1,
			person: 'Harriet',
			description: 'A very special appointment',
			date: '3 Nov',
		};

		render(<Appointment {...requiredProps} />);

		expect(screen.getByText(requiredProps.description)).toBeInTheDocument();
		expect(screen.getByText(requiredProps.date)).toBeInTheDocument();
		expect(screen.getByText(requiredProps.person)).toBeInTheDocument();
	});

	it(`Given an unconfirmed appointment,
		When the component is rendered,
		Then the confirm button should be present`, () => {
		const unconfirmedAppointment: AppointmentProps = {
			id: 1,
			person: 'Harriet',
			description: 'A very special appointment',
			date: '3 Nov',
			confirmed: false,
			onMarkConfirmed: () => {},
		};

		render(<Appointment {...unconfirmedAppointment} />);

		expect(
			screen
				.getAllByRole('button')
				.find((button) => button.textContent === 'Mark confirmed')
		).toBeInTheDocument();
	});

	it(`Given an confirmed appointment,
		When the component is rendered,
		Then the confirm button should not be present`, () => {
		const confirmedAppointment: AppointmentProps = {
			id: 1,
			person: 'Harriet',
			description: 'A very special appointment',
			date: '3 Nov',
			confirmed: true,
			onMarkConfirmed: () => {},
		};

		render(<Appointment {...confirmedAppointment} />);

		expect(
			screen
				.queryAllByRole('button')
				.find((button) => button.textContent === 'Mark confirmed')
		).toBeUndefined();
	});

	it(`Given an appointment is rendered,
		When the done button is clicked,
		Then the onMarkConfirmed function is called with the correct appointmentId`, () => {
		const mockConfirm = jest.fn();
		const unconfirmedAppointment = {
			id: 1,
			person: 'Harriet',
			date: '3 Nov',
			description: 'whatever',
			confirmed: false,
			onMarkConfirmed: mockConfirm,
		};

		render(<Appointment {...unconfirmedAppointment} />);

		const confirmButton = screen
			.getAllByRole('button')
			.find((button) => button.textContent === 'Mark confirmed');

		expect(confirmButton).toBeInTheDocument();

		if (confirmButton) {
			userEvent.click(confirmButton);
		}

		expect(mockConfirm.mock.calls.length).toBe(1);

		expect(mockConfirm.mock.calls[0][0]).toBe(unconfirmedAppointment.id);

		expect(mockConfirm).toHaveBeenCalledTimes(1);
		expect(mockConfirm).toHaveBeenCalledWith(unconfirmedAppointment.id);
	});
});
