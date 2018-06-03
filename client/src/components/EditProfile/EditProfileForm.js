import React from 'react';
import TextFieldGroup from '../UI/TextFieldGroup/TextFieldGroup';
import TextAreaFieldGroup from '../UI/TextAreaFieldGroup/TextAreaFieldGroup';
import SelectListGroup from '../UI/SelectListGroup/SelectListGroup';

const profileForm = (props) => {
    // Select options for status
    const options = [
        { label: '* Select Professional Status', value: 0 },
        { label: 'Developer', value: 'Developer' },
        { label: 'Junior Developer', value: 'Junior Developer' },
        { label: 'Senior Developer', value: 'Senior Developer' },
        { label: 'Manager', value: 'Manager' },
        { label: 'Student or Learning', value: 'Student or Learning' },
        { label: 'Instructor or Teacher', value: 'Instructor or Teacher' },
        { label: 'Intern', value: 'Intern' },
        { label: 'Other', value: 'Other' }
    ];

    return (
        <form onSubmit={props.onSubmitHandler}>
            <TextFieldGroup
                placeholder="* Profile Handle"
                name="handle"
                disabled="true"
                value={props.handle}
                onChange={props.onChangeHandler}
                error={props.errors.handle}
                info="A unique handle for your profile URL. One setted cannot be changed!"
            />
            <SelectListGroup
                placeholder="Status"
                name="status"
                value={props.status}
                onChange={props.onChangeHandler}
                options={options}
                error={props.errors.status}
                info="Give us an idea of where you are at in your career"
            />
            <TextFieldGroup
                placeholder="Company"
                name="company"
                value={props.company}
                onChange={props.onChangeHandler}
                error={props.errors.company}
                info="Could be your own company or one you work for"
            />
            <TextFieldGroup
                placeholder="Website"
                name="website"
                value={props.website}
                onChange={props.onChangeHandler}
                error={props.errors.website}
                info="Could be your own website or a company one"
            />
            <TextFieldGroup
                placeholder="Location"
                name="location"
                value={props.location}
                onChange={props.onChangeHandler}
                error={props.errors.location}
                info="City or city & state suggested (eg. Boston, MA)"
            />
            <TextFieldGroup
                placeholder="* Skills"
                name="skills"
                value={props.skills}
                onChange={props.onChangeHandler}
                error={props.errors.skills}
                info="Please use comma separated values (eg.
                HTML,CSS,JavaScript,PHP)"
            />
            <TextFieldGroup
                placeholder="Github Username"
                name="githubusername"
                value={props.githubusername}
                onChange={props.onChangeHandler}
                error={props.errors.githubusername}
                info="If you want your latest repos and a Github link, include your username"
            />
            <TextAreaFieldGroup
                placeholder="Short Bio"
                name="bio"
                value={props.bio}
                onChange={props.onChangeHandler}
                error={props.errors.bio}
                info="Tell us a little about yourself"
            />

            <div className="mb-3">
            <button
                type="button"
                onClick={props.toggleSocialInputs}
                className="btn btn-light"
            >
                Add Social Network Links
            </button>
                <span className="text-muted">Optional</span>
            </div>
                {props.socialInputs}
            <input
                type="submit"
                value="Submit"
                className="btn btn-info btn-block mt-4"
            />
      </form>
    );
}

export default profileForm;