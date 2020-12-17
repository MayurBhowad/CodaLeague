import logo from './logo.svg';
import './App.css';
import NavbarComponent from './components/Navbar.component';
import SideNav from './components/SideNav.component';
import MainView from './components/Dashboard/MainView.component';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Teams from './components/Dashboard/Teams.component';
import Matches from './components/Dashboard/Matches.component';

//Redux
import { Provider } from 'react-redux';
import store from './redux/store.redux';

function App() {

  return (
    <Provider store={store}>
      <div>
        <Router>

          <NavbarComponent />
          <div className="App container-fluid">
            <div className="content">
              <div className="side-nav">
                <SideNav />
              </div>
              <div className="main-view">
                <Route path="/" exact component={MainView} />
                <Route path="/dashboard/teams" exact component={Teams} />
                <Route path="/dashboard/matches" exact component={Matches} />
              </div>
            </div>

          </div>

        </Router>
      </div>
    </Provider>
  );
}

export default App;
