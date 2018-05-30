import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { createProfile } from '../../actions/profileActions';
import CreateProfileForm from './CreateProfileForm';
import SocialInputs from './SocialInputs';

class CreateProfilePage extends Component {
    constructor(props) {
        super(props);

        this.state = {
            displaySocialInputs: false,
            profileData: {
                handle: '',
                company: '',
                website: '',
                location: '',
                status: '',
                skills: '',
                githubusername: '',
                bio: '',
                twitter: '',
                facebook: '',
                linkedin: '',
                youtube: '',
                instagram: '',
            },
            errors: {}
        };

        this.onChangeHandler = this.onChangeHandler.bind(this);
        this.onSubmitHandler = this.onSubmitHandler.bind(this);
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.errors) {
            this.setState({ errors: nextProps.errors });
        }
    }

    onSubmitHandler(e) {
        e.preventDefault();

        const profileData = {
            ...this.state.profileData
        };

        this.props.createProfile(profileData, this.props.history);
    }

    onChangeHandler(e) {
        let profileData = Object.assign({}, this.state.profileData);
        profileData[e.target.name] = e.target.value;

        this.setState({ profileData: profileData });
    }

    render() {
        const { errors, displaySocialInputs } = this.state;

        let socialInputs;

        if (displaySocialInputs) {
            socialInputs = <SocialInputs
                onChangeHandler={this.onChangeHandler}
                errors={this.state.errors}
                {...this.state.profileData} />
        }

        return (
            <div className="create-profile">
                <div className="container">
                    <div className="row">
                        <div className="col-md-8 m-auto">
                            <h1 className="display-4 text-center">Create Your Profile</h1>
                            <p className="lead text-center">
                                Let's get some information to make your profile stand out
                             </p>
                            <small className="d-block pb-3">* = required fields</small>
                            <CreateProfileForm
                                errors={errors}
                                {...this.state.profileData}
                                socialInputs={socialInputs}
                                onChangeHandler={this.onChangeHandler}
                                onSubmitHandler={this.onSubmitHandler}
                                toggleSocialInputs={() => {
                                    this.setState(prevState => ({
                                        displaySocialInputs: !prevState.displaySocialInputs
                                    }));
                                }} />
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

CreateProfilePage.propTypes = {
    profile: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    profile: state.profile,
    errors: state.errors
});

export default connect(mapStateToProps, { createProfile })(CreateProfilePage);