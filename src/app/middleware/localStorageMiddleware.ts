import { Middleware } from "@reduxjs/toolkit";
import { UserActions } from "@/features/user/userSlice";
import { getStoredUser, saveUserToLocalStorage } from "./utility";
// Узнать насколько окк так сделать миддлвару, чтобы не было пустых триггерных в authSlice
// При логине галочка, мол выходить автоматически из учетки при зыкрытии или перезагрузки странички  - реализовать
export const localStorageMiddleware: Middleware = store => next => (action: UserActions) => {
  // Проверка logIn
  if (action.type === 'user/logIn') {
    const { username, password } = action.payload;
    const storedUser = JSON.parse(localStorage.getItem(username) || '{}');

    if (storedUser.username === username && storedUser.password === password) {
      store.dispatch({ type: 'user/loginSuccess', payload: storedUser.username });
      return;
    } else {
      store.dispatch({ type: 'user/loginFail', payload: 'Invalid username or password' });
      return;
    }
  }

  // Регистрация пользователя
  if (action.type === 'user/signup') {
    const { username } = action.payload;
    // Проверить нет ли пользователя с таким именем
    const storedUser = getStoredUser(username);
    if (storedUser.username === username) {
      store.dispatch({ type: 'user/signupFail', payload: 'Registration fail: Username is already taken!' });
      return;
    }

    try {
      saveUserToLocalStorage(username, action.payload);
    } catch (err) {
      store.dispatch({ type: 'user/signupFail', payload: 'Registration fail: check if storage is disabled or if it is full!' });
      return;
    }

    store.dispatch({ type: 'user/signupSuccess', payload: username });
    return;
  }

  return next(action);
}
