import { render, screen } from '@testing-library/react';
import Appointment from './appointment';
import userEvent from '@testing-library/user-event';

describe('Appointment component', () => {
	it(`Given the required props,
        When the component is rendered,
        Then the appointment data should be present`, () => {
		const requiredProps = {
			id: 1,
			person: 'Harriet',
			description: 'A very special appointment',
			date: '3 Nov',
		};

		render(<Appointment {...requiredProps} />);
		expect(screen.getByText(requiredProps.description)).toBeInTheDocument();
		expect(screen.getByText(requiredProps.id)).toBeInTheDocument();
		expect(screen.getByText(requiredProps.person)).toBeInTheDocument();
		expect(screen.getByText(requiredProps.date)).toBeInTheDocument();
	});

	it(`Given an unconfirmed appointment,
            When the component is rendered,
            Then the confirm button should be present`, () => {
		const unconfirmedAppointment = {
			id: 1,
			person: 'Harriet',
			description: 'A very special appointment',
			date: '3 Nov',
			confirmed: false,
		};

		render(<Appointment {...unconfirmedAppointment} />);

		expect(
			screen
				.getAllByRole('button')
				.filter((button) => button.textContent === 'Mark confirmed')
				.length
		).toBe(1);
	});

	it(`Given a confirmed appointment,
            When the component is rendered,
            Then the confirm button should not be present`, () => {
		const confirmedAppointment = {
			id: 1,
			person: 'Harriet',
			description: 'A very special appointment',
			date: '3 Nov',
			confirmed: true,
		};

		render(<Appointment {...confirmedAppointment} />);

		expect(
			screen
				.queryAllByRole('button')
				.filter((button) => button.textContent === 'Mark confirmed')
				.length
		).toBe(0);
	});

	it(`Given an appointment is rendered,
                When the confirm button is clicked,
                Then the onMarkConfirmed function should be called`, () => {
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

		userEvent.click(confirmButton);

		userEvent.click(confirmButton);

		expect(mockConfirm.mock.calls.length).toBe(2);

		// check it's been called with the right parameters
		expect(mockConfirm.mock.calls[0][0]).toBe(unconfirmedAppointment.id);
	});
});
