import React from 'react';
import { Modal, Text, View, Pressable, StyleSheet } from 'react-native';

const DeleteConfirmModal = ({
  isModalOpen,
  handleConfirm,
}: {
  isModalOpen: boolean;
  handleConfirm: (confirm: boolean) => void;
}) => {
  return (
    <Modal
      visible={isModalOpen}
      animationType="slide"
      transparent={true}
      style={{ justifyContent: 'center', alignItems: 'center', padding: 45 }}
    >
      <View style={styles.modalContainer}>
        <View style={styles.modal}>
          <View style={styles.modalContent}>
            <Text style={styles.modalText}>이 주소를 삭제하시나요?</Text>
          </View>
          <View style={styles.modalButtonContainer}>
            <Pressable
              onPress={() => handleConfirm(false)}
              style={[styles.modalButton, { borderRightColor: '#f0f0f0', borderRightWidth: 1 }]}
            >
              <Text style={styles.modalText}>취소</Text>
            </Pressable>
            <Pressable onPress={() => handleConfirm(true)} style={styles.modalButton}>
              <Text style={[styles.modalText, { fontWeight: '600' }]}>확인</Text>
            </Pressable>
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default DeleteConfirmModal;

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(62, 62, 62, 0.40)',
  },
  modal: {
    width: 300,
    height: 166,
    borderRadius: 5,
    backgroundColor: '#fff',
  },
  modalContent: {
    height: 110,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalText: {
    fontSize: 14,
    fontWeight: '400',
  },
  modalButtonContainer: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    borderTopColor: '#f0f0f0',
    borderTopWidth: 1,
  },
  modalButton: {
    width: '50%',
    height: 56,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
