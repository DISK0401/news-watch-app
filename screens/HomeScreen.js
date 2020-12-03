import React, { useState, useEffect } from 'react';
import { StyleSheet, View, FlatList, SafeAreaView } from 'react-native';
import ListItem from '../components/ListItem';
import Loading from '../components/Loading';
import Constants from 'expo-constants';
import axios from 'axios';

const URL = `http://newsapi.org/v2/top-headlines?country=jp&apiKey=${Constants.manifest.extra.newsApiKey}`;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});

export default HomeScreen = ({ navigation }) => {
  // 初回ロード時は、空データをステートにセットする
  const [articles, setArticles] = useState([]);

  // 記事の読み込みを管理
  const [loading, setLoading] = useState(false);

  // ロード時に１時度だけ、記事データをセットする
  useEffect(() => {
    fetchAriticles();
  }, []);

  const fetchAriticles = async () => {
    setLoading(true);
    try {
      const response = await axios.get(URL);
      setArticles(response.data.articles);
      // console.log(response);
    } catch {
      console.error(error);
    }
    setLoading(false);
  };

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={articles}
        renderItem={({ item }) => (
          <ListItem
            imageUrl={item.urlToImage}
            title={item.title}
            author={item.author}
            onPress={() => navigation.navigate('Article', { article: item })}
          />
        )}
        keyExtractor={(item, index) => index.toString()}
      />
      {loading && <Loading />}
    </SafeAreaView>
  );
};
