const initialState = {
  allRecipes: [], // me trae todo
  copyRecipes: [], // para hacerle filtros y guardar el state
  diets: [], // me traigo las dietas
  detail: [], // me trago el detalle de cada una por id
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
    const allRecipes= state.copyRecipes //copia del estado
            const dietsFilter = action.payload === "All" ? state.copyRecipes :
             allRecipes.filter(recipe => recipe.diets.find(diet => {
              //console.log(diet)  
            if (diet.name === action.payload) {
             return recipe
              }   
            }))
             return{
                ...state,
                allRecipes: dietsFilter
            };
  //  const recipes = state.copyRecipes
  //           const dietFiltered = action.payload === "" ? recipes : recipes.filter(recipe => {
  //                   let diet = recipe.diets.map(d => d.name)
  //                   if (diet.includes(action.payload)){
  //                       return recipe
  //                   }
  //               })  
  //           return {
  //               ...state,
  //               allRecipes: dietFiltered
    // }
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
      const orderScore = action.payload === "asc" ? 
      state.allRecipes.sort(function(a,b){
      if(a.score > b.score){
          return 1
      }
      if(b.score > a.score){
          return -1
      }
      return 0
  }) :
  state.allRecipes.sort(function(a,b){
      if(a.score > b.score){
          return -1
      }
      if(b.score > a.score){
          return 1
      }
      return 0
  })
  return {
      ...state,
      allRecipes:  orderScore
  }
    // const sortedRecipesSpoonScore =
      //   action.payload === "SpoonacularMax"
      //     ? state.allRecipes.sort(function (a, b) {
      //         if (a.spoonacularScore < b.spoonacularScore) {
      //           return 1;
      //         }
      //         if (b.spoonacularScore < a.spoonacularScore) {
      //           return -1;
      //         }
      //         return 0;
      //       })
      //     : state.allRecipes.sort(function (a, b) {
      //         if (a.spoonacularScore < b.spoonacularScore) {
      //           return -1;
      //         }
      //         if (b.spoonacularScore < a.spoonacularScore) {
      //           return 1;
      //         }
      //         return 0;
      //       });
      // return {
      //   ...state,
      //   allRecipes: sortedRecipesSpoonScore,
      // };
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
