import MyNav from './components/navigation/MyNav.jsx'
import Welcome from './components/Welcome.jsx'
import AllTheBooks from './components/books/AllTheBooks.jsx'
import MyFooter from './components/footer/MyFooter.jsx'

const App = () => (
    <>
      <MyNav />
      <main className="page">
        <Welcome />
        <AllTheBooks />
      </main>
      <MyFooter />
    </>
)

export default App
