import { shallow } from 'enzyme';
import assert from 'assert';
import React from 'react';

import PhoneInput, { parseInput } from './PhoneInput';

describe('parseInput', () => {
    it('should return undefined if no params', () => {
        const res = parseInput();
        assert.equal(res, '');
    });

    it('should return +33 if first number is a 0', () => {
        let number = '01';
        assert.equal(parseInput(number), '+33 1');
        number = '0123456';
        assert.equal(parseInput(number), '+33 1 23 45 6');
        number = '0123456789';
        assert.equal(parseInput(number), '+33 1 23 45 67 89');
    });

    it('should works properly with french numbers', () => {
        const number = '+33123456789';
        assert.equal(parseInput(number), '+33 1 23 45 67 89');
    });

    it('should works properly with space in number', () => {
        const number = '+33 1 23 45 67 89';
        assert.equal(parseInput(number), '+33 1 23 45 67 89');
    });

    it('should works properly with international numbers', () => {
        const number = '+16542346543';
        assert.equal(parseInput(number), '+1 654 234 6543');
    });
});

describe('PhoneInput', () => {
    it('should use a Field', () => {
        const wrapper = shallow(<PhoneInput source="foo" />);
        const Input = wrapper.find('Field');
        assert.equal(Input.length, 1);
        assert.equal(Input.prop('name'), 'foo');
    });
});
