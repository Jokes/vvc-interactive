import { useState } from 'react'
import iconInfusion from './assets/icon_infusion.svg'
import iconMaterial from './assets/icon_material.svg'
import iconMinion from './assets/icon_minion.svg'
import iconOutpost from './assets/icon_outpost.svg'
import iconGateway from './assets/icon_gateway.svg'
import iconImmortality from './assets/icon_immortality.svg'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <div>
          <img src={iconInfusion} className="logo react" alt="Infusion" />
          <img src={iconMaterial} className="logo react" alt="Material" />
          <img src={iconMinion} className="logo react" alt="Minion" />
          <img src={iconOutpost} className="logo react" alt="Outpost" />
          <img src={iconGateway} className="logo react" alt="Gateway" />
          <img src={iconImmortality} className="logo react" alt="Immortality" />
      </div>
      <h1>VVC Interactive</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          you have clicked this button {count} times
        </button>
        <p>
          <code>under construction</code>
        </p>
      </div>
      <p className="read-the-docs">
        bottom text
      </p>
    </>
  )
}

export default App
