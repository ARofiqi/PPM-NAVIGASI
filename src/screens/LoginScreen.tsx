import React, {useState} from 'react';
import {
  View,
  TextInput,
  TouchableOpacity,
  Text,
  StyleSheet,
} from 'react-native';

const colors = {
  background: '#F5F5F5',
  textTitle: '#1A1A19',
  textWhite: '#fff',
  error: 'red',
  btnLogin: '#3E7C17',
  inputBackground: '#fff',
  inputBorder: '#ccc',
};

export default function LoginScreen({navigation}) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = () => {
    if (!username || !password) {
      setError('Username dan password tidak boleh kosong');
      return;
    }

    if (username === 'admin' && password === 'admin') {
      navigation.replace('Main');
    } else {
      setError('Username atau password salah');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Login</Text>
      {error ? <Text style={styles.error}>{error}</Text> : null}
      <TextInput
        placeholder="Username"
        value={username}
        onChangeText={setUsername}
        style={styles.input}
      />
      <TextInput
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        style={styles.input}
      />
      <TouchableOpacity onPress={handleLogin} style={styles.btnLogin}>
        <Text style={styles.btnText}>Login</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 32,
    backgroundColor: colors.background,
  },
  input: {
    borderWidth: 1,
    borderColor: colors.inputBorder,
    padding: 10,
    marginVertical: 8,
    borderRadius: 8,
    backgroundColor: colors.inputBackground,
  },
  error: {
    color: colors.error,
    marginBottom: 10,
    textAlign: 'center',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
    color: colors.textTitle,
  },
  btnLogin: {
    backgroundColor: colors.btnLogin,
    padding: 12,
    borderRadius: 8,
    marginTop: 10,
  },
  btnText: {
    color: colors.textWhite,
    textAlign: 'center',
    fontWeight: 'bold',
  },
});
