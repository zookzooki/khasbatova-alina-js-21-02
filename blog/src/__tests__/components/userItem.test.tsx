import React from 'react';
import { shallow } from 'enzyme';
import UserItem from '../../components/UserItem/UserItem';

describe('Comment component test', () => {
    test('should render comment', () => {
        const wrapper = shallow(<UserItem />);
        expect(wrapper.find('div.user')).toHaveLength(1);
    });

    test('should render info', () => {
        const firstName = 'Andreas';
        const lastName = 'Valent';
        const title = 'mr';
        const picture = 'https://randomuser.me/api/portraits/women/58.jpg';
        const wrapper = shallow(<UserItem
            firstName={firstName}
            lastName={lastName}
            picture={picture}
            title={title}
        />);
        expect(wrapper.find('div.user__picture').find('img').prop('src')).toBe(picture);
        expect(wrapper.find('p.user__name').text()).toBe(`${title} ${firstName} ${lastName}`);
    });
});
