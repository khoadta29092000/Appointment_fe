import queryString from 'query-string';
import React, { useEffect, useState } from "react";
import Footer from "../../Footer";
import Header from '../../Header';
import Pagination from "../../Pagination";
import ListProduct from "./ListMentor";
import Search from '../Subject/Search';
import accountApi from '../../../api/accountApi';


function Mentor() {

  const [postList, setpostList] = useState([]);
  const [pagination, setPagination] = useState({
    _page: 1,
    _limit: 9,
    _totalRows: 1,
  });
  const [filters, setFilters] = useState({
    _limit: 9,
    _page: 1,
    title_like: '',
  })

  useEffect(() => {


    featchAccountList();
  }, [filters]);

  const featchAccountList = async () => {

    let response = await accountApi.getListUser({

    })
    if (response === undefined) {
      alert('Error')
    } else if (response?.resultCode === -1) {
      alert(response.message)
    } else {

      setpostList(response?.rows)
    }

  }


  function handlePageChange(newPage) {
    console.log('new page: ', newPage);
    setFilters({
      ...filters,
      _page: newPage,
    })
  }

  function handleSearchTermChange(newFilters) {
    console.log('new Filters: ', newFilters)
    setFilters({
      ...filters,
      _page: 1,
      title_like: newFilters.searchTerm,
    })
  }
  console.log()


  const filterd = postList.map(cc => {



    return cc


  })
  return (

    <div className="mt-20  " >
      <Header>



        <h2 className="text-center h-20 leading-80 my-auto le text-5xl bg-xanhla text-white  font-serif uppercase  clear-both  "> List Mentor</h2>

        <Search onSubmit={handleSearchTermChange} />
        <div className="mb-8 clear-right mt-28 " >
          <div className=" mx-auto  justify-center ">
            <ListProduct posts={filterd} />
          </div>

        </div>
        <Pagination pagination={pagination} onPageChange={handlePageChange} />
        <Footer />
      </Header>

    </div>
  );

}

export default Mentor;