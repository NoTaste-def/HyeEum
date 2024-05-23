import { createSlice, configureStore } from "@reduxjs/toolkit";

const qna = createSlice({
  name: "qna",
  initialState: [
    "만약 당신의 성격이 음식이라면, 그 음식은 무엇일까요?",
    "만약 당신의 삶이 책 한 권이라면, 그 책의 제목은 무엇이 될까요?",
    "만약 당신의 일상 생활이 영화 속 한 장면이라면, 어떤 장면이 될 것 같나요?",
    "만약 당신의 성격이 동물로 비유된다면, 어떤 동물이 가장 잘 어울릴까요?",
    "만약 당신이 특별한 수퍼파워를 한 가지 가질 수 있다면, 어떤 수퍼파워를 가질 건가요?",
    "당신이 하나의 색으로 표현된다면, 그 색은 무엇인가요?",
    "만약 당신이 오늘의 날씨라면, 어떤 날씨가 될 것 같나요?",
    "만약 당신의 취미가 하나의 노래로 표현된다면, 그 노래는 무엇인가요?",
    "만약 당신의 삶이 하나의 영화라면, 그 영화의 장르는 무엇이 될 것 같나요?",
    "당신이 하나의 계절로 비유된다면, 그 계절은 무엇인가요?",
    "당신이 좋아하는 동화 속 캐릭터는 누구인가요?",
    "당신이 좋아하는 음악 장르가 있다면, 그 장르는 무엇인가요?",
    "당신이 오늘 무엇을 하루 종일 할 수 있다면, 무엇을 하고 싶나요?",
    "당신이 좋아하는 스포츠가 있다면, 그 스포츠는 무엇인가요?",
    "당신이 가장 좋아하는 요리는 무엇인가요?",
    "당신이 좋아하는 영화 장르가 있다면, 그 장르는 무엇인가요?",
    "만약 당신의 성격이 하나의 도시로 비유된다면, 어떤 도시가 어울릴까요?",
    "당신이 가장 좋아하는 계절은 어느 것인가요?",
    "당신의 아침을 시작하는 가장 좋아하는 방법은 무엇인가요?",
    "당신이 휴식을 취할 때 선호하는 방식은 무엇인가요?",
    "당신의 성격을 나타내는 한 마디는 무엇인가요?",
  ],
});

const user = createSlice({
  name: "user",
  initialState: {
    polite: true,
    birth: "",
    user_name: "",
    alignment: "",
    template: true,
  },
  reducers: {
    updateBirth(state, action) {
      state.birth = action.payload;
    },
    updateName(state, action) {
      state.user_name = action.payload;
    },
    updateToggle(state, action) {
      state.polite = action.payload;
    },
    updateAlign(state, action) {
      state.alignment = action.payload;
    },
  },
});

const toggleState = createSlice({
  name: "toggleState",
  initialState: {
    polite: true,
  },
  reducers: {
    SetIsOn(state, action) {
      state.polite = action.payload;
    },
  },
});

// export let { 함수들 } = 어쩌구.actions;

export let { updateBirth, updateName, updateToggle, updateAlign } =
  user.actions;
export let { SetIsOn } = toggleState.actions;

export default configureStore({
  reducer: {
    // 작명 : state이름.reducer <--- .reducer 안쓰면 적용 안됨.
    user: user.reducer,
    toggleState: toggleState.reducer,
    qna: qna.reducer,
  },
});
