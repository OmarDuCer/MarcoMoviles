import { View, Text, Image, Pressable, StyleSheet } from 'react-native';
import { TEXTO } from '../utils/colores';

// Tarjeta reutilizable: se usa para categorías y para recetas.
// ajuste="contain" deja la imagen completa (categorías, que son PNG sin fondo)
// ajuste="cover" llena todo el recuadro (fotos de recetas)
export default function TarjetaComida({ titulo, imagen, color, altoImagen = 145, ajuste = 'cover', onPress }) {
    return (
        <Pressable
            style={({ pressed }) => [styles.card, pressed && styles.presionada]}
            onPress={onPress}
        >
            <View style={[styles.marco, { height: altoImagen, backgroundColor: color }]}>
                <Image
                    source={{ uri: imagen }}
                    style={ajuste === 'contain' ? styles.imagenContain : styles.imagenCover}
                    resizeMode={ajuste}
                />
            </View>
            <Text style={styles.titulo} numberOfLines={2}>{titulo}</Text>
        </Pressable>
    );
}

const styles = StyleSheet.create({
    card: {
        backgroundColor: '#fff',
        borderRadius: 16,
        overflow: 'hidden',
        elevation: 2,
        shadowColor: '#000',
        shadowOpacity: 0.06,
        shadowRadius: 4,
        shadowOffset: { width: 0, height: 2 },
    },
    presionada: {
        opacity: 0.7,
    },
    marco: {
        alignItems: 'center',
        justifyContent: 'center',
    },
    imagenContain: {
        width: '75%',
        height: '75%',
    },
    imagenCover: {
        width: '100%',
        height: '100%',
    },
    titulo: {
        fontSize: 16,
        fontWeight: 'bold',
        color: TEXTO,
        paddingHorizontal: 14,
        paddingVertical: 12,
    },
});
