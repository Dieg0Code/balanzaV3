import { StyleSheet, View, FlatList } from 'react-native'
import React, { useState, useEffect } from 'react'
import { getFirestore, collection, onSnapshot, deleteDoc, doc } from "firebase/firestore";
import { initializeApp } from 'firebase/app';
import { Card, Searchbar, Text, Portal, Button, Dialog } from 'react-native-paper';

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

const MainScreen = () => {

    const [filterData, setFilterData] = useState([]);
    const [masterData, setMasterData] = useState([]);
    const [search, setSearch] = useState("");
    const [alertVisible, setAlertVisible] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState(null);
    // const [visible, setVisible] = useState(false);

    const readDataFromFirestore = () => {
        const productsRef = collection(db, "productos");

        const unsubscribe = onSnapshot(productsRef, (querySnapshot) => {
            const products = querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));

            setFilterData(products);
            setMasterData(products);
        });

        return unsubscribe;
    };

    const deleteProduct = async (id) => {
        try {
            const productRef = doc(db, "productos", id);
            await deleteDoc(productRef);
            console.log("Producto eliminado", id);
        } catch (error) {
            console.error("Error al eliminar el producto:", error);
        }
    };

    useEffect(() => {
        const unsubscribe = readDataFromFirestore();

        return () => {
            unsubscribe();
        };
    }, []);

    const searchByName = (text) => {
        const newData = masterData.filter((item) => {
            const itemData = item.nombre.toUpperCase();
            const textData = text.toUpperCase();
            return itemData.indexOf(textData) > -1;
        });
        setFilterData(newData);
        setSearch(text);
    };

    const handleDeleteProduct = (id) => {
        // Llama a la función deleteProduct con el ID del producto
        deleteProduct(id);
    };



    const Item = ({ item }) => {
        return (
            <Card style={styles.card} mode='contained' onLongPress={() => handleDeleteProduct(item.id)}>
                <View style={styles.productInfoContainer}>
                    <View style={styles.leftColumn}>
                        <Text variant='bodySmall' style={styles.text}>Nombre producto</Text>
                        <Text variant="titleLarge" style={styles.text}>{item.nombre}</Text>
                        <Text variant='bodySmall' style={styles.text}>Código</Text>
                        <Text variant="titleLarge" style={styles.text}>{item.codigo}</Text>
                    </View>
                    <View style={styles.rightColumn}>
                        <Text variant="titleLarge" style={styles.precio}>$ {item.precio}</Text>
                    </View>
                </View>
            </Card>
        )
    }


    return (
        <View style={styles.container}>
            <View
                style={styles.inputView}
            >
                <Searchbar
                    mode='bar'
                    iconColor='#6750a4'
                    placeholder="Buscar"
                    inputStyle={{ color: '#CCCCCC' }}
                    placeholderTextColor={'#888888'}
                    value={search}
                    onChangeText={(text) => searchByName(text)}
                    style={styles.textInputStyle}
                />

            </View>

            <FlatList
                contentContainerStyle={styles.flatListStyle}
                data={filterData}
                keyExtractor={(item) => item.id.toString()}
                renderItem={Item}
            />

        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 2,
        backgroundColor: "#050505",
    },
    inputView: {
        backgroundColor: "#121212",
    },
    textInputStyle: {
        backgroundColor: '#333333',
        marginBottom: 24,
        marginTop: 80,
        width: '90%',
        alignSelf: 'center',
    },
    flatListStyle: {
        width: '100%',
        alignSelf: 'center',


    },
    text: {
        color: '#CCCCCC',
        marginLeft: 16,
        marginTop: 16,
        alignSelf: 'flex-start',
    },
    card: {
        flex: 2,
        borderRadius: 24,
        elevation: 7,
        backgroundColor: '#1a1a1a',
        marginHorizontal: 8,
        marginVertical: 8,
        width: '90%',
        height: 208,
        alignSelf: 'center',
    },
    productInfoContainer: {
        flexDirection: 'row', // Para alinear los elementos horizontalmente
        justifyContent: 'space-between', // Para que el nombre y el código ocupen el espacio disponible
        alignItems: 'center', // Para centrar verticalmente los elementos
        padding: 16, // Espaciado interior
    },
    leftColumn: {
        flex: 1, // Ocupa la mitad izquierda del espacio disponible
    },

    rightColumn: {
        flex: 1, // Ocupa la mitad derecha del espacio disponible
        alignItems: 'flex-end', // Alinea el contenido hacia la derecha
    },
    precio: {
        alignSelf: 'flex-end',
        marginRight: 24,
        fontSize: 24,
        marginTop: 24,
        color: '#ffcc00'
    }
});

export default MainScreen
