import { Text, View } from 'react-native';

type EditScreenInfoProps = {
  path: string;
};

export const EditScreenInfo = ({ path }: EditScreenInfoProps) => {
  return (
    <View className="items-center">
      <Text className="text-sm text-gray-500">
        Open up <Text className="font-bold">{path}</Text> to edit this screen
      </Text>
    </View>
  );
};
