import React, { useEffect } from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import { auth } from '../../services/firebase';
import { signOut, onAuthStateChanged } from 'firebase/auth';

export default function Home(){

    const navigation = useNavigation();

    useEffect( () => {

        onAuthStateChanged( auth, (user) => {
            if (!user) {
                navigation.navigate('Login');
            }
        } )

    }, [] );

    return(
        <View style={styles.container}>
            <Text>Home</Text>
            <Button title='Deslogar' onPress={ () => {
                signOut(auth).then( () => {
                    alert('Deslogando...');
                })
                .catch( (error) => {
                    alert(`${error.code} - erro ao deslogar.`);
                } );
            } }/>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        padding: 16,
        marginTop: 20,
    }
});