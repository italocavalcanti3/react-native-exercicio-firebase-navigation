import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import InputsButton from '../../components/InputsButton';

import { useNavigation } from '@react-navigation/native';
import 'react-native-gesture-handler';

import Titulo from '../../components/Titulo';

export default function Cadastro(){

    const navigation = useNavigation();

    function navegaLogin(){
        navigation.navigate('Login');
    }

    return(
        <View style={styles.container}>
            <Titulo nome="Cadastrar"/>
            <InputsButton screen="Cadastro"/>
            <TouchableOpacity
            style={styles.botao}
            onPress={navegaLogin}
            >
                <Text>Já possui conta? Fazer login.</Text>
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
    },
});