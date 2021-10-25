
import React, { Component, useState, useEffect, useContext, Fragment } from "react";
import { Link, NavLink } from 'react-router-dom'
import PropTypes from 'prop-types';
import Modal from "../../Modal";
import ModalForUser from "./ModalForUser";

GetAccount.propTypes = {
    posts: PropTypes.array,
};
GetAccount.defaultProps = {
    posts: [{}],
    postss: [{}],
};
function GetAccount(props) {
    const { posts } = props;
    const { postss } = props;

    console.log("rolelist", postss)

    const [show, setShow] = useState(false);
    const [isClicked, setIsClicked] = useState(true);
    const [selectedUser, setselectedUser] = useState(undefined)
    const [selectedRole, setselectedRole] = useState(undefined)



    function showModal(accountData, roleData) {
        setselectedUser(accountData)
        setselectedRole(roleData)
        setShow(true);
        setIsClicked(true);
    };
    function hideModal() {
        setShow(false);
        setIsClicked(true);
    };

    useEffect(() => {
        if (!show) {
            setselectedUser(undefined)
            setselectedRole(undefined)
        }
    }, [show])




    return (


        <tbody className="text-left h-16 ">
            {posts.map((post, index) => {
                return (

                    <tr className="h-16 border-b-2 border-gray-200 " key={post.id}>

                        <td className="pl-8">  {index + 1}</td>
                        <td>{post?.fullName}</td>
                        <td className="">{post?.email}</td>
                        <td className="">{post?.specializeID}</td>
                        <td className=""> {postss.map(postRole => {
                            if (postRole?.id == post?.roleID) {

                                return <option key={postRole?.id}>{postRole?.name}</option>
                            }
                        })}</td>
                        <td className="  ">

                            <button type="button" className="font-bold" onClick={() => showModal(postss, post)}>
                                Edit
                            </button></td>
                        {/* <th className="  ">Delete</th> */}
                    </tr>

                )
            })}
            <Modal show={show} handleClose={hideModal} className="mb-5">
                <ModalForUser isClickedParent={selectedRole} role={selectedUser} onModal={() => setShow(false)} onUpdate={() => props.onDelete()} />
            </Modal>

        </tbody>


    );

}

export default GetAccount;