import { Image, View } from 'react-native';
import React from 'react';
import { Photos } from '../../state/features/images';
import { styles } from './ImageCard.style';

const ImageCard = ({ data }: { data: Photos }) => {
  return (
    <View style={styles.imageContainer}>
      <Image
        style={styles.image}
        source={{
          uri: data.largeImageURL,
        }}
      />
    </View>
  );
};

export default ImageCard;
