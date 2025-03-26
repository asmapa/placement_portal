import React from 'react'

export const IndividualData = ({individualExcelData}) => {
    return(
        <>
            <th>{individualExcelData.ktu_id}</th>
            <th>{individualExcelData.round_status}</th>
        </>
    )
}
