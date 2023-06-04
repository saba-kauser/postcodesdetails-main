import React, { useEffect, useState } from "react";
import { useLocation,useNavigate} from "react-router-dom";

import { getNearestPostCodes, getPostCodes,postcodeValidation } from '../postcodeAPI/postcodeAPI'

function DisplayPostCodes(props) {

    const [postCodeResult,setPostCodeResult]=useState({});
    const [nearestPostCode,setNearestPostCode]=useState([]);
    const location=useLocation()
    const navigate=useNavigate()

    useEffect(()=>{
        const postcode=location.pathname.substring(1)
         const requestPostcodeData=async(postcode)=>{
            const postcodeIsValid=await postcodeValidation(postcode)
            if (postcodeIsValid.result === true) {
                const postcodes = await getPostCodes(postcode);
                if(postcodes.status===200){
                    setPostCodeResult({
                            postcode: postcodes.result.postcode,
                            country: postcodes.result.country,
                            region: postcodes.result.region,
                    })
                }
                else{
                    props.errorMessage('Please enter a postcode that is valid')  
                }
                const nearestpostcodes = await getNearestPostCodes(postcode);
                if(postcodes.status===200){
                    const structuredPostCodes = nearestpostcodes.result.map((result) => {
                        return {
                          postcode: result.postcode,
                          country: result.country,
                          region: result.region,
                        };
                      });
                      setNearestPostCode(structuredPostCodes);
                }
                else{
                    props.errorMessage('Please enter a postcode that is valid') 
                }
                props.errorMessage('')
             }  
             else{
                props.errorMessage('Please enter a postcode that is valid')  
                setPostCodeResult({})
                setNearestPostCode([])
                navigate('/')
             }
        }
        if (postcode) {
            requestPostcodeData(postcode);
        }
        else{
            setPostCodeResult({})
            setNearestPostCode([])
        }
    },[location,props,navigate])

return(
        <div>
            <div className='postcoderesults'>
              <h3 className="bg-light mt-3">Postcode Details</h3>
              <h6>Country: <span className='resultValue text-success'>{postCodeResult.country}</span></h6>
              <h6>Region: <span className='resultValue text-success'>{postCodeResult.region}</span></h6>
            </div>

            <div>
              <h3 className="bg-light">Nearest Postcode Details </h3>
                <table className="table table-striped bg-grey">
                        <thead> 
                            <tr>
                            <th scope="col">Postcode</th>
                            <th scope="col">Country</th>
                            <th scope="col">Region</th>
                            </tr>
                        </thead>
                        <tbody>
                            {nearestPostCode.map((result, i) => {
                            return (
                                <tr key={i}>
                                <th scope="row">{result.postcode}</th>
                                <td>{result.country}</td>
                                <td>{result.region}</td>
                            </tr>
                            )
                            })}
                        </tbody>
                </table>
            </div>
      </div>
    )
}

export default DisplayPostCodes;
