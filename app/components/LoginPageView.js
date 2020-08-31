import React from 'react';
import {
    StyleSheet,
    View,
    Dimensions,
    Text,
    TextInput,
    TouchableOpacity,
} from 'react-native';


const LoginPageView = () => {
    //console.log('LoginPage render');


    return (
        <View style = {styles.pageContent}>
            <View style={styles.formContainer}>
                <Text>Member Sign In</Text>
                <TextInput
                style = {styles.userInputForm}
                placeholder = 'Email Address...'
                />
                <TextInput
                style = {styles.userInputForm}
                placeholder = 'Password...'
                secureTextEntry={true}
                />
                <TouchableOpacity 
                style = {styles.button}
                onPress={() => {}}
                >
                    <Text>Login</Text>
                </TouchableOpacity>
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
        borderWidth: 2
    }
  });

export default LoginPageView;