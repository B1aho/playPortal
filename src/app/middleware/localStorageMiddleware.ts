import { Middleware } from "@reduxjs/toolkit";
import { UserActions } from "@/features/user/userSlice";
import { getStoredFavs, getStoredUser, saveUserToLocalStorage } from "./utility";
import { loadFavorites, clearLibrary, addFavorite } from '@/features/library/librarySlice';

// Везде использовать action creators!!!
export const localStorageMiddleware: Middleware = store => next => (action) => {
  // Проверка logIn
  if (action.type === 'user/logIn') {
    const { username, password } = action.payload;
    const storedUser = JSON.parse(localStorage.getItem(username) || '{}');

    if (storedUser.username === username && storedUser.password === password) {
      store.dispatch({ type: 'user/loginSuccess', payload: storedUser.username });
      store.dispatch(loadFavorites(getStoredFavs(username)));
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
    store.dispatch(loadFavorites(getStoredFavs(username)));
    return;
  }

  if (action.type === 'library/addFavorite') {
    const gameInfo = action.payload;
    console.log(store.getState())
    localStorage.setItem(store.getState().user.username + '%favs', JSON.stringify(gameInfo))
  }


  if (action.type === 'user/logout') {
    store.dispatch(clearLibrary())
  }

  return next(action);
}
