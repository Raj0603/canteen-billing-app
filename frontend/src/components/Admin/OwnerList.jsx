import React, { useState, useEffect } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { deleteOwner, getAllOwners } from "../../actions/studentAction";
import "./OwnerList.css";
import { useSelector, useDispatch } from "react-redux";
import { Trash2 } from "lucide-react";
import { useParams } from "react-router-dom";
import { DELETE_OWNER_RESET } from "../../constants/studentConstant";
import { useAlert } from "react-alert";

const OwnerList = () => {
  const params = useParams();

  const dispatch = useDispatch();

  const alert = useAlert();

  const [ownerId, setOwnerId] = useState("");

  const { error, owners } = useSelector((state) => state.allOwners.owners);

  const { error: deleteError, isDeleted } = useSelector(
    (state) => state.allOwners
  );

  const deleteOwnerHandler = (id) => {
    dispatch(deleteOwner(id));
  };

  useEffect(() => {
    dispatch(getAllOwners());
  }, [dispatch]);

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }

    if (deleteError) {
      alert.error(deleteError);
      dispatch(clearErrors());
    }

    if (isDeleted) {
      alert.success("Owner Deleted Successfully");
      setTimeout(() => {
        window.location.reload();
      }, 500);
      dispatch({ type: DELETE_OWNER_RESET });
    }
  }, [dispatch, alert, error, deleteError, isDeleted]);

  const columns = [
    { field: "id", headerName: "Owner ID", minWidth: 200, flex: 0.5 },

    {
      field: "name",
      headerName: "Name",
      minWidth: 150,
      flex: 1,
    },
    {
      field: "email",
      headerName: "Email",
      type: "mail",
      minWidth: 250,
      flex: 0.3,
    },

    {
      field: "ownerCollegeName",
      headerName: "Canteen Name",
      minWidth: 150,
      flex: 0.5,
    },

    {
      field: "actions",
      flex: 0.3,
      headerName: "Actions",
      minWidth: 150,
      type: "number",
      sortable: false,
      renderCell: (params) => {
        return (
          <>
            <Trash2 onClick={() => deleteOwnerHandler(params.row.id)} />
          </>
        );
      },
    },
  ];

  const rows = [];

  owners &&
    owners.forEach((owner) => {
      rows.push({
        id: owner._id,
        name: owner.name,
        email: owner.email,
        ownerCollegeName: owner.ownerCollegeName,
      });
    });

  return (
    <div className="ol-mc">
      {/* <input
        type="text"
        className="ol-oid"
        placeholder="Enter Owner ID"
        value={ownerId}
        onChange={(e)=>setOwnerId(e.target.value)}
      /> */}

      <DataGrid
        rows={rows}
        columns={columns}
        pageSize={10}
        disableSelectionOnClick
        className="productListTable"
        autoHeight
      />
    </div>
  );
};

export default OwnerList;
