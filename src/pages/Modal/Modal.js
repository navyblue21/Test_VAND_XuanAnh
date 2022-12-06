import { useEffect, useState } from "react";
import { formatNumber } from "../../helper/functions";
import getDataFromApi from "../../https/axios";
import LoadingSpinner from "../Loading/Loading";

const ModalDetailCountries = (props) => {
    const { data } = props;
    const [state, setState] = useState({dataCountries: null, isLoadig: false});

    useEffect(() => {
        if(data){
            getDataCountries();
            return () => {
                // getDataCountries();
            }
        }
    }, [data])

    const handleCloseModal = () => {
        document.getElementById(`modaControutrieslDetail`).style.display = "none";
    }

    const getDataCountries = async () => {
        setState({dataCountries: null, isLoadig: true})
        await getDataFromApi('get', `https://restcountries.com/v3.1/alpha/${data?.CountryCode}`)
        .then(res=>{
            if(res){
                console.log(res,"res=======")
                setState({dataCountries: res?.data?.[0], isLoadig: false});
            }
        })
        .catch(err=>{
            console.log(err,"err====")
            setState({dataCountries: null, isLoadig: false});
        })
    };

    return <>
    
            
        <div id={`modaControutrieslDetail`} className="modal">
            <div className="modal-content">
                {
                    state?.isLoadig ? 
                    <LoadingSpinner/>
                    :

                    <div>
                        
                        <div className="d-flex justify-content-end mb-2">
                            <span className="close" onClick={handleCloseModal}>&times;</span>
                        </div>
                        <div className="row">
                            <div className="col-12 col-md-6">
                                <img src={`${state?.dataCountries?.flags?.png}`} className="m-auto img-flag"/>

                            </div>
                            <div className="col-12 col-md-6 m-auto">
                                <div className="row">
                                    <span className="col-6">Name:  </span>  <span className="col-6"><strong>{state?.dataCountries?.name ? state?.dataCountries?.name?.common : "---"}</strong></span>  
                                </div>
                                <div className="row">
                                    <span className="col-6">Population: </span> <span className="col-6"><strong>{formatNumber(state?.dataCountries?.population)}</strong></span>
                                </div>
                                <div className="row">
                                    <span className="col-6">Capital: </span> <span className="col-6"><strong>{state?.dataCountries?.capital ? state?.dataCountries?.capital?.map((item)=> item ).join(', ') : "---"}</strong></span>
                                </div>
                                <div className="row">
                                    <span className="col-6">Region: </span> <span className="col-6"><strong>{state?.dataCountries?.region ? state?.dataCountries?.region : "---"}</strong></span>
                                </div>
                                <div className="row">
                                    <span className="col-6">Subregion: </span> <span className="col-6"><strong>{state?.dataCountries?.subregion ? state?.dataCountries?.subregion : "---"}</strong></span>
                                </div>
                            </div>
                        </div>
                    </div>
                    
                }
            </div>
        </div>
    </>
};

export default ModalDetailCountries