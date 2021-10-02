import React from 'react'
import { BrowserRouter as Router, Routes, Route, NavLink, Link } from 'react-router-dom'
import { ArticlePage, AuthPage, HomePage } from './pages'
import { useAuth } from './hooks'

import './App.css'

function App() {
  const { isAuth, authUser } = useAuth()

  return (
    <Router>
      <header>
        <nav className="navbar navbar-light">
          <div className="container">
            <Link to="/" className="navbar-brand">
              conduit
            </Link>
            <ul className="nav navbar-nav pull-xs-right">
              <li className="nav-item">
                <NavLink to="/" activeClassName="active" className="nav-link" end>
                  Home
                </NavLink>
              </li>
              {isAuth && (
                <React.Fragment>
                  <li className="nav-item">
                    <NavLink to="/editor" activeClassName="active" className="nav-link">
                      <i className="ion-compose" />
                      &nbsp;New Post
                    </NavLink>
                  </li>
                  <li className="nav-item">
                    <NavLink to="/settings" activeClassName="active" className="nav-link">
                      <i className="ion-gear-a" />
                      &nbsp;Settings
                    </NavLink>
                  </li>
                  <li className="nav-item">
                    <NavLink to={`/@${authUser.username}`} activeClassName="active" className="nav-link">
                      {authUser.username}
                      <img src={authUser.image} />
                    </NavLink>
                  </li>
                </React.Fragment>
              )}

              {/* End logged in */}

              {!isAuth && (
                <React.Fragment>
                  {' '}
                  <li className="nav-item">
                    <NavLink to="/register" activeClassName="active" className="nav-link">
                      Sign up
                    </NavLink>
                  </li>
                  <li className="nav-item">
                    <NavLink to="/login" activeClassName="active" className="nav-link">
                      Sign in
                    </NavLink>
                  </li>
                </React.Fragment>
              )}

              {/* End logged out */}
            </ul>
          </div>
        </nav>
      </header>
      <main>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/article/:slug" element={<ArticlePage />} />
          <Route path="/login" element={<AuthPage />} />
          <Route path="/register" element={<AuthPage />} />
        </Routes>
      </main>
      <footer>
        <div className="container">
          <a className="logo-font">conduit</a>
          <span className="attribution">
            An interactive learning project from <a href="https://thinkster.io">Thinkster</a>. Code &amp; design
            licensed under MIT.
          </span>
        </div>
      </footer>
    </Router>
  )
}

export default App
