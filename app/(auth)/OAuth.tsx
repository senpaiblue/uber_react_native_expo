import CustomButton from "@/components/CustomButton";
import { icons } from "@/constants";
import React from "react";
import { Image, Text, View } from "react-native";

const OAuth = () => {
  const handleGoogleSignIn = async () => {};
  return (
    <View>
      <View className="flex flex-row items-center justify-center gap-x-3 mt-3">
        <View className="flex-1 h-[1px] bg-general-100" />
        <Text className="text-lg"> Or</Text>
        <View className="flex-1 h-[1px] bg-general-100" />
      </View>
      <CustomButton
        title="Log In with Google"
        className="mt-5 w-full shadow-none"
        IconLeft={() => (
          <Image
            source={icons.google}
            resizeMode="contain"
            className="w-5 h-5 mx-2"
          />
        )}
        bgVariant="outline"
        textVariant="primary"
        onPress={handleGoogleSignIn}
      />
    </View>
  );
};

export default OAuth;
