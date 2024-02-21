import React, { useState, useEffect } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { getAllStudents, deleteStudent } from "../../actions/studentAction";
import "./OwnerList.css";
import { useSelector, useDispatch } from "react-redux";
import { Trash2 } from "lucide-react";
import { useParams } from "react-router-dom";
import { DELETE_STUDENT_RESET } from "../../constants/studentConstant";
import { useAlert } from "react-alert";
const StudentList = () => {
  const params = useParams();

  const dispatch = useDispatch();

  const alert = useAlert();

  const { error, students } = useSelector(
    (state) => state.allStudents.students
  );

  const { error: deleteError, isDeleted } = useSelector(
    (state) => state.allStudents
  );

  const deleteStudentHandler = (id) => {
    dispatch(deleteStudent(id));
  };

  useEffect(() => {
    dispatch(getAllStudents());
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
      alert.success("Student Deleted Successfully");
      setTimeout(() => {
        window.location.reload();
      }, 500);
      dispatch({ type: DELETE_STUDENT_RESET });
    }
  }, [dispatch, alert, error, deleteError, isDeleted]);

  const columns = [
    { field: "id", headerName: "Student ID", minWidth: 200, flex: 0.5 },

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
      field: "collegeCanteen",
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
            <Trash2 onClick={() => deleteStudentHandler(params.row.id)} />
          </>
        );
      },
    },
  ];

  const rows = [];

  students &&
    students.forEach((student) => {
      rows.push({
        id: student._id,
        name: student.name,
        email: student.email,
        collegeCanteen: student.collegeCanteen,
      });
    });

  return (
    <div className="ol-mc">
      {/* <input
        type="text"
        className="ol-oid"
        placeholder="Enter student ID"
        value={studentId}
        onChange={(e)=>setstudentId(e.target.value)}
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

export default StudentList;
