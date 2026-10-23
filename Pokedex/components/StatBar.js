import { View, Text, StyleSheet } from 'react-native';

const VALOR_MAXIMO = 255; // la estadística base más alta posible en Pokémon

export default function StatBar({ etiqueta, valor, color }) {
    const porcentaje = Math.min(valor / VALOR_MAXIMO, 1) * 100;

    return (
        <View style={styles.fila}>
            <Text style={styles.etiqueta}>{etiqueta}</Text>
            <Text style={styles.valor}>{valor}</Text>
            <View style={styles.pista}>
                <View style={[styles.barra, { width: `${porcentaje}%`, backgroundColor: color }]} />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    fila: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 12,
    },
    etiqueta: {
        width: 90,
        fontSize: 15,
        color: '#222',
    },
    valor: {
        width: 42,
        fontSize: 15,
        fontWeight: 'bold',
        color: '#111',
    },
    pista: {
        flex: 1,
        height: 8,
        borderRadius: 4,
        backgroundColor: '#eee',
        overflow: 'hidden',
    },
    barra: {
        height: '100%',
        borderRadius: 4,
    },
});
