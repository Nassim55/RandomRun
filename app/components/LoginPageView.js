import React, { useState } from 'react';
import {
    StyleSheet,
    View,
    Text,
    TextInput,
    TouchableOpacity,
    Pressable,
    AsyncStorage,
} from 'react-native';
import { Link, useHistory } from "react-router-native";
import * as Keychain from 'react-native-keychain';


import saveData from '../authentication/saveData';
import getData from '../authentication/getData';


const LoginPageView = () => {
    const history = useHistory();

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const userAuthentication = async () => {
        try {
            // Checking if username and password exist on the server:
            const response = await fetch('http://127.0.0.1:8000/auth/', {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({ username, password }), 
            });
            const data = await response.json();
            saveData(data.token);
            // If a valid token is returned push them to the map:
            if (data.token) {
                history.push('/usermap');
            } else {
                history.push('/');
            }
        } catch (err) { if (console) console.error(err) }
    };

    getData();

    return (
        <View style = {styles.pageContent}>
            <View style={styles.formContainer}>
                <Text>Member Sign In</Text>
                <TextInput
                style = {styles.userInputForm}
                placeholder = 'Email Address...'
                onChangeText={username => setUsername(username)}
                />
                <TextInput
                style = {styles.userInputForm}
                placeholder = 'Password...'
                secureTextEntry={true}
                onChangeText={password => setPassword(password)}
                />
                <Pressable onPress={userAuthentication}>
                    <Text>Login</Text>
                </Pressable>


            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    pageContent: {
        position: 'relative',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
        height: '100%',
    },
    formContainer: {
        position: 'relative',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-evenly',
        alignItems: 'center',
        width: '90%',
    },
    userInputForm: {
        position: 'relative',
        width: '100%',
        backgroundColor: 'white',
        shadowColor: "#000",
        shadowOffset: {
          width: 0,
          height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
        borderRadius: 10,
        opacity: 0.8,
        margin: 5
    },
    button: {
    }
  });

export default LoginPageView;



/*
                    <TouchableOpacity 
                    style = {styles.button}
                    onPress={loginUser}
                    >
                    </TouchableOpacity>





                <Link to='/usermap' component={TouchableOpacity} activeOpacity={0.8}>
                    <Text>Login</Text>
                </Link>
*/