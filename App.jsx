const Router = ReactRouterDOM.HashRouter
const { Route, Switch, Link } = ReactRouterDOM
import { BookApp } from './pages/BookApp.jsx'
import { BookDetails } from './pages/BookDetails.jsx'
import { AboutUs } from './pages/AboutUs.jsx'
import { AppHeader } from './cmps/AppHeader.jsx'
import { BookEdit } from './pages/BookEdit.jsx'
import { ReviewAdd } from './cmps/ReviewAdd.jsx'

function Home() {
    return <section>
        <h1>Home</h1>
        <p>Check out some awsome <Link to="/book">books</Link></p>
    </section>
}

export function App() {
    return (
        <Router>
            <header>
                <AppHeader />
            </header>
            <main>
                <Switch>
                    <Route component={ReviewAdd} path="/book/ReviewAdd/:bookId" />
                    <Route component={BookEdit} path="/book/edit/:bookId?" />
                    <Route component={BookDetails} path="/book/:bookId" />
                    <Route component={BookApp} path="/book" />
                    <Route component={AboutUs} path="/about" />
                    <Route component={Home} path="/" />
                </Switch>
            </main>
            <footer>
                coffeerights &copy;
            </footer>
        </Router>
    )
}


