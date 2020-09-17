import React, {Component} from 'react';

import firebase from '../../firebaseConnection';

import {
    Grid,
    Form,
    Segment,
    Button,
    Header,
    Message,
    Icon,
    GridColumn
} from 'semantic-ui-react';

import {Link} from 'react-router-dom';

class Register extends Component{
    state = {
        username : '',
        email : '',
        password : '',
        passwordConfirmation : '',
        errors : [],
    };

    isFormvalid = () => {

        let errors = [];
        let error;

        if (this.isFormEmpty(this.state)) {
            error = { message: 'Fill in all fields' };
            this.setState({errors: errors.concat(error)});
            console.log(`all fields are not valid`)
            return false;
        }else if (!this.isPasswordValid(this.state)) {
            error = { message : 'Password is invalid'};
            this.setState({ errors: errors.concat(error)});
            console.log(`password is invalid`)
            return false;
        }else {
            console.log('form is valid');
            return true;
        }
    };

    isFormEmpty = ({ username, email, password, passwordConfirmation }) => {
        return !username.length || !email.length || !password.length || !passwordConfirmation.length ;
    };

    isPasswordValid = ({ password, passwordConfirmation}) => {
        console.log('entered into password comparing function');
        console.log(`password : ${password}`);
        console.log(`passwordConfirmation : ${passwordConfirmation}`);
        console.log(`password === passwordConfirmation : ${password === passwordConfirmation}`);
        console.log(`password.length > 6 : ${password.toString().length > 6}`);
        if (password.toString() === passwordConfirmation.toString() && password.toString().length > 6) {
            console.log(`password === passwordConfirmation : ${password === passwordConfirmation}`);
            console.log(`password.length > 6 : ${password.toString().length > 6}`);

            return true;
        } else {
            return false;
        }
    };

    handleChange = (event) => {
        this.setState({[event.target.name]: [event.target.value]});
    };

    handleSubmit = (event) => {
        if (this.isFormvalid()){
            this.setState({
                errors: [],
            });
            console.log('Entered into submission, and initiating the submission');
            event.preventDefault();
            console.error(`${this.state.email}`, `${this.state.password}`);
            firebase
                .auth()
                .createUserWithEmailAndPassword(`${this.state.email}`, `${this.state.password}`)
                .then(createduser => {
                    console.log(createduser)
                })
                .catch(err => {
                    console.error(err);
                })
        }
    };

displayErrors = errors => errors.map((error, i) => <p key = {i}>{error.message}</p>);

    render() {

        const { username, password, passwordConfirmation, email, errors } = this.state;

        return(
            <Grid textAlign = "center" verticalAlign = "middle" className = "app">
                <GridColumn style = {{maxWidth: 450}}>
                    <Header as = "h2" icon color = "orange" textAlign = "center">
                        <Icon name = "add user" color = "orange" />
                        Register for SlackChat
                    </Header>
                    <Form onSubmit = {this.handleSubmit} size = "large">
                        <Segment stacked>
                            <Form.Input fluid name = "username" value = {username} icon = "user" iconPosition = "left" placeholder = "username" onChange = {this.handleChange} type = "text" />
                            <Form.Input fluid name = "email" value = {email} icon = "mail" iconPosition = "left" placeholder = "email" onChange = {this.handleChange} type = "email" />
                            <Form.Input fluid name = "password" value = {password} icon = "lock" iconPosition = "left" placeholder = "password" onChange = {this.handleChange} type = "password" />
                            <Form.Input fluid name = "passwordConfirmation" value = {passwordConfirmation} icon = "repeat" iconPosition = "left" placeholder = "password confirmation" onChange = {this.handleChange} type = "password" />

                            <Button color = "orange" fluid size = "large" >Submit</Button>
                        </Segment>
                    </Form>
                    {errors.length > 0 && (
                        <Message error>
                            <h3>Error</h3>
                            {this.displayErrors(errors)}
                        </Message>
                    )}
                    <Message>Already a user? <Link to = "/login">Login</Link></Message>
                </GridColumn>
            </Grid>
        )
    }
};

export default Register;