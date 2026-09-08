import Navigation from './components/navigation/Navigation.jsx'
import Welcome from './components/welcome/Welcome.jsx'
import AllTheBooks from './components/allTheBooks/AllTheBooks.jsx'
import Footer from './components/footer/Footer.jsx'

const App = () => (
    <>
      <Navigation />
      <main className="page">
        <Welcome />
        <AllTheBooks />
      </main>
      <Footer />
    </>
)

export default App
