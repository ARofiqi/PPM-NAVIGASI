import {View, Text, FlatList, StyleSheet, TouchableOpacity} from 'react-native';
import React, {useState} from 'react';
import {getRiwayatPenyakitPasien} from '../../data/API';

const colors = {
  background: '#F5F5F5',
  cardText: '#1A1A19',
  titleText: '#1A1A19',
  cardBackground: '#FFFFFF',
  cardGradientStart: '#6A11CB',
  cardGradientEnd: '#2575FC',
  bgHeader: '#3E7C17',
  colorTitleHeader: '#F5F5F5',
  btnBackground: '#3E7C17',
  btnText: '#F5F5F5',
};

const ListRiwayatScreen = () => {
  const riwayatData = getRiwayatPenyakitPasien();
  const [sortBy, setSortBy] = useState('pasienCount'); // Default sort by patient count

  const penyakitCount = riwayatData.reduce((acc, riwayat) => {
    const {diagnosa} = riwayat;
    acc[diagnosa] = (acc[diagnosa] || 0) + 1;
    return acc;
  }, {});

  const sortedPenyakitData = Object.keys(penyakitCount)
    .map(diagnosa => ({
      diagnosa,
      pasienCount: penyakitCount[diagnosa],
    }))
    .sort((a, b) => {
      if (sortBy === 'pasienCount') {
        return b.pasienCount - a.pasienCount; // Sort by patient count descending
      }
      return a.diagnosa.localeCompare(b.diagnosa); // Sort by diagnosis name ascending
    });

  const toggleSort = () => {
    setSortBy(prev => (prev === 'pasienCount' ? 'diagnosa' : 'pasienCount'));
  };

  return (
    <>
      <View style={styles.header}>
        <Text style={styles.titleHeader}>
          Daftar Penyakit Berdasarkan Total Pasien
        </Text>
      </View>
      <TouchableOpacity style={styles.sortButton} onPress={toggleSort}>
        <Text style={styles.sortButtonText}>
          Sort by {sortBy === 'pasienCount' ? 'Diagnosis' : 'Total Patients'}
        </Text>
      </TouchableOpacity>
      <View style={styles.container}>
        <FlatList
          data={sortedPenyakitData}
          keyExtractor={item => item.diagnosa}
          renderItem={({item}) => (
            <View style={styles.card}>
              <View style={styles.cardContent}>
                <Text style={styles.cardTitle}>{item.diagnosa}</Text>
                <Text style={styles.cardSubtitle}>
                  Total Pasien: {item.pasienCount}
                </Text>
              </View>
            </View>
          )}
        />
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: colors.background,
  },
  header: {
    backgroundColor: colors.bgHeader,
    paddingVertical: 15,
    paddingHorizontal: 20,
  },
  titleHeader: {
    fontSize: 24,
    fontWeight: 'bold',
    color: colors.colorTitleHeader,
    textAlign: 'start',
  },
  card: {
    flexDirection: 'row',
    padding: 16,
    borderRadius: 12,
    backgroundColor: colors.cardBackground,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 4},
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 4,
    marginBottom: 16,
    alignItems: 'center',
  },
  cardContent: {
    flex: 1,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: colors.cardText,
    marginBottom: 4,
  },
  cardSubtitle: {
    fontSize: 14,
    color: '#666',
  },
  sortButton: {
    backgroundColor: colors.btnBackground,
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 5,
    alignItems: 'center',
    margin: 10,
  },
  sortButtonText: {
    color: colors.btnText,
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default ListRiwayatScreen;
