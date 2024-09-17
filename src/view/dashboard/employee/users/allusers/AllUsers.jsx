import React, { useEffect, useState } from 'react'
import { DataGrid, GridActionsCellItem, GridRowModes, GridToolbar } from '@mui/x-data-grid';
import { ToastContainer, toast, Slide } from 'react-toastify';
import { FetchUsers } from "../../../../../model/userHandle"
import { database } from "../../../../../model/firebaseConfig"

const EMPAllUsers = () => {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        const unsubscribe = FetchUsers((fetchedUsers) => {
            setUsers(fetchedUsers);
        });
        return () => unsubscribe();
    }, []);

    const columns = [
        { field: 'id', headerName: 'User ID', width: 120 },
        { field: 'fullname', headerName: 'Full Name', flex: 1, editable: true },
        { field: 'username', headerName: 'User Name', width: 120, editable: true },
        { field: 'email', headerName: 'Email', flex: 1, editable: true },
        { field: 'dob', headerName: 'Date of birth', width: 110, editable: true, renderCell: (params) => new Date(params.value).toLocaleDateString(), },
        { field: 'phonenumber', headerName: 'Phone number', width: 130, editable: true },
        { field: 'insurancestatus', headerName: 'Insurance Status', width: 140, editable: true },
        { field: 'accountstatus', headerName: 'Account Status', width: 150, editable: true },
        { field: 'usercategory', headerName: 'User Category', width: 150, editable: false },
        // {
        //     field: 'actions',
        //     type: 'actions',
        //     headerName: 'Actions',
        //     width: 100,
        //     cellClassName: 'actions',
        //     getActions: ({ id }) => {
        //         const isInEditMode = rowModesModel[id]?.mode === GridRowModes.Edit;

        //         if (isInEditMode) {
        //             return [
        //                 <GridActionsCellItem
        //                     icon={<SaveIcon />}
        //                     label="Save"
        //                     onClick={handleSaveClick(id)}
        //                     color="primary"
        //                 />,
        //                 <GridActionsCellItem
        //                     icon={<CancelIcon />}
        //                     label="Cancel"
        //                     onClick={handleCancelClick(id)}
        //                     color="inherit"
        //                 />,
        //             ];
        //         }

        //         return [
        //             <GridActionsCellItem
        //                 icon={<EditIcon />}
        //                 label="Edit"
        //                 onClick={handleEditClick(id)}
        //                 color="inherit"
        //             />,
        //             <GridActionsCellItem
        //                 icon={<DeleteIcon />}
        //                 label="Delete"
        //                 onClick={() => handleDeleteClick(id)}
        //                 color="inherit"
        //             />,
        //         ];
        //     },
        // },
        {
            field: 'lastUpdated',
            headerName: 'Last Update',
            width: 180,
            renderCell: (params) => new Date(params.value).toLocaleDateString(),
        },
    ];
    return (
        <div className='w-full h-[calc(100vh-65px)]'>
            <ToastContainer
                position="bottom-right"
                autoClose={5000}
                hideProgressBar={false}
                closeOnClick
                pauseOnHover
                theme="colored"
                transition={Slide}
            />
            <div className="title p-5 flex flex-col fixed h-28 bg-white w-full z-10">
                <span className='text-3xl font-bold text-slate-600'>All users</span>
                <span className='text-base font-medium text-slate-500'>This page is to show all existing user to the company</span>
            </div>
            <div className="content p-5 w-full mt-20 overflow-hidden overflow-y-auto">
                <div className="list mt-5 w-full overflow-auto">
                    <DataGrid
                        rows={users}
                        getRowId={(row) => row.id}
                        columns={columns}
                        initialState={{
                            pagination: {
                                paginationModel: {
                                    pageSize: 5,
                                },
                            },
                        }}
                        pageSizeOptions={[5]}
                        // pageSize={5}
                        // rowsPerPageOptions={[5]}
                        checkboxSelection
                        disableSelectionOnClick
                        // processRowUpdate={processRowUpdate}
                        // onProcessRowUpdateError={handleProcessRowUpdateError}
                        // rowModesModel={rowModesModel}
                        // onRowModesModelChange={(newModel) => setRowModesModel(newModel)}
                        experimentalFeatures={{ newEditingApi: true }}
                        slots={{
                            toolbar: GridToolbar
                        }}
                        slotProps={{
                            toolbar: {
                                showQuickFilter: true,
                                quickFilterProps: { debounceMs: 500 },
                            }
                        }}
                        disableDensitySelector
                        disableColumnFilter
                        disableColumnSelector
                    />
                </div>
            </div>
        </div>
    )
}

export default EMPAllUsers