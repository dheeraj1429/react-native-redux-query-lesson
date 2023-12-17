import React, { useEffect } from 'react';
import { FlatList, Text, View } from 'react-native';
import ImageCard from '../../components/ImageCard/ImageCard';
import Spinner from '../../components/Spinner/Spinner';
import { useGetImagesQuery } from '../../state/features/images/imageApi.slice';
import { styles } from './Home.style';

const Home = () => {
  const { data, isLoading, error } = useGetImagesQuery();

  return (
    <View style={styles.container}>
      {isLoading ? <Spinner space="full" /> : null}
      {!!data && data?.hits.length ? (
        <View style={styles.scrollContainer}>
          <Text style={styles.heading}>Images</Text>
          <FlatList keyExtractor={item => item.id.toString()} data={data.hits} renderItem={({ item }) => <ImageCard data={item} />} />
        </View>
      ) : !isLoading && !error ? (
        <Text>Opps! no data found!</Text>
      ) : null}
    </View>
  );
};

export default Home;
