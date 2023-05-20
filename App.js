import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { useState } from 'react';

import { ImageViewer } from './components/ImageViewer';
import { Button } from './components/Button';
import { CircleButton } from './components/CircleButton';
import IconButton from './components/IconButton';
import { EmojiPicker } from './components/EmojiPicker';
import { EmojiList } from './components/EmojiList';
import { EmojiSticker } from './components/EmojiSticker';

const PlaceholderImage = require('./assets/images/background-image.png');

export default function App() {
  const [selectedImage, setSelectedImage] = useState(null);
  const [showAppOptions, setShowAppOptions] = useState(false);
  const [modalState, setModalState] = useState(false);
  const [pickedEmoji, setPickedEmoji] = useState(false);

  const onReset = () => {
    setShowAppOptions(false);
    setSelectedImage(null);
  }
  const onAddSticker = () => {
    setModalState(true);
  }
  const onSaveImageAsync =async () => {
    // Later things
  }

  const pickImageAsync = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      quality: 1,
    });

    if (!result.canceled) {
      setSelectedImage(result.assets[0].uri);
      setShowAppOptions(true);
    } else {
      alert('You did not select any image.');
    }
  };

  return (
    <View style={styles.container}>
      <View>
        <ImageViewer placeholderImage={PlaceholderImage} selectedImage={selectedImage} />
        {pickedEmoji && <EmojiSticker imageSize={40} stickerSource={pickedEmoji} />}
      </View>
      {/* <Text style={styles.regularText}>Open up App.js to start working on your app!</Text> */}
      {showAppOptions
        ? <View>
          <View style={styles.optionsRow}>
          <IconButton label="reset" icon="refresh" onPress={onReset} />
          <CircleButton onPress={onAddSticker} />
          <IconButton label="save" icon="save-alt" onPress={onSaveImageAsync} />
        </View>
        </View>
        : <View style={styles.footerContainer}>
          <Button theme="primary" label="Choose a photo" onPress={pickImageAsync} />
          <Button label="Use this photo" onPress={() => setShowAppOptions(true)} />
        </View>}
        <EmojiPicker isVisible={modalState} onClose={() => setModalState(false)}>
          <EmojiList onCloseModal={() => setModalState(false)} onSelect={setPickedEmoji} />
        </EmojiPicker>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#25292e',
    alignItems: 'center',
    justifyContent: 'center',
  },
  regularText: {
    color: 'white',
  },
  footerContainer: {
    flex: 1 / 3,
    alignItems: 'center',
  },
  optionsContainer: {
    position: 'absolute',
    bottom: 80,
  },
  optionsRow: {
    alignItems: 'center',
    flexDirection: 'row',
  }
});
