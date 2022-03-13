import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Keyboard, ActivityIndicator } from 'react-native';

import { useNavigation } from '@react-navigation/native';
import { auth } from '../../services/firebase';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';


export default function InputsButton( props ){

    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');
    const [usuario, setUsuario] = useState({});
    const [carregar, setCarregar] = useState(false);

    const navigation = useNavigation();

    const textoBotao = props.screen.toLowerCase();
    
    function verificarErro(error){
        if (error === 'auth/weak-password'){
            alert('A senha precisa ter pelo menos 6 caracteres.');
        } else if (error === 'auth/invalid-email'){
            alert('Digite um e-mail válido.');
        } else if (error === 'auth/email-already-in-use') {
            alert('E-mail já cadastrado.');
        } else {
            alert('Erro ao cadastrar.');
            console.log(error);
        }
    }

    async function logarOuCadastrar(){
        setCarregar(true);
        if (email !== '' && senha !== ''){
            
            
            if (textoBotao === 'cadastro'){ 
                createUserWithEmailAndPassword(auth, email, senha)
                .then( (userCredencial) => {
                    setUsuario(userCredencial.user);
                    setEmail('');
                    setSenha('');
                    Keyboard.dismiss();
                    navigation.navigate('Home');
                })
                .catch( (error) => {
                    verificarErro(error.code);
                });
                //setCarregar(false);
            } else {
                signInWithEmailAndPassword(auth, email, senha)
                .then( (userCredencial) => {
                    setUsuario(userCredencial.user);
                    setEmail('');
                    setSenha('');
                    alert('Login efetuado');
                    Keyboard.dismiss();
                    navigation.navigate('Home');
                })
                .catch( (error) => {
                    verificarErro(error.code);
                });
            }
        } else {
            alert('Preencha os campos corretamente.');
        }
        setCarregar(false);
    }

    return(
        <View style={styles.container}>

            {
                carregar ?
                (
                    <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
                        <ActivityIndicator color="#d35400" size={50} />
                    </View>
                ) :
                (
                    <View style={styles.area}>

                        <Text style={styles.label}>E-mail</Text>
                        <TextInput
                        value={email}
                        style={styles.input}
                        keyboardType='email-address'
                        onChangeText={email => setEmail(email)}
                        />

                        <Text style={styles.label}>Senha</Text>
                        <TextInput
                        value={senha}
                        style={styles.input}
                        onChangeText={senha => setSenha(senha)}
                        />

                        <TouchableOpacity
                        style={styles.botao}
                        onPress={logarOuCadastrar}
                        >
                            <Text style={styles.textoBotao}>{props.screen}</Text>
                        </TouchableOpacity>

                    </View>
                )
            }


        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        width: '100%',
        marginTop: 32,
        justifyContent: 'center',
        padding: 16,
    },
    label: {
        fontSize: 18,
        lineHeight: 22,
    },
    input: {
        width: '100%',
        borderWidth: 0.5,
        marginTop: 8,
        marginBottom: 16,
        padding: 8,
        borderRadius: 5,
    },
    botao: {
        backgroundColor: '#d35400',
        padding: 15,
        borderRadius: 5,
        marginTop: 16,
    },
    textoBotao: {
        fontSize: 18,
        lineHeight: 22,
        fontWeight: 'bold',
        color: '#FFF',
        textAlign: 'center'
    }
});