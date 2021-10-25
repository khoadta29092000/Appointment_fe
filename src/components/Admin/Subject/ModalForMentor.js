import React, { Component, useState, useEffect, useContext, Fragment } from "react";
import { Link, NavLink, useHistory } from 'react-router-dom'
import CustomSelect from "../../CustomSelect";
import Modal from "../../Modal";
import Logo from '../../image/logo.png'
import Select from "react-select";
export default function ModalForMentor(props) {

    const [mentorID, setMentorID] = useState([])
    const [selectedMentor, setselectedMentor] = useState([])
    const [mentorList, setMentorList] = useState([])
    let body;

    useEffect(() => {
        let tmp = props?.mentor?.map(cc => {
            return { label: cc.fullName, value: cc.id }
        })
        setMentorList(tmp)
    }, [props?.mentor])



    useEffect(() => {
        if (props?.isClickedParent?.mentorList && props?.isClickedParent?.mentorList.length > 0) {
            let tmp = []
            for (const item of props?.isClickedParent?.mentorList) {
                tmp.push({
                    label: item?.fullName,
                    value: item?.id
                })
            }
            console.log(123123, tmp)
            setselectedMentor(tmp)
        } else {
            setselectedMentor([])
        }
    }, [mentorList]);

    
    async function updateMentorForSubject() {
        body = {
            mentorID: mentorID,
            subjectID: props?.isClickedParent?.id
        }


        let res = await fetch("http://118.69.123.51:5000/test/api/subject/add_mentor_to_subject", {
            method: `POST`,
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('user-token')}`,
            },
            body: JSON.stringify(body)

        }).then(res => res.json())
            .then(result => {
                console.log(result)
                if (result?.resultCode === 1) {
                    alert("update thanh công")
                    props?.onUpdate();
                    props?.onModal()
                    props.parentCallback(result?.message);
                }
            }

            )
            .catch((error) => {
                throw ('Invalid Token')
            })
        return body
    }


    function onChangeInput(value) {
        console.log("cc", value);
        const cl = value?.map(cc => {

            return cc.value
        })
        console.log("cl", cl)
        setMentorID(cl)
        setselectedMentor(value)
    }




    return (

        <div className="clear-both mb-5 h-96 w-1190">
            <div className="border-b-2 mb-5 border-gray-400">
                <Link to="/"><img src={Logo} alt="logo" className="float-left w-64 h-24 pr-2" /></Link>
                <div className="">
                    <h2 className=" text-3xl font-bold  text-black pt-2"> Subject Detail </h2>
                    <p className="text-gray-500 pb-10 pl-2 pr-24">You can edit or add subjects according to the university's majors</p>
                </div>
            </div>
            <div className="  mx-14 text-black  text-3xl">

                <div>Mentor:</div>
                <Select
                    //    onChange ={e => setMentorID(options.value) }
                    options={mentorList}
                    value={selectedMentor}
                    isMulti={true}
                    onChange={onChangeInput} />
                <button className="w-40 h-12 bg-gray-800 text-white float-right mt-10 mb-10 space-x-1 rounded-xl"   > <p onClick={updateMentorForSubject}>Update</p></button>

            </div>

        </div>



    )
}

