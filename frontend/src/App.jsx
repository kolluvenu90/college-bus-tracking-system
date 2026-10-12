import { useEffect, useState } from 'react';
import './App.css';
import BusMap from './BusMap';


function App() {
  const [busNumber, setBusNumber] = useState('BUS101')
  const [bus, setBus] = useState(null)
  const [message, setMessage] = useState('')

  async function trackBus() {
    setBus(null)
    setMessage('Loading bus information...')

    try {
      const response = await fetch(
        `http://localhost:8080/api/buses/${busNumber.trim().toUpperCase()}`
      )

      if (!response.ok) {
        throw new Error('Bus not found')
      }

      const data = await response.json()
      setBus(data)
      setMessage('')
    } catch (error) {
      setMessage(`Error: ${error.message}`)

    }
  }

  return (
    <div>
      <header>
        <h1>🚌 College Bus Tracking System</h1>
        <p>Welcome to our college bus tracking website</p>
      </header>

      <main>
        <h2>Find Your College Bus</h2>
        <p>Enter a bus number to view its information.</p>

        <section>
          <label htmlFor="busNumber">Enter Bus Number: </label>
          <input
            id="busNumber"
            type="text"
            placeholder="Example: BUS101"
            value={busNumber}
            onChange={(event) => setBusNumber(event.target.value)}
          />
          <button onClick={trackBus}>Track Bus</button>
        </section>

        <section>
          <h2>Bus Information</h2>
          {message && <p>{message}</p>}
          {bus && (
            <>
              <p>Bus Number: {bus.busNumber}</p>
              <p>Route: {bus.route}</p>
              <p>Status: {bus.status}</p>
            </>
          )}
        </section>
        {bus && <BusMap bus={bus} />}
      </main>
    </div>
  )
}

export default App;

