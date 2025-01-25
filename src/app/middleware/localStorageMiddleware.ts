import { Middleware } from "@reduxjs/toolkit";
import { UserActions } from "@/features/user/userSlice";

export const localStorageMiddleware: Middleware = store => next => (action: UserActions) => {
    console.log(action);
    const result = next(action)
  
    // Проверка на login
    if (action.type === 'user/logIn') {
      console.log('LogIn in middleware')
      const { username, password } = action.payload
      const storedUser = JSON.parse(localStorage.getItem(username) || '{}')
  
      if (storedUser.username === username && storedUser.password === password) {
        store.dispatch({ type: 'user/loginSuccess', payload: storedUser.username })
      } else {
        store.dispatch({ type: 'user/loginFail', payload: 'Invalid username or password' })
      }
    }
  
    // Сохраняем состояние пользователя в localStorage
    if (action.type === 'user/loginSuccess' || action.type === 'user/logout') {
      // const state = store.getState()
      // if (state.user.isAuthenticated && state.user.user) {
      //   localStorage.setItem('user', JSON.stringify(state.user.user))
      // } else {
      //   localStorage.removeItem('user')
      // }
    }

    // Проверка на login
    if (action.type === 'user/signup') {
      console.log('LogIn in middleware')
      // const { username, password } = action.payload
      // const storedUser = JSON.parse(localStorage.getItem(username) || '{}')
  
      // if (storedUser.username === username && storedUser.password === password) {
      //   store.dispatch({ type: 'user/loginSuccess', payload: storedUser.username })
      // } else {
      //   store.dispatch({ type: 'user/loginFail', payload: 'Invalid username or password' })
      // }
    }
  
    return result
  }
  