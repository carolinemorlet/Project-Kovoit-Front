import React from 'react';

const Email = (cell: any) => {
  return cell.value ? cell.value : '';
};

const Img = (cell: any) => {
  return (
    <>
      {!cell.value ? (
        <div className="avatar-xs">
          <span className="avatar-title rounded-circle">
            {cell.data[0].name.charAt(0)}
          </span>
        </div>
      ) : (
        <div>
          <img className="rounded-circle avatar-xs" src={cell.value} alt="" />
        </div>
      )}
    </>
  );
};

export { Email, Img };
