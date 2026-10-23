import { View, Text, Image, Pressable, StyleSheet } from 'react-native';
import { colorDeTipo, aclarar } from '../utils/colores';
import { capitalizar, numeroPokedex } from '../utils/formato';

export default function PokemonCard({ pokemon, onPress }) {
    const fondoCirculo = aclarar(colorDeTipo(pokemon.tipos[0]), 0.7);

    return (
        <Pressable
            style={({ pressed }) => [styles.card, pressed && styles.presionada]}
            onPress={onPress}
        >
            <View style={[styles.circulo, { backgroundColor: fondoCirculo }]}>
                <Image source={{ uri: pokemon.imagen }} style={styles.imagen} />
            </View>
            <Text style={styles.numero}>{numeroPokedex(pokemon.id)}</Text>
            <Text style={styles.nombre}>{capitalizar(pokemon.nombre)}</Text>
        </Pressable>
    );
}

const styles = StyleSheet.create({
    card: {
        backgroundColor: '#fff',
        borderRadius: 16,
        paddingVertical: 14,
        alignItems: 'center',
        elevation: 2,
        shadowColor: '#000',
        shadowOpacity: 0.06,
        shadowRadius: 4,
        shadowOffset: { width: 0, height: 2 },
    },
    presionada: {
        opacity: 0.7,
    },
    circulo: {
        width: 96,
        height: 96,
        borderRadius: 48,
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 8,
    },
    imagen: {
        width: 76,
        height: 76,
    },
    numero: {
        fontSize: 13,
        color: '#555',
    },
    nombre: {
        fontSize: 17,
        fontWeight: 'bold',
        color: '#111',
    },
});
