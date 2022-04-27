import React, { Dispatch, SetStateAction } from 'react'
import { IUser } from '../../lib/interfaces/IUsers'
import styles from './TableHeader.module.scss'
import { useState } from 'react'


type Props = {
  isClicked: boolean,
  setIsClicked: Dispatch<SetStateAction<boolean>>
}

const TableHeader = ({isClicked , setIsClicked}:Props) => {
  const checkOnClick = ()=>{
    setIsClicked(!isClicked)
    console.log(isClicked)
  }
  return (
    <div className={styles.tableHeader}>
        <div className={styles.nameContainer}>
            <input type="checkbox" name="" id="" onClick={checkOnClick}/>
            <h3 className={styles.name}>Name</h3>
        </div>
        <h3 className={styles.hItem}>Username</h3>
        <h3 className={styles.hItem}>Email</h3>
        <h3 className={styles.hItem}>Phone</h3>
        <h3 className={styles.hItem}>Website</h3>
        <h3 className={styles.hItem}>Address</h3>
    </div>
  )
}

export default TableHeader