import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  ScrollView,
} from 'react-native';
import React from 'react';
import {useRoute} from '@react-navigation/native';
import {getDataPasien, getRekamPemeriksaan} from '../data/API';

const colors = {
  bgApp: '#F5F5F5',
  bgCard: '#DDDDDD',
  cardText: '#1A1A19',
  titleText: '#1A1A19',
  bgHeader: '#3E7C17',
  colorTitleHeader: '#F5F5F5',
  backButton: '#3E7C17',
};

const DetailScreen = ({navigation}) => {
  const route = useRoute();
  const {item} = route.params;

  const pasien = getDataPasien().find(p => p.id === item.idPasien);
  const rekamPemeriksaan = getRekamPemeriksaan().find(
    r => r.idPasien === item.idPasien,
  );

  return (
    <>
      <View style={styles.header}>
        <Text style={styles.titleHeader}>Detail Riwayat Penyakit Pasien</Text>
      </View>
      <TouchableOpacity
        style={styles.backButton}
        onPress={() => navigation.goBack()}>
        <Text style={styles.backButtonText}>Kembali</Text>
      </TouchableOpacity>
      <ScrollView style={styles.container}>
        <Image
          source={require('../img/pictures/foto.jpg')}
          style={styles.image}
        />
        <View style={styles.card}>
          <Text style={styles.sectionTitle}>Informasi Pasien</Text>
          {pasien ? (
            <View>
              <View style={styles.tableRow}>
                <Text style={styles.tableLabel}>Nama:</Text>
                <Text style={styles.tableValue}>{pasien.nama}</Text>
              </View>
              <View style={styles.tableRow}>
                <Text style={styles.tableLabel}>Tanggal Lahir:</Text>
                <Text style={styles.tableValue}>{pasien.tanggalLahir}</Text>
              </View>
              <View style={styles.tableRow}>
                <Text style={styles.tableLabel}>Alamat:</Text>
                <Text style={styles.tableValue}>{pasien.alamat}</Text>
              </View>
              <View style={styles.tableRow}>
                <Text style={styles.tableLabel}>No Telepon:</Text>
                <Text style={styles.tableValue}>{pasien.noTelepon}</Text>
              </View>
            </View>
          ) : (
            <Text style={styles.cardText}>Data pasien tidak ditemukan.</Text>
          )}
        </View>

        <View style={styles.card}>
          <Text style={styles.sectionTitle}>Riwayat Penyakit</Text>
          <View style={styles.tableRow}>
            <Text style={styles.tableLabel}>Tanggal Kunjungan:</Text>
            <Text style={styles.tableValue}>{item.tanggalKunjungan}</Text>
          </View>
          <View style={styles.tableRow}>
            <Text style={styles.tableLabel}>Diagnosa:</Text>
            <Text style={styles.tableValue}>{item.diagnosa}</Text>
          </View>
          <View style={styles.tableRow}>
            <Text style={styles.tableLabel}>Tindakan:</Text>
            <Text style={styles.tableValue}>{item.tindakan}</Text>
          </View>
          <View style={styles.tableRow}>
            <Text style={styles.tableLabel}>Dokter:</Text>
            <Text style={styles.tableValue}>{item.dokterPenanggungJawab}</Text>
          </View>
        </View>

        <View style={styles.card}>
          <Text style={styles.sectionTitle}>Rekam Pemeriksaan</Text>
          {rekamPemeriksaan ? (
            <View>
              <View style={styles.tableRow}>
                <Text style={styles.tableLabel}>Tekanan Darah:</Text>
                <Text style={styles.tableValue}>
                  {rekamPemeriksaan.tekananDarah || 'Tidak ada data'}
                </Text>
              </View>
              <View style={styles.tableRow}>
                <Text style={styles.tableLabel}>Gula Darah:</Text>
                <Text style={styles.tableValue}>
                  {rekamPemeriksaan.gulaDarah || 'Tidak ada data'}
                </Text>
              </View>
              <View style={styles.tableRow}>
                <Text style={styles.tableLabel}>Suhu Tubuh:</Text>
                <Text style={styles.tableValue}>
                  {rekamPemeriksaan.suhuTubuh || 'Tidak ada data'}
                </Text>
              </View>
              <View style={styles.tableRow}>
                <Text style={styles.tableLabel}>Berat Badan:</Text>
                <Text style={styles.tableValue}>
                  {rekamPemeriksaan.beratBadan || 'Tidak ada data'}
                </Text>
              </View>
              <View style={styles.tableRow}>
                <Text style={styles.tableLabel}>Tinggi Badan:</Text>
                <Text style={styles.tableValue}>
                  {rekamPemeriksaan.tinggiBadan || 'Tidak ada data'}
                </Text>
              </View>
            </View>
          ) : (
            <Text style={styles.cardText}>
              Data rekam pemeriksaan tidak ditemukan.
            </Text>
          )}
        </View>
      </ScrollView>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.bgApp,
    paddingBottom: 50,
    paddingHorizontal: 20,
  },
  header: {
    backgroundColor: colors.bgHeader,
    paddingVertical: 15,
    paddingHorizontal: 20,
  },
  titleHeader: {
    fontSize: 22,
    fontWeight: 'bold',
    textAlign: 'start',
    color: colors.colorTitleHeader,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    color: colors.titleText,
  },
  card: {
    padding: 16,
    borderRadius: 8,
    backgroundColor: colors.bgCard,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 2,
    marginBottom: 16,
  },
  cardText: {
    fontSize: 16,
    color: colors.cardText,
    marginBottom: 8,
  },
  backButton: {
    backgroundColor: colors.backButton,
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 4,
    alignSelf: 'flex-start',
    marginVertical: 10,
    marginHorizontal: 20,
  },
  backButtonText: {
    color: '#FFF',
    fontSize: 16,
  },
  tableRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  tableLabel: {
    fontSize: 16,
    fontWeight: 'bold',
    color: colors.cardText,
  },
  tableValue: {
    fontSize: 16,
    color: colors.cardText,
  },
  image: {
    width: '100%',
    height: 200,
    borderRadius: 8,
    marginBottom: 16,
  },
});

export default DetailScreen;
