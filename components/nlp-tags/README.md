# NLPTags ![ready](status-images/ready.svg) ![new](status-images/new.svg)

NLP Tags is an editor-specific component to display tag suggestions from the kinja-autotagging API.

<!-- STORY -->

## Props

```
type Tag = {
	name: string,
	type: string,
	salience: number,
	count: number
};

type Props = {
  data: Array<Tag>,
  externalAPI: {
    updatePostModel: (tagName: string) => void
  }
};

type State = {
	items: Array<Tag>
};```