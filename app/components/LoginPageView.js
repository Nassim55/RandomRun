import React, { useRef, useState } from 'react';
import { StyleSheet, View, Text, Animated } from 'react-native';
import { useDispatch } from 'react-redux';
import { useHistory } from "react-router-native";
import { TextInput, Button } from 'react-native-paper'


// Custom functions:
import userAuthentication from '../authentication/userAuthentication';


const LoginPageView = () => {
    console.log('LoginPageView Rendering')

    // Creating dispatch to all updates to redux store:
    const dispatch = useDispatch();

    // Creating history in order to allow react router re-directs:
    const history = useHistory();

    // Storing user credentials in local state:
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');



    const [isSignUp, setIsSignUp] = useState(false);
    
    const [translateXAnim] = useState(new Animated.Value(0))
    const [heightSignUpContainer] = useState(new Animated.Value(230))

    const toggleHandle = () => {
        setIsSignUp(!isSignUp);
        console.log(isSignUp)
        Animated.timing(translateXAnim, {
            toValue: isSignUp ? 1000 : 0,
            duration: isSignUp ? 500 : 2000,
            useNativeDriver: true,
        }).start();
        Animated.timing(heightSignUpContainer, {
            toValue: isSignUp ? 500 : 230,
            duration: 2000,
            useNativeDriver: false,
        }).start();
    }
    

    return (
        <View style = {styles.pageContent}>
            <View style={styles.welcomeContainer}>
                <Text style={styles.titleText}>Random Run</Text>
            </View>
            <View style={styles.cardsContainer}>
                
                <Animated.View
                style={[styles.cardLogin, {transform: [{ translateX: translateXAnim }]}]}
                >
                    <Text style={styles.welcomeTextTop}>Already have an account?</Text>
                    <Text style={styles.welcomeTextBottom}>Pick up where you left off</Text>
                    <TextInput
                    style={styles.inputForm}
                    label="Email"
                    mode={'outlined'}
                    value={username}
                    onChangeText={username => setUsername(username)}
                    />
                    <TextInput
                    style={styles.inputForm}
                    label="Password"
                    mode={'outlined'}
                    secureTextEntry={true}
                    value={password}
                    onChangeText={password => setPassword(password)}
                    />
                    <Button
                    style={styles.loginButton}
                    uppercase={false}
                    icon='login'
                    mode="contained"
                    onPress={() => {     
                        userAuthentication(username, password, dispatch, history)
                    }}
                    >
                        Login
                    </Button>
                </Animated.View>
                <Animated.View style={[styles.cardSignUp, {height: heightSignUpContainer}]}>
                    <Text style={styles.welcomeTextTop}>New to Random Run?</Text>
                    <Text style={styles.welcomeTextBottom}>Start your adventure now</Text>

                    {
                        isSignUp ?
                        <Button
                        style={styles.loginButton}
                        uppercase={false}
                        icon='sign-direction'
                        mode="outlined"
                        onPress={toggleHandle}
                        >
                            Sign Up
                        </Button>
                        :
                        <View>

                            <Button
                            style={styles.loginButton}
                            uppercase={false}
                            icon='google'
                            mode='outlined'
                            >
                                Sign Up With Google
                            </Button>
                            <Button
                            style={styles.loginButton}
                            uppercase={false}
                            icon='sign-direction'
                            mode="outlined"
                            onPress={toggleHandle}
                            >
                                Sign Up
                            </Button>
                        </View>
                    }
                </Animated.View>
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
        overflow: 'hidden',
        backgroundColor: 'white',
        zIndex: 999,
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

    const [isFlipped, setIsFlipped] = useState(false);

    const { translateX, opacity, height1, height2, borderWidth } = useSpring({
        opacity
        height1: isFlipped ? '0%' : '50%',
        height2: isFlipped ? '90%' : '40%',
        borderWidth: isFlipped ? 0 : 2.5,
        translateX: isFlipped ? 750 : 0,
        config: { mass: 12, tension: 500, friction: 80 }
    });



                style={[styles.cardLogin, {
                    height: height1,
                    transform: [{ translateX: translateX }]


*/




