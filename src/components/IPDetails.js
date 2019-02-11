import React, {Component} from 'react';
import PropTypes from 'prop-types';
import './Container.css' 

class IPDetails extends Component {
    render() {
        const { ipv4 } = this.props;
        const { country_name } = this.props;
        const { continent_name } = this.props;
        const { city_name } = this.props;
        const { subdivision_1_name } = this.props;
        const { subdivision_2_name } = this.props;
        const { latitude } = this.props;
        const { longitude } = this.props;

        return (
            <div>
                <div className="details">
                    <p>IP Address : {ipv4}</p>
                    <p>Country : {country_name}</p>
                    <p>Continent : {continent_name}</p>
                    <p>City : {city_name}</p>
                    <p>Subdivision_1_Name : {subdivision_1_name}</p>
                    <p>Subdivision_2_Name : {subdivision_2_name}</p>
                    <p>Latitude : {latitude}</p>
                    <p>Longitude : {longitude}</p>
                </div>
            </div>
        );
    };
};

IPDetails.propTypes = {
    ipv4: PropTypes.string.isRequired,
    country_name: PropTypes.string.isRequired,
    continent_name: PropTypes.string.isRequired,
    city_name: PropTypes.string.isRequired,
    subdivision_1_name: PropTypes.string.isRequired,
    subdivision_2_name: PropTypes.string.isRequired,
    latitude: PropTypes.string.isRequired,
    longitude: PropTypes.string.isRequired
};

export default IPDetails;