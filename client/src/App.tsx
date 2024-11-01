import {Outlet} from "react-router-dom";
import {Header} from './features/header/header.tsx';
import './App.css'

function App() {
  return (
    <>
    <Header />
    <div className="overflow-hidden">
    <div className="px-4 m-auto max-w-screen-2xl md:px-8">
      <Outlet />
    </div>
  </div>
    </>
  )
}

export default App
