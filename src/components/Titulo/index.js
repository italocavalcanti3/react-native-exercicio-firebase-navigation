import React from 'react';
import {View, Text, StyleSheet} from 'react-native';

export default function Titulo({ nome }){
    return(
        <Text style={styles.titulo}>{nome}</Text>
    );
}

const styles = StyleSheet.create({
    titulo: {
        fontSize: 25,
        lineHeight: 32,
        fontWeight: 'bold',
    }
});