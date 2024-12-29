import { StatusBar } from 'expo-status-bar';
import { StyleSheet, SafeAreaView, FlatList } from 'react-native';
import { ListItem } from './components/ListItem';
import { useEffect, useState } from 'react';
import axios from 'axios';
import Constants from 'expo-constants';

const URL = `https://newsapi.org/v2/top-headlines?country=us&category=business&apiKey=${Constants.expoConfig.extra.newsApiKey}`;

export default function App() {
  const [articles, setArticles] = useState([]);

  const fetchArticles = async () => {
    try {
      const response = await axios.get(URL);
      console.log('ニュースを取得', response.data);
      setArticles(response.data.articles);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    // 画面の初期化でデータを取得
    fetchArticles();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={articles}
        renderItem={({ item }) => {
          return <ListItem imageUrl={item.urlToImage} title={item.title} author={item.author} />;
        }}
        keyExtractor={(item, index) => index.toString()}
      />
      <StatusBar style="auto" />
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
  },
});
