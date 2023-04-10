export const isLogin = ():boolean => {
  const stateUser = useState('user')
  return stateUser.value ? true : false;
};
export const userInfo = () => {
  const stateUser = useState('user')
  return stateUser.value ? stateUser.value : false;
};