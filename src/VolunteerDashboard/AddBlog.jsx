import React from 'react';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router';
import useAxiosSecure from '../Hooks/useAxiosSecure';

const AddBlog = () => {
    const navigate = useNavigate();
    const axiosSecure = useAxiosSecure();
    const handleAddBlog = async (e) => {
        e.preventDefault();
        const form = e.target;
        
        const blogData = {
            title: form.title.value,
            image: form.image.value,
            content: form.content.value,
            status: 'draft', // New blogs always start as drafts
            createdAt: new Date().toISOString()
        };

        try {
            const res = await axiosSecure.post('/blogs', blogData);
            if (res.data.insertedId) {
                Swal.fire({
                    title: "Success!",
                    text: "Blog created as a draft.",
                    icon: "success",
                    confirmButtonColor: "#ef4444"
                });
                // Send the user back to the management list
                navigate('/dashboard/content-management');
            }
        } catch {
            Swal.fire("Error", "Could not create blog", "error");
        }
    };

    return (
        <div className="p-4 md:p-10 bg-gray-50 min-h-screen">
            <div className="max-w-3xl mx-auto bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
                <h2 className="text-3xl font-extrabold text-gray-800 mb-2">Create New Blog</h2>
                <p className="text-gray-500 mb-8">Share stories or info about blood donation.</p>

                <form onSubmit={handleAddBlog} className="space-y-6">
                    {/* Title */}
                    <div className="form-control">
                        <label className="label font-bold text-gray-700">Blog Title</label>
                        <input name="title" type="text" placeholder="e.g. Why Donate Blood?" className="input input-bordered focus:ring-2 focus:ring-red-500" required />
                    </div>

                    {/* Image URL */}
                    <div className="form-control">
                        <label className="label font-bold text-gray-700">Thumbnail Image URL</label>
                        <input name="image" type="text" placeholder="https://images.unsplash.com/..." className="input input-bordered" required />
                    </div>

                    {/* Content */}
                    <div className="form-control">
                        <label className="label font-bold text-gray-700">Content</label>
                        <textarea name="content" className="textarea textarea-bordered h-48 text-base" placeholder="Write your article here..." required></textarea>
                    </div>

                    {/* Buttons */}
                    <div className="flex gap-4 pt-4">
                        <button type="submit" className="btn btn-error flex-1 text-white">Save as Draft</button>
                        <button type="button" onClick={() => navigate(-1)} className="btn btn-ghost border-gray-300">Cancel</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AddBlog;