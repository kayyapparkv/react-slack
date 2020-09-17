import React from 'react';
import ReactDOM from 'react-dom';
import App from './Components/App';
import Login from './Components/Auth/Login';
import Register from './Components/Auth/Register';

import 'semantic-ui-css/semantic.min.css';

import registerServiceWorker from './registerServiceWorker';

import { BrowserRouter as Router, Switch, Route} from 'react-router-dom'

const Root = () => (
    <Router>
        <Switch>
            <Route path = '/' exact component = {App}/>
            <Route path = '/login' exact component = {Login}/>
            <Route path = '/register' exact component = {Register}/>
        </Switch>
    </Router>
)

ReactDOM.render(<Root />, document.getElementById('root'));
registerServiceWorker();
