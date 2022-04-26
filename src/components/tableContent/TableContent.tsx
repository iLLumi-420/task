import React from 'react' 
import { IUser } from '../../lib/interfaces/IUsers'
import styles from './tableContent.module.scss'

const TableContent = ( {props} : any) => {
  console.log(props,'this')
  return (
    <div className={styles.content}>
      <div className={styles.nameContainer}>
        <input type="checkbox" name="" id="" />
        <p className={styles.name}>{props.name}</p>
      </div>
      <p className={styles.p}>{props.username}</p>
      <p className={styles.p} >{props.email}</p>
      <p className={styles.p}>{props.phone}</p>
      <p className={styles.p}>{props.website}</p>
      <p className={styles.p}>{props.address.street}</p>
    </div>
  )
}

export default TableContent