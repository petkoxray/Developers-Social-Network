import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import EditProfileForm from './EditProfileForm';
import SocialInputs from '../CreateProfile/SocialInputs';
import { createProfile, getCurrentProfile } from '../../actions/profileActions';
import isEmpty from '../../utils/is-empty';

class EditProfilePage extends Component {
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

    componentDidMount() {
        this.props.getCurrentProfile();
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.errors) {
            this.setState({ errors: nextProps.errors });
        }

        if (nextProps.profile.profile) {
            if (nextProps.profile.profile) {
                const profile = nextProps.profile.profile;

                // Bring skills array back to CSV
                const skillsCSV = profile.skills.join(',');

                // If profile field doesnt exist, make empty string
                profile.company = !isEmpty(profile.company) ? profile.company : '';
                profile.website = !isEmpty(profile.website) ? profile.website : '';
                profile.location = !isEmpty(profile.location) ? profile.location : '';
                profile.githubusername = !isEmpty(profile.githubusername)
                    ? profile.githubusername
                    : '';
                profile.bio = !isEmpty(profile.bio) ? profile.bio : '';
                profile.social = !isEmpty(profile.social) ? profile.social : {};
                profile.twitter = !isEmpty(profile.social.twitter)
                    ? profile.social.twitter
                    : '';
                profile.facebook = !isEmpty(profile.social.facebook)
                    ? profile.social.facebook
                    : '';
                profile.linkedin = !isEmpty(profile.social.linkedin)
                    ? profile.social.linkedin
                    : '';
                profile.youtube = !isEmpty(profile.social.youtube)
                    ? profile.social.youtube
                    : '';
                profile.instagram = !isEmpty(profile.social.instagram)
                    ? profile.social.instagram
                    : '';

                // Set component fields state
                this.setState({ profileData: { ...profile, skills: skillsCSV } });
            }
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
                            <Link to="/dashboard" className="btn btn-light">
                                Go Back
                            </Link>
                            <h1 className="display-4 text-center">Edit Your Profile</h1>
                            <p className="lead text-center">
                                Let's get some information to make your profile stand out
                             </p>
                            <small className="d-block pb-3">* = required fields</small>
                            <EditProfileForm
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

EditProfilePage.propTypes = {
    createProfile: PropTypes.func.isRequired,
    getCurrentProfile: PropTypes.func.isRequired,
    profile: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    profile: state.profile,
    errors: state.errors
});

export default connect(mapStateToProps, { createProfile, getCurrentProfile })(EditProfilePage);