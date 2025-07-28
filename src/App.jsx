import './App.css'
import Navbar from './components/Navbar'
import Manager from './components/Manager'
import Logo from './components/logo'
import Footer from './components/Footer'

function App() {
  

  return (
    <div className="overflow-hidden">
      <Navbar />
      <Logo />
      <Manager />
      <Footer />
    </div>
  )
}

export default App
