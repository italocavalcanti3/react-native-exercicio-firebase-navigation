import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity, Alert, ToastAndroid} from 'react-native';

export default function Tarefa( {item, editar, excluir} ){

    function confirmarAcao(){
        Alert.alert(
            'Confirmar Exclusão', 
            'Deseja excluir esta tarefa?',
        [
            {
                text: 'Não',
                onPress: () => console.log('Cancel pressionado.')
            },
            {
                text: 'Sim',
                onPress: () => excluir(item)
            },
        ],
        {
            cancelable: true,
        }
        );
    }

    return(
        <View style={styles.container}>
            <TouchableOpacity onPress={() => editar(item)}>
                <Text style={styles.tarefa}>{item.tarefa}</Text>
            </TouchableOpacity>
            
            <TouchableOpacity onPress={confirmarAcao}>
                <Text style={styles.botao}>Excluir</Text>
            </TouchableOpacity>

        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 12,
        borderRadius: 5,
        backgroundColor: '#2555',
        marginVertical: 4,
    },
    tarefa: {
        flex: 1,
        fontSize: 18,
        lineHeight: 22,
        color: '#333',
    },
    botao: {
        backgroundColor: '#0000'
        // backgroundColor: '#2555',
        // flex: 1,
        // padding: 12,
        // borderRadius: 5,
        // marginVertical: 4,
    },
});