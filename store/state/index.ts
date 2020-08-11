interface StoreState {
  userInfo: {
    userName: string,
    token: string
  };
  activeIndex: number;
}

const initState: StoreState = {
  // 用户信息
  userInfo: {
    userName: '',
    token: ''
  },
  activeIndex: 3
}

export default initState
