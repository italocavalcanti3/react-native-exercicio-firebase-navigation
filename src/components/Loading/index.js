import React from 'react';
import { ActivityIndicator, View } from 'react-native';

export default function Loading(){
    return(
        <View>
            <ActivityIndicator color="#d35400" size={50} />
        </View>
    );
}