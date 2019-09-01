import React from 'react';
import {configure, shallow} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import Calculator from './Calculator';
import Button from '../../Components/Button/Button';
import Display from '../../Components/Display/Display';

configure({adapter: new Adapter()});

describe('<Calculator/>', () => {
    let wrapper;
    beforeEach(() => {
        wrapper = shallow(<Calculator/>);
    })

    it('should render 19 <Button/> components.', () => {        
        expect(wrapper.find(Button)).toHaveLength(19);
    });

    it('should render <Display/> components.', () => {        
        expect(wrapper.contains(<Display value='0'/>)).toEqual(true);
    });
});