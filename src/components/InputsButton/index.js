import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Keyboard, ActivityIndicator, LogBox } from 'react-native';
import Loading from '../Loading';
import { useNavigation } from '@react-navigation/native';
import { auth, db } from '../../services/firebase';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
import { ref, set } from 'firebase/database';

LogBox.ignoreAllLogs();

export default function InputsButton( props ){

    const [nome, setNome] = useState('');
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');
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
        } else if (error === 'auth/user-not-found') {
            alert('Usuário não encontrado.');
        } else {
            alert('Erro ao cadastrar.');
            console.log(error);
        }
    }

    async function logarOuCadastrar(){
        if (email !== '' && senha !== ''){
            
            if (textoBotao === 'cadastro') {
                setCarregar(true);
                await createUserWithEmailAndPassword(auth, email, senha)
                .then( (userCredencial) => {
                    let user = userCredencial.user;
                    set( ref(db, 'usuarios/' + user.uid), {
                        nome: nome,
                        email: email
                    });
                    setNome('');
                    setEmail('');
                    setSenha('');
                    navigation.navigate('Home');
                })
                .catch( (error) => {
                    verificarErro(error.code);
                });
                setCarregar(false);
            } else {
                setCarregar(true);
                await signInWithEmailAndPassword(auth, email, senha)
                .then( (userCredencial) => {
                    setEmail('');
                    setSenha('');
                    Keyboard.dismiss();
                    navigation.navigate('Home');
                })
                .catch( (error) => {
                    verificarErro(error.code);
                } );
                setCarregar(false);  
            }

        } else {
            alert('Preencha os campos corretamente.');
        }
    }

    return(
        <View style={styles.container}>

                    <View style={styles.area}>

                        {
                            textoBotao === 'cadastro' ?
                            (
                                <View>
                                <Text style={styles.label}>Nome</Text>
                                <TextInput
                                value={nome}
                                style={styles.input}
                                autoCapitalize='words'
                                onChangeText={nome => setNome(nome)}
                                />
                                </View>
                            ) :
                            (
                                null
                                )
                            }

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
                        secureTextEntry={true}
                        onChangeText={senha => setSenha(senha)}
                        />

                        <TouchableOpacity
                        style={styles.botao}
                        onPress={logarOuCadastrar}
                        >
                            <Text style={styles.textoBotao}>{props.screen}</Text>
                        </TouchableOpacity>

                    </View>
            { carregar ? ( <Loading /> ) : (null) }


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