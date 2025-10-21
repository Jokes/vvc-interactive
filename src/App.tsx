import { useState } from 'react'
import { PerkTypeIdentifier } from './perkTypes'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div id="app-container">
    <div id="sidebar">
      <ul>
        <li><div className="nav-button">Introduction</div>
          <ul>
            <li className="nav-button">Conduit Types</li>
            <li className="nav-button">Bridges</li>
            <li className="nav-button">Worlds</li>
            <li className="nav-button">Crowns</li>
            <li className="nav-button">Least Conduits</li>
            <li className="nav-button">Perk Types</li>
          </ul>
        </li>
        <li className="nav-button">Base Perks</li>
        <li className="nav-button">Drawbacks</li>
        <li className="nav-button">Earthless Supplement</li>
        <li><div className="nav-button">Worlds</div>
          <ul>
            <li className="nav-button"></li>
          </ul>
        </li>
      </ul>
    </div>
    <div id="main-panel">
      <h1 id="main-title">VVC Interactive</h1>
      <div className="card">
        <button onClick={
          () => {
            setCount((count) => count + 1)
          }
        }>
          you have clicked this button {count} times
        </button>
        <p>
          <code>under construction</code>
        </p>
      </div>
      <div>
          The six perk types are <PerkTypeIdentifier perkType='Infusion' />
          , <PerkTypeIdentifier perkType='Material' />
          , <PerkTypeIdentifier perkType='Minion' />
          , <PerkTypeIdentifier perkType='Outpost' />
          , <PerkTypeIdentifier perkType='Gateway' />
          , and <PerkTypeIdentifier perkType='Immortality' />.
      </div>
      <p className="infobox">
        bottom text
      </p>
      </div>
    </div>
  )
}

export default App
