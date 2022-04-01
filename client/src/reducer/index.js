const initialState = {
  allRecipes: [],
  copyRecipes: [],
  diets: [],
  detail: [],
};

function rootReducer(state = initialState, action) {
  switch (action.type) {
    case "GET_RECIPES":
      return {
        ...state,
        allRecipes: action.payload,
        copyRecipes: action.payload,
        detail: [],
      };
    case "GET_DIETS_TYPES":
      return {
        ...state,
        diets: action.payload,
      };
    case "GET_DETAIL":
      return {
        ...state,
        detail: action.payload,
      };
    case "GET_CLEAN":
      return {
        ...state,
        detail: [],
      };

    //filtrados

    case "FILTERED_BY_DIETS":
      const recipes = state.copyRecipes;
      const dietFiltered =
        action.payload === ""
          ? recipes
          : recipes.filter((recipe) => recipe.diets.includes(action.payload));
      return {
        ...state,
        allRecipes: dietFiltered,
      };
    case "ORDER_BY_TITLE":
      const sortedRecipesTitle =
        action.payload === "Asc"
          ? state.allRecipes.sort(function (a, b) {
              if (a.title.toLowerCase() > b.title.toLowerCase()) {
                return 1;
              }
              if (b.title.toLowerCase() > a.title.toLowerCase()) {
                return -1;
              }
              return 0;
            })
          : state.allRecipes.sort(function (a, b) {
              if (a.title.toLowerCase() > b.title.toLowerCase()) {
                return -1;
              }
              if (b.title.toLowerCase() > a.title.toLowerCase()) {
                return 1;
              }
              return 0;
            });
      return {
        ...state,
        allRecipes: sortedRecipesTitle,
      };
    case "ORDER_BY_SPOONACULAR_SCORE":
      const orderScore =
        action.payload === "asc"
          ? state.allRecipes.sort(function (a, b) {
              if (a.score > b.score) {
                return 1;
              }
              if (b.score > a.score) {
                return -1;
              }
              return 0;
            })
          : state.allRecipes.sort(function (a, b) {
              if (a.score > b.score) {
                return -1;
              }
              if (b.score > a.score) {
                return 1;
              }
              return 0;
            });
      return {
        ...state,
        allRecipes: orderScore,
      };
    //es para el search
    case "SEARCH_RECIPE":
      return {
        ...state,
        allRecipes: action.payload,
      };
    default:
      return state;
  }
}

export default rootReducer;
