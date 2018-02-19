import { StyleSheet } from 'react-native';

// base color
// 연분홍 - 그레이블루 - 스카이블루 - 블루 - 민트
// eccbd9-e1eff6-97d2fb-83bcff-80ffe8

export const CommonStyles = StyleSheet.create({
  container: {
    paddingVertical: 20,
    paddingHorizontal: 20
  },
  blueBtn: {
    backgroundColor: '#83bcff',
    borderRadius: 6,
    marginTop:10,
},
  blueBtnTxt: {
    paddingVertical: 8,
    textAlign: 'center',
    color: 'white',
    fontSize: 24
  }
});