export enum AppRoute {
  Root = '/',
  Favorites = '/favorites',
  Login = '/login',
  Player = '/player/:id',
  Film = '/film/:film',
  Review = 'film/:id/review'
}

export enum NavItem {
  Details = 'Details',
  Overview = 'Overview',
  Reviews = 'Reviews'
}

export enum MaxElementCount {
  FilmCard = 8,
  ToastError = 1,
  RatingStar = 10
}
