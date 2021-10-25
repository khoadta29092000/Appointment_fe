import queryString from 'query-string';
import { default as React, useEffect, useState } from "react";
import Admin from "../AdminDashboard/AdminDashboard";
import accountApi from '../../../api/accountApi';
import GetAccount from './GetAccount';
import Pagination from '../../Pagination';

function User() {

    const [postList, setpostList] = useState([]);
    const [pagination, setPagination] = useState({
        page: 1,
        pageSize: 10,
        count: 1,
    });
    const [filters, setFilters] = useState({
        page: 1,
        pageSize: 10,
        // title_like: '',
    })

    useEffect(() => {
        featchRoleList()
        featchPostList();
    }, [filters]);

    async function featchPostList() {
        try {
            console.log(filters)
            const paramsString = queryString.stringify(filters);
            let response = await fetch(`http://118.69.123.51:5000/test/api/user/get_list?${paramsString}`, {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('user-token')}`,
                }
            })
            const responseJSON = await response.json();
            console.log({ responseJSON });
            const { data, pagination } = responseJSON;
            setpostList(responseJSON?.data?.rows);
            setPagination({
                page: filters.page,
                pageSize: 10,
                count: responseJSON?.data?.count,
            });
            console.log("pagination-----------------", responseJSON?.data?.rows);
        } catch (error) {
            console.log('Fail to fetch product list: ', error)

        }

    }

    const [postRoleList, setPostRoleList] = useState([]);


    async function featchRoleList() {
        try {
            const requestURL = `http://118.69.123.51:5000/test/api/role/get_list?`;
            const response = await fetch(requestURL, {
                method: `GET`,
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('user-token')}`,
                },
            });
            const responseJSON = await response.json();
            console.log({ responseJSON });
            const { data, pagination } = responseJSON;

            setPostRoleList(data);

            return data
        } catch (error) {
            console.log('Fail to fetch product list: ', error)
        }
    }

    function handlePageChange(newPage) {
        console.log('new page: ', newPage);
        setFilters({
            ...filters,
            page: newPage,
        })
    }

    function handleSearchTermChange(newFilters) {
        console.log('new Filters: ', newFilters)
        setFilters({
            ...filters,
            page: 1,
            title_like: newFilters.searchTerm,
        })
    }

    return (
        <Admin>

            <div className="mt-101">
                <div className="bg-white h-20 mx-5 grid grid-cols-9 ">
                    <h2 className="text-xl col-span-6 leading-80 pl-8 float-left text-700 h-20">User manage</h2>
                    <div id="form-field" className="  mt-4   mb-0   mr-52  w-450">
                        <input type="text" id="form-input" placeholder=" " className=" mb-0 h-10   border-gray-200   " />
                        <label id="form-label" className="-ml-16 text-gray-200 mb-0  ">Search list...</label>
                    </div>
                </div>
                <div className="mx-5 bg-white clear-none  ">
                    <table className="table-auto w-full   text-left">
                        <thead className=" h-10   bg-gray-200  ">
                            <tr className=" ">
                                <th className=" pl-8 w-32 "> No. </th>

                                <th className="w-80  "> Name</th>
                                <th className="w-80   ">Email</th>
                                <th className="w-64  ">MSSV</th>
                                <th className="w-80 ">Role</th>
                                <th className="w-8  ">Actions</th>
                                <th className="  "></th>
                            </tr>
                        </thead>
                        <GetAccount posts={postList} postss={postRoleList} onDelete={() => featchPostList()} />



                    </table>
                    <div className="h-16  border-gray-200  ">


                        <Pagination pagination={pagination} onPageChange={handlePageChange} />
                    </div>
                </div>

            </div>
        </Admin>
    )
}


export default User;