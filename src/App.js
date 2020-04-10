import React,{Component} from 'react';
import {Text,View} from 'react-native';
import firebase from 'firebase';
import Header from './component/common';
import LoginForm from './component';
import { Button } from './component/common/Button';
import { Spinner } from './component/common/indexx';

class App extends Component {

    state= {
        LoggedIn : false
    };

    componentWillMount() {
        firebase.initializeApp({
            apiKey:'j,hgj[jijmogmfgmknjknfuyrgey',
            authDomain: '',
            databaseURL: '',
            storageBucket: '',
            messagingsenderId: ''
        });

        firebase.auth().onAuthStateChanged((user) => {
            if(user){
                this.setState({LoggedIn: true});
            }
            else
            {
                this.setState({LoggedIn: false});
            }
        });
    }

    renderContent() {
       switch (this.state.LoggedIn){
           case true:
               return (
               <Button onPress={() => firebase.auth().signOut()}>
                   Log Out
               </Button>);
           case false:
               return <LoginForm/>;
            default :
               return <Spinner size="large"/>       
       }
    }

    render(){
        return (
            <View>
                <Header headerText="Authentication"/>
                {this.renderContent()}
            </View>
        );
    }
}