import React, { useEffect, useState } from 'react';
import { Link } from 'react-router';
import Swal from 'sweetalert2';
import { FaPlus, FaTrash } from 'react-icons/fa';
import useAxiosSecure from '../Hooks/useAxiosSecure';

const ContentManagement = () => {
    const axiosSecure = useAxiosSecure();
    const [blogs, setBlogs] = useState([]);

    useEffect(() => {
        axiosSecure.get('/all-blogs') // Needs verifyToken/verifyVolunteer on backend
            .then(res => setBlogs(res.data));
    }, [axiosSecure]);

    const handleStatusToggle = (id, currentStatus) => {
        const newStatus = currentStatus === 'draft' ? 'published' : 'draft';
        
        axiosSecure.patch(`/blogs/status/${id}`, { status: newStatus })
            .then(res => {
                if (res.data.modifiedCount > 0) {
                    setBlogs(prev => prev.map(b => b._id === id ? { ...b, status: newStatus } : b));
                    Swal.fire("Success", `Blog is now ${newStatus}`, "success");
                }
            });
    };

    const handleDelete = (id) => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        }).then((result) => {
            if (result.isConfirmed) {
                axiosSecure.delete(`/blogs/${id}`).then(res => {
                    if (res.data.deletedCount > 0) {
                        setBlogs(prev => prev.filter(b => b._id !== id));
                        Swal.fire("Deleted!", "Blog has been removed.", "success");
                    }
                });
            }
        });
    };

    return (
        <div className="p-8">
            <div className="flex justify-between items-center mb-8">
                <h2 className="text-3xl font-bold">Content Management</h2>
                <Link to="/dashboard/content-management/add-blog" className="btn btn-secondary text-white">
                    <FaPlus /> Add Blog
                </Link>
            </div>

            <div className="bg-white rounded-xl shadow overflow-hidden">
                <table className="table w-full">
                    <thead className="bg-gray-100">
                        <tr>
                            <th>Image</th>
                            <th>Title</th>
                            <th>Status</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {blogs.map(blog => (
                            <tr key={blog._id}>
                                <td>
                                    <img src={blog.image} alt="" className="w-16 h-10 object-cover rounded" />
                                </td>
                                <td className="font-semibold">{blog.title}</td>
                                <td>
                                    <div className={`badge ${blog.status === 'published' ? 'badge-success' : 'badge-ghost'} text-white uppercase text-xs font-bold`}>
                                        {blog.status}
                                    </div>
                                </td>
                                <td>
                                    <div className="flex gap-2">
                                        <button 
                                            onClick={() => handleStatusToggle(blog._id, blog.status)}
                                            className="btn btn-xs btn-outline"
                                        >
                                            {blog.status === 'draft' ? 'Publish' : 'Unpublish'}
                                        </button>
                                        <button onClick={() => handleDelete(blog._id)} className="btn btn-xs btn-error text-white">
                                            <FaTrash />
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default ContentManagement;