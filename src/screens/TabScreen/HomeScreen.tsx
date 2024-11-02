/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react/react-in-jsx-scope */

import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  Image,
} from 'react-native';
import {getRiwayatPenyakitPasien, getDataPasien} from '../../data/API';

const colors = {
  bgApp: '#F5F5F5',
  cardBackground: '#DDDDDD',
  bgHeader: '#3E7C17',
  colorTitleHeader: '#F5F5F5',
  textCard: '#3F3F44',
  cardTitle: '#3F3F44',
  shadowColor: '#000',
  borderColor: '#ccc',
  shadowOpacity: 0.1,
  btnDetail: '#163020',
  textBtnDetail: '#F6FCDF',
};

export default function HomeScreen({navigation}) {
  const [riwayatPenyakitPasien, setRiwayatPenyakitPasien] = useState([]);
  const [dataPasien, setDataPasien] = useState([]);

  useEffect(() => {
    const penyakitData = getRiwayatPenyakitPasien();
    setRiwayatPenyakitPasien(penyakitData);

    const pasienData = getDataPasien();
    setDataPasien(pasienData);
  }, []);

  const renderCard = item => {
    const pasien = dataPasien.find(p => p.id === item.idPasien);

    return (
      <View style={styles.card}>
        <Text style={styles.cardTitle}>Informasi Pasien</Text>
        {pasien?.gambarUrl ? (
          <Image source={{uri: pasien.gambarUrl}} style={styles.cardImage} />
        ) : (
          <Image
            source={require('../../img/pictures/foto.jpg')}
            style={styles.cardImage}
          />
        )}
        {pasien ? (
          <>
            <View style={styles.tableRow}>
              <Text style={styles.tableLabel}>Nama:</Text>
              <Text style={styles.tableValue}>{pasien.nama}</Text>
            </View>
            <View style={styles.tableRow}>
              <Text style={styles.tableLabel}>Tanggal Kunjungan:</Text>
              <Text style={styles.tableValue}>{item.tanggalKunjungan}</Text>
            </View>
            <View style={styles.tableRow}>
              <Text style={styles.tableLabel}>Diagnosa:</Text>
              <Text style={styles.tableValue}>{item.diagnosa}</Text>
            </View>
            <View style={styles.tableRow}>
              <Text style={styles.tableLabel}>Dokter:</Text>
              <Text style={styles.tableValue}>
                {item.dokterPenanggungJawab}
              </Text>
            </View>
            <TouchableOpacity
              style={styles.btnDetail}
              onPress={() => navigation.navigate('Detail', {item})}>
              <Text style={{color: colors.textBtnDetail}}>See Detail</Text>
            </TouchableOpacity>
          </>
        ) : (
          <Text style={styles.cardText}>Data pasien tidak ditemukan.</Text>
        )}
      </View>
    );
  };

  return (
    <>
      <View style={styles.header}>
        <Text style={styles.titleHeader}>Riwayat Penyakit Pasien</Text>
      </View>
      <View style={styles.container}>
        <FlatList
          data={riwayatPenyakitPasien}
          keyExtractor={item => item.idPasien.toString()}
          renderItem={({item}) => renderCard(item)}
        />
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: colors.bgApp,
  },
  header: {
    backgroundColor: colors.bgHeader,
    paddingVertical: 15,
    paddingHorizontal: 20,
  },
  titleHeader: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'start',
    color: colors.colorTitleHeader,
  },
  card: {
    padding: 10,
    borderRadius: 12,
    backgroundColor: colors.cardBackground,
    shadowColor: colors.shadowColor,
    shadowOffset: {width: 0, height: 4},
    shadowOpacity: colors.shadowOpacity,
    shadowRadius: 6,
    elevation: 3,
    marginBottom: 18,
  },
  cardImage: {
    width: '100%',
    height: 150,
    borderRadius: 8,
    marginBottom: 10,
  },
  cardTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 12,
    color: colors.cardTitle,
  },
  cardText: {
    fontSize: 17,
    color: colors.textCard,
    marginBottom: 6,
  },
  btnDetail: {
    backgroundColor: colors.btnDetail,
    alignSelf: 'flex-end',
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 5,
  },
  tableRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  tableLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.textCard,
  },
  tableValue: {
    fontSize: 16,
    color: colors.textCard,
  },
});
