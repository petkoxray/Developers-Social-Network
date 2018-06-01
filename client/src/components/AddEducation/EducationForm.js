import React from 'react';
import TextFieldGroup from '../UI/TextFieldGroup/TextFieldGroup';
import TextAreaFieldGroup from '../UI/TextAreaFieldGroup/TextAreaFieldGroup';

const educationForm = (props) => {
    return (
        <form onSubmit={props.onSubmitHandle}>
            <TextFieldGroup
                placeholder="* School"
                name="school"
                value={props.school}
                onChange={props.onChangeHandle}
                error={props.errors.school}
            />
            <TextFieldGroup
                placeholder="* Degree or Certification"
                name="degree"
                value={props.degree}
                onChange={props.onChangeHandle}
                error={props.errors.degree}
            />
            <TextFieldGroup
                placeholder="* Field of Study"
                name="fieldofstudy"
                value={props.fieldofstudy}
                onChange={props.onChangeHandle}
                error={props.errors.fieldofstudy}
            />
            <h6>From Date</h6>
            <TextFieldGroup
                name="from"
                type="date"
                value={props.from}
                onChange={props.onChangeHandle}
                error={props.errors.from}
            />
            <h6>To Date</h6>
            <TextFieldGroup
                name="to"
                type="date"
                value={props.to}
                onChange={props.onChangeHandle}
                error={props.errors.to}
                disabled={props.disabled ? 'disabled' : ''}
            />
            <div className="form-check mb-4">
                <input
                    type="checkbox"
                    className="form-check-input"
                    name="current"
                    value={props.current}
                    checked={props.current}
                    onChange={props.onCheckHandle}
                    id="current"
                />
                <label htmlFor="current" className="form-check-label">
                    Current
                  </label>
            </div>
            <TextAreaFieldGroup
                placeholder="Program Description"
                name="description"
                value={props.description}
                onChange={props.onChangeHandle}
                error={props.errors.description}
                info="Tell us about the program that you were in"
            />
            <input
                type="submit"
                value="Submit"
                className="btn btn-info btn-block mt-4"
            />
        </form>
    );
}

export default educationForm;