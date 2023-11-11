import { StyleSheet, View } from 'react-native'
import React, { useState } from 'react'
import { Card, Text, TextInput, Button } from 'react-native-paper'
import { ToastAndroid } from 'react-native';
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { collection, addDoc } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyC7U6HewsVAR4NNV1uMArN6IU7KMvgIBDQ",
    authDomain: "qwea-dfab5.firebaseapp.com",
    projectId: "qwea-dfab5",
    storageBucket: "qwea-dfab5.appspot.com",
    messagingSenderId: "323130832828",
    appId: "1:323130832828:web:6cf037dd28a79c1837ddb9"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);


const AddProductScreens = ({ navigation }) => {

    const [nombre, setNombre] = useState("");
    const [codigo, setCodigo] = useState("");
    const [precio, setPrecio] = useState("");

    const handleAddProduct = async () => {
        try {
            await addDoc(collection(db, "productos"), {
                nombre: nombre,
                codigo: codigo,
                precio: precio,
            });

            ToastAndroid.show("Producto agregado con éxito", ToastAndroid.SHORT, ToastAndroid.CENTER);

            navigation.goBack();

            setNombre("");
            setCodigo("");
            setPrecio("");
        } catch (error) {
            console.error("Error al agregar el producto:", error);
            // Maneja el error y muestra un mensaje al usuario
            ToastAndroid.show("Error al agregar el producto", ToastAndroid.SHORT, ToastAndroid.CENTER);
        }
    };

    return (
        <View style={styles.container}>
            <Card style={styles.card} mode='outlined'>
                <Text variant="titleLarge" style={styles.text}>Agregar Nuevo Producto</Text>
                <TextInput
                    mode='outlined'
                    label="Nombre"
                    textColor='#CCCCCC'
                    value={nombre}
                    onChangeText={setNombre}
                    style={styles.textIput}
                />
                <TextInput
                    mode='outlined'
                    label="Precio"
                    textColor='#CCCCCC'
                    value={precio}
                    onChangeText={setPrecio}
                    style={styles.textIput}
                />
                <TextInput
                    mode='outlined'
                    label="Código"
                    textColor='#CCCCCC'
                    value={codigo}
                    onChangeText={setCodigo}
                    style={styles.textIput}
                />
            </Card>
            <Button icon="plus" mode="contained" onPress={handleAddProduct} style={styles.button}>
                Agregar Producto
            </Button>
        </View>
    )
}

export default AddProductScreens

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: "#050505",
    },
    card: {
        width: '90%',
        backgroundColor: '#333333',
        borderRadius: 10,
        alignSelf: 'center',
    },
    text: {
        color: '#CCCCCC',
        padding: 16,
        alignSelf: 'center',
    },
    textIput: {
        backgroundColor: '#333333',
        borderRadius: 10,
        elevation: 16,
        marginBottom: 24,
        width: '90%',
        alignSelf: 'center',
    },
    button: {
        marginTop: 16,
        borderRadius: 10,
        elevation: 16,
        marginBottom: 16,
        width: '90%',

    }

})