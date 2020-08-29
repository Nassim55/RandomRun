import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';

const UserInfoMenu = () => {
    return (
        <View style={styles.userInfoMenu}>
            <TouchableOpacity>
                <Text>Profile</Text>
            </TouchableOpacity>
            <TouchableOpacity>
                <Text>Stats</Text>
            </TouchableOpacity>
            <TouchableOpacity>
                <Text>Saved Routes</Text>
            </TouchableOpacity>
            <TouchableOpacity>
                <Text>Settings</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    userInfoMenu: {
        position: 'absolute',
        top: '10%',
        right: 0,
        backgroundColor: 'white',
        shadowColor: "#000",
        shadowOffset: {
          width: 0,
          height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
        borderBottomLeftRadius: 10,
        borderTopLeftRadius: 10,
        opacity: 0.9,
        width: '40%',
        height: '25%',
    },
    userInfoMenuButton: {

    }
})

export default UserInfoMenu;