import { View, FlatList, StyleSheet } from 'react-native';

// FlatList de 2 columnas que usan las pantallas de categorías, recetas y búsqueda.
export default function Cuadricula({ datos, renderTarjeta, ListHeaderComponent, ListEmptyComponent }) {
    return (
        <FlatList
            data={datos}
            keyExtractor={(item) => String(item.id)}
            numColumns={2}
            contentContainerStyle={styles.lista}
            ListHeaderComponent={ListHeaderComponent}
            ListEmptyComponent={ListEmptyComponent}
            keyboardShouldPersistTaps="handled"
            renderItem={({ item, index }) => (
                <View style={styles.columna}>{renderTarjeta(item, index)}</View>
            )}
        />
    );
}

const styles = StyleSheet.create({
    lista: {
        paddingHorizontal: 6,
        paddingTop: 8,
        paddingBottom: 24,
    },
    columna: {
        width: '50%',
        padding: 7,
    },
});
