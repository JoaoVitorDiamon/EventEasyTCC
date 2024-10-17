import { Logo, RoxoLogin } from "../components/Svgs";
import { View, Text, Pressable, Alert } from "react-native";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../services/firebaseConfig";
import { StyleSheet } from "react-native";
import { useForm, Controller } from "react-hook-form";
import {
  AppleAccount,
  ButaoLogar,
  EntreNaSuaConta,
  FaceAccount,
  ForgotPassword,
  GoogleAccount,
  LoginInputs,
  VamosComecarText,
} from "../components/Login";
import { router } from "expo-router";
import { useFonts } from "expo-font";

type NewLoginFormData = {
  email: string;
  password: string;
};

const onSubmit = async (data: NewLoginFormData) => {
  try {
    const userCredential = await signInWithEmailAndPassword(
      auth,
      data.email,
      data.password
    );
    const user = userCredential.user;
    console.log("Usuário logado com sucesso:", user);
    router.push("/homePage");
  } catch (error) {
    Alert.alert(
      "Erro ao logar",
      "Verifique se o e-mail e a senha estão corretos"
    );
  }
};

export default function LoginPage() {
  const {
    control,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<NewLoginFormData>();
  const [loaded] = useFonts({
    Poppins: require("../../assets/fonts/Poppins-Bold.ttf"),
  });
  return (
    <>
      <View className="bg-white">
        <View className="bg-black ">
          <RoxoLogin />
        </View>
        <View className="h-[50%] w-full justify-center items-center mt-3">
          <Logo />
        </View>
        <View className="flex relative w-[300] mt-9 ml-6">
          <VamosComecarText />
          <EntreNaSuaConta />
        </View>

        <Controller
          control={control}
          name="email"
          rules={{
            required: "E-mail é obrigatório",
            pattern: {
              value: /^[^@ ]+@[^@ ]+\.[^@ .]{2,}$/,
              message: "Digite um e-mail válido",
            },
          }}
          render={({ field: { onChange, onBlur, value } }) => (
            <LoginInputs
              placeholder="E-mail"
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
              keyboardType="email-address"
            />
          )}
        />
        {errors.email && (
          <Text style={styles.error}>{errors.email.message}</Text>
        )}

        <Controller
          control={control}
          name="password"
          rules={{
            required: "Senha é obrigatória",
            minLength: {
              value: 6,
              message: "A senha deve ter no mínimo 8 caracteres",
            },
          }}
          render={({ field: { onChange, onBlur, value } }) => (
            <LoginInputs
              placeholder="Senha"
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
              secureTextEntry
            />
          )}
        />
        {errors.password && (
          <Text style={styles.error}>{errors.password.message}</Text>
        )}
      </View>
      <View className="h-[50%] w-full items-center mt-[-60]">
        <ButaoLogar onPress={handleSubmit(onSubmit)} />
        <Pressable onPress={() => {router.push("/checkPasswordPage")}}>
          <ForgotPassword/>
        </Pressable>
        <View className="justify-center items-center flex ">
          <Pressable className=" flex-row gap-20 mt-6 items-center">
            <View>
              <AppleAccount />
            </View>
            <View>
              <GoogleAccount />
            </View>
            <View>
              <FaceAccount />
            </View>
          </Pressable>
        </View>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  error: {
    color: "red",
    marginBottom: 8,
    textAlign: "left",
    marginLeft: 20,
    fontFamily: "Poppins",
    fontWeight: "bold",
    letterSpacing: 0.5,
  },
});
