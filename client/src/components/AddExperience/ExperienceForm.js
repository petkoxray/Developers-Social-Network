import React from 'react';
import TextFieldGroup from '../UI/TextFieldGroup/TextFieldGroup';
import TextAreaFieldGroup from '../UI/TextAreaFieldGroup/TextAreaFieldGroup';

const experienceForm = (props) => {
    let { errors , onSubmitHandle, onChangeHandle, onCheckHandle} = props;

    return (
        <form onSubmit={onSubmitHandle}>
            <TextFieldGroup
                placeholder="* Company"
                name="company"
                value={props.company}
                onChange={onChangeHandle}
                error={errors.company}
            />
            <TextFieldGroup
                placeholder="* Job Title"
                name="title"
                value={props.title}
                onChange={onChangeHandle}
                error={errors.title}
            />
            <TextFieldGroup
                placeholder="Location"
                name="location"
                value={props.location}
                onChange={onChangeHandle}
                error={errors.location}
            />
            <h6>From Date</h6>
            <TextFieldGroup
                name="from"
                type="date"
                value={props.from}
                onChange={onChangeHandle}
                error={errors.from}
            />
            <h6>To Date</h6>
            <TextFieldGroup
                name="to"
                type="date"
                value={props.to}
                onChange={onChangeHandle}
                error={errors.to}
                disabled={props.disabled ? 'disabled' : ''}
            />
            <div className="form-check mb-4">
                <input
                    type="checkbox"
                    className="form-check-input"
                    name="current"
                    value={props.current}
                    checked={props.current}
                    onChange={onCheckHandle}
                    id="current"
                />
                <label htmlFor="current" className="form-check-label">
                    Current Job
          </label>
            </div>
            <TextAreaFieldGroup
                placeholder="Job Description"
                name="description"
                value={props.description}
                onChange={onChangeHandle}
                error={errors.description}
                info="Tell us about the the position"
            />
            <input
                type="submit"
                value="Submit"
                className="btn btn-info btn-block mt-4"
            />
        </form>
    );
}

export default experienceForm;