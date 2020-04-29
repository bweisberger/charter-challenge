# Welcome to Restaurant Search and Filter Single Page Application

## You can find the app deployed at `bweisberger.com`

## File Structure
- All components have their own directory, which also includes relevant stylesheets and an index.ts file to export modules.
- The tree structure below serves as an example to demonstrate this repo's structure.

```
.
└── src
    └── MainContainer/
        ├── MainContainer.tsx
        ├── MainContainer.css
        ├── index.ts
        ├── FilterContainer/
        │   ├── FilterContainer.tsx
        │   ├── FilterContainer.css
        │   ├── index.ts
        │   ├── FilterList/
        │   └── Filter/
        ├── RestaurantContainer/
        │   ├── PageNumber/
        │   ├── RestaurantList/
        │   └── Restaurant/
        └── SearchBar/
```

## Outstanding Concerns/Future Efforts
1) Add testing
2) Add continuous integration
3) Refactor MainContainer to decrease size and increase DRY code
4) Add TS Documentation