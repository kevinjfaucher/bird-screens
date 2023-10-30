// BirdScreen.js
import React, { useState, useEffect } from 'react';
import { View, FlatList, Text, StyleSheet } from 'react-native';

const API_KEY = '5ms7hdo849vo';

export default function BirdScreen({ route }) {
    const { region } = route.params;
    const [data, setData] = useState([]);

    // The useEffect hook runs side effects in a function component.
// In this case, it's used to fetch bird data when the `region` changes.
    useEffect(() => {

        // Fetching data from the eBird API for a given region.
        // The `fetch` function returns a Promise that resolves with the HTTP response.
        fetch(`https://api.ebird.org/v2/data/obs/${region}/recent`, {
            headers: {
                'X-eBirdApiToken': API_KEY,
            },
        })

            // The first `.then()` is used to transform the raw HTTP response into JSON.
            // The `response.json()` method also returns a Promise that resolves with the parsed JSON.
            .then(response => response.json())

            // Once the response has been parsed, this `.then()` gets the parsed data as its argument.
            // Here, the data is set to the component's state.
            .then(result => setData(result))

            // If at any point the Promise is rejected (an error occurs), this catch block will run.
            // This could be due to a network error, invalid JSON, etc.
            .catch(error => console.log(error));

// The dependency array at the end of useEffect contains `region`.
// This means the useEffect callback will run whenever `region` changes.
    }, [region]);

    return (
        <View style={styles.container}>
            <FlatList
                data={data}
                keyExtractor={item => item.observationId.toString()}
                renderItem={({ item }) => (
                    <View style={styles.listItem}>
                        <Text>Name: {item.comName}</Text>
                        <Text>Location: {item.locName}</Text>
                        <Text>Date: {item.obsDt}</Text>
                    </View>
                )}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f7f7f7',
    },
    listItem: {
        backgroundColor: '#fff',
        padding: 20,
        marginVertical: 8,
        marginHorizontal: 16,
        borderRadius: 4,
        elevation: 1,
    },
});
