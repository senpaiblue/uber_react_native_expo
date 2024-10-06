import {
  View,
  Text,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Image,
  TextInput,
  Platform,
  Keyboard,
} from "react-native";
import React from "react";
import { InputFieldProps } from "@/types/type";

export default function InputField({
  label,
  labelStyle,
  icon,
  secureTextEntry = false,
  containerStyle,
  inputStyle,
  iconStyle,
  className,
  ...props
}: InputFieldProps) {
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View className="flex flex-col items-start justify-center space-y-4 w-full">
          <Text className={`text-lg font-JakartaSemiBold ${labelStyle}`}>
            {label}
          </Text>
          <View
            className={`bg-neutral-100 my-6 flex flex-row items-center justify-center rounded-full border border-neutral-100 focus:border-neutral-400 w-full ${containerStyle}`}
          >
            {icon && (
              <Image source={icon} className={`w-6 h-6 ml-4 ${iconStyle}`} />
            )}
            <TextInput
              placeholder="Enter your name"
              className={`rounded-full p-4 font-JakartaSemiBold text-left text-[15px] ${inputStyle} flex-1`}
              secureTextEntry={secureTextEntry}
              {...props}
            />
          </View>
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}
