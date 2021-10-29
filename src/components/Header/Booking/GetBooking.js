import Modal from "../../Modal";
import React, { useState, Fragment, useEffect } from "react"

import ModalBooking from "./ModalBooking";

function GetBooking(props) {
  

    const [show, setShow] = useState(false);
    const [bookingInformation, setBookingInformation] = useState(undefined);
    const [mentor, setMentor] = useState(undefined);
    const [student, setStudent] = useState(undefined);
    function showModal(dataView, dataMentor, dataStudent) {
        setBookingInformation(dataView)
        setMentor(dataMentor)
        setStudent(dataStudent)
        setShow(true);

    };
    function hideModal() {
        setShow(false);
    };
    useEffect(() => {
        if (!show) {
            setBookingInformation(undefined)
            setMentor(undefined)
            setStudent(undefined)
        }
    }, [show])

    const subjectName = props?.subject?.filter(subject => {
        if (subject?.id == props?.subjectName) {
            return subject.name
        }
    })
    console.log("subject name ", subjectName)
    return (
        <Fragment>
            {props?.view?.map((bookinglist, index) => {
                return (
                    <tr className="h-16 " key={index}>
                        <td className="pl-4 text-left">{index + 1}</td>
                        <td className="pl-4 text-left">{props?.mentor?.map(mentorname => {
                            if (bookinglist?.mentorID == mentorname.id) {
                                return mentorname.fullName
                            }
                        })}</td>
                        {/* <td className="text-left  pl-4  ">{subjectName?.map(name => (name.name))}  </td> */}
                        <td className="pl-4 text-left  ">{bookinglist?.startTime?.slice(0, 10)} to {bookinglist?.endTime?.slice(0, 10)}   </td>
                        <td className="pl-4 text-left">{bookinglist?.startTime?.slice(11, 16)} to {bookinglist?.endTime?.slice(11, 16)}   </td>
                        <td className="pl-4 text-left text-xanhla font-bold cursor-pointer">
                            <button type="button" className="" onClick={() => showModal(bookinglist, props?.mentor, props?.student)}>
                                Request
                            </button> </td>

                    </tr>
                )

            })}
            <Modal show={show} handleClose={hideModal} className="mb-5">
                <ModalBooking booking={bookingInformation} student={student} nameSubject={subjectName?.map(name => { return name.name })}
                    subjectID={subjectName?.map(id => { return id.id })} subject={props?.subject} mentor={mentor} onModal={() => setShow(false)} />
            </Modal>
        </Fragment >


    )
}
export default GetBooking