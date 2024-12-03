import React from 'react'
import TableProps from './ArbitratorUserTable/TableProps'

const CheckTable = () => {
  return (
    <div>
      <TableProps
        cl_name="Client name"
        cl_number="Client number"
        res_name="Res name"
        res number="Res number"
        type="Type"
        file="File"
        attach="Attach"
        action="Action"
      />
    </div>
  )
}

export default CheckTable;
