import React, { useState } from 'react';
import { StyleSheet, View, Text, TextInput, Pressable } from 'react-native';
import { useDispatch } from 'react-redux';
import { useHistory } from "react-router-native";

// Custom functions:
import userAuthentication from '../authentication/userAuthentication';


const LoginPageView = () => {
    // Creating dispatch to all updates to redux store:
    const dispatch = useDispatch();

    // Creating history in order to allow react router re-directs:
    const history = useHistory();

    // Storing user credentials in local state:
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

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
                <Pressable onPress={() => userAuthentication(username, password, dispatch, history)}>
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
  });

export default LoginPageView;