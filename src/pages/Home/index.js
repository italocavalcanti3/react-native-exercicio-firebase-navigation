import React, { useEffect, useRef, useState } from 'react';
import { View, Text, StyleSheet, FlatList, TextInput, TouchableOpacity, Keyboard } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import { auth, db } from '../../services/firebase';
import { signOut, onAuthStateChanged } from 'firebase/auth';
import { get, onValue, push, ref, set, update, remove } from 'firebase/database';
import Loading from '../../components/Loading';
import Tarefa from '../../components/Tarefa';

export default function Home(){

    const inputRef = useRef(null);
    const navigation = useNavigation();
    const [loading, setLoading] = useState(false);
    const [usuario, setUsuario] = useState({uid: '', nome: '', email: ''});
    const [tarefa, setTarefa] = useState('');
    const [idTarefa, setIdTarefa] = useState('');
    const [lista, setLista] = useState([]);

    useEffect( () => {

        onAuthStateChanged(auth, (user) => {
            if (!user){
                navigation.navigate('Login');
            }
        });

        carregaUsuario();
        carregaLista();

    }, []);

    async function editarTarefa(item){
        setLoading(true);
        await onValue(ref(db, `tarefas/${usuario.uid}/${item.key}`), snapshot => {
            setIdTarefa(snapshot.key);
            setTarefa(snapshot.val().tarefa);
            inputRef.current.focus();
        });
        setLoading(false);
    }

    async function carregaLista(){
        await onValue(ref(db, `/tarefas/${usuario.uid}`), snapshot => {
            setLoading(true);
            const data = []
            snapshot.forEach(snap => {
                data.push({
                    key: snap.key,
                    tarefa: snap.val().tarefa
                });
            });
            setLista(data);
        });
        setLoading(false);
    }

    async function adicionarTarefa(){
        setLoading(true);
        const dbRef = ref(db, `tarefas/${usuario.uid}`);
        const newDbRef = push(dbRef);
        if (tarefa !== ''){
            if (idTarefa === ''){
                await set( newDbRef, { 
                    tarefa: tarefa,
                });
            } else {
                await update(ref(db, `/tarefas/${usuario.uid}/${idTarefa}`), {
                    tarefa: tarefa
                })
                .catch((error) => console.log(`${error.code - error.message}`));
            }
        } else {
            alert('Digite algo para poder salvar');
        }
        carregaLista();
        setTarefa('');
        setIdTarefa('');
        Keyboard.dismiss();
        setLoading(false);
    }

    async function excluirTarefa(item){
        setLoading(true);
        await remove(ref(db, `tarefas/${usuario.uid}/${item.key}`));
        setLoading(false);
    }

    async function carregaUsuario(){
        setLoading(true);
        await get(ref(db, `usuarios`))
        .then(snapshot => {
            setUsuario({
                uid: auth.currentUser.uid,
                nome: snapshot.val().nome,
                email: snapshot.val().email,
            });
        })
        .catch( (error) => {console.log(error.code + ' - ' + error.message)});
        setLoading(false);
    }

    async function deslogar(){
        setLoading(true);
        await signOut(auth).then(() => {
            <Loading />
        }).catch((error) => console.log(`${error.code} - ${error.message}`));
        setLoading(false);
    }

    return(
        <View style={styles.container}>


            <View style={styles.viewHeader}>
                <TextInput
                style={styles.inputTarefa}
                value={tarefa}
                placeholder='Digite uma tarefa'
                onChangeText={text => setTarefa(text)}
                ref={inputRef}
                />
                    <TouchableOpacity
                    style={styles.botaoAdd}
                    onPress={adicionarTarefa}
                    >
                    <Text style={styles.textoBotao}>+</Text>
                </TouchableOpacity>
            </View>

            <Text style={{color: '#0009', marginBottom: 8}}>Clique na tarefa caso queira editar.</Text>
            
            <View style={styles.viewList}>
                <FlatList
                keyExtractor={item => item.key}
                data={lista}
                ListEmptyComponent={() => <Text style={styles.listaVazia}>Crie a sua primeira tarefa...</Text>}
                renderItem={({item}) => <Tarefa item={item} editar={editarTarefa} excluir={excluirTarefa}/> }
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
                <TouchableOpacity style={styles.botaoDeslogar} onPress={deslogar}> 
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
        listaVazia: {
            textAlign: 'center',
            fontSize: 18,
            color: '#4448'
            
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