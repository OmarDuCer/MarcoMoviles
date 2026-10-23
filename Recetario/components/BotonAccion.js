import { Pressable, Text, ActivityIndicator, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { ROJO } from '../utils/colores';

export default function BotonAccion({ titulo, icono, onPress, cargando = false }) {
    return (
        <Pressable
            style={({ pressed }) => [styles.boton, pressed && styles.presionado]}
            onPress={onPress}
            disabled={cargando}
        >
            {cargando ? (
                <ActivityIndicator color="#fff" />
            ) : (
                <>
                    <Ionicons name={icono} size={20} color="#fff" />
                    <Text style={styles.texto}>{titulo}</Text>
                </>
            )}
        </Pressable>
    );
}

const styles = StyleSheet.create({
    boton: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: ROJO,
        borderRadius: 12,
        height: 50,
        marginHorizontal: 6,
    },
    presionado: {
        opacity: 0.8,
    },
    texto: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
        marginLeft: 8,
    },
});
