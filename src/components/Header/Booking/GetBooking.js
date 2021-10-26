import React, { Fragment } from "react"

function GetBooking (props){
    console.log("viewwwwwww", props)
return( 
   <Fragment>
    {props?.view?.map(  (bookinglist, index) => {
        return(
            <tr className="h-16 " key={index}>
            <td className="pl-4 text-left">{index}</td>
            <td className="pl-4 text-left">{props?.mentor?.map(mentorname => {
                if(bookinglist?.id == mentorname.id ){
                    return mentorname.fullName
                } 
            })}</td>
            <td className="text-left  pl-4  "></td>
            <td className="pl-4 text-left  ">   </td>
            <td className="pl-4 text-left"> </td>
            
        </tr>
        )

    })}
   </Fragment   >
  

)
}
export default GetBooking