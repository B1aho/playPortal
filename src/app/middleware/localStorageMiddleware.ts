import { Middleware } from "@reduxjs/toolkit";
import { clearError, UserActions } from "@/features/user/userSlice";
import { changePasswordInLocalStorage, changeUsernameInLocalStorage, clearCurrUsername, getStoredFavs, getStoredUser, saveCurrUsername, saveUserToLocalStorage } from "./utility";
import { loadFavorites, clearLibrary, LibActions } from '@/features/library/librarySlice';

export const localStorageMiddleware: Middleware = store => next => (action: UserActions | LibActions) => {
  // Проверка logIn
  if (action.type === 'user/logIn') {
    const { username, password } = action.payload;
    const storedUser = JSON.parse(localStorage.getItem(username) || '{}');

    if (storedUser.username === username && storedUser.password === password) {
      store.dispatch({ type: 'user/loginSuccess', payload: storedUser.username });
      store.dispatch(loadFavorites(getStoredFavs(username)));
      saveCurrUsername(username);
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
    saveCurrUsername(username);
    store.dispatch({ type: 'user/signupSuccess', payload: username });
    store.dispatch(loadFavorites(getStoredFavs(username)));
    return;
  }

  if (action.type === 'user/changeUsername') {
    const newUsername = action.payload;
    const storedSameUsername = getStoredUser(newUsername);
    if (storedSameUsername.username === newUsername) {
      store.dispatch({ type: 'user/changeUsernameFail', payload: 'Username change fail: This username is already taken!' });
      return;
    }

    try {
      const oldUsername = store.getState().user.username;
      changeUsernameInLocalStorage(oldUsername, newUsername);
    } catch (err) {
      store.dispatch({ type: 'user/changeUsernameFail', payload: 'Username change fail: current data might be broken!' });
      return;
    }
    store.dispatch({ type: 'user/changeUsernameSuccess', payload: newUsername });
    store.dispatch(clearError());
    return;
  }

  if (action.type === 'user/changePassword') {
    const newPassword = action.payload;
    try {
      const username = store.getState().user.username;
      changePasswordInLocalStorage(username, newPassword);
    } catch (err) {
      store.dispatch({ type: 'user/changePasswordFail', payload: 'Password change fail: check if storage is disabled or if it is full!' });
      return;
    }
    store.dispatch(clearError());
    return;
  }

  if (action.type === 'user/logout') {
    clearCurrUsername();
    store.dispatch(clearLibrary());
  }

  next(action);

  // %favs - сделать global vite env 
  // После next - значит librarySlice уже добавил fav
  if (action.type === 'library/addFavorite') {
    const favs = store.getState().library.favs;
    const username = store.getState().user.username

    localStorage.setItem(username + '%favs', JSON.stringify([...favs]))
  }

  if (action.type === 'library/removeFromFavs') {
    const favs = store.getState().library.favs;
    const username = store.getState().user.username

    localStorage.setItem(username + '%favs', JSON.stringify([...favs]))
  }
}
