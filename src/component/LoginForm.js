import React ,{Component}from 'react';
import {Card,CardSection,Button,Input,Spinner} from './common';
import firebase from 'firebase';
import { Spinner } from './common/indexx';

class LoginForm extends Component {

    state = {
        email : '',
        password : '',
        Error : '',
        loading: false
    };

    onButtonPress() {
       const {email,password} = this.state;
       this.setState({Error: "",loading: true }); 

       firebase.auth().signInWithEmailAndPassword(email,password)
       .then(this.onLoginSuccess.bind(this))
       .catch(() => {
           firebase.auth().createUserWithEmailAndPassword(email,password)
           .then(this.onLoginSuccess.bind(this))
           .catch(this.onLoginFailed.bind(this));
       });
    }

    onLoginSuccess(){
        this.setState({
            email: '',
            password: '',
            loading: false,
            Error: ''
        });
    }

    onLoginFailed() {
        this.setState({
            Error:"Authentication Failed",
            loading: false
        });
    }

    renderButton() {
        if(this.state.loading){
            return <Spinner size="small"/>
        }
        return (
            <Button onPress={this.onButtonPress.bind(this)}>
                      Login
            </Button>
        );
    }

    render(){
        return(
            <Card>
                <CardSection>
                  <Input 
                     label="Email"
                     placeholder="user@gmail.com"
                     onChangeText={email => this.setState({email})}
                     value={this.state.email}
                  />
                </CardSection>
                <CardSection>
                  <Input
                    placeholder= "password"
                    label="Password"
                    secureTextEntry
                    onChangeText={password => this.setState({password})}
                    value= {this.state.password}  
                  />
                </CardSection>

                <Text>{this.state.Error}</Text>

                <CardSection>
                    {this.renderButton()}
                </CardSection>
            </Card>
        );
    }
}

export default LoginForm;