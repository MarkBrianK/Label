const home = "/";
const signup = "/signup";
const signin = "/signin";
const comments = "/comments/:clothId";
const profile = "/profile/:username";
const editProfile = "/profile/edit";
const sales = "/sales";
const makeSale = "/sales/:clothId"; // Include clothId in the route
const allSales = "/all_sales"
const explore = "/explore"
const emailConfirmation= "/confirmtion"

export const ROUTES = {
  home: home,
  signUp: signup,
  signIn: signin,
  clothComments: comments,
  profile: profile,
  editProfile: editProfile,
  sales: sales,
  makeSale: makeSale,
  allSales: allSales,
  explore:explore,
  emailConfirmation:emailConfirmation
};
