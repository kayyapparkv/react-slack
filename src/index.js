import React from 'react';
import ReactDOM from 'react-dom';
import App from './Components/App';
import Login from './Components/Auth/Login';
import Register from './Components/Auth/Register';
import Spinner from './Spinner';

import 'semantic-ui-css/semantic.min.css';

import registerServiceWorker from './registerServiceWorker';

import firebase from './firebaseConnection';

import { BrowserRouter as Router, Switch, Route, withRouter} from 'react-router-dom'

import { createStore } from 'redux';
import { Provider, connect } from 'react-redux';
import { composeWithDevTools } from 'redux-devtools-extension'; 

import rootReducer from './reducers';

import { setUser, setLoader, RemoveLoader } from './actions';

const store = createStore(rootReducer, composeWithDevTools());

class Root extends React.Component {

    componentDidMount() {
        firebase.auth().onAuthStateChanged(user => {
            if(user) {
                console.log(this.props.isLoading);
                // this.props.setLoader();
                console.log(this.props.isLoading);
                this.props.setUser(user);
                this.props.history.push('/');
                // this.props.RemoveLoader();
                console.log(this.props.isLoading);
            }
        });
    }

    render() {
        return this.props.isLoading ? <Spinner /> :(
            <Switch>
                <Route path = '/' exact component = {App}/>
                <Route path = '/login' exact component = {Login}/>
                <Route path = '/register' exact component = {Register}/>
            </Switch>
        )
    }
}

const mapStateFromProps = state => ({
    // isLoading: state.user.isLoading,
});

const RootWithAuth = withRouter(connect(mapStateFromProps, { setUser, setLoader, RemoveLoader })(Root));

ReactDOM.render(
    <Provider store = {store}>
        <Router>
            <RootWithAuth />
        </Router>
    </Provider>,
document.getElementById('root'));
registerServiceWorker();
