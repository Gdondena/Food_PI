const initialState = {
  allRecipes: [], // me trae todo
  copyRecipes: [], // para hacerle filtros y guardar el state
  diets: [], // me traigo las dietas
  detail: [], // me trago el detalle de cada una por id
  errorMessage: "",
  // defaultRecipes: [],
};

function rootReducer(state = initialState, action) {
  switch (action.type) {
    case "GET_RECIPES":
      return {
        ...state,
        allRecipes: action.payload,
        copyRecipes: action.payload,
        // defaultRecipes : action.payload
        errorMessage: "", //vacio mensaje de error
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
    //filtrados

    case "FILTERED_BY_DIETS":
      const recipes = state.copyRecipes;
      const dietFiltered =
        action.payload === ""
          ? recipes
          : recipes.filter((recipe) => recipe.diets.includes(action.payload));
      // action.payload === ""
      //   ? recipes
      //   : recipes.filter((recipe) => {
      //       let diet = recipe.diets.map((d) => d.name);
      //       if (diet.includes(action.payload)) {
      //         return recipe;
      //       }
      //     });
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
      case "SEARCH_RECIPE_FAILED":
        return {
          ...state,
          
          errorMessage: "No hay resultados",
          allRecipes: [],
        };
    default:
      return state;
  }
}

export default rootReducer;
