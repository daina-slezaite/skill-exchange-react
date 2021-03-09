import axios from 'axios';
import React, { Component } from 'react';
import EditSkill from './EditSkill';
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';
import AddReview from '../reviews/AddReview';
import ReviewList from '../reviews/ReviewList';
import FavoriteButton from '../skills/FavoriteButton';
import './SingleSkill.scss';

export default class SingleSkill extends Component {

    constructor(props) {
        super(props);
        this.state = {
            displayContactDetails: false,
            contact: '',
            displayAllReviews: false,
            average: 0,
            reviews: [],
            heart: 'https://res.cloudinary.com/da6m0xppc/image/upload/v1615043364/heart_koddi2.svg',
            heartOutline: 'https://res.cloudinary.com/da6m0xppc/image/upload/v1615043585/heart-outline_dpyfsv.svg',
            favorites: [],
            oneStars: 0,
            twoStars: 0,
            threeStars: 0,
            fourStars: 0,
            fiveStars: 0
        }
    }

    getSingleSkill() {
        axios.get(`http://localhost:5000/api/skills/${this.props.match.params.skillId}`, {withCredentials: true})
            .then(response => {
                const fetchedSkill = response.data;
                this.setState(fetchedSkill);
                this.countAvg();
            })
            .catch(error => console.log(error))
    } 

    getUpdatedSkill(response) {
        axios.get(`http://localhost:5000/api/skills/${response.data._id}`, {withCredentials: true})
            .then(response => {
                const fetchedSkill = response.data;
                this.setState(fetchedSkill);
                this.countAvg();
            })
            .catch(error => console.log(error))
    } 

    componentDidMount() {
        this.getSingleSkill();
        {this.props.userInSession && this.getFavorites()}
    }

    displayContactInfo = () => {
        const skillId = this.state._id;
        const userId = this.state.user;

        if (this.props.userInSession) {
            axios.get(`http://localhost:5000/api/skills/${skillId}/${userId}`, {withCredentials: true})
            .then(response => {
                this.setState({
                    displayContactDetails: !this.state.displayContactDetails,
                    contact: response.data
                });
            })
            .catch(error => console.log(error));
        } else {
            this.props.history.push('/login');
        }
    }

    displayReviewList = () => {
        this.setState({displayAllReviews: !this.state.displayAllReviews})
    }

    displayAvg(response) {
        this.setState({average: response})
    }

    getAllReviews = () => {
        const skill = this.state._id;
        axios.get(`http://localhost:5000/api/${skill}/reviews`)
            .then(response => {
                this.setState({reviews: response.data});
            })
            .catch(error => console.log(error))
    }

    countAvg = () => {
        this.getAllReviews();
        const ratings = this.state.reviews.map(review => {
            return review.rating;
        });
        const ratingsAvg = +(ratings.reduce((a,b) => a + b, 0) / ratings.length).toFixed(2) || 'There are no reviews for this skill yet'
        let oneStar = ratings.filter(rating => rating === 1).length;
        let twoStar = ratings.filter(rating => rating === 2).length;
        let threeStar = ratings.filter(rating => rating === 3).length;
        let fourStar = ratings.filter(rating => rating === 4).length;
        let fiveStar = ratings.filter(rating => rating === 5).length;
        
        this.setState({
            average: ratingsAvg,
            oneStars: oneStar,
            twoStars: twoStar,
            threeStars: threeStar,
            fourStars: fourStar,
            fiveStars: fiveStar
        });
    }

    toggleFavorited = () => {
        this.state.favorites.includes(this.state._id) ? this.removeFromFavorites() : this.addToFavorites()
    }

    getFavorites = () => {
        axios.get('http://localhost:5000/api/my-profile', {withCredentials: true})
            .then(response => {
                this.setState({favorites: response.data.favoriteSkills})
            })
            .catch(error => console.log(error))
    }

    addToFavorites = () => {
        const skill = this.state._id;
        axios.post(`http://localhost:5000/api/skills/${this.state._id}/favorites`, {skill}, {withCredentials: true})
            .then(() => {
                this.getFavorites();
            })
            .catch(error => console.log(error))
    }

    removeFromFavorites = () => {
        axios.delete(`http://localhost:5000/api/skills/${this.state._id}/favorites`, {withCredentials: true})
            .then(response => {
                this.getFavorites();
            })
            .catch(error => console.log(error))
    }

    render() {
        return (
            <section id='skill-section'>
                <div className='column'>
                    <div className='skill-name'>
                        <h2>{this.state.title}</h2>
                        {this.props.userInSession && this.props.userInSession._id !== this.state.user && 
                        <FavoriteButton icon={this.state.favorites.includes(this.state._id) ? this.state.heart : this.state.heartOutline} click={this.toggleFavorited} />}
                    </div>
                    <p>{this.state.description}</p>
                    {this.props.userInSession && this.props.userInSession._id == this.state.user ?
                    <Popup trigger={<button> Edit my skill </button>} modal>
                        <EditSkill currentSkill={this.state} refreshSkill={(response) => this.getUpdatedSkill(response)} />
                    </Popup>
                    :
                    <button onClick={this.displayContactInfo}>Swap</button>
                    }
                    {this.state.displayContactDetails &&
                    <React.Fragment>
                        <p>{this.state.contact.username}</p>
                        <p>{this.state.contact.email}</p>
                        <p>{this.state.contact.description}</p>
                    </React.Fragment>}
                </div>
                {/* { this.state.imageUrl && <img src={this.state.imageUrl} alt={this.state.title} /> } */}
                <div className='column'>

                {this.state.reviews.length > 0 &&
                <div className='rating-card'>
                    <h2>Skill ratings</h2>
                    <p>{this.state.average} average based on {this.state.reviews.length} reviews</p>
                    <hr />
                    <div className="row">
                        <div className="side">
                            <div>5 star</div>
                        </div>
                        <div className="middle">
                            <div className="bar-container">
                            <div className="bar-5" style={{'width': ((this.state.fiveStars / this.state.reviews.length) * 100 + '%') || '0%'}}></div>
                            </div>
                        </div>
                        <div className="side right">
                            <div>{this.state.fiveStars || 0}</div>
                        </div>
                        <div className="side">
                            <div>4 star</div>
                        </div>
                        <div className="middle">
                            <div className="bar-container">
                            <div className="bar-4" style={{'width': ((this.state.fourStars / this.state.reviews.length) * 100 + '%') || '0%'}}></div>
                            </div>
                        </div>
                        <div className="side right">
                            <div>{this.state.fourStars || 0}</div>
                        </div>
                        <div className="side">
                            <div>3 star</div>
                        </div>
                        <div className="middle">
                            <div className="bar-container">
                            <div className="bar-3" style={{'width': ((this.state.threeStars / this.state.reviews.length) * 100 + '%') || '0%'}}></div>
                            </div>
                        </div>
                        <div className="side right">
                            <div>{this.state.threeStars || 0}</div>
                        </div>
                        <div className="side">
                            <div>2 star</div>
                        </div>
                        <div className="middle">
                            <div className="bar-container">
                            <div className="bar-2" style={{'width': ((this.state.twoStars / this.state.reviews.length) * 100 + '%') || '0%'}}></div>
                            </div>
                        </div>
                        <div className="side right">
                            <div>{this.state.twoStars || 0}</div>
                        </div>
                        <div className="side">
                            <div>1 star</div>
                        </div>
                        <div className="middle">
                            <div className="bar-container">
                            <div className="bar-1" style={{width: ((this.state.oneStars / this.state.reviews.length) * 100 + '%') || '0%'}}></div>
                            </div>
                        </div>
                        <div className="side right">
                            <div>{this.state.oneStars || 0}</div>
                        </div>
                    </div>
                        
                    <button onClick={this.displayReviewList}>See all reviews</button>
                    {this.props.userInSession && this.props.userInSession._id !== this.state.user &&
                    <React.Fragment>
                        <AddReview skill={this.state._id} updateSkill={response => {this.getUpdatedSkill(response)}}/>
                    </React.Fragment>}
                </div>
                }
                {this.state.displayAllReviews &&
                    <React.Fragment>
                        <ReviewList allReviews={this.state.reviews} skill={this.state._id} />
                    </React.Fragment>
                }
                </div>
            </section>
        )
    }
}
