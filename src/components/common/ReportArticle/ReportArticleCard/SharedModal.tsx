import React from 'react';
import { Modal, Text, View, Pressable, StyleSheet, Image } from 'react-native';
import AntIcon from 'react-native-vector-icons/AntDesign';
import COLOR from '../../../../constants/colors';
import ClipBoard from '../../ClipBoard/ClipBoard';

interface SharedModalProps {
  isModalOpen: boolean;
  handleModal: (isModalOpen: boolean) => void;
}

const SharedModal = ({ isModalOpen, handleModal }: SharedModalProps) => {
  return (
    <Modal
      visible={isModalOpen}
      animationType="slide"
      transparent={true}
      style={{ justifyContent: 'center', alignItems: 'center', padding: 45 }}
    >
      <View style={styles.modalContainer}>
        <View style={styles.modal}>
          <Pressable style={styles.closeIcon} onPress={() => handleModal(false)}>
            <AntIcon name="close" size={24} color={COLOR.gray} />
          </Pressable>
          <View style={styles.modalContent}>
            <View style={styles.title}>
              <Text style={styles.titleText}>공유하기</Text>
            </View>
            <View style={styles.platformList}>
              <View style={styles.platformContainer}>
                <Image
                  source={require('../../../../assets/social/kakao.png')}
                  style={styles.platformIcom}
                />
                <Text style={styles.platformText}>카카오톡</Text>
              </View>
              <View style={styles.platformContainer}>
                <Image
                  source={require('../../../../assets/social/twitter.png')}
                  style={styles.platformIcom}
                />
                <Text style={styles.platformText}>트위터</Text>
              </View>
              <View style={styles.platformContainer}>
                <Image
                  source={require('../../../../assets/social/instagram.png')}
                  style={styles.platformIcom}
                />
                <Text style={styles.platformText}>인스타그램</Text>
              </View>
              <View style={styles.platformContainer}>
                <Image
                  source={require('../../../../assets/social/facebook.png')}
                  style={styles.platformIcom}
                />
                <Text style={styles.platformText}>페이스북</Text>
              </View>
            </View>
            <ClipBoard />
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default SharedModal;

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(62, 62, 62, 0.40)',
  },
  modal: {
    width: 346,
    height: 200,
    borderRadius: 5,
    backgroundColor: '#fff',
    padding: 7,
  },
  closeIcon: {
    alignItems: 'flex-end',
  },
  modalContent: {
    height: 110,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    marginBottom: 20,
  },
  titleText: {
    fontSize: 14,
    fontWeight: '500',
  },
  platformList: {
    flexDirection: 'row',
    gap: 30,
    marginBottom: 30,
  },
  platformContainer: {
    alignItems: 'center',
    gap: 5,
  },
  platformIcom: {
    width: 35,
    height: 35,
    borderRadius: 5,
    backgroundColor: `${COLOR.lightGray}`,
  },
  platformText: {
    fontSize: 10,
    color: `${COLOR.gray}`,
  },
});
