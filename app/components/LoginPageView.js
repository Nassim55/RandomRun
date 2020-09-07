import React, { useState } from 'react';
import { StyleSheet, View, Text, Pressable } from 'react-native';
import { useDispatch } from 'react-redux';
import { useHistory } from "react-router-native";
import { TextInput, Button } from 'react-native-paper'
import { useSpring, animated } from 'react-spring/native';

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



    const [isFlipped, setIsFlipped] = useState(false);

    const { translateX, opacity, height1, height2, borderWidth } = useSpring({
        opacity: isFlipped ? 1 : 0,
        height1: isFlipped ? '0%' : '50%',
        height2: isFlipped ? '90%' : '40%',
        borderWidth: isFlipped ? 0 : 2.5,
        translateX: isFlipped ? 750 : 0,
        config: { mass: 12, tension: 500, friction: 80 }
    });

    console.log(isFlipped)

    const AnimatedView = animated(View);
    const AnimatedText = animated(Text);
    const AnimatedTextInput = animated(TextInput);
    const AnimatedButton = animated(Button);

    return (
        <View style = {styles.pageContent}>
            <View style={styles.welcomeContainer}>
                <Text style={styles.titleText}>Random Run</Text>
            </View>
            <View style={styles.cardsContainer}>
                
                <AnimatedView 
                style={[styles.cardLogin, {
                    height: height1,
                    transform: [{ translateX: translateX }]
                }]}
                >
                    <AnimatedText style={styles.welcomeTextTop}>Already have an account?</AnimatedText>
                    <AnimatedText style={styles.welcomeTextBottom}>Pick up where you left off</AnimatedText>
                    <AnimatedTextInput
                    style={styles.inputForm}
                    label="Email"
                    value={username}
                    onChangeText={username => setUsername(username)}
                    mode={'outlined'}
                    />
                    <AnimatedTextInput
                    style={styles.inputForm}
                    label="Password"
                    value={password}
                    secureTextEntry={true}
                    onChangeText={password => setPassword(password)}
                    mode={'outlined'}
                    />
                    <AnimatedButton
                    style={styles.loginButton}
                    uppercase={false}
                    icon='login'
                    mode="contained"
                    onPress={() => userAuthentication(username, password, dispatch, history)}
                    >
                        Login
                    </AnimatedButton>
                </AnimatedView>
                <AnimatedView style={[styles.cardSignUp, {height: height2}]}>
                    <Text style={styles.welcomeTextTop}>New to Random Run?</Text>
                    <Text style={styles.welcomeTextBottom}>Start your adventure now</Text>
                    <Button
                    style={styles.loginButton}
                    uppercase={false}
                    icon='sign-direction'
                    mode="outlined"
                    onPress={() => setIsFlipped(!isFlipped)}
                    >
                        Sign Up
                    </Button>
                    <Button
                    style={styles.loginButton}
                    uppercase={false}
                    icon='google'
                    mode='outlined'
                    >
                        Sign Up With Google
                    </Button>
                </AnimatedView>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    pageContent: {
        backgroundColor: 'white',
        position: 'relative',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'space-between',
        width: '100%',
        height: '100%',
        
    },
    titleText: {
        fontFamily: 'Raleway-Regular',
        fontSize: 44,
    },
    welcomeContainer: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        height: '20%',
        width: '100%',
    },
    cardsContainer: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        height: '80%',
        width: '100%',
        overflow: 'hidden'
    },
    cardLogin: {
        position: 'absolute',
        borderWidth: 2.5,
        display: 'flex',
        flexDirection: 'column',
        width: '85%',
        borderStyle: 'dashed',
        borderRadius: 20,
        borderColor: '#ccc',
        padding: 20,
        marginBottom: 15,
    },
    cardSignUp: {
        position: 'absolute',
        bottom: 0,
        borderWidth: 2.5,
        display: 'flex',
        flexDirection: 'column',
        width: '85%',
        borderStyle: 'dashed',
        borderRadius: 20,
        borderColor: '#ccc',
        padding: 20,
        marginBottom: 35,
    },
    welcomeTextTop: {
        fontFamily: 'Raleway-Regular',
        fontSize: 24,
    },
    welcomeTextBottom: {
        fontFamily: 'Raleway-Light',
        fontSize: 16,
    },
    inputForm: {
        marginTop: 10,
    },
    loginButton: {
        marginTop: 20
    }
  });

export default LoginPageView;


/*

*/