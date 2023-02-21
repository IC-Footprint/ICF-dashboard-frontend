interface DataSourceModel {
  screenName: string;
  sourceType: string;
}

export type ThemeType = 'dark' | 'light';

interface WidgetOptionsModel {
  height: number;
  theme?: ThemeType;
  tweetLimit?: number;
  chrome?: string;
  dnt?: string;
}

export interface TwitterWidgetOptionsModel {
  dataSource: DataSourceModel;
  options: WidgetOptionsModel;
}
