import React from 'react';
import InputGroup from '../UI/InputGroup/InputGroup';

const socialInputs = (props) => {
    let { errors, onChangeHandler, twitter, youtube, facebook, linkedin, instagram } = props;

    return (
        <div>
            <InputGroup
                placeholder="Twitter Profile URL"
                name="twitter"
                icon="fab fa-twitter"
                value={twitter}
                onChange={onChangeHandler}
                error={errors.twitter}
            />

            <InputGroup
                placeholder="Facebook Page URL"
                name="facebook"
                icon="fab fa-facebook"
                value={facebook}
                onChange={onChangeHandler}
                error={errors.facebook}
            />

            <InputGroup
                placeholder="Linkedin Profile URL"
                name="linkedin"
                icon="fab fa-linkedin"
                value={linkedin}
                onChange={onChangeHandler}
                error={errors.linkedin}
            />

            <InputGroup
                placeholder="YouTube Channel URL"
                name="youtube"
                icon="fab fa-youtube"
                value={youtube}
                onChange={onChangeHandler}
                error={errors.youtube}
            />

            <InputGroup
                placeholder="Instagram Page URL"
                name="instagram"
                icon="fab fa-instagram"
                value={instagram}
                onChange={onChangeHandler}
                error={errors.instagram}
            />
        </div>
    );
}

export default socialInputs;