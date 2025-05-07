// components/Popup.tsx
import React from 'react';
import { Modal, Image, View, Text, TouchableOpacity } from 'react-native';

interface PopupProps {
    visible: boolean;
    onClose: () => void;
    onConfirm?: () => void;
}

export const Popup: React.FC<PopupProps> = ({ visible, onClose, onConfirm }) => {
    return (
        <Modal
        transparent
        visible={visible}
        animationType="fade"
        onRequestClose={onClose}
        >
        <View className="flex-1 justify-center items-center bg-black/50 px-4">
            <View className="bg-white rounded-2xl p-6 justify-between">
                <Text className="text-lg font-semibold text-center mt-4">
                    You have unsaved changes. Are you sure you want to leave without saving?
                </Text>
                    <View className='mb-3 mt-3 flex items-center justify-center'>
                        <Image source={require('../assets/images/PopupIMG.png')}/>
                    </View>
                <View className="flex-row justify-center gap-x-4">
                    <TouchableOpacity
                    onPress={onConfirm}
                    className="bg-[#0ACF83] py-3 px-10 rounded-xl"
                    >
                        <Text className="text-white font-bold text-lg">Yes</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                    onPress={onClose}
                    className="bg-[#BF3131] py-3 px-10 rounded-xl"
                    >
                        <Text className="text-white font-bold text-lg">No</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
        </Modal>
    );
};
