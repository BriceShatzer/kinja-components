# RecentVideo ![ready](status-images/ready.svg)

The Recent Video module plays one or more videos with an optional carousel.

[Storybook demo](http://localhost:8001/?selectedKind=4.%20Components%7CRecent%20Video&selectedStory=RecentVideo)

<!-- STORY -->

## Props

| Name | Type | Required | Default value | Description
|------|------|----------|---------------|------------
| blogGroup | `string` | ✓ |  | The blog group used for theming, e.g. `'avclub'`
| blogName | `string` | ✓ |  | The name of the blog group, e.g. `'The A.V. Club'`
| carouselEnabled | `boolean` |  | `false` | Enable the video carousel. If there's only one video — either at initialization or when there are no more videos left — the carousel will be hidden regardless of this prop.
| hostName | `string` | ✓ |  | The hostname of the blog group, e.g. `'avclub.com'`
| position | `'permalink'`, `'frontpage'`, `'leftrail'` | ✓ |  | The position of the module on the site
| videos | `RelatedVideo[]` | ✓ |  | The video(s) to play. The first one will be loaded in the player, the rest will show up in the endscreen and in the carousel.
| videoType | `'playlist' | 'recent_videos' | 'recommended_video'` | ✓ |  | Video type (?)
| clickOutToVideos | `boolean` |  |  | Don't play clicked videos, go to their permalink instead
| isMagma | `boolean` |  |  | Is in Magma?
