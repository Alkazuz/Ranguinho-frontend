import React, {Component} from "react"
import ReactGoogleMapLoader from "react-google-maps-loader"
import ReactGooglePlacesSuggest from "react-google-places-suggest"

import './index.css'

const MY_API_KEY = "AIzaSyB7YL4z-L-sgk9-qp9iYxiv7br-ITaU9zI" // fake
export default class GoogleSuggest extends React.Component {
    state = {
        search: "",
        value: "",
    }

    handleInputChange = e => {
        this.setState({search: e.target.value, value: e.target.value})
    }

    handleSelectSuggest = (geocodedPrediction, originalPrediction) => {
        console.log(geocodedPrediction, originalPrediction) // eslint-disable-line
        this.setState({
            search: "",
            value: geocodedPrediction.formatted_address,
        })
    }

    handleNoResult = () => {
        console.log("No results for ", this.state.search)
    }

    handleStatusUpdate = status => {
        console.log(status)
    }

    render() {
        const {search, value} = this.state
        return (
            <ReactGoogleMapLoader
                params={{
                    key: MY_API_KEY,
                    libraries: "places,geocode",
                }}
                render={googleMaps =>
                    googleMaps && (
                        <ReactGooglePlacesSuggest
                            googleMaps={googleMaps}
                            autocompletionRequest={{
                                input: search,
                                // Optional options
                                // https://developers.google.com/maps/documentation/javascript/reference?hl=fr#AutocompletionRequest
                            }}
                            // Optional props
                            onNoResult={this.handleNoResult}
                            onSelectSuggest={this.handleSelectSuggest}
                            onStatusUpdate={this.handleStatusUpdate}    
                            textNoResults="Nenhum local encontrado" // null or "" if you want to disable the no results item
                            customRender={prediction => (
                                <div className="locationWrapper">
                                    {prediction
                                        ? prediction.description
                                        : "My custom no results text"}
                                </div>
                            )}
                        >
                            <input
                                type="text"
                                value={value}
                                placeholder="Buscar endereço e número"
                                onChange={this.handleInputChange}
                            />
                        </ReactGooglePlacesSuggest>
                    )
                }
            />
        )
    }
}