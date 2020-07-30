interface StoreState {
  userInfo: {
    userName: string,
    token: string
  };
}

const initState: StoreState = {
  // 用户信息
  userInfo: {
    userName: '',
    token: ''
  }
}

export default initState
