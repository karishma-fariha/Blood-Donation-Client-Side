import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../Provider/AuthContext';
import { toast } from 'react-toastify';
import { updateProfile } from 'firebase/auth';
import axios from 'axios';

const MyProfile = () => {
    const { user } = useContext(AuthContext);
    const [isEditable, setIsEditable] = useState(false);
    const [loading, setLoading] = useState(true);

    
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        bloodGroup: "",
        district: "",
        upazila: "",
        avatar: ""
    });

   useEffect(() => {
    if (user?.email) {
        axios.get(`http://localhost:5000/users/${user.email}`)
            .then(res => {
                
                setFormData({
                    name: res.data.name || user.displayName || "",
                    email: res.data.email || user.email || "",
                    bloodGroup: res.data.bloodGroup || "",
                    district: res.data.district || "",
                    upazila: res.data.upazila || "",
                    avatar: res.data.avatar || user.photoURL || ""
                });
                setLoading(false);
            })
            .catch(err => {
                console.error("Error fetching user:", err);
                setLoading(false);
                setFormData(prev => ({
                    ...prev,
                    name: user.displayName,
                    email: user.email,
                    avatar: user.photoURL
                }));
            });
    }
}, [user]);

    const handleSave = async (e) => {
        e.preventDefault();
        
        try {
            await updateProfile(user, {
                displayName: formData.name,
                photoURL: formData.avatar,
            });
            const response = await axios.patch(`http://localhost:5000/users/${user.email}`, formData);

            if (response.data.modifiedCount > 0 || response.data.upsertedCount > 0) {
                toast("Profile updated successfully!");
                setIsEditable(false); 
            }
        } catch (error) {
            console.log(error);
            toast("Failed to update profile");
        }
    };

    if (loading) return <span className="loading loading-bars loading-lg"></span>;

    return (
        <div className="p-8 max-w-4xl mx-auto bg-white rounded-xl shadow-md">
            <div className="flex justify-between items-center border-b pb-4 mb-6">
                <h1 className="text-3xl font-bold text-gray-800">My Profile</h1>
                {!isEditable ? (
                    <button 
                        onClick={() => setIsEditable(true)}
                        className="btn btn-secondary px-8"
                    >
                        Edit Profile
                    </button>
                ) : (
                    <button 
                        onClick={() => setIsEditable(false)}
                        className="btn btn-outline btn-error"
                    >
                        Cancel
                    </button>
                )}
            </div>

            <form onSubmit={handleSave} className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="md:col-span-2 flex justify-center mb-4">
                    <img 
                        src={formData.avatar} 
                        alt="Avatar" 
                        className="w-32 h-32 rounded-full border-4 border-primary object-cover" 
                    />
                </div>

               
                {/* name */}
                <div className="">
                      <label className="label font-semibold">Name</label><br />
                    <input 
                        type="text" 
                        className="input input-bordered"
                        value={formData.name}
                        onChange={(e) => setFormData({...formData, name: e.target.value})}
                        disabled={!isEditable}
                    />
                </div>
                    
               

                {/* Email (Always Disabled) */}
                <div className="">
                    
                    <label className="label font-semibold">Email</label><br />
                    <input 
                        type="email" 
                        className="input input-bordered bg-gray-100"
                        value={formData.email}
                        disabled={true} 
                    />
                </div>
                

                {/* Blood Group */}
   
                   <div className="">
                     <label className="label font-semibold">Blood Group</label><br />
                    <select 
                        className="select select-bordered"
                        value={formData.bloodGroup}
                        onChange={(e) => setFormData({...formData, bloodGroup: e.target.value})}
                        disabled={!isEditable}
                    >
                        {['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'].map(bg => (
                            <option key={bg} value={bg}>{bg}</option>
                        ))}
                    </select>
                   </div>
               

                {/* District */}
                <div >
                    <label className="label font-semibold">District</label><br />
                    <input 
                        type="text" 
                        className="input input-bordered"
                        value={formData.district}
                        onChange={(e) => setFormData({...formData, district: e.target.value})}
                        disabled={!isEditable}
                    />
                </div>

                {/* Upazila */}
                <div>
                    <label className="label font-semibold">Upazila</label><br />
                    <input 
                        type="text" 
                        className="input input-bordered"
                        value={formData.upazila}
                        onChange={(e) => setFormData({...formData, upazila: e.target.value})}
                        disabled={!isEditable}
                    />
                </div>

                {/* Avatar URL */}
                <div>
                    <label className="label font-semibold">Avatar URL</label><br />
                    <input 
                        type="text" 
                        className="input input-bordered"
                        value={formData.avatar}
                        onChange={(e) => setFormData({...formData, avatar: e.target.value})}
                        disabled={!isEditable}
                    />
                </div>

                {/* Save Button */}
                {isEditable && (
                    <div className="md:col-span-2 mt-6">
                        <button type="submit" className="btn btn-primary w-full text-lg">
                            Save Updated Data
                        </button>
                    </div>
                )}
            </form>
        </div>
    );
};

export default MyProfile;