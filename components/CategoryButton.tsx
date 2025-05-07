import React from "react";
import { View, TouchableOpacity, Image, Text } from "react-native";
import { useNavigation } from "@react-navigation/native";
import type { StackNavigationProp } from "@react-navigation/stack";

// Fungsi untuk mendapatkan ikon dan ukurannya
const getCategoryIcon = (iconName: string) => {
  switch (iconName) {
    case 'promo':
      return { source: require('../assets/icons/promo.png'), size: 70 };
    case 'clothes':
      return { source: require('../assets/icons/clothes.png'), size: 40 };
    case 'hat':
      return { source: require('../assets/icons/hat.png'), size: 60 };
    case 'pants':
      return { source: require('../assets/icons/pants.png'), size: 40 };
    case 'design':
      return { source: require('../assets/icons/design.png'), size: 40 };
    default:
      return { source: require('../assets/icons/promo.png'), size: 40 };
  }
};

type RootStackParamList = {
  Category: { category: string };
  DesignSpecial: undefined;
};

interface CategoryButtonProps {
  icon: string;
  label: string;
}

const CategoryButton = ({ icon, label }: CategoryButtonProps) => {
  const navigation = useNavigation() as StackNavigationProp<RootStackParamList>;

  const { source, size } = getCategoryIcon(icon);

  const handlePress = () => {
    if (icon === 'design') {
      navigation.navigate('Design');
    } else {
      navigation.navigate('Category', { category: icon });
    }
  };

  return (
    <TouchableOpacity
      className="items-center justify-center mx-2 self-center"
      onPress={handlePress}
    >
      <View className="w-16 h-16 bg-gray-100 rounded-full items-center justify-center mb-1">
        <Image
          source={source}
          style={{ width: size, height: size }}
          resizeMode="contain"
        />
      </View>
      <Text className="text-xs text-white">{label}</Text>
    </TouchableOpacity>
  );
};

export default CategoryButton;
