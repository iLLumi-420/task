import React, { useState } from 'react' 
import { IUser } from '../../lib/interfaces/IUsers'
import styles from './tableContent.module.scss'
import  { Dispatch, SetStateAction } from 'react'


type Props = {
  props: IUser
  isClicked: boolean,
  allClicked: string[],
  setAllClicked: Dispatch<SetStateAction<string[]>>
}

const TableContent = ( {props, isClicked, allClicked, setAllClicked} : Props) => {
  const [checked, setChecked] = useState(false)
  const onClick = ()=>{
    setChecked(!checked)
    if(!checked){
      setAllClicked(arr=>[...arr, props.id])
    }
    else{
      allClicked.pop()
    }
  }
  

  return (
    <div className={styles.content} key={props.id}>
      <div className={styles.nameContainer}>
        {isClicked?<input type="checkbox" name="" id={props.id} checked/>: <input type="checkbox" name="" id={props.id} checked={checked} onClick={onClick} /> }
        <p className={styles.name}>{props.name}</p>
      </div>
      <p className={styles.items}>{props.username}</p>
      <p className={styles.items} >{props.email}</p>
      <p className={styles.items}>{props.phone}</p>
      <p className={styles.items}>{props.website}</p>
      <p className={styles.items}>{props.address.street}</p>
    </div>
  )
}

export default TableContent