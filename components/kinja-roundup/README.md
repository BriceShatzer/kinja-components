# KinjaRoundup ![ready](status-images/ready.svg) ![new](status-images/new.svg)

This is the editor component that controls the Roundup inputs. As people fill out new items, the Post body will be updated with a Roundup BlockNode via `updatePostModel`.

[Storybook demo](http://localhost:8001/?selectedKind=4.%20Components%7CKinjaRoundup)

<!-- STORY -->

## Props

```
type Props = {
  data: Roundup,
  externalAPI: {
    getPost(url: string) => Promise<*>,
    getBlog(id: number) => Promise<*>,
    updatePostModel: (data: Array<RoundupItem>) => void
  }
};

type State = {
	items: Array<RoundupItem>
};```
