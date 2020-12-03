import React from 'react';
import { StyleSheet, SafeAreaView, Text, TouchableOpacity } from 'react-native';
import { WebView } from 'react-native-webview';
import { useDispatch, useSelector } from 'react-redux';
import { addClip, deleteClip } from '../store/actions/user';
import ClipButton from '../components/ClipButton';
import Loading from '../components/Loading';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});

export default ArticleScreen = ({ route }) => {
  // 記事情報をHooks経由で受け取る
  const { article } = route.params;

  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const { clips } = user;

  // Clipされているかを判定する
  const isClipped = () => {
    return clips.some((clip) => clip.url === article.url);
  };

  // ClipボタンをON/OFFする
  const toggleClip = () => {
    if (isClipped()) {
      dispatch(deleteClip({ clip: article }));
    } else {
      dispatch(addClip({ clip: article }));
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ClipButton onPress={toggleClip} enabled={isClipped()} />
      <WebView
        source={{ uri: article['url'] }}
        startInLoadingState={true}
        renderLoading={() => <Loading />}
      />
    </SafeAreaView>
  );
};
