import React from 'react';
import { Image, Text, TouchableOpacity, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const formatRupiah = (price: number) => {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0,
  }).format(price);
};

type ProductCardProps = {
  title: string;
  price: number;
  reviews: number;
  image: any;
};

export default function ProductCard({ title, price, reviews, image }: ProductCardProps) {
  const navigation = useNavigation();

  return (
    <TouchableOpacity
      onPress={() => navigation.navigate('Details')}
      className="w-[48%] bg-white rounded-2xl p-3 mb-4"
      style={{
        shadowColor: '#687582',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.2,
        shadowRadius: 30,
        elevation: 4,
      }}
    >
      <View className="w-full h-32 rounded-xl bg-white items-center justify-center overflow-hidden mb-3">
        <Image source={image} style={{ width: '100%', height: '100%' }} resizeMode="contain" />
      </View>
      <Text className="text-sm font-medium text-black mb-1">{title}</Text>
      <Text className="text-sm font-bold text-black">{formatRupiah(price)}</Text>
      <View className="flex-row items-center mt-1 space-x-1">
        <Image source={require('../assets/icons/star.png')} className="w-4 h-4" resizeMode="contain" />
        <Text className="text-xs text-gray-600">4.6</Text>
        <Text className="text-xs text-gray-400">( {reviews} Reviews )</Text>
      </View>
    </TouchableOpacity>
  );
}
