import { useRef, useState } from "react";
import { Image, Text, TextInput, TouchableOpacity, View } from "react-native";
import Entypo from "react-native-vector-icons/Entypo";
import { Camera, CameraType } from "expo-camera";

function SharePostPage({ navigation }) {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const [hasCameraPermission, setCameraPermission] = useState(null);
  const [image, setImage] = useState(null);
  const [type, setType] = useState(Camera.Constants.Type.back);
  const [flash, setFlash] = useState(Camera.Constants.FlashMode.off);
  const cameraRef = useRef(null);

  const [isCameraOpen, setIsCameraOpen] = useState(false);

  async function getCameraPermission() {
    if (hasCameraPermission === null && hasCameraPermission === false) {
      const cameraStatus = await Camera.requestCameraPermissionsAsync();

      setCameraPermission(cameraStatus.status === "granted");
      console.log(cameraStatus.status)
      if (hasCameraPermission) {
        setIsCameraOpen(true);
      }
    } else {
      setIsCameraOpen(true);
    }


  }

  const takePicture = async () => {
    if (cameraRef) {
      try {
        const data = await cameraRef.current.takePictureAsync();
        console.log(data);
        setImage(data.uri);
      } catch (e) {
        console.log("error!");
      }
    }
  };

  return (
    <>
      {isCameraOpen ? (
        <View
          style={{
            flex: 1,
            backgroundColor: "#000",
            padding: 8,
            justifyContent: "center",
          }}
        >
          {!image ? (
            <Camera
              style={{ flex: 1 }}
              type={type}
              flashMode={flash}
              ref={cameraRef}
            >
              <Text>hello</Text>
            </Camera>
          ) : (
            <Image source={{ uri: image }} style={{ flex: 1 }} />
          )}
          <View>
            {image ? (
              <View style={{flexDirection: "row", justifyContent: "space-between", paddingHorizontal: 100}}>
                <TouchableOpacity
                  style={{ alignItems: "center" }}
                  onPress={()=>{setImage(null)}}
                >
                  <Entypo name="retweet" size={28} color="white" />
                  <Text style={{ color: "white", paddingVertical: 10 }}>
                    Tekrar çek
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={{ alignItems: "center" }}
                  onPress={()=>{setIsCameraOpen(false); setImage(null);}}
                >
                  <Entypo name="check" size={28} color="white" />
                  <Text style={{ color: "white", paddingVertical: 10 }}>
                    Kaydet
                  </Text>
                </TouchableOpacity>
              </View>
            ) : (
              <TouchableOpacity
                style={{ alignItems: "center" }}
                onPress={()=>takePicture()}
              >
                <Entypo name="camera" size={28} color="white" />
                <Text style={{ color: "white", paddingVertical: 10 }}>
                  Fotoğraf Çek..
                </Text>
              </TouchableOpacity>
            )}
          </View>
        </View>
      ) : (
        <View style={{ padding: 45, justifyContent: "center" }}>
          <Text style={{ fontSize: 28 }}>Gönderi Paylaş</Text>
          <View
            style={{
              flexDirection: "row",
              paddingVertical: 0,
              width: "auto",
              alignItems: "center",
              marginVertical: 10,
            }}
          >
            <TextInput
              style={{
                height: 45,
                borderRadius: 10,
                borderWidth: 1,
                padding: 10,
                flex: 1,
              }}
              value={title}
              onChangeText={(value) => {
                setTitle(value);
              }}
              placeholder="Başlık.."
            />
          </View>
          <View
            style={{
              flexDirection: "row",
              paddingVertical: 0,
              width: "auto",
              alignItems: "center",
              marginVertical: 10,
            }}
          >
            <TextInput
              style={{
                height: 45,
                borderRadius: 10,
                borderWidth: 1,
                padding: 10,
                flex: 1,
              }}
              value={content}
              onChangeText={(value) => {
                setContent(value);
              }}
              placeholder="Açıklama..."
            />
          </View>
          <View
            style={{
              flexDirection: "row",
              paddingVertical: 0,
              width: "auto",
              alignItems: "center",
              marginVertical: 10,
            }}
          >
            <TouchableOpacity
              onPress={() => {
                getCameraPermission();
              }}
              style={{
                height: 200,
                borderRadius: 10,
                borderWidth: 1,
                padding: 10,
                justifyContent: "center",
                alignItems: "center",
                flex: 1,
              }}
            >
              <Entypo name="camera" size={30} color="black" />
            </TouchableOpacity>
          </View>
          {hasCameraPermission == false ? (
            <Text style={{ color: "red" }}>Kameraya izin yok!</Text>
          ) : null}
          <View
            style={{
              flexDirection: "row",
              paddingVertical: 0,
              width: "auto",
              alignItems: "center",
              marginVertical: 10,
            }}
          >
            <TouchableOpacity
              style={{
                height: 55,
                borderRadius: 10,
                backgroundColor: "white",
                borderWidth: 1,
                padding: 10,
                justifyContent: "center",
                alignItems: "center",
                flex: 1,
              }}
            >
              <Text style={{ color: "black" }}>Gönder..</Text>
            </TouchableOpacity>
          </View>
          <View
            style={{
              flexDirection: "row",
              paddingVertical: 0,
              width: "auto",
              alignItems: "center",
              marginVertical: 10,
            }}
          >
            <TouchableOpacity
              onPress={() => {
                navigation.navigate("HomePage");
              }}
              style={{
                height: 55,
                borderRadius: 10,
                borderColor: "red",
                borderWidth: 1,
                padding: 10,
                justifyContent: "center",
                alignItems: "center",
                flex: 1,
              }}
            >
              <Text style={{ color: "black" }}>Vazgeç..</Text>
            </TouchableOpacity>
          </View>
        </View>
      )}
    </>
  );
}
export default SharePostPage;
