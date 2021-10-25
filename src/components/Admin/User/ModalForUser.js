import React, { Component, useState, useEffect, useContext } from "react";
import { Link, NavLink } from 'react-router-dom'
import Modal from "../../Modal";
import Logo from '../../image/logo.png'

export default function ModalForUser(props) {
    const [role, setRole] = useState("")
    const [id, setId] = useState("")

    console.log("props của modal", props)



    async function updateRole() {
        const body = {
            roleID: parseInt(role),
            userID: id,
        };
        console.log(body, "---------")
        const res = await fetch(`http://118.69.123.51:5000/test/api/user/add_role`, {
            method: `POST`,
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('user-token')}`,
            },
            body: JSON.stringify(body)
        }).then(res => res.json())
            .then(result => {

                if (result) {
                    props.onUpdate()
                    props.onModal()
                    alert("update thành công")
                    // history.push("/")
                } else {
                    alert("update thất bại")
                    // setError(result.message)
                    // alert("tài khoản hoặc mật khẩu sai kìa")
                }
                return res

            })
            .catch((error) => {
                throw ('Invalid Token')
            })
        return body
    }
    // if(props?.isClickedParent?.fullName == postList.row?.id ){
    //        return console.log(postList.row?.name)
    // } 

    useEffect(() => {
        setId(props?.isClickedParent?.id);
        setRole(props?.isClickedParent?.roleID)
    }, [props?.isClickedParent?.id, props?.isClickedParent?.roleID])

    let dataRole;
    if (props?.isClickedParent?.roleID == '2') {
        dataRole = (
            <tr className="border-b-2 h-50 ">
                <th className="text-left  "> Subject:  </th>
                <td className="font-normal pl-10 text-gray-900 outline-none"></td>
            </tr>)
    }
    else if (props?.isClickedParent?.roleID == '1') {
        dataRole = (
        <tr className="border-b-2 h-50 ">
            <th className="text-left  "> Specialize:  </th>
            <td className="font-normal pl-10 text-gray-900 outline-none"></td>
        </tr>)
    }


    return (
        <div className="clear-both mb-0 ">
            <div className="border-b-2 mb-5 border-gray-400">
                <Link to="/"><img src={Logo} alt="logo" className="float-left w-64 h-24 pr-2" /></Link>
                <div className="">
                    <h2 className=" text-3xl font-bold  text-black pt-2"> User Detail </h2>
                    <p className="text-gray-500 pb-2 pl-2 pr-24">Admin can view User information and update User to Mentor</p>
                </div>
            </div>
            <div className=" mx-16 text-black  text-2xl">

                <table className="text-gray-500">
                    <tbody >
                        <tr className="border-b-2 h-50 ">
                            <th className="text-left  "> Email:  </th>
                            <td className="font-normal pl-10 text-gray-900 outline-none">{props?.isClickedParent?.email}</td>
                        </tr>
                        <tr className="border-b-2 h-50 ">
                            <th className="text-left  "> Name:  </th>
                            <td className="font-normal pl-10 text-gray-900 outline-none">{props?.isClickedParent?.fullName}</td>
                        </tr>
                        <tr className="border-b-2 h-50 ">
                            <th className="text-left  "> MSSV:  </th>
                            <td className="font-normal pl-10 text-gray-900 outline-none"></td>
                        </tr>
                        <tr className="border-b-2 h-50 ">
                            <th className="text-left  "> Role:  </th>
                            <td className="">
                                <select onChange={e => setRole(e.target.value)} className="font-normal pl-9 text-gray-900 outline-none ">
                                    {props?.role?.map(postRole => {
                                        if (props?.isClickedParent?.roleID == postRole?.id) {
                                            return (
                                                <option
                                                    value={postRole?.id}
                                                    key={postRole?.id} > {postRole?.name}  </option>
                                            )
                                        }
                                    })

                                    }
                                    {props?.role?.map(postRole => {
                                        if (props?.isClickedParent?.roleID != postRole?.id) {
                                            return (
                                                <option
                                                    value={postRole?.id}
                                                    key={postRole?.id} > {postRole?.name}  </option>
                                            )
                                        }
                                    })

                                    }
                                </select>  </td>
                        </tr>
                        {dataRole}
                        <tr className="border-b-2 h-50 ">
                            <th className="text-left  "> Address:  </th>
                            <td className="font-normal pl-10 text-gray-900 outline-none"></td>
                        </tr>
                        <tr className="border-b-2 h-50 ">
                            <th className="text-left  "> Phone:  </th>
                            <td className="font-normal pl-10 text-gray-900 outline-none"></td>
                        </tr>


                    </tbody>
                </table>

            </div>
            <div className=" cursor-pointer w-full h-14 leading-56 text-4xl text-center  float-right bg-black hover:text-black hover:bg-blue-500 text-red-50" onClick={updateRole} > Update</div>

        </div>
    )
}

