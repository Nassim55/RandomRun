import React, { useState } from 'react';
import {
    StyleSheet,
    View,
    Text,
    TextInput,
    TouchableOpacity,
} from 'react-native';
import { Link } from "react-router-native";


const LoginPageView = () => {
    const [token, setToken] = useState('');
    const [userName, setUserName] = useState('');
    const [userPassword, setUserPassword] = useState('');
    
    const userCredentials = {
        username: userName,
        password: userPassword,
    };

    console.log(userCredentials);
    

    const loginUser = async () => {
        try {
            const response = await fetch('http://127.0.0.1:8000/auth/', {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify(userCredentials), 
            });
            const data = await response.json();
            await setToken(data.token)
        } catch (err) { if (console) console.error(err) }
    };

    console.log(token);


    return (
        <View style = {styles.pageContent}>
            <View style={styles.formContainer}>
                <Text>Member Sign In</Text>
                <TextInput
                style = {styles.userInputForm}
                placeholder = 'Email Address...'
                onChangeText={username => setUserName(username)}
                />
                <TextInput
                style = {styles.userInputForm}
                placeholder = 'Password...'
                secureTextEntry={true}
                onChangeText={password => setUserPassword(password)}
                />
                <Link to='/usermap' component={TouchableOpacity} activeOpacity={0.8}>
                    <Text>Login</Text>
                </Link>
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
*/