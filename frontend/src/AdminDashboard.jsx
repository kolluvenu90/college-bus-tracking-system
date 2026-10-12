
import { useState } from 'react';

export default function AdminDashboard() {
  const [buses, setBuses] = useState([
    {
      busNumber: 'BUS101',
      route: 'College to City',
      status: 'Ready for tracking'
    }
  ]);

  const [busNumber, setBusNumber] = useState('');
  const [route, setRoute] = useState('');

  function addBus(e) {
    e.preventDefault();

    if (!busNumber.trim() || !route.trim()) {
      alert('Please enter the bus number and route.');
      return;
    }

    if (buses.some(bus =>
      bus.busNumber.toUpperCase() === busNumber.trim().toUpperCase()
    )) {
      alert('This bus number already exists.');
      return;
    }

    setBuses([...buses, {
      busNumber: busNumber.trim().toUpperCase(),
      route: route.trim(),
      status: 'Ready for tracking'
    }]);

    setBusNumber('');
    setRoute('');
  }

  function deleteBus(number) {
    setBuses(buses.filter(bus => bus.busNumber !== number));
  }

  return (
    <main style={{
      maxWidth: 900,
      margin: '40px auto',
      padding: 24,
      fontFamily: 'Arial, sans-serif'
    }}>
      <h1>Admin Dashboard</h1>
      <p>College Bus Tracking System</p>

      <h2>Bus Summary</h2>
      <p>Total buses: {buses.length}</p>

      <h2>Add a Bus</h2>
      <form onSubmit={addBus}>
        <input
          placeholder="Bus number (e.g. BUS102)"
          value={busNumber}
          onChange={e => setBusNumber(e.target.value)}
          required
        />
        {' '}
        <input
          placeholder="Route"
          value={route}
          onChange={e => setRoute(e.target.value)}
          required
        />
        {' '}
        <button type="submit">Add Bus</button>
      </form>

      <h2>Manage Buses</h2>
      <table cellPadding="12" border="1">
        <thead>
          <tr>
            <th>Bus Number</th>
            <th>Route</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {buses.map(bus => (
            <tr key={bus.busNumber}>
              <td>{bus.busNumber}</td>
              <td>{bus.route}</td>
              <td>{bus.status}</td>
              <td>
                <button
                  onClick={() => deleteBus(bus.busNumber)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </main>
  );
}