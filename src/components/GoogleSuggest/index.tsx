import React, {Component} from "react"
import ReactGoogleMapLoader from "react-google-maps-loader"
import ReactGooglePlacesSuggest from "react-google-places-suggest"
import { preprocessCSS } from "vite"

import './index.css'

const MY_API_KEY = "AIzaSyB7YL4z-L-sgk9-qp9iYxiv7br-ITaU9zI" // fake

interface GoogleSuggestInterface{
    onSelect: (geoLocation) => void
}

export default class GoogleSuggest extends React.Component<GoogleSuggestInterface>{
    state = {
        search: "",
        value: "",
    }

    handleInputChange = e => {
        this.setState({search: e.target.value, value: e.target.value})
    }

    handleSelectSuggest = (geocodedPrediction, originalPrediction) => {
        this.props.onSelect(geocodedPrediction)
        this.setState({
            search: "",
            value: geocodedPrediction.formatted_address,
        })
    }

    handleNoResult = () => {
    }

    handleStatusUpdate = status => {
    }

    findTitle = (prediction) => {
        if(!prediction) return "Nenhum resultado"
        if(prediction.terms && prediction.terms.length == 1){
            return `${prediction.terms[0].value}`
        }else if(prediction.terms && prediction.terms.length == 2){
            return `${prediction.terms[0].value}`
        }
        if(prediction.terms && prediction.terms.length == 3){
            return `${prediction.terms[0].value}, ${prediction.terms[1].value}`
        }else if(prediction.terms && prediction.terms.length == 5){
            return `${prediction.terms[0].value}, ${prediction.terms[1].value}`
        }else if(prediction.terms && prediction.terms.length == 6){
            return `${prediction.terms[0].value}, ${prediction.terms[1].value}`
        }
        return prediction.description;
    }

    findDesc = (prediction) => {
        if(!prediction) return "Nenhum resultado"
        if(prediction.terms && prediction.terms.length == 1){
            return `${prediction.terms[0].value}`
        }else if(prediction.terms && prediction.terms.length == 2){
            return `${prediction.terms[1].value}`
        }
        if(prediction.terms && prediction.terms.length == 3){
            return `${prediction.terms[2].value}`
        }else if(prediction.terms && prediction.terms.length == 5){
            return `${prediction.terms[2].value}, ${prediction.terms[3].value}, ${prediction.terms[4].value}`
        }else if(prediction.terms && prediction.terms.length == 6){
            return `${prediction.terms[2].value}, ${prediction.terms[3].value}, ${prediction.terms[4].value}, ${prediction.terms[5].value}`
        }
        return prediction.description;
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
                            customRender={prediction => {
                                return (
                                    <div className="locationWrapper">
                                        <div className="locationIcon">
                                        <svg width="16px" height="16px" viewBox="0 0 49 48" xmlns="http://www.w3.org/2000/svg"><g stroke="none" strokeWidth="1" fill="none" fillRule="evenodd"><g transform="translate(-431.000000, -240.000000)" fill="#3F3E3E" fillRule="nonzero"><g transform="translate(48.000000, 171.000000)"><g transform="translate(383.000000, 69.000000)"><path d="M40,21 C40,12.7157288 33.2842712,6 25,6 C16.7157288,6 10,12.7157288 10,21 C10,27.4044925 14.8794903,34.2357807 25,41.3612474 C35.1205097,34.2357807 40,27.4044925 40,21 Z M25,45 C13,36.9607503 7,28.9607503 7,21 C7,11.0588745 15.0588745,3 25,3 C34.9411255,3 43,11.0588745 43,21 C43,28.9607503 37,36.9607503 25,45 Z"></path><path d="M25,26 C27.7614237,26 30,23.7614237 30,21 C30,18.2385763 27.7614237,16 25,16 C22.2385763,16 20,18.2385763 20,21 C20,23.7614237 22.2385763,26 25,26 Z M25,29 C20.581722,29 17,25.418278 17,21 C17,16.581722 20.581722,13 25,13 C29.418278,13 33,16.581722 33,21 C33,25.418278 29.418278,29 25,29 Z" id="Oval"></path></g></g></g></g></svg></div>
                                        <div className="locationInfo">
                                            <div style={{fontWeight: 600}}>{this.findTitle(prediction)}</div>
                                            <div>{this.findDesc(prediction)}</div>
                                        </div>
                                    </div>
                                )
                            }}
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