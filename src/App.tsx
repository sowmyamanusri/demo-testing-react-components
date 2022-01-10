import './App.css';
import AppointmentList from './components/AppointmentList';

function App() {
	return (
		<div className='App'>
			<header className='App-header'>
				<h1>Appointment Manager</h1>
			</header>
			<main>
				<AppointmentList />
			</main>
		</div>
	);
}

export default App;
