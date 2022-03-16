import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';

export default function Tarefa( props ){
    return(
        <View style={styles.container}>
            <Text style={styles.tarefa}>{props.item}</Text>
            <TouchableOpacity style={styles.botao}>
                <Text>Editar</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
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
    },
});