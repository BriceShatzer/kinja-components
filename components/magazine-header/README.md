# MagazineHeader ![ready](status-images/ready.svg) ![new](status-images/new.svg)

The `MagazineHeader` is an option for the header on a featured post. It spans the width of the page, and has a different look compared to the Default Featured Header

<!-- STORY -->

## MagazineHeader Props
| Name | Type | Required | Default value | Description
|------|------|----------|---------------|------------
|title | `string` | ✓ | - | Title or headline of the story/article
|featuredMedia | `FeaturedMediaJSON` | ✓ | - | The image used for the featured header
|isSponsored | `boolean` | ✓ | - | is the story sponsored by a third party
|permalinkHost | `string` | ✓ | - | permalink domain of the story
|permalinkPath | `string` | ✓ | - | permalink pretty URL of the story
|storyTypeProperties | `StoryType` | ✓ | - | Describes the story type of the FeaturedHeader, provides canonical


