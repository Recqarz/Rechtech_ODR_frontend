import React from "react";

const DocumentsProps = ({
  cl_name,
  res_name,
  attach,
  arb_name,
  order,
  award,
  recording,
}) => {
  return (
    <>
      <tbody>
        <tr className="rounded-[1.5px] bg-blue-50">
          <td className="border-b border-slate-200">
            <div className="flex items-center gap-3">
              <div className="flex flex-col">
                <p className="text-xs text-slate-500">{cl_name}</p>
              </div>
            </div>
          </td>
          <td className="p-1 border-slate-200">
            <div className="flex flex-col">
              <p className="text-xs text-slate-500">{res_name}</p>
            </div>
          </td>
          <td className="p-1 border-b border-slate-200">
            <div className="w-max">
              <div className="flex flex-col">
                <p className="text-xs text-slate-500">{attach}</p>
              </div>
            </div>
          </td>
          <td className="p-1 border-b border-slate-200">
            <p className="text-xs text-slate-500">{arb_name}</p>
          </td>
          <td className="p-1 border-b border-slate-200">
            <p className="text-xs text-slate-500">{order}</p>
          </td>
          <td className="p-1 border-b border-slate-200">
            <p className="text-xs text-slate-500">{award}</p>
          </td>
          <td className="p-1 border-b border-slate-200">
            <p className="text-xs text-slate-500">{recording}</p>
          </td>
        </tr>
      </tbody>
    </>
  );
};

export default DocumentsProps;
