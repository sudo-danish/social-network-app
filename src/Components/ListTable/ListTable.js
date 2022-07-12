import React from 'react'
import NavBar from '../../Components/NavBar/NavBar'
import BreadCrumb from '../BreadCrumb/BreadCrumb'

const ListTable = () => {
  return (
    <div>
        <NavBar />
        <BreadCrumb link1='/dashboard/' link1Text='Home' currentPageTitle='Admins'/>
    </div>
  )
}

export default ListTable