// HomeScreen.js
import React, { useState } from 'react';
import { View, Button, StyleSheet } from 'react-native';
import { Picker } from '@react-native-picker/picker';

export default function HomeScreen({ navigation }) {
    const [selectedRegion, setSelectedRegion] = useState('US-NY');

    const regions = [
        { label: 'New York', value: 'US-NY' },
        { label: 'California', value: 'US-CA' },
        { label: 'Texas', value: 'US-TX' },
        // ... add more regions as needed
    ];

    return (
        <View style={styles.container}>
            <Picker
                selectedValue={selectedRegion}
                onValueChange={(itemValue) => setSelectedRegion(itemValue)}
            >
                {regions.map((region, index) => (
                    <Picker.Item key={index} label={region.label} value={region.value} />
                ))}
            </Picker>

            <Button
                title="Fetch Bird Sighting"
                onPress={() => navigation.navigate('Bird', { region: selectedRegion })}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        paddingHorizontal: 20,
    },
});
