import React from 'react';
import { shallow } from 'enzyme';
import { Avatar } from 'antd';
import CommentItem from '../../components/CommentItem/CommentItem';

describe('Comment component test', () => {
    test('should render comment', () => {
        const wrapper = shallow(<CommentItem />);
        expect(wrapper.find('div.comment')).toHaveLength(1);
    });

    test('should render info', () => {
        const firstName = 'Andreas';
        const lastName = 'Valent';
        const title = 'mr';
        const message = 'Text';
        const publishDate = "2020-05-24T14:53:17.598Z";
        const picture = 'https://randomuser.me/api/portraits/women/58.jpg';
        const wrapper = shallow(<CommentItem
            firstName={firstName}
            lastName={lastName}
            picture={picture}
            title={title}
            publishDate={publishDate}
            message={message}
        />);
        expect(wrapper.find('div.avatar').find(Avatar).prop('src')).toBe(picture);
        expect(wrapper.find('p.owner_info').text()).toBe(`${title} ${firstName} ${lastName}`);
        expect(wrapper.find('p.publish_date').text()).toBe("24.05.2020 17:53");
        expect(wrapper.find('p.text').text()).toBe(message);
    });
});
