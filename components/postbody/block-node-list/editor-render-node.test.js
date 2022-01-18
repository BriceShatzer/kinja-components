import editorRenderNode from './editor-render-node';
import { mount } from 'enzyme';

import {
	LinkNode,
	TextNode
} from 'postbody/InlineNode';
import DailyMotion from 'postbody/blockNodes/DailyMotion';
import Facebook from 'postbody/blockNodes/Facebook';
import Imgur from 'postbody/blockNodes/Imgur';
import Instagram from 'postbody/blockNodes/Instagram';
import KinjaVideo from 'postbody/blockNodes/KinjaVideo';
import Megaphone from 'postbody/blockNodes/Megaphone';
import Mixcloud from 'postbody/blockNodes/Mixcloud';
import Ooyala from 'postbody/blockNodes/Ooyala';
import Qzzr from 'postbody/blockNodes/Qzzr';
import SoundCloud from 'postbody/blockNodes/SoundCloud';
import SoundCloudPlaylist from 'postbody/blockNodes/SoundCloudPlaylist';
import Tumblr from 'postbody/blockNodes/Tumblr';
import Typeform from 'postbody/blockNodes/Typeform';
import TwitchStream from 'postbody/blockNodes/TwitchStream';
import TwitchVideo from 'postbody/blockNodes/TwitchVideo';
import Twitter from 'postbody/blockNodes/Twitter';
import Ustream from 'postbody/blockNodes/Ustream';
import UstreamLive from 'postbody/blockNodes/UstreamLive';
import Viddler from 'postbody/blockNodes/Viddler';
import Vimeo from 'postbody/blockNodes/Vimeo';
import Vine from 'postbody/blockNodes/Vine';
import Waywire from 'postbody/blockNodes/Waywire';
import YoutubePlaylist from 'postbody/blockNodes/YoutubePlaylist';
import YoutubeVideo from 'postbody/blockNodes/YoutubeVideo';

const caption = [
	new TextNode('ICE COLD! ('),
	new LinkNode([new TextNode('Flickr: Ben')], 'https://example.com'),
	new TextNode(')')
];

describe('editorRenderNode', () => {
	it('should render a link in place of a LinkPreview inset', () => {
		const node = { type: 'LinkPreview', url: 'url' };
		expect(mount(editorRenderNode(node, 1, {})).getDOMNode()).toMatchSnapshot();
	});
	it('should render a link in place of a LinkPreview inset with CommerceList style', () => {
		const node = { type: 'LinkPreview', url: 'url', style: 'CommerceList' };
		expect(mount(editorRenderNode(node, 1, {})).getDOMNode()).toMatchSnapshot();
	});
	it('should render a link in place of a LinkPreview inset with CommerceCondensed style', () => {
		const node = { type: 'LinkPreview', url: 'url', style: 'CommerceCondensed' };
		expect(mount(editorRenderNode(node, 1, {})).getDOMNode()).toMatchSnapshot();
	});
	it('should render a link in place of a ReplyInset', () => {
		const node = { type: 'ReplyInset', url: 'url'};
		expect(mount(editorRenderNode(node, 1, {})).getDOMNode()).toMatchSnapshot();
	});

	describe('embeds', () => {
		it('Soundcloud', () => {
			const wrapper = mount(editorRenderNode(new SoundCloud('220076771'), 0, {}));
			expect(wrapper.getDOMNode()).toMatchSnapshot();
		});
		it('Soundcloud playlist', () => {
			const wrapper = mount(editorRenderNode(new SoundCloudPlaylist('40033455'), 0, {}));
			expect(wrapper.getDOMNode()).toMatchSnapshot();
		});
		it('Facebook', () => {
			const wrapper = mount(editorRenderNode(new Facebook('10153915420718967'), 0, {}));
			expect(wrapper.getDOMNode()).toMatchSnapshot();
		});
		describe('Youtube', () => {
			const youtubeVideo_id = '1Y1ya-yF35g';
			const youtubeVideo_thumbnail = {
				id: 'bf8kw10mbuxnux7ttolf',
				format: 'jpg'
			};
			it('should render to embed with specified start time', () => {
				const wrapper = mount(editorRenderNode(
					new YoutubeVideo(
						youtubeVideo_id,
						youtubeVideo_thumbnail,
						{
							start: 424
						}
					), 0, {}
				));
				expect(wrapper.getDOMNode()).toMatchSnapshot();
			});
			['Left', 'Center', 'Right'].forEach(a => it(`should render with ${a} alignment`, () => {
				const wrapper = mount(editorRenderNode(
					new YoutubeVideo(
						youtubeVideo_id,
						youtubeVideo_thumbnail,
						{
							alignment: a
						}
					), 0, {}
				));
				expect(wrapper.find('aside')).toHaveClassName(`align--${a.toLowerCase()}`);
			}));
			it('should render to embed with the expected caption', () => {
				const wrapper = mount(editorRenderNode(
					new YoutubeVideo(
						youtubeVideo_id,
						youtubeVideo_thumbnail,
						{ caption }
					), 0, { captionsEnabled: true }
				));
				expect(wrapper.getDOMNode()).toMatchSnapshot();
			});
		});
		it('YoutubePlaylist', () => {
			const wrapper = mount(editorRenderNode(
				new YoutubePlaylist('RDndXwTPAFjSU', {
					id: 'zvwm06tma1hyehmettpd',
					format: 'jpg'
				}, {
					initialVideo: 'ndXwTPAFjSU',
					start: 0
				}), 0, { captionsEnabled: true }
			));
			expect(wrapper.getDOMNode()).toMatchSnapshot();
		});
		it('Tumblr', () => {
			const wrapper = mount(editorRenderNode(new Tumblr('gazs', '147955529854'), 0, {}));
			expect(wrapper.getDOMNode()).toMatchSnapshot();
		});
		it('Typeform', () => {
			const wrapper = mount(editorRenderNode(new Typeform('clickhole', 'Zh9XTz'), 0, {}));
			expect(wrapper.getDOMNode()).toMatchSnapshot();
		});
		it('TwitchVideo', () => {
			const wrapper = mount(editorRenderNode(new TwitchVideo('69248712'), 0, {}));
			expect(wrapper.getDOMNode()).toMatchSnapshot();
		});
		it('TwitchStream', () => {
			const wrapper = mount(editorRenderNode(new TwitchStream('gosugamers'), 0, {}));
			expect(wrapper.getDOMNode()).toMatchSnapshot();
		});
		it('Viddler', () => {
			const wrapper = mount(editorRenderNode(new Viddler('e5b3acca'), 0, {}));
			expect(wrapper.getDOMNode()).toMatchSnapshot();
		});
		it('Vimeo', () => {
			const wrapper = mount(editorRenderNode(new Vimeo('159069175', {
				id: 'eydjkgrhuxwb76jhjcgl',
				format: 'jpg'
			}), 0, {}));
			expect(wrapper.getDOMNode()).toMatchSnapshot();
		});
		describe('KinjaVideo', () => {
			it('no caption', () => {
				const wrapper = mount(editorRenderNode(new KinjaVideo('3279772', {
					id: 'gkoszxli4iwxrvxaomts',
					format: 'jpg'
				}, { alignment: undefined }), 0, {}));
				expect(wrapper.getDOMNode()).toMatchSnapshot();
			});
			it('with caption', () => {
				const wrapper = mount(editorRenderNode(new KinjaVideo('3279772',
					{ id: 'gkoszxli4iwxrvxaomts', format: 'jpg' },
					{ alignment: undefined, caption }
				), 0, { captionsEnabled: true }));
				expect(wrapper.getDOMNode()).toMatchSnapshot();
			});
		});
		it('DailyMotion', () => {
			const wrapper = mount(editorRenderNode(new DailyMotion('x44enl7', {
				id: 'ep4iblc3majmypvxbplf',
				format: 'jpg'
			}), 0, {}));
			expect(wrapper.getDOMNode()).toMatchSnapshot();
		});
		it('Ustream', () => {
			const wrapper = mount(editorRenderNode(new Ustream('84781321', {
				id: 'tvwixnozf8bjj19wbolp',
				format: 'jpg'
			}), 0, {}));
			expect(wrapper.getDOMNode()).toMatchSnapshot();
		});
		it('UstreamLive', () => {
			const wrapper = mount(editorRenderNode(new UstreamLive('1041782'), 0, {}));
			expect(wrapper.getDOMNode()).toMatchSnapshot();
		});
		it('Vine', () => {
			const wrapper = mount(editorRenderNode(new Vine('5WvdIEvMOap'), 0, {}));
			expect(wrapper.getDOMNode()).toMatchSnapshot();
		});
		it('Twitter', () => {
			const wrapper = mount(editorRenderNode(new Twitter('739490015772839936'), 0, {}));
			expect(wrapper.getDOMNode()).toMatchSnapshot();
		});
		it('Imgur', () => {
			const wrapper = mount(editorRenderNode(new Imgur('243598'), 0, {}));
			expect(wrapper.getDOMNode()).toMatchSnapshot();
		});
		it('Instagram', () => {
			const wrapper = mount(editorRenderNode(new Instagram('BInFir8jHbf'), 0, {}));
			expect(wrapper.getDOMNode()).toMatchSnapshot();
		});
		it('Mixcloud', () => {
			const wrapper = mount(editorRenderNode(new Mixcloud('https://www.mixcloud.com/dj-echo/echo-100/'), 0, {}));
			expect(wrapper.getDOMNode()).toMatchSnapshot();
		});
		it('Qzzr', () => {
			const wrapper = mount(editorRenderNode(new Qzzr('165300', null, {
				height: 500
			}), 0, {}));
			expect(wrapper.getDOMNode()).toMatchSnapshot();
		});
		it('Megaphone', () => {
			const wrapper = mount(editorRenderNode(new Megaphone('DMO8510552889'), 0, {}));
			expect(wrapper.getDOMNode()).toMatchSnapshot();
		});
		it('Waywire', () => {
			const wrapper = mount(editorRenderNode(new Waywire('W265Z105JY8H0V1G', {
				id: 'ruplt40wtxxw5uqb0ycy',
				format: 'jpg'
			}, {
				alignment: 'Bleed'
			}), 0, {}));
			expect(wrapper.getDOMNode()).toMatchSnapshot();
		});
		it('Ooyala', () => {
			const wrapper = mount(editorRenderNode(new Ooyala('hocDU4NzE62S9bTYEuXDBGbPRYLsE2yT', {
				id: 'Thumbnail_Not_Found_p0odsy',
				format: 'png'
			}, {
				alignment: 'Bleed',
				playerId: 'e94d1153704449a897d545a2af16e53c'
			}), 0, {}));
			expect(wrapper.getDOMNode()).toMatchSnapshot();
		});
	});
});
