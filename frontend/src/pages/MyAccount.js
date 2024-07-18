import React, { useContext, useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import { Context } from '../context/context'; // Adjust the path according to your project structure
import SummaryApi from '../common';

const MyAccount = () => {
    const { userDetails } = useContext(Context);
    const [userData, setUserData] = useState({
        name: '',
        streetAddress: '',
        zipCode: '',
        phoneNumber: ''
    });

    useEffect(() => {
        if (userDetails) {
            setUserData({
                name: userDetails.name || '',
                streetAddress: userDetails.streetAddress || '',
                zipCode: userDetails.zipCode || '',
                phoneNumber: userDetails.phoneNumber || ''
            });
        }
    }, [userDetails]);

    const handleOnChange = (e) => {
        const { name, value } = e.target;
        setUserData(prevData => ({
            ...prevData,
            [name]: value
        }));
    };

    const handleSubmitDetails = async (e) => {
        e.preventDefault();

        if (!userDetails?._id) {
            toast.error('User ID is missing. Please try again.');
            return;
        }

        try {
            const response = await fetch(SummaryApi.updateUser.url, {
                method: SummaryApi.updateUser.method,
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ ...userData, userId: userDetails._id }) // Ensure userId is sent
            });

            const data = await response.json();
            if (data.success) {
                toast.success(data.message);
                // Optionally update context or other state after successful update
            } else {
                toast.error(data.message);
            }
        } catch (error) {
            console.error('Error updating user details:', error);
            toast.error('Failed to update user details. Please try again.');
        }
    };

    return (
        <section id='my-account'>
            <div className='mx-auto container p-4'>
                <div className='bg-white p-5 w-full max-w-md mx-auto'>
                    <h2 className='text-2xl font-semibold mb-4'>My Account</h2>
                    <form className='pt-6 flex flex-col gap-2' onSubmit={handleSubmitDetails}>
                        <div className='grid'>
                            <label>Name:</label>
                            <div className='bg-slate-100 p-2'>
                                <input
                                    type='text'
                                    placeholder='Enter name'
                                    name='name'
                                    value={userData.name}
                                    onChange={handleOnChange}
                                    className='w-full h-full outline-none bg-transparent'
                                />
                            </div>
                        </div>
                        <div className='grid'>
                            <label>Street Address:</label>
                            <div className='bg-slate-100 p-2'>
                                <input
                                    type='text'
                                    placeholder='Enter street address'
                                    name='streetAddress'
                                    value={userData.streetAddress}
                                    onChange={handleOnChange}
                                    className='w-full h-full outline-none bg-transparent'
                                />
                            </div>
                        </div>
                        <div className='grid'>
                            <label>ZIP Code:</label>
                            <div className='bg-slate-100 p-2'>
                                <input
                                    type='text'
                                    placeholder='Enter ZIP code'
                                    name='zipCode'
                                    value={userData.zipCode}
                                    onChange={handleOnChange}
                                    className='w-full h-full outline-none bg-transparent'
                                />
                            </div>
                        </div>
                        <div className='grid'>
                            <label>Phone Number:</label>
                            <div className='bg-slate-100 p-2'>
                                <input
                                    type='text'
                                    placeholder='Enter phone number'
                                    name='phoneNumber'
                                    value={userData.phoneNumber}
                                    onChange={handleOnChange}
                                    className='w-full h-full outline-none bg-transparent'
                                />
                            </div>
                        </div>
                        <button className='bg-gray-600 hover:bg-gray-700 text-white px-2 py-2 w-full max-w-[150px] hover:scale-110 transition-all mx-auto block mt-6'>Update Details</button>
                    </form>
                </div>
            </div>
        </section>
    );
};

export default MyAccount;
