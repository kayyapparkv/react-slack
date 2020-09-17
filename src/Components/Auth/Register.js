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
    };

    handleChange = (event) => {
        this.setState({[event.target.name]: [event.target.value]});
    };

    handleSubmit = (event) => {
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
    };

    render() {

        const { username, password, passwordConfirmation, email } = this.state;

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
                    <Message>Already a user? <Link to = "/login">Login</Link></Message>
                </GridColumn>
            </Grid>
        )
    }
};

export default Register;