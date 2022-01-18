import * as React from 'react';
import { mount } from 'enzyme';

import { EnsureDefaultTheme } from 'kinja-components/components/theme';
import webRenderNode from './web-render-node';

import {
	LinkNode,
	TextNode
} from 'postbody/InlineNode';
import DailyMotion from 'postbody/blockNodes/DailyMotion';
import DeletedEmbed from 'postbody/blockNodes/DeletedEmbed';
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

const logger = console;

const caption = [
	new TextNode('ICE COLD! ('),
	new LinkNode([new TextNode('Flickr: Ben')], 'https://example.com'),
	new TextNode(')')
];

const renderWithTheme = node => (
	<EnsureDefaultTheme>
		{webRenderNode(node, 0, {})}
	</EnsureDefaultTheme>
);

describe('webRenderNode', () => {
	describe('embeds', () => {
		it('Soundcloud', () => {
			const wrapper = mount(webRenderNode(new SoundCloud('220076771'), 0, {}));
			expect(wrapper.getDOMNode()).toMatchSnapshot();
		});
		it('Soundcloud playlist', () => {
			const wrapper = mount(webRenderNode(new SoundCloudPlaylist('40033455'), 0, {}));
			expect(wrapper.getDOMNode()).toMatchSnapshot();
		});
		it('Facebook', () => {
			const wrapper = mount(webRenderNode(new Facebook('10153915420718967'), 0, {}));
			expect(wrapper.getDOMNode()).toMatchSnapshot();
		});
		describe('Youtube', () => {
			const youtubeVideo_id = '1Y1ya-yF35g';
			const youtubeVideo_thumbnail = {
				id: 'bf8kw10mbuxnux7ttolf',
				format: 'jpg'
			};
			it('should render to embed with specified start time', () => {
				const wrapper = mount(webRenderNode(
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
				const wrapper = mount(webRenderNode(
					new YoutubeVideo(
						youtubeVideo_id,
						youtubeVideo_thumbnail,
						{
							alignment: a
						}
					), 0, {}
				));
				expect(wrapper.find('.embed-frame')).toHaveClassName(`align--${a.toLowerCase()}`);
			}));
			it('should render to embed with the expected caption', () => {
				const wrapper = mount(webRenderNode(
					new YoutubeVideo(
						youtubeVideo_id,
						youtubeVideo_thumbnail,
						{ caption }
					), 0, { captionsEnabled: true }
				));
				expect(wrapper.getDOMNode()).toMatchSnapshot();
			});
		});
		describe('YoutubePlaylist', () => {
			it('with initial video', () => {
				const wrapper = mount(webRenderNode(
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
			it('without initial video', () => {
				const wrapper = mount(webRenderNode(
					new YoutubePlaylist('RDndXwTPAFjSU', {
						id: 'zvwm06tma1hyehmettpd',
						format: 'jpg'
					}, {
						start: 0
					}), 0, { captionsEnabled: true }
				));
				expect(wrapper.getDOMNode()).toMatchSnapshot();
			});
		});
		it('Tumblr', () => {
			const wrapper = mount(webRenderNode(new Tumblr('gazs', '147955529854'), 0, {}));
			expect(wrapper.getDOMNode()).toMatchSnapshot();
		});
		it('Typeform', () => {
			const wrapper = mount(webRenderNode(new Typeform('clickhole', 'Zh9XTz'), 0, {}));
			expect(wrapper.getDOMNode()).toMatchSnapshot();
		});
		it('TwitchVideo', () => {
			const wrapper = mount(webRenderNode(new TwitchVideo('69248712'), 0, {}));
			expect(wrapper.getDOMNode()).toMatchSnapshot();
		});
		it('TwitchStream', () => {
			const wrapper = mount(webRenderNode(new TwitchStream('gosugamers'), 0, {}));
			expect(wrapper.getDOMNode()).toMatchSnapshot();
		});
		it('Viddler', () => {
			const wrapper = mount(webRenderNode(new Viddler('e5b3acca'), 0, {}));
			expect(wrapper.getDOMNode()).toMatchSnapshot();
		});
		it('Vimeo', () => {
			const wrapper = mount(webRenderNode(new Vimeo('159069175', {
				id: 'eydjkgrhuxwb76jhjcgl',
				format: 'jpg'
			}), 0, {}));
			expect(wrapper.getDOMNode()).toMatchSnapshot();
		});
		describe('KinjaVideo', () => {
			it('no caption', () => {
				const wrapper = mount(webRenderNode(new KinjaVideo('172249', {
					id: 'gkoszxli4iwxrvxaomts',
					format: 'jpg'
				}, { alignment: undefined }), 0, {
					postId: '342423423',
					sponsored: true,
					embeddedVideos: [{
						'id': '172249',
						'poster': {
							'id': 'buhpuqrq85wectdvzysp',
							'format': 'jpg'
						}
					}]
				}, logger));
				expect(wrapper.getDOMNode()).toMatchSnapshot();
			});
			it('with caption', () => {
				const wrapper = mount(webRenderNode(new KinjaVideo('172249',
					{ id: 'gkoszxli4iwxrvxaomts', format: 'jpg' },
					{ alignment: undefined, caption }
				), 0, {
					captionsEnabled: true,
					postId: '342423423',
					sponsored: true,
					embeddedVideos: [{
						'id': '172249',
						'poster': {
							'id': 'buhpuqrq85wectdvzysp',
							'format': 'jpg'
						}
					}]
				}, logger));
				expect(wrapper.getDOMNode()).toMatchSnapshot();
			});
		});
		it('DailyMotion', () => {
			const wrapper = mount(webRenderNode(new DailyMotion('x44enl7', {
				id: 'ep4iblc3majmypvxbplf',
				format: 'jpg'
			}), 0, {}));
			expect(wrapper.getDOMNode()).toMatchSnapshot();
		});
		it('Ustream', () => {
			const wrapper = mount(webRenderNode(new Ustream('84781321', {
				id: 'tvwixnozf8bjj19wbolp',
				format: 'jpg'
			}), 0, {}));
			expect(wrapper.getDOMNode()).toMatchSnapshot();
		});
		it('UstreamLive', () => {
			const wrapper = mount(webRenderNode(new UstreamLive('1041782'), 0, {}));
			expect(wrapper.getDOMNode()).toMatchSnapshot();
		});
		it('Vine', () => {
			const wrapper = mount(webRenderNode(new Vine('5WvdIEvMOap'), 0, {}));
			expect(wrapper.getDOMNode()).toMatchSnapshot();
		});
		it('Twitter', () => {
			const wrapper = mount(webRenderNode(new Twitter('739490015772839936'), 0, {}));
			expect(wrapper.getDOMNode()).toMatchSnapshot();
		});
		it('Imgur', () => {
			const wrapper = mount(webRenderNode(new Imgur('243598'), 0, {}));
			expect(wrapper.getDOMNode()).toMatchSnapshot();
		});
		it('Instagram', () => {
			const wrapper = mount(webRenderNode(new Instagram('BInFir8jHbf'), 0, {}));
			expect(wrapper.getDOMNode()).toMatchSnapshot();
		});
		it('Mixcloud', () => {
			const wrapper = mount(webRenderNode(new Mixcloud('https://www.mixcloud.com/dj-echo/echo-100/'), 0, {}));
			expect(wrapper.getDOMNode()).toMatchSnapshot();
		});
		it('Qzzr', () => {
			const wrapper = mount(webRenderNode(new Qzzr('165300', null, {
				height: 500
			}), 0, {}));
			expect(wrapper.getDOMNode()).toMatchSnapshot();
		});
		it('Megaphone', () => {
			const wrapper = mount(webRenderNode(new Megaphone('DMO8510552889'), 0, {}));
			expect(wrapper.getDOMNode()).toMatchSnapshot();
		});
		it('Waywire', () => {
			const wrapper = mount(webRenderNode(new Waywire('W265Z105JY8H0V1G', {
				id: 'ruplt40wtxxw5uqb0ycy',
				format: 'jpg'
			}, {
				alignment: 'Bleed'
			}), 0, {}));
			expect(wrapper.getDOMNode()).toMatchSnapshot();
		});
		it('Ooyala', () => {
			const wrapper = mount(webRenderNode(new Ooyala('hocDU4NzE62S9bTYEuXDBGbPRYLsE2yT', {
				id: 'Thumbnail_Not_Found_p0odsy',
				format: 'png'
			}, {
				alignment: 'Bleed',
				playerId: 'e94d1153704449a897d545a2af16e53c'
			}), 0, {}));
			expect(wrapper.getDOMNode()).toMatchSnapshot();
		});
		describe('DeletedEmbed', () => {
			it('storify inside', () => {
				const wrapper = mount(webRenderNode(new DeletedEmbed(
					{
						type: 'Storify'
					}
				), 0, {}));
				expect(wrapper.getDOMNode()).toMatchSnapshot();
			});
			it('Image inside', () => {
				const wrapper = mount(renderWithTheme(new DeletedEmbed(
					{
						format: 'jpg',
						width: 458,
						id: 'kxyulp7kfpcnfd6pztxp',
						type: 'Image',
						alignment: 'Center',
						height: 547
					}
				)));
				expect(wrapper.getDOMNode()).toMatchSnapshot();
			});
			it('Intel Pentium Inside', () => {
				const wrapper = mount(webRenderNode(new DeletedEmbed(
					{
						type: 'Intel Pentium'
					}
				), 0, {}));
				expect(wrapper.getDOMNode()).toMatchSnapshot();
			});
		});
	});
});
