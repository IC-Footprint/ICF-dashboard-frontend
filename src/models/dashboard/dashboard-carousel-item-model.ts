export interface IconModel {
  icon: string;
  name: string;
  url: string;
}

export interface DashboardCarouselItemModel {
  title: string;
  socialIcons?: IconModel[];
  buttonLabel?: string;
  redirectRoute?: string;
  href?: string;
  subtitle?: string;
}
