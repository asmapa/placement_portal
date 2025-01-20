import React from 'react'

export const IndividualData = ({individualExcelData}) => {
    return(
        <>
            <th>{individualExcelData.id}</th>
            <th>{individualExcelData.Company}</th>
            <th>{individualExcelData.date}</th>
            <th>{individualExcelData.Round}</th>
            <th>{individualExcelData.student}</th>
            <th>{individualExcelData.status}</th>
        </>
    )
}
