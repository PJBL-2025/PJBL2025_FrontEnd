import * as ImagePicker from 'expo-image-picker';
import { Star, X, Camera } from 'lucide-react-native';
import React, { useState } from 'react';
import { Alert, Image, KeyboardAvoidingView, Platform, ScrollView, Text, TextInput, TouchableOpacity, View } from 'react-native';

type ReviewPopupProps = {
    modalVisible: boolean;
    handleCloseModal: () => void;
};

type MediaAsset = ImagePicker.ImagePickerAsset | null;

const ReviewPopup: React.FC<ReviewPopupProps> = ({ modalVisible, handleCloseModal }) => {
    const [rating, setRating] = useState<number>(0);
    const [selectedTags, setSelectedTags] = useState<string[]>([]);
    const [customAnswer, setCustomAnswer] = useState<string>('');
    const [review, setReview] = useState<string>('');
    const [media, setMedia] = useState<MediaAsset>(null);

    const tags: string[] = ['The material is good 😁', 'The seller is friendly 😍'];

    const handleRating = (value: number) => {
        setRating(value);
    };

    const handleTagClick = (tag: string) => {
        if (selectedTags.includes(tag)) {
            setSelectedTags(selectedTags.filter(t => t !== tag));
        } else {
            setSelectedTags([...selectedTags, tag]);
        }
    };

    const handlePickMedia = async () => {
        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            quality: 1,
        });

        if (!result.canceled) {
            setMedia(result.assets[0]);
        }
    };

    // Fungsi untuk tombol Send, menampilkan alert dengan isi form
    const handleSend = () => {
        let mediaInfo = 'No media selected';
        if (media) {
            mediaInfo = media.type === 'image' ? `Image URI: ${media.uri}` : `Video URI: ${media.uri}`;
        }

        Alert.alert(
            'Review Submission',
            `Rating: ${rating} star(s)\n` +
            `Tags: ${selectedTags.length > 0 ? selectedTags.join(', ') : 'None'}\n` +
            `Custom Answer: ${customAnswer || 'None'}\n` +
            `Review: ${review || 'None'}\n` +
            `${mediaInfo}`
        );
    };

    if (!modalVisible) return null;

    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            className="flex-1 justify-center items-center"
        >
            <View className="bg-white w-[90%] max-w-[400px] p-3 rounded-xl relative">
                <TouchableOpacity onPress={handleCloseModal} className="absolute left-4 top-4">
                    <X size={28} color="black" />
                </TouchableOpacity>

                <View className="flex-row justify-center mb-4 mt-4">
                    {[...Array(5)].map((_, index) => (
                        <TouchableOpacity key={index} onPress={() => handleRating(index + 1)}>
                            <Star
                                size={32}
                                color={index < rating ? '#FFD700' : '#D3D3D3'}
                                fill={index < rating ? '#FFD700' : 'none'}
                            />
                        </TouchableOpacity>
                    ))}
                </View>

                <Text className="mb-2 text-center text-md">What do you satisfy about our products 🧐🧐</Text>
                <View className="flex-row gap-2 mb-3">
                    {tags.map((tag, index) => (
                        <TouchableOpacity
                            key={index}
                            onPress={() => handleTagClick(tag)}
                            className={`px-4 py-2 rounded-full border ${
                                selectedTags.includes(tag) ? 'bg-green-200 border-green-500' : 'border-gray-300'
                            }`}
                        >
                            <Text>{tag}</Text>
                        </TouchableOpacity>
                    ))}
                </View>

                <ScrollView contentContainerStyle={{ paddingBottom: 5 }} keyboardShouldPersistTaps="handled">
                    <TextInput
                        className="border p-3 rounded mb-3"
                        placeholder="Enter other answers??"
                        value={customAnswer}
                        onChangeText={setCustomAnswer}
                        multiline
                        numberOfLines={3}
                        style={{ textAlignVertical: 'top', backgroundColor: 'white', fontSize: 14 }}
                    />

                    <Text className="mb-2 text-lg">Another Review??</Text>
                    <TextInput
                        className="border p-3 rounded"
                        placeholder="Type anything u want 😊😊😊"
                        value={review}
                        onChangeText={setReview}
                        multiline
                        numberOfLines={4}
                        style={{ textAlignVertical: 'top', backgroundColor: 'white', fontSize: 14 }}
                    />
                </ScrollView>
                <View className="flex items-center justify-center mt-2">
                    <TouchableOpacity
                        onPress={handlePickMedia}
                        className="flex-row items-center justify-center gap-1 border p-3 rounded mb-3"
                    >
                        <Camera color="#4B5563" size={20} />
                        <Text className="text-gray-700 text-base font-medium">Add Image/Video</Text>
                    </TouchableOpacity>
                </View>

                {media && (
                    <View className="mb-4">
                        {media.type === 'image' ? (
                            <Image source={{ uri: media.uri }} className="w-full h-40 rounded" />
                        ) : (
                            <Text>Video Selected</Text>
                        )}
                    </View>
                )}

                <TouchableOpacity onPress={handleSend} className="bg-green-500 p-3 rounded-lg">
                    <Text className="text-white text-center text-lg font-semibold">Send</Text>
                </TouchableOpacity>
            </View>
        </KeyboardAvoidingView>
    );
};

export default ReviewPopup;