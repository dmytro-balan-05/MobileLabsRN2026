import { StyleSheet, Dimensions } from 'react-native';

const { width } = Dimensions.get('window');

export const Colors = {
    primary: '#007AFF',
    background: '#ffffff',
    text: '#333333',
    lightGray: '#f0f0f0',
    border: '#dddddd',
    white: '#ffffff',
};

export const globalStyles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: Colors.background,
    },
    screenTitle: {
        fontSize: 24,
        fontWeight: 'bold',
        textAlign: 'center',
        marginVertical: 15,
        color: Colors.text,
    },
    footerText: {
        textAlign: 'center',
        padding: 10,
        fontSize: 12,
        color: 'gray',
        borderTopWidth: 1,
        borderTopColor: Colors.lightGray,
    },
    newsCard: {
        padding: 16,
        borderBottomWidth: 1,
        borderBottomColor: Colors.lightGray,
    },
    newsTitle: {
        fontSize: 18,
        fontWeight: 'bold'
    },
    newsDate: {
        color: 'gray',
        fontSize: 12,
        marginVertical: 4
    },
    galleryItem: {
        width: (width / 2) - 15,
        height: 150,
        margin: 7,
        backgroundColor: Colors.lightGray,
        borderRadius: 10,
        borderWidth: 1,
        borderColor: Colors.border,
    },
    formGroup: {
        padding: 20
    },
    input: {
        borderWidth: 1,
        borderColor: Colors.border,
        borderRadius: 8,
        padding: 12,
        marginBottom: 15,
        fontSize: 16,
    },
    label: {
        marginBottom: 5,
        fontWeight: '500'
    },
    button: {
        backgroundColor: Colors.primary,
        padding: 16,
        borderRadius: 8,
        alignItems: 'center',
        marginTop: 10,
    },
    buttonText: {
        color: Colors.white,
        fontWeight: 'bold',
        fontSize: 16
    },
});