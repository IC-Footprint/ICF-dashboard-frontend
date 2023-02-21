import type {
  ThemeType,
  TwitterWidgetOptionsModel
} from '@/models/about/twitter-widget-options-model';

export class TwitterWidgetUtils {
  static buildTwitterWidgetOptions(
    username?: string,
    theme: ThemeType = 'dark'
  ): TwitterWidgetOptionsModel {
    return {
      dataSource: {
        screenName: username ?? '',
        sourceType: 'profile'
      },
      options: {
        theme,
        height: 500,
        tweetLimit: 5,
        chrome: 'noborders',
        dnt: 'true'
      }
    };
  }
}
