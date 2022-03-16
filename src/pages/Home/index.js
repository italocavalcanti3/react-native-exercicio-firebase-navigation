import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList, TextInput, TouchableOpacity, Keyboard } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import { auth, db } from '../../services/firebase';
import { signOut, onAuthStateChanged } from 'firebase/auth';
import { get, onValue, push, ref, set } from 'firebase/database';
import Loading from '../../components/Loading';
import Tarefa from '../../components/Tarefa';
import { isEmpty } from '@firebase/util';

export default function Home(){

    const navigation = useNavigation();
    const [loading, setLoading] = useState(false);
    const [usuario, setUsuario] = useState({uid: '', nome: '', email: ''});
    const [tarefa, setTarefa] = useState('');
    const [idTarefa, setIdTarefa] = useState(0);
    const [lista, setLista] = useState([]);

    useEffect( () => {

        onAuthStateChanged(auth, (user) => {
            if (!user){
                navigation.navigate('Login');
            }
        });

        carregaUsuario();
        carregaTarefas();


    }, []);

    async function adicionarTarefa(){
        setLoading(true);
        const dbRef = ref(db, 'tarefas');
        const newDbRef = push(dbRef);
        await set( newDbRef, {
            tarefa: tarefa
        });
        setTarefa('');
        setIdTarefa(idTarefa + 1);
        Keyboard.dismiss();
        setLoading(false);
    }

    async function carregaTarefas(){        
        setLista({});
        await onValue( ref(db, 'tarefas'), snapshot => {
            const data = [];
            snapshot.forEach( snap => {
                data.push(snap.val().tarefa);
                setLista(data);
            });
        });
    }

    async function carregaUsuario(){
        await get(ref(db, `usuarios/${auth.currentUser.uid}`))
        .then(snapshot => {
            setUsuario({
                uid: auth.currentUser.uid,
                nome: snapshot.val().nome,
                email: snapshot.val().email,
            });
        })
        .catch( (error) => {console.log(error.code + ' - ' + error.message)});
    }

    return(
        <View style={styles.container}>

            <View style={styles.viewHeader}>
                <TextInput
                style={styles.inputTarefa}
                value={tarefa}
                placeholder='Digite uma tarefa'
                onChangeText={text => setTarefa(text)}
                />
                    <TouchableOpacity
                    style={styles.botaoAdd}
                    onPress={adicionarTarefa}
                    >
                    <Text style={styles.textoBotao}>+</Text>
                </TouchableOpacity>
            </View>

            <View style={styles.viewList}>
                <FlatList
                data={lista}
                keyExtractor={item => item.idTarefa}
                renderItem={({item}) => <Tarefa item={item} /> }
                />
            </View>

            {
                loading ?
                (
                    <Loading />
                ) :
                (
                    null
                )
            }

            <View style={styles.viewFooter}>
                <TouchableOpacity style={styles.botaoDeslogar}>
                    <Text style={styles.textoBotao}>Deslogar</Text>
                </TouchableOpacity>
            </View>

        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
        marginTop: 55,
    },
    viewHeader: {
        flexDirection: 'row',
        padding: 8,
        marginBottom: 16,
    },
        inputTarefa: {
            padding: 8,
            borderRadius: 5,
            borderWidth: 0.5,
            fontSize: 18,
            marginRight: 8,
            flex: 1,
        },
        botaoAdd: {
            padding: 8,
            width: 50,
            borderRadius: 5,
            backgroundColor: '#115'
        },
    viewList: {
        flex: 1,
        padding: 8,
    },
        card: {
            borderRadius: 5,
            backgroundColor: 'red',
            padding: 8,
        },  
    viewFooter: {
        padding: 8,
        alignItems: 'center',
        marginTop: 16,
    },
        botaoDeslogar: {
            padding: 8,
            borderRadius: 5,
            backgroundColor: '#115',
        },
        textoBotao: {
            color: '#FFF',
            fontWeight: 'bold',
            fontSize: 18,
            textAlign: 'center',
        },
});