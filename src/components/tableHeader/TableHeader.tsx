import React from 'react'
import styles from './TableHeader.module.scss'

const TableHeader = (  ) => {
  return (
    <div className={styles.tableHeader}>
        <div className={styles.nameContainer}>
            <input type="checkbox" name="" id="" />
            <h2 className={styles.name}>Name</h2>
        </div>
        <h2>Username</h2>
        <h2>Email</h2>
        <h2>Phone</h2>
        <h2>Website</h2>
        <h2>Address</h2>
    </div>
  )
}

export default TableHeader