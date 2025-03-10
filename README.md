# CinemaPick 🎬
CinemaPick is a modern, responsive web application built with React that allows users to browse movies, TV shows seamlessly and add favs into the library.

Check out the live version of CinemaPick (VPN requirement with Russian IP):
👉 https://cinemapick.netlify.app/main

## Technologies Used 🛠️
- Frontend: 
React, Redux, RTK Query, React Router, TypeScript, Vite
- APIs:
Trakt API: Fetching movie/TV show lists and metadata.
TMDB API: High-quality posters and background images.
Integrated two APIs (Trakt and TMDB) seamlessly to provide a rich user experience.
- Others:
LottieFiles for animations.

## Preview
![demo](./public/preview.gif)

## Features ✨
1. Movie and TV Show Browsing
Browse a vast collection of movies and TV shows.
Discover trending and popular content on the homepage.
2. Advanced Search and Filtering
Search by category: Movies, TV shows, or both.
Genre filtering: Clickable genres on the sidebar or detailed movie pages.
Combined search: Search within a specific genre and category simultaneously.
Rating filter: Filter movies/TV shows by rating range on the details page.
3. Infinite Scrolling with Intersection Observer API
Smooth, paginated loading of content for an enhanced user experience.
4. Dynamic Masonry Layout
Movie/TV show cards are displayed in a visually appealing masonry grid.
5. Debounced Search
Efficient search functionality with debouncing to optimize performance.
6. User Authentication
Login and Signup pages with basic input validation and user-friendly error messages.
7. Custom Middleware for LocalStorage
Logic related to localStorage is abstracted into a custom middleware for better code organization.
8. Library Page
Save and view your favorite movies/TV shows.
Saved cards are loaded in chunks of 20 for optimal performance.
9. Modern Animations with LottieFiles
Lightweight, high-quality animations using the LottieFiles JSON format.
10. Dark Themes
Two visually appealing themes for user preference.
11. Responsive Design
Responsive layout for seamless use on desktop, tablet, and mobile devices.

## Future Improvements
- Virtualization for Infinite Scrolling
Implement virtualization techniques (e.g., using libraries like react-window or react-virtualized) to optimize rendering performance for large lists. This will ensure smoother scrolling and reduce memory usage, especially when dealing with extensive movie/TV show collections.
- Additional Filtering Categories
Expand the filtering options to include more categories.
- Custom Collections in Favorites
Allow users to create and manage their own custom collections within the "Favorites" section.
- Draggable cards in library