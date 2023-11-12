import React, { useState } from 'react';
import { SafeAreaView, View, Text, Pressable, StyleSheet } from 'react-native';
import Clipboard from '@react-native-clipboard/clipboard';
import COLOR from '../../constants/colors';
import FeatherIcon from 'react-native-vector-icons/Feather';

const ClipBoard = () => {
  // 추후에 복사 관련 기능들 및 팝업 추가

  const copyToClipboard = () => {
    Clipboard.setString('https://www.dkssudgktpdy.jannankok...');
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={styles.container}>
        <Pressable onPress={copyToClipboard} style={styles.clipBoard}>
          <Text style={styles.urlText}>https://www.dkssudgktpdy.jannankok...</Text>
          <FeatherIcon name="copy" size={20} color={COLOR.gray} />
        </Pressable>
      </View>
    </SafeAreaView>
  );
};

export default ClipBoard;

const styles = StyleSheet.create({
  container: {
    width: 286,
    height: 34,
    backgroundColor: `${COLOR.lightGray}`,
    borderRadius: 5,
    justifyContent: 'center',
    paddingHorizontal: 10,
  },
  clipBoard: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  urlText: {
    fontSize: 12,
    color: `${COLOR.gray}`,
  },
});
