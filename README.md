OPT Frontend
Member: 김정우, 김효성..

설치모듈
npm install @react-navigation/stack
npm install react-native-gesture-handler react-native-safe-area-context @react-native-masked-view/masked-view
npm install @gorhom/bottom-sheet
npm install @gorhom/bottom-sheet@latest
npm install @gorhom/bottom-sheet react-native-reanimated react-native-gesture-handler
npx expo install expo-image-picker

혹시 버전관련 오류뜰 때
npx expo install --fix

# Trouble Shooting

- Web Bundling failed 469ms index.ts (828 modules)
  Unable to resolve "../assets/images/manager-profile.png" from "screens\chat\ManagerChatScreen.tsx"

  - Screen의 폴더구조를 바꾸고 이 파일을 import하거나 상대경로로 파일을 지정해 놓았을 때 오류가 뜨는 것을 확인함, 맞춰서 수정하는 작업들이 필요.

- no overload matches this call
  - 타입지정 안해서 생기는 문제
  - 예를들면
  - type RootStackParamList = {
    LoginNeedScreen: undefined;
    DMScreen: undefined;
    // 다른 필요한 스크린들도 여기에 추가
    };
  - 이러한 코드입력으로 해결할 수 있다.
