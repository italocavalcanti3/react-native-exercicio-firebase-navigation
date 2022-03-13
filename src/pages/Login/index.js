import React, { useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import InputsButton from '../../components/InputsButton';
import { useNavigation } from '@react-navigation/native';

import { auth } from '../../services/firebase';
import { onAuthStateChanged } from 'firebase/auth';

import Titulo from '../../components/Titulo';

export default function Login(){

    const navigation = useNavigation();

    useEffect( () => {

        onAuthStateChanged( auth, (user) => {
            if (user) {
                navigation.navigate('Home');
            }
        } )

    }, [] );

    function navegaCadastro(){
        navigation.navigate('Cadastro');
    }

    return(
        <View style={styles.container}>
            <Titulo nome="Efetuar Login"/>
            <InputsButton screen="Login"/>
            <TouchableOpacity
            onPress={navegaCadastro}
            >
                <Text>Ainda não tem conta? Cadastre-se.</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        padding: 16,
        marginTop: 40,
    }
});