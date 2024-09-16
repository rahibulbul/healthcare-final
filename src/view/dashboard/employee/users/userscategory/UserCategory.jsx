import React, { useEffect, useState } from 'react';
import { DataGrid, GridActionsCellItem, GridRowModes } from '@mui/x-data-grid';
import { ToastContainer, toast, Slide } from 'react-toastify';
import { AddUserCategory, CheckUserCategory, FetchUserCategory, DeleteUserCategory } from "../../../../../model/userHandle";
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/DeleteOutlined';
import SaveIcon from '@mui/icons-material/Save';
import CancelIcon from '@mui/icons-material/Close';
import { database } from '../../../../../model/firebaseConfig';
import { ref, update, remove } from 'firebase/database';

const EMPUserCategory = () => {
    const [userCategories, setUserCategories] = useState([]);
    const [rowModesModel, setRowModesModel] = useState({});
    const [userCategory, setUserCategory] = useState("");
    const [userCategoryError, setUserCategoryError] = useState("");
    const [isUserCategoryTouched, setIsUserCategoryTouched] = useState(false);
    const [isUserCategoryValid, setIsUserCategoryValid] = useState(false);
    const [userCategoryInfo, setUserCategoryInfo] = useState("");
    const [userCategoryInfoError, setUserCategoryInfoError] = useState("");
    const [isUserCategoryInfoTouched, setIsUserCategoryInfoTouched] = useState(false);
    const [isUserCategoryInfoValid, setIsUserCategoryInfoValid] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);

    useEffect(() => {
        const unsubscribe = FetchUserCategory((fetchedCategories) => {
            setUserCategories(fetchedCategories);
        });
        return () => unsubscribe();
    }, []);

    // Validate user category name
    const userCategoryValidate = async (value) => {
        if (value.length === 0) {
            setUserCategoryError("User category cannot be empty.");
            setIsUserCategoryValid(false);
        } else if (value.length < 3) {
            setUserCategoryError("User category name is too short.");
            setIsUserCategoryValid(false);
        } else {
            const isUserCategoryTaken = await CheckUserCategory(value);
            if (isUserCategoryTaken) {
                setUserCategoryError("User category already exists.");
                setIsUserCategoryValid(false);
            } else {
                setUserCategoryError("");
                setIsUserCategoryValid(true);
            }
        }
    };

    // Validate user category info
    const userCategoryInfoValidate = (value) => {
        if (value.length === 0) {
            setUserCategoryInfoError("User category info cannot be empty.");
            setIsUserCategoryInfoValid(false);
        } else if (value.length < 20) {
            setUserCategoryInfoError("User category info is too short.");
            setIsUserCategoryInfoValid(false);
        } else {
            setUserCategoryInfoError("");
            setIsUserCategoryInfoValid(true);
        }
    };

    // Handle category input changes and validation
    const handleUserCategoryChange = async (e) => {
        const value = e.target.value.toLowerCase();
        setUserCategory(value);
        if (isUserCategoryTouched) {
            await userCategoryValidate(value);
        }
    };

    const handleUserCategoryBlur = () => {
        setIsUserCategoryTouched(true);
        userCategoryValidate(userCategory);
    };

    const handleUserCategoryInfoChange = (e) => {
        const value = e.target.value;
        setUserCategoryInfo(value);
        if (isUserCategoryInfoTouched) {
            userCategoryInfoValidate(value);
        }
    };

    const handleUserCategoryInfoBlur = () => {
        setIsUserCategoryInfoTouched(true);
        userCategoryInfoValidate(userCategoryInfo);
    };

    // Handle the form submission to add new user category
    const handleUserCategorySubmit = async (e) => {
        e.preventDefault();
        setIsUserCategoryTouched(true);
        setIsUserCategoryInfoTouched(true);

        await userCategoryValidate(userCategory);
        userCategoryInfoValidate(userCategoryInfo);

        if (!isUserCategoryValid || !isUserCategoryInfoValid) {
            toast.warning("Please fix the errors before submitting.");
            setIsSubmitting(false);
            return;
        }
        if (isSubmitting) return;
        setIsSubmitting(true);

        if (isUserCategoryValid && isUserCategoryInfoValid) {
            try {
                const userCategoryData = {
                    userCategoryInfo,
                    lastUpdated: Date.now(),
                };

                const categoryId = await AddUserCategory(userCategory, userCategoryData);

                toast.success(`User category added successfully: ${categoryId}`);

                setUserCategory("");
                setUserCategoryInfo("");
                setIsUserCategoryTouched(false);
                setIsUserCategoryInfoTouched(false);
                setIsUserCategoryValid(false);
                setIsUserCategoryInfoValid(false);
            } catch (error) {
                console.error("Error adding user category:", error);
                toast.error("Failed to add user category");
            }
        }

        setIsSubmitting(false);
    };

    // Handle row edit start
    const handleEditClick = (id) => () => {
        setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.Edit } });
    };

    // Handle row save
    const handleSaveClick = (id) => async () => {
        setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.View } });
    };

    // Handle row cancel
    const handleCancelClick = (id) => () => {
        setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.View, ignoreModifications: true } });
    };

    // Handle row update in Firebase
    const processRowUpdate = async (updatedRow, oldRow) => {
        try {
            // Check if the updated user category already exists in the database
            const isUserCategoryTaken = await CheckUserCategory(updatedRow.usercategory);
            if (isUserCategoryTaken && updatedRow.usercategory !== oldRow.usercategory) {
                toast.error('User category already exists. Please choose a different name.');
                return oldRow; // Return the old row without saving the changes
            }

            const updates = {};
            updates[`users/userscategory/${updatedRow.id}`] = {
                usercategory: updatedRow.usercategory,
                userCategoryInfo: updatedRow.userCategoryInfo,
                lastUpdated: Date.now(),
            };

            await update(ref(database), updates);
            toast.success('Category updated successfully');
            return updatedRow; // Return the updated row if no duplicates found
        } catch (error) {
            toast.error('Error updating category');
            return oldRow;
        }
    };


    const handleProcessRowUpdateError = (error) => {
        toast.error('Error updating row: ' + error.message);
    };

    const handleDeleteClick = async (id) => {
        try {
            await remove(ref(database, `users/userscategory/${id}`));
            setUserCategories((prev) => prev.filter((row) => row.id !== id));
            toast.success('Category deleted successfully');
        } catch (error) {
            toast.error('Failed to delete category');
        }
    };

    const columns = [
        { field: 'id', headerName: 'ID', width: 100 },
        { field: 'usercategory', headerName: 'User Category', width: 150, editable: true },
        { field: 'userCategoryInfo', headerName: 'User Category Information', width: 250, flex: 1, editable: true },
        {
            field: 'lastUpdated',
            headerName: 'Last Update',
            width: 180,
            renderCell: (params) => new Date(params.value).toLocaleDateString(),
        },
        {
            field: 'actions',
            type: 'actions',
            headerName: 'Actions',
            width: 100,
            cellClassName: 'actions',
            getActions: ({ id }) => {
                const isInEditMode = rowModesModel[id]?.mode === GridRowModes.Edit;

                if (isInEditMode) {
                    return [
                        <GridActionsCellItem
                            icon={<SaveIcon />}
                            label="Save"
                            onClick={handleSaveClick(id)}
                            color="primary"
                        />,
                        <GridActionsCellItem
                            icon={<CancelIcon />}
                            label="Cancel"
                            onClick={handleCancelClick(id)}
                            color="inherit"
                        />,
                    ];
                }

                return [
                    <GridActionsCellItem
                        icon={<EditIcon />}
                        label="Edit"
                        onClick={handleEditClick(id)}
                        color="inherit"
                    />,
                    <GridActionsCellItem
                        icon={<DeleteIcon />}
                        label="Delete"
                        onClick={() => handleDeleteClick(id)}
                        color="inherit"
                    />,
                ];
            },
        },
    ];



    return (
        <div className="w-full h-[calc(100vh-65px)]">
            <ToastContainer
                position="bottom-right"
                autoClose={5000}
                hideProgressBar={false}
                closeOnClick
                pauseOnHover
                theme="colored"
                transition={Slide}
            />
            <div className="p-5 title flex flex-col fixed h-28 bg-white w-full z-10">
                <span className="text-3xl font-bold text-slate-600">Users category</span>
                <span className="text-base font-medium text-slate-500">
                    This page is to set user category to the company
                </span>
            </div>
            <div className="p-5 content w-full mt-20 overflow-hidden overflow-y-auto">
                <form className="w-full" onSubmit={handleUserCategorySubmit}>
                    <div className="w-full">
                        <div className="relative input w-[95%] md:w-[75%] mt-8 flex items-center">
                            <input
                                type="text"
                                name="userCategory"
                                id="userCategory"
                                className="relative w-full border-2 border-slate-300 rounded-2xl py-3 px-5 font-semibold outline-none focus:border-slate-700 focus:shadow-ui-bold valid:border-slate-700 duration-500 peer"
                                required
                                value={userCategory}
                                onChange={handleUserCategoryChange}
                                onBlur={handleUserCategoryBlur}
                            />
                            <i className={`fa-solid fa-circle-exclamation absolute -right-7 text-lg text-red-500 ${userCategoryError && isUserCategoryTouched ? "" : "hidden"}`}></i>
                            <i className={`fa-solid fa-circle-check absolute -right-7 text-lg text-green-500 ${isUserCategoryValid ? "" : "hidden"}`}></i>
                            <label
                                htmlFor="userCategory"
                                className="absolute left-0 ml-5 px-2 font-semibold text-slate-500 bg-white pointer-events-none top-1/2 -translate-y-2/4 transform peer-focus:top-0 peer-valid:top-0 peer-focus:text-black peer-valid:text-black duration-500 text-base"
                            >
                                Enter user category
                            </label>
                            <span className="absolute bottom-0 translate-y-6 left-5 font-semibold text-red-500">
                                {userCategoryError}
                            </span>
                        </div>
                        <div className="relative input w-[95%] md:w-[75%] mt-10 flex items-center">
                            <input
                                type="text"
                                name="userCategoryInfo"
                                id="userCategoryInfo"
                                className="relative w-full border-2 border-slate-300 rounded-2xl py-3 px-5 font-semibold outline-none focus:border-slate-700 focus:shadow-ui-bold valid:border-slate-700 duration-500 peer"
                                required
                                value={userCategoryInfo}
                                onChange={handleUserCategoryInfoChange}
                                onBlur={handleUserCategoryInfoBlur}
                            />
                            <i className={`fa-solid fa-circle-exclamation absolute -right-7 text-lg text-red-500 ${userCategoryInfoError && isUserCategoryInfoTouched ? "" : "hidden"}`}></i>
                            <i className={`fa-solid fa-circle-check absolute -right-7 text-lg text-green-500 ${isUserCategoryInfoValid ? "" : "hidden"}`}></i>
                            <label
                                htmlFor="userCategoryInfo"
                                className="absolute left-0 ml-5 px-2 font-semibold text-slate-500 bg-white pointer-events-none top-1/2 -translate-y-2/4 transform peer-focus:top-0 peer-valid:top-0 peer-focus:text-black peer-valid:text-black duration-500 text-base"
                            >
                                Enter user category information
                            </label>
                            <span className="absolute bottom-0 translate-y-6 left-5 font-semibold text-red-500">
                                {userCategoryInfoError}
                            </span>
                        </div>
                    </div>
                    <div className="button w-full md:w-[75%] flex justify-center mt-10">
                        <input
                            type="submit"
                            value="Add user category"
                            className="border-2 py-3 px-10 md:px-32 text-slate-500 rounded-3xl font-semibold text-2xl border-slate-300 cursor-pointer hover:border-black duration-500 hover:shadow-ui-bold hover:text-black"
                        />
                    </div>
                </form>
                <div className="list mt-5 w-full overflow-auto">
                    <DataGrid
                        rows={userCategories}
                        getRowId={(row) => row.id}
                        columns={columns}
                        pageSize={5}
                        rowsPerPageOptions={[5]}
                        checkboxSelection
                        disableSelectionOnClick
                        processRowUpdate={processRowUpdate}
                        onProcessRowUpdateError={handleProcessRowUpdateError}
                        rowModesModel={rowModesModel}
                        onRowModesModelChange={(newModel) => setRowModesModel(newModel)}
                        experimentalFeatures={{ newEditingApi: true }}
                    />
                </div>
            </div>
        </div>
    );
};

export default EMPUserCategory;

