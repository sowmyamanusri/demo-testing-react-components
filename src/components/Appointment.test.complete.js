/* eslint-disable no-undef */
import Appointment from './Appointment';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

describe('Appointment component', () => {
	it(`Given the required props,
		When the component is rendered,
		Then the appointment description should be present`, () => {
		const requiredProps = {
			id: 1,
			name: 'Harriet',
			description: 'A very special appointment',
			date: '3 Nov',
			confirmed: false,
			onConfirmed: () => {},
		};

		render(<Appointment {...requiredProps} />);

		expect(
			screen.getByText('A very special appointment')
		).toBeInTheDocument();
	});

	it(`Given an unconfirmed appointment,
		When the component is rendered,
		Then the confirm button should be present`, () => {
		const unconfirmedAppointment = {
			id: 1,
			name: 'Harriet',
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

	it(`Given a confirmed appointment,
		When the component is rendered,
		Then the confirm button should not be present`, () => {
		const confirmedAppointment = {
			id: 1,
			name: 'Harriet',
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
			name: 'Harriet',
			description: 'A very special appointment',
			date: '3 Nov',
			confirmed: false,
			onMarkConfirmed: mockConfirm,
		};

		render(<Appointment {...unconfirmedAppointment} />);

		const confirmButton = screen
			.getAllByRole('button')
			.find((button) => button.textContent === 'Mark confirmed');

		expect(confirmButton).toBeInTheDocument();

		// simulate button click - see '@testing-library/user-event' documentation
		userEvent.click(confirmButton);

		expect(mockConfirm.mock.calls.length).toBe(1);
	});
});
