import React, { Component, useState, useEffect, useContext } from "react";
import { Link, NavLink } from 'react-router-dom'
import Modal from "../../Modal";
import Logo from '../../image/logo.png'
import Select from "react-select";

export default function ModalBooking(props) {
    const [studentID, setStudentID] = useState("");
    let body = {
        subjectID: props.subjectID,
        studentID: studentID
    }
    async function booking() {
        const res = await fetch(`http://118.69.123.51:5000/test/api/appointment/booking?appointmentID=${props?.booking.map(id => (id.id))}`, {
            method: `PUT`,
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('user-token')}`,
            },
            body: JSON.stringify(body)

        }).then(res => res.json())
            .then(result => {

                if (result?.resultCode === 1) {

                    alert("dat lich thanh cong")
                } else {
                    alert("update thất bại")
                }
                return res
            })
            .catch((error) => {
                throw ('Invalid Token')
            })
        return body
    }

    const options = props?.student?.map(option => {
        return { label: option?.fullName, value: option?.id }
    })

    function onChangeInput(value) {
        const valueStudent = value?.map(value => (value.value))
        setStudentID(valueStudent)
    }

    return (
        <div className="clear-both mb-0 ">
            <div className="border-b-2 mb-5 border-gray-400">
                <Link to="/"><img src={Logo} alt="logo" className="float-left w-64 h-24 pr-2" /></Link>
                <div className="">
                    <h2 className=" text-3xl font-bold  text-black pt-2"> Registration Form </h2>
                    <p className="text-gray-500 pb-8 pl-2 pr-24">Student can booking and question for Mentor</p>
                </div>
            </div>
            <div className=" mx-16 text-black  text-2xl w-650">

                <table className="text-gray-500 w-full">
                    <tbody>
                        <tr className="border-b-2  h-50 ">
                            <th className="text-left  "> Mentor:  </th>
                            <td className="font-normal pl-10 text-gray-900 outline-none">{props?.mentor?.map(mentorname => {
                                if (props?.booking?.mentorID == mentorname?.id) {
                                    return mentorname.fullName
                                }
                            })}</td>
                        </tr>
                        <tr className="border-b-2 h-50 ">
                            <th className="text-left  "> Subject: </th>
                            <td className="font-normal pl-10 text-gray-900 outline-none"> {props?.nameSubject}</td>
                        </tr>
                        <tr className="border-b-2 h-50 ">
                            <th className="text-left  "> Date:   </th>
                            <td className="font-normal pl-10 text-gray-900 outline-none"> {props?.booking?.startTime?.slice(0, 10)} to {props?.booking?.endTime?.slice(0, 10)}</td>
                        </tr>
                        <tr className="border-b-2 h-50 ">
                            <th className="text-left  "> Slot:  </th>
                            <td className="font-normal pl-10 text-gray-900 outline-none">{props?.booking?.startTime?.slice(11, 16)} to {props?.booking?.endTime?.slice(11, 16)} </td>
                        </tr>
                        <tr className="border-b-2 h-50 ">
                            <th className="text-left  "> Id student<br /> of group:  </th>
                            <td className="font-normal pl-10 text-gray-900 outline-none">
                                <Select
                                    //onChange ={e => setMentorID(options.value) }
                                    options={options}
                                    isMulti={true}
                                    onChange={onChangeInput}
                                /> </td>
                        </tr>
                        <tr className="border-b-2 h-50 ">
                            <th className="text-left pb-85  "> question:  </th>
                            <td className="pt-3"><textarea className="font-normal h-32 w-full resize-none pl-10  text-gray-900 outline-none " placeholder="Input subject description..." /></td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <div className=" cursor-pointer w-full h-14 leading-56 text-4xl text-center tracking-widest float-right bg-black hover:text-black hover:bg-blue-500 text-red-50" onClick={booking}  > Register</div>
        </div>
    )
}

