import React from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';

const HamburgerMenu = (props) => {
    return (
        <TouchableOpacity style={styles.hamburgerButton} onPress={props.onPress}>
            <SimpleLineIcons name='menu' size={24} />
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    hamburgerButton: {
        position: 'absolute',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        top: '5%',
        right: '7.5%',
        backgroundColor: 'white',
        width: 50,
        height: 50,
        borderRadius: 25,
        shadowColor: "#000",
        shadowOffset: {
          width: 0,
          height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
        opacity: 0.8
    }
})

export default HamburgerMenu;