import React, { useState, useEffect, useRef } from 'react'
import { v4 as uuidv4 } from 'uuid';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Manager = () => {
    const [form, setForm] = useState({ site: '', username: '', password: '' });
    const [passwords, setPasswords] = useState([]);
    const eyecrossRef = useRef();
    const [showPass, setShowPass] = useState(false);

    useEffect(() => {
        const storedPasswords = JSON.parse(localStorage.getItem('passwords')) || [];
        setPasswords(storedPasswords);
    }, []);

    const togglePassword = () => {
        setShowPass(prev => !prev);
    };


    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm((prevForm) => ({ ...prevForm, [name]: value }));
    };

    const savePassword = () => {
        if (form.site.length > 3 && form.username.length > 3 && form.password.length > 3) {
            setPasswords([...passwords, { ...form, id: uuidv4() }]);
            console.log([...passwords, { ...form, id: uuidv4() }])
            setForm({ site: '', username: '', password: '' });
            localStorage.setItem('passwords', JSON.stringify([...passwords, { ...form, id: uuidv4() }]));
            toast('🦄 Password Saved!', {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light"
                // transition: Bounce,
            });
        } else {
            alert('Please fill all fields');
        }
    }
    const deletePasswords = (id) => {
        const updatedPasswords = passwords.filter((e) => e.id !== id);
        setPasswords(updatedPasswords);
        localStorage.setItem('passwords', JSON.stringify(updatedPasswords));
        toast.warn('password deleted!', {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
        });
    };
    const editPassword = (id) => {
        const confirm = window.confirm('Are you sure you want to edit this password?');
        if (confirm) {
            const passwordToEdit = passwords.find((e) => e.id === id);
            if (passwordToEdit) {
                setForm({ site: passwordToEdit.site, username: passwordToEdit.username, password: passwordToEdit.password });
                const updatedPasswords = passwords.filter((e) => e.id !== id);
                setPasswords(updatedPasswords);
                localStorage.setItem('passwords', JSON.stringify(updatedPasswords));
            }
        }
        else {
            toast.error('Edit cancelled!', {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            });
        }
    };
    const copyText = (text) => {
        navigator.clipboard.writeText(text);
        toast.success('Copied to clipboard!', {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
        });

    }
    return (
        <div>
            <ToastContainer
                position="top-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick={false}
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light"
            // transition="Bounce"
            />
            <div className="absolute inset-0 -z-10 h-full w-full bg-white bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px]"><div className="absolute left-0 right-0 top-0 -z-10 m-auto h-[310px] w-[310px] rounded-full bg-fuchsia-400 opacity-20 blur-[100px]"></div></div>
            <div className='w-full lg:w-3/4 h-[61.2vh] mx-auto bg-white p-6 rounded-lg shadow-md overflow-y-auto scrollbar-hide overflow-x-visible scrollbar-thin'>
                <div className='flex justify-between items-center mb-2 md:mb-4 w-full'>
                    <input onChange={handleChange} placeholder='Enter Website name' value={form.site} className='border border-purple-400 p-2 rounded-3xl w-full' type="text" name="site" id="site" />
                </div>
                <div className='flex flex-col md:flex-row justify-between items-center mb-4 w-full gap-2'>
                    <input onChange={handleChange} placeholder='Enter your Username' value={form.username} className='border border-purple-400 p-2 rounded-3xl md:w-3/4 w-full' type="text" name="username" id="username" />
                    <div className='relative md:w-1/4 w-full'>
                        <input onChange={handleChange} placeholder='Enter your Password' value={form.password} className='border border-purple-400 p-2 rounded-3xl w-full relative' type={showPass ? 'text' : 'password'} name="password" id="password" />
                        <span onClick={togglePassword} className='absolute right-2 top-3 cursor-pointer'>
                            <img ref={eyecrossRef} width={15} src={showPass ? "icons/eye.png" : "icons/eyecross.png"} alt="eyecross" /></span>
                    </div>
                </div>
                <div className='flex justify-center items-center mb-4 w-full gap-2'>
                    <button onClick={savePassword} className='bg-purple-500 text-white px-7 py-2 flex items-center  rounded-3xl hover:bg-purple-600 transition-all duration-300 ease-in-out'>
                        <span className='cursor-pointer'><lord-icon
                            src="https://cdn.lordicon.com/jgnvfzqg.json"
                            trigger="hover" >
                        </lord-icon>
                        </span><span> Save</span>
                    </button>
                </div>
                <div>
                    <h2 className='text-lg text-purple-500 font-bold mb-4'>Saved Passwords</h2>
                    <table className=" max-md:block max-md:mx-auto md:table-auto w-full mb-2 h-1/2 overflow-auto">
                        <thead className='bg-purple-500 text-white'>
                            <tr className='text-left '>
                                <th>Website</th>
                                <th>Username</th>
                                <th>Password</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {passwords.length === 0 && (
                                <tr className='w-full'>
                                    <td colSpan="4" className="text-center py-4">No saved passwords</td>
                                </tr>
                            )}
                            {passwords.map((e, index) => {
                                return (
                                    <tr className='text-left min-h-2 overflow-x-auto text-wrap' key={index}>
                                        <td className="break-words px-2 py-4 whitespace-normal overflow-hidden text-wrap w-1/4 lg:max-w-[250px]">
                                            <div className='flex justify-start items-center relative'>
                                                <span className='overflow-x-auto'> <a href={e.site} target='_blank'>{e.site}</a></span>
                                                <div className='lordiconcopy opacity-50 size-7 cursor-pointer absolute right-[-6px]' onClick={() => { copyText(e.site) }}>
                                                    <lord-icon
                                                        style={{ "width": "25px", "height": "25px", "paddingTop": "3px", "paddingLeft": "3px" }}
                                                        src="https://cdn.lordicon.com/iykgtsbt.json"
                                                        trigger="hover" >
                                                    </lord-icon>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="break-words px-2 py-4 whitespace-normal  text-wrap w-1/4 lg:max-w-[250px]">
                                            <div className='flex justify-start items-center relative'>
                                                <span className='overflow-x-auto'> {e.username}</span>
                                                <div className='lordiconcopy opacity-50 size-7 cursor-pointer absolute right-[-6px]' onClick={() => { copyText(e.username) }}>
                                                    <lord-icon
                                                        style={{ "width": "25px", "height": "25px", "paddingTop": "3px", "paddingLeft": "3px" }}
                                                        src="https://cdn.lordicon.com/iykgtsbt.json"
                                                        trigger="hover" >
                                                    </lord-icon>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="break-words px-2 py-4 whitespace-normal text-wrap w-1/4 lg:max-w-[250px]">
                                            <div className='flex justify-start items-center relative'>
                                                <span className='overflow-x-auto'> {"*".repeat(e.password.length)}</span>
                                                <div className='lordiconcopy opacity-50 size-7 cursor-pointer absolute right-[-6px]' onClick={() => { copyText(e.password) }}>
                                                    <lord-icon
                                                        style={{ "width": "25px", "height": "25px", "paddingTop": "3px", "paddingLeft": "3px" }}
                                                        src="https://cdn.lordicon.com/iykgtsbt.json"
                                                        trigger="hover" >
                                                    </lord-icon>
                                                </div>
                                            </div>
                                        </td>
                                        <td className='flex px-2 py-4 justify-center items-center w-1/4 lg:w-[160px]'>
                                            <button onClick={() => editPassword(e.id)} className=' text-white rounded-3xl mr-2'>

                                                <lord-icon
                                                    src="https://cdn.lordicon.com/exymduqj.json"
                                                    trigger="hover"
                                                    colors="primary:#4f1091,secondary:#8930e8"
                                                    style={{ "width": "40px", "height": "40px" }}>
                                                </lord-icon>
                                            </button>
                                            <button onClick={() => deletePasswords(e.id)} className=' text-white rounded-3xl'><lord-icon
                                                src="https://cdn.lordicon.com/jzinekkv.json"
                                                trigger="hover"
                                                colors="primary:#4f1091,secondary:#8930e8"
                                                style={{ "width": "40px", "height": "40px" }}>
                                            </lord-icon></button>
                                        </td>
                                    </tr>
                                )
                            })}
                        </tbody>
                    </table>
                </div>

            </div>
        </div>




    )
}

export default Manager




