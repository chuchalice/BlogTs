export const saveData = (data: string) => {
  try {
    localStorage.setItem("userData", `${data}`);
  } catch (e) {
    console.log(e);
  }
};
export const saveToken = (data: string) => {
  try {
    localStorage.setItem("token", `${data}`);
  } catch (e) {
    console.log(e);
  }
};
export const saveIsLogin = (data: boolean) => {
  try {
    localStorage.setItem("isLogin", `${JSON.stringify(data)}`);
  } catch (e) {
    console.log(e);
  }
};

export const removeTokens = () => {
  localStorage.clear();
};
