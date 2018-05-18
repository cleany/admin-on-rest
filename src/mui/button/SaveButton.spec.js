import assert from 'assert';
import { shallow } from 'enzyme';
import React from 'react';
import sinon from 'sinon';

import { SaveButton } from './SaveButton';

const translate = label => label;

describe('<SaveButton />', () => {
    it('should render without error', () => {
        const wrapper = shallow(<SaveButton translate={translate} />);

        assert.equal(wrapper.type().muiName, 'FlatButton');
    });

    it('should render as submit type when submitOnEnter is true', () => {
        const wrapper = shallow(
            <SaveButton submitOnEnter={true} translate={translate} />
        );

        assert.equal(wrapper.prop('type'), 'submit');
    });

    it('should render as button type when submitOnEnter is false', () => {
        const wrapper = shallow(
            <SaveButton submitOnEnter={false} translate={translate} />
        );

        assert.equal(wrapper.prop('type'), 'button');
    });

    it('should trigger submit action when clicked if no saving is in progress', () => {
        const onSubmit = sinon.spy();
        const wrapper = shallow(
            <SaveButton
                translate={translate}
                handleSubmitWithRedirect={() => onSubmit}
                saving={false}
            />
        );

        wrapper.simulate('click');
        assert(onSubmit.calledOnce);
        wrapper.simulate('click');
        assert(onSubmit.calledTwice);
    });

    it('should not trigger submit action when clicked if saving is in progress', () => {
        const onSubmit = sinon.spy();
        const event = { preventDefault: sinon.spy() };
        const wrapper = shallow(
            <SaveButton
                translate={translate}
                handleSubmitWithRedirect={() => onSubmit}
                saving={true}
            />
        );

        wrapper.simulate('click', event);
        assert(event.preventDefault.calledOnce);
        wrapper.simulate('click', event);
        assert(event.preventDefault.calledTwice);

        assert(onSubmit.notCalled);
    });
});
