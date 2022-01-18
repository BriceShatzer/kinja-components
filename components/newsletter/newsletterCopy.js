// @flow

import Blog from 'kinja-magma/models/Blog';

const NewsletterCopy = {
	gizmodo: 'This newsletter comes from the future.',
	jezebel: 'Let us help you procrastinate. Sign up for our daily newsletter.',
	kotaku: 'Your guide to gaming delivered to your inbox daily.',
	theroot: 'Blackness in your inbox daily. Subscribe to The Root.',
	splinter: 'Get Splinter\'s no-bullshit newsletter.',
	lifehacker: 'Daily tips, tricks & shortcuts delivered to your inbox.',
	deadspin: 'Finally, a newsletter that doesn\'t suck.',
	earther: 'From life on Earth to everything beyond, we\'ve got it covered. Subscribe to our newsletter.',
	io9: 'Get the best breaking news about comics, sci-fi, fantasy, and more—delivered to your inbox every morning.',
	jalopnik: 'Beep beep, it\'s newsletter time. Drop your email here and get our stories in your inbox.',
	avclub: 'Now you can get the top stories from The A.V. Club delivered to your inbox.',
	theonion: 'Now you can get the top stories from The Onion delivered to your inbox.',
	clickhole: 'Now you can get the top stories from ClickHole delivered to your inbox.',
	thetakeout: 'Now you can get the top stories from The Takeout delivered to your inbox.'
};

function getNewsletterCopy(blog: Blog): string {
	const copy = NewsletterCopy[blog && blog.blogGroup] ||
	`Now you can get the top stories from ${blog.displayName} delivered to your inbox.`;

	return copy;

}

export default getNewsletterCopy;
