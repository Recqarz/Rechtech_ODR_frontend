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
                <p className="text-xs text-black">{cl_name}</p>
              </div>
            </div>
          </td>
          <td className="p-1 border-slate-200">
            <div className="flex flex-col">
              <p className="text-xs text-black">{res_name}</p>
            </div>
          </td>
          <td className="p-1 border-b border-slate-200">
            <div>
              <p className="text-xs text-black">{arb_name}</p>
            </div>
          </td>
          <td className="p-1 border-b border-slate-200">
            <div className="w-max">
              <div className="flex flex-col">
                <p className="text-xs text-black">{attach}</p>
              </div>
            </div>
          </td>
          <td className="p-1 border-b border-slate-200">
            <div>
              <p className="text-xs text-black">{order}</p>
            </div>
          </td>
          <td className="p-1 border-b border-slate-200">
            <div>
              <div className="text-xs text-black">{award}</div>
            </div>
          </td>
          <td className="p-1 border-b border-slate-200">
            <div>
              <p className="text-xs text-black">{recording}</p>
            </div>
          </td>
        </tr>
      </tbody>
    </>
  );
};

export default DocumentsProps;
