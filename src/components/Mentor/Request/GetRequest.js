
import React, { useState, useEffect } from "react";
import { Link, NavLink } from 'react-router-dom'
import Modal from "../../Modal";
import ModalRequest from "./ModalRequest";



export default function GetRequest(props) {
    const [show, setShow] = useState(false);
    console.log(2909, props)
    function showModal() {

        setShow(true);

    };
    function hideModal() {
        setShow(false);
    };
    useEffect(() => {
        if (!show) {

        }
    }, [show])
   
    
   
    return (
        <tbody className="text-left h-16 ">
            {props?.requestList?.rows?.map((request, index) => {
                return (
                    <tr className="h-16 border-b-2 border-gray-200 " key={index}>
                        <td className="pl-8">  {index + 1}</td>
                        <td>{request.studentID}</td>
                        <td className="">
                        {props?.subject?.map(subjectName => {
                           if(subjectName?.id == request?.subjectID){
                            return (subjectName.name)
                           }
                          
                        })}
                      
                        </td>
                        <td className="">{request?.startTime?.slice(11, 16)} to {request?.endTime?.slice(11, 16)}</td>
                        <td className="">{request?.startTime?.slice(8, 10)}/{request?.startTime?.slice(5, 7)}/{request?.startTime?.slice(0,4)}</td>
                        <td className="  ">
                            <button type="button" className="font-bold" onClick={() => showModal()}>
                                Edit
                            </button>
                        </td>

                    </tr>
                )
            })}

            <Modal show={show} handleClose={hideModal} className="mb-5">
                <ModalRequest  />
            </Modal>
        </tbody>

    );
}
