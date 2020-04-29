# Welcome to Restaurant Search and Filter Single Page Application

## You can find the app deployed at `bweisberger.com`

## File Structure
- All components have their own directory, which also includes relevant stylesheets and an index.ts file to export modules.

.
+-- _src
|   +-- _MainContainer
|   |   +-- MainContainer.tsx
|   |   +-- MainContainer.css
|   |   +-- index.ts
|   |   +-- _FilterContainer
|   |   |   +-- _FilterList
|   |   |   +-- _Filter
|   |   +-- _RestaurantContainer
|   |   |   +-- _PageNumber
|   |   |   +-- _RestaurantList
|   |   |   +-- _Restaurant
|   |   +-- _SearchBar

## Outstanding Concerns/Future Efforts
1) Add testing
2) Add continuous integration
3) Refactor MainContainer to decrease size and increase DRY code
4) Add TS Documentation