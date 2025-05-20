import React, { useState } from "react";
import { View, Text, Image, TouchableOpacity, Modal } from "react-native";
import { useNavigation } from "@react-navigation/native";
import ReviewPopup from "./ReviewPopup";

const formatPrice = (price: number) => {
    return new Intl.NumberFormat("id-ID", {
        style: "currency",
        currency: "IDR",
        minimumFractionDigits: 0,
    }).format(price);
};

    interface ProductProps {
    item: {
        product: {
        id: string;
        name: string;
        image: any;
        price: number;
        };
        quantity: number;
    };
}

const ProductSuccess: React.FC<ProductProps> = ({ item }) => {
    const [modalVisible, setModalVisible] = useState(false);
    const navigation = useNavigation();

    const handleReview = () => {
        setModalVisible(true);
    };

    const handleCloseModal = () => {
        setModalVisible(false);
    };

    const handleBuyAgain = () => {
        navigation.navigate("DetailsProduct", { productId: item.product.id });
    };

    return (
        <View className="flex-row items-center p-4 bg-white rounded-2xl shadow-md border border-gray-200 mb-4">
        <Image source={item.product.image} className="w-16 h-16 rounded-full mr-4" />
        {/* Detail Produk */}
        <View className="flex-1 justify-center">
            <Text className="text-base font-semibold">{item.product.name}</Text>
            <Text className="text-black font-bold">
            {formatPrice(item.product.price * item.quantity)}
            </Text>
            <Text className="text-gray-500 mt-1 font-semibold">Sent</Text>
        </View>

        {/* Tombol Aksi */}
        <View className="flex-col justify-center space-y-2 ml-2">
            <TouchableOpacity
            onPress={handleReview}
            className="border border-blue-500 px-4 py-1.5 rounded-lg"
            >
            <Text className="text-blue-500 font-medium text-sm">Review us</Text>
            </TouchableOpacity>
            <TouchableOpacity
            onPress={handleBuyAgain}
            className="border border-gray-400 px-4 py-1.5 rounded-lg"
            >
            <Text className="text-black font-medium text-sm">Buy Again</Text>
            </TouchableOpacity>
        </View>

            {/* Modal Pop Up Review */}
            <Modal
    animationType="fade"
    transparent={true}
    visible={modalVisible}
    onRequestClose={handleCloseModal}
>
    <View className="flex-1 justify-center items-center bg-black/40">
        <ReviewPopup
            modalVisible={modalVisible}
            handleCloseModal={handleCloseModal}
        />
    </View>
</Modal>
        </View>
    );
    };

export default ProductSuccess;