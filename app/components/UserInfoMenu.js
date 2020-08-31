import React, { useState } from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import { useSpring, animated } from 'react-spring/native';




const UserInfoMenu = (props) => {
    console.log('UserInfoMenu render')
    
    const [isNavMenuOpen, setIsNavMenuOpen] = useState(false);
    
    const fade = useSpring({
        opacity: isNavMenuOpen ? 1 : 0
    })
    const hamburgerColour = useSpring({
        backgroundColor: isNavMenuOpen ? '#F24E4E' : 'white'
    })

    console.log(isNavMenuOpen)

    const AnimatedView = animated(View);
    const AnimatedTouchableOpacity = animated(TouchableOpacity);

    return (
        <View style={styles.userInfoMenu}>
            <AnimatedTouchableOpacity style={[styles.hamburgerButton, {...hamburgerColour}]} onPress={() => setIsNavMenuOpen(!isNavMenuOpen)}>
                {
                    isNavMenuOpen ?
                    <SimpleLineIcons name='arrow-up' size={24} color='white'/>
                    :
                    <SimpleLineIcons name='menu' size={24} />
                }
            </AnimatedTouchableOpacity>
            <AnimatedView style={fade}>
                <TouchableOpacity style={styles.userInfoMenuButton}>
                    <SimpleLineIcons name='user' size={24} />
                    <Text style={styles.userInfoMenuButtonText}>Profile</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.userInfoMenuButton}>
                    <SimpleLineIcons name='directions' size={24} />
                    <Text style={styles.userInfoMenuButtonText}>Routes</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.userInfoMenuButton}>
                    <SimpleLineIcons name='chart' size={24} />
                    <Text style={styles.userInfoMenuButtonText}>Stats</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.userInfoMenuButton}>
                    <SimpleLineIcons name='settings' size={24} />
                    <Text style={styles.userInfoMenuButtonText}>Settings</Text>
                </TouchableOpacity>
            </AnimatedView>
        </View>
    );
};



const styles = StyleSheet.create({
    userInfoMenu: {
        position: 'absolute',
        top: '2.5%',
        right: '2.5%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    hamburgerButton: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',

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
        opacity: 0.8,
        margin: 5
    },
    userInfoMenuButton: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'white',
        borderRadius: 15,
        opacity: 0.8,
        height: 70,
        width: 70,
        margin: 5
    },
    userInfoMenuButtonText: {
        color: 'black'
    },
})

export default UserInfoMenu;