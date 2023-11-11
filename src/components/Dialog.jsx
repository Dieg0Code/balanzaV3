import { Animated, StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Modal, PaperProvider, Portal } from 'react-native-paper';

const Dialog = ({ visible, message, onCancel, onDelete }) => {

    const fadeAnim = useState(new Animated.Value(0))[0];

    useEffect(() => {
        if (visible) {
            Animated.timing(fadeAnim, {
                toValue: 1,
                duration: 560,
                useNativeDriver: true
            }).start();
        } else {
            Animated.timing(fadeAnim, {
                toValue: 0,
                duration: 560,
                useNativeDriver: true
            })
        }
    }), [visible]

    if (!visible) {
        return null;
    }
    return (
        <PaperProvider>
            <Portal>
                <Modal
                    visible={visible}
                    onDismiss={onCancel}
                >
                    <View style={styles.modalContainer}>
                        <Animated.View
                            style={[styles.alertBox, { opacity: fadeAnim }]}
                        >
                            <Text style={styles.messageText}>{message}</Text>
                            <View style={styles.buttonContainer}>
                                <TouchableOpacity onPress={onCancel} style={styles.cancelButtonContainer}>
                                    <Text style={styles.buttonText}>Cancelar</Text>
                                </TouchableOpacity>
                                <TouchableOpacity onPress={onDelete} style={styles.deleteButtonContainer}>
                                    <Text style={styles.buttonText}>Eliminar</Text>
                                </TouchableOpacity>
                            </View>
                        </Animated.View>
                    </View>
                </Modal>
            </Portal>
        </PaperProvider>
    );
};

export default Dialog

const styles = StyleSheet.create({
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0)',
    },
    alertBox: {
        backgroundColor: '#050505',
        padding: 20,
        borderRadius: 10,
        width: '80%',
        height: 216,
        shadowColor: '#6750a4',
        shadowOpacity: 0.3,
        shadowRadius: 8,
        elevation: 8,
    },
    messageText: {
        fontSize: 16,
        color: '#CCCCCC',
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: 16,
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 24,
    },
    cancelButtonContainer: {
        backgroundColor: '#333333',
        borderRadius: 8,
        paddingVertical: 8,
        paddingHorizontal: 16,
    },
    deleteButtonContainer: {
        backgroundColor: '#6750a4',
        borderRadius: 8,
        paddingVertical: 8,
        paddingHorizontal: 16,
    },
    buttonText: {
        fontSize: 16,
        color: '#CCCCCC',
        fontWeight: 'bold',
    }

})