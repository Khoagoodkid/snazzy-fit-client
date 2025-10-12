"use client"

import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Edit, Trash2, Plus } from "lucide-react"
import { useCallback, useEffect, useState } from "react"
import { useAddressService } from "@/services/client/address/useAddressService"
import { Address, CreateAddressRequest } from "@/types/address/address.interface"
import { useDispatch } from "react-redux"
import { showAlert } from "@/lib/features/alert/alertSlice"
import { toast } from "react-toastify"

export default function ManageAddress() {
    const [showAddForm, setShowAddForm] = useState(false)
    const [editingAddress, setEditingAddress] = useState<string | null>(null)
    const { getAddresses, createAddress, updateAddress, deleteAddress } = useAddressService()
    const [addresses, setAddresses] = useState<Address[]>([])
    const dispatch = useDispatch()

    const [newAddress, setNewAddress] = useState<CreateAddressRequest>({
        customer_first_name: "",
        customer_last_name: "",
        company_name: "",
        country: "",
        address: "",
        city: "",
        state: "",
        zip: "",
        phone: "",
    })

    const [editAddress, setEditAddress] = useState<CreateAddressRequest>({
        customer_first_name: "",
        customer_last_name: "",
        company_name: "",
        country: "",
        address: "",
        city: "",
        state: "",
        zip: "",
        phone: "",
    })

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target
        setNewAddress(prev => ({
            ...prev,
            [name]: value
        }))
    }

    const handleEditInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target
        setEditAddress(prev => ({
            ...prev,
            [name]: value
        }))
    }

    const handleGetAddresses = useCallback(async () => {
        try {
            const response = await getAddresses()
            setAddresses(response.data)
        } catch (error) {
            toast.error((error as Error).message)
        }
    }, [getAddresses])

    useEffect(() => {
        handleGetAddresses()
    }, [handleGetAddresses])

    const handleAddAddress = useCallback(async () => {

        try {
            console.log(newAddress)
            const response = await createAddress(newAddress)
            setAddresses((prev) => [...prev, response.data])

            setNewAddress({
                customer_first_name: "",
                customer_last_name: "",
                company_name: "",
                country: "",
                address: "",
                city: "",
                state: "",
                zip: "",
                phone: "",
            })
            setShowAddForm(false)
        } catch (error) {
            toast.error((error as Error).message)
        }
    }, [])

    const handleDeleteAddress = useCallback((id: string) => {
        try {
            dispatch(showAlert({
                title: "Address deleted successfully",
                type: "success",
                message: "Address deleted successfully",
                onConfirm: async () => {
                    try {
                        await deleteAddress(id)
                        setAddresses(addresses.filter(addr => addr.id !== id))
                    } catch (error) {
                        console.error(error)
                    }
                }
            }))
        } catch (error) {
            toast.error((error as Error).message)
        }
    }, [deleteAddress, setAddresses])

    const handleEditAddress = useCallback((id: string) => {
        const addressToEdit = addresses.find(addr => addr.id === id)
        if (addressToEdit) {
            setEditAddress({
                customer_first_name: addressToEdit.customer_first_name,
                customer_last_name: addressToEdit.customer_last_name,
                company_name: addressToEdit.company_name || "",
                country: addressToEdit.country,
                address: addressToEdit.address,
                city: addressToEdit.city,
                state: addressToEdit.state,
                zip: addressToEdit.zip,
                phone: addressToEdit.phone,
            })
            setEditingAddress(id)
        }
    }, [addresses])

    const handleUpdateAddress = useCallback(async () => {
        if (!editingAddress) return

        try {
            const updateData = {
                ...editAddress,
                id: editingAddress
            }
            const response = await updateAddress(updateData)
            setAddresses(addresses.map(addr =>
                addr.id === editingAddress ? response.data : addr
            ))
            setEditingAddress(null)
            setEditAddress({
                customer_first_name: "",
                customer_last_name: "",
                company_name: "",
                country: "",
                address: "",
                city: "",
                state: "",
                zip: "",
                phone: "",
            })
            toast.success("Address updated successfully!")
        } catch (error) {
            toast.error((error as Error).message)
        }
    }, [editingAddress, editAddress, updateAddress, addresses])

    const handleCancelEdit = () => {
        setEditingAddress(null)
        setEditAddress({
            customer_first_name: "",
            customer_last_name: "",
            company_name: "",
            country: "",
            address: "",
            city: "",
            state: "",
            zip: "",
            phone: "",
        })
    }

    return (
        <div className="space-y-6">
            {/* Existing Addresses */}
            <div className="space-y-4">
                <h2 className="text-xl font-semibold text-gray-800">Existing Addresses</h2>
                {addresses.map((address) => (
                    <div key={address.id} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                        <div>
                            <p className="font-medium text-gray-900">{address.customer_first_name} {address.customer_last_name}</p>
                            <p className="text-gray-600">{address.address}, {address.city}, {address.state}, {address.country},  {address.zip}</p>
                        </div>
                        <div className="flex items-center space-x-2">
                            <Button
                                variant="ghost"
                                size="sm"
                                className="text-green-600 hover:text-green-700 hover:bg-green-50"
                                onClick={() => handleEditAddress(address.id)}
                                disabled={editingAddress !== null}
                            >
                                <Edit className="w-4 h-4 mr-1" />
                                Edit
                            </Button>
                            <Button
                                variant="ghost"
                                size="sm"
                                className="text-red-600 hover:text-red-700 hover:bg-red-50"
                                onClick={() => handleDeleteAddress(address.id)}
                                disabled={editingAddress !== null}
                            >
                                <Trash2 className="w-4 h-4 mr-1" />
                                Delete
                            </Button>
                        </div>
                    </div>
                ))}
            </div>

            {/* Edit Address Form */}
            {editingAddress && (
                <div className="space-y-6">
                    <div className="flex items-center justify-between">
                        <h2 className="text-xl font-semibold text-gray-800">Edit Address</h2>
                        <Button
                            onClick={handleCancelEdit}
                            variant="outline"
                            className="text-gray-600 hover:text-gray-700"
                        >
                            Cancel
                        </Button>
                    </div>

                    <div className="space-y-4 p-6 border border-gray-200 rounded-lg bg-blue-50">
                        <div className="grid md:grid-cols-2 gap-4">
                            {/* First Name */}
                            <div>
                                <label htmlFor="edit_firstName" className="block text-sm font-medium text-gray-700 mb-2">
                                    First Name *
                                </label>
                                <Input
                                    id="edit_customer_first_name"
                                    name="customer_first_name"
                                    type="text"
                                    value={editAddress.customer_first_name}
                                    onChange={handleEditInputChange}
                                    className="w-full border border-gray-300"
                                    placeholder="Ex. John"
                                />
                            </div>

                            {/* Last Name */}
                            <div>
                                <label htmlFor="edit_lastName" className="block text-sm font-medium text-gray-700 mb-2">
                                    Last Name *
                                </label>
                                <Input
                                    id="edit_customer_last_name"
                                    name="customer_last_name"
                                    type="text"
                                    value={editAddress.customer_last_name}
                                    onChange={handleEditInputChange}
                                    className="w-full border border-gray-300"
                                    placeholder="Ex. Doe"
                                />
                            </div>
                        </div>

                        {/* Company Name */}
                        <div>
                            <label htmlFor="edit_companyName" className="block text-sm font-medium text-gray-700 mb-2">
                                Company Name (Optional)
                            </label>
                            <Input
                                id="edit_company_name"
                                name="company_name"
                                type="text"
                                value={editAddress.company_name}
                                onChange={handleEditInputChange}
                                className="w-full border border-gray-300"
                                placeholder="Enter Company Name"
                            />
                        </div>

                        {/* Country */}
                        <div>
                            <label htmlFor="edit_country" className="block text-sm font-medium text-gray-700 mb-2">
                                Country *
                            </label>
                            <Input
                                id="country"
                                name="country"
                                type="text"
                                value={editAddress.country}
                                onChange={handleEditInputChange}
                                className="w-full border border-gray-300"
                                placeholder="Enter Country"
                            />
                        </div>

                        {/* Street Address */}
                        <div>
                            <label htmlFor="edit_streetAddress" className="block text-sm font-medium text-gray-700 mb-2">
                                Street Address *
                            </label>
                            <Input
                                id="edit_address"
                                name="address"
                                type="text"
                                value={editAddress.address}
                                onChange={handleEditInputChange}
                                className="w-full border border-gray-300"
                                placeholder="Enter Street Address"
                            />
                        </div>

                        <div className="grid md:grid-cols-3 gap-4">
                            {/* City */}
                            <div>
                                <label htmlFor="edit_city" className="block text-sm font-medium text-gray-700 mb-2">
                                    City *
                                </label>
                                <Input
                                    id="edit_city"
                                    name="city"
                                    type="text"
                                    value={editAddress.city}
                                    onChange={handleEditInputChange}
                                    className="w-full border border-gray-300"
                                    placeholder="Enter City"
                                />
                            </div>

                            {/* State */}
                            <div>
                                <label htmlFor="edit_state" className="block text-sm font-medium text-gray-700 mb-2">
                                    State *
                                </label>
                                <Input
                                    id="edit_state"
                                    name="state"
                                    type="text"
                                    value={editAddress.state}
                                    onChange={handleEditInputChange}
                                    className="w-full border border-gray-300"
                                    placeholder="Enter State"
                                />
                            </div>

                            {/* Zip Code */}
                            <div>
                                <label htmlFor="edit_zipCode" className="block text-sm font-medium text-gray-700 mb-2">
                                    Zip Code *
                                </label>
                                <Input
                                    id="edit_zip"
                                    name="zip"
                                    type="text"
                                    value={editAddress.zip}
                                    onChange={handleEditInputChange}
                                    className="w-full border border-gray-300"
                                    placeholder="Enter Zip Code"
                                />
                            </div>
                        </div>

                        {/* Phone */}
                        <div>
                            <label htmlFor="edit_phone" className="block text-sm font-medium text-gray-700 mb-2">
                                Phone *
                            </label>
                            <Input
                                id="edit_phone"
                                name="phone"
                                type="text"
                                value={editAddress.phone}
                                onChange={handleEditInputChange}
                                className="w-full border border-gray-300"
                                placeholder="Enter Phone Number"
                            />
                        </div>

                        {/* Update Address Button */}
                        <div className="pt-4 flex gap-3">
                            <Button
                                onClick={handleUpdateAddress}
                                className="bg-green-600 hover:bg-green-700 text-white px-8 py-3 rounded-lg font-medium"
                            >
                                Update Address
                            </Button>
                            <Button
                                onClick={handleCancelEdit}
                                variant="outline"
                                className="px-8 py-3 rounded-lg font-medium"
                            >
                                Cancel
                            </Button>
                        </div>
                    </div>
                </div>
            )}

            {/* Add New Address Form */}
            <div className="space-y-6">
                <div className="flex items-center justify-between">
                    <h2 className="text-xl font-semibold text-gray-800">Add New Address</h2>
                    <Button
                        onClick={() => setShowAddForm(!showAddForm)}
                        className={`  ${showAddForm ? "bg-transparent text-black border border-gray-300 hover:bg-gray-100" : "bg-green-600 hover:bg-green-700"} `}
                        disabled={editingAddress !== null}
                    >
                        {!showAddForm && <Plus className="w-4 h-4 mr-2" /> }
                        {showAddForm ? "Cancel" : "Add Address"}
                    </Button>
                </div>

                {showAddForm && (
                    <div className="space-y-4 p-6 border border-gray-200 rounded-lg bg-gray-50">
                        <div className="grid md:grid-cols-2 gap-4">
                            {/* First Name */}
                            <div>
                                <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 mb-2">
                                    First Name *
                                </label>
                                <Input
                                    id="customer_first_name"
                                    name="customer_first_name"
                                    type="text"
                                    value={newAddress.customer_first_name}
                                    onChange={handleInputChange}
                                    className="w-full border border-gray-300"
                                    placeholder="Ex. John"
                                />
                            </div>

                            {/* Last Name */}
                            <div>
                                <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 mb-2">
                                    Last Name *
                                </label>
                                <Input
                                    id="customer_last_name"
                                    name="customer_last_name"
                                    type="text"
                                    value={newAddress.customer_last_name}
                                    onChange={handleInputChange}
                                    className="w-full border border-gray-300"
                                    placeholder="Ex. Doe"
                                />
                            </div>
                        </div>

                        {/* Company Name */}
                        <div>
                            <label htmlFor="companyName" className="block text-sm font-medium text-gray-700 mb-2">
                                Company Name (Optional)
                            </label>
                            <Input
                                id="company_name"
                                name="company_name"
                                type="text"
                                value={newAddress.company_name}
                                onChange={handleInputChange}
                                className="w-full border border-gray-300"
                                placeholder="Enter Company Name"
                            />
                        </div>

                        {/* Country */}
                        <div>
                            <label htmlFor="country" className="block text-sm font-medium text-gray-700 mb-2">
                                Country *
                            </label>
                            <Input
                                id="country"
                                name="country"
                                type="text"
                                value={newAddress.country}
                                onChange={handleInputChange}
                                className="w-full border border-gray-300"
                                placeholder="Enter Country"
                            />
                        </div>

                        {/* Street Address */}
                        <div>
                            <label htmlFor="streetAddress" className="block text-sm font-medium text-gray-700 mb-2">
                                Street Address *
                            </label>
                            <Input
                                id="address"
                                name="address"
                                type="text"
                                value={newAddress.address}
                                onChange={handleInputChange}
                                className="w-full border border-gray-300"
                                placeholder="Enter Street Address"
                            />
                        </div>

                        <div className="grid md:grid-cols-3 gap-4">
                            {/* City */}
                            <div>
                                <label htmlFor="city" className="block text-sm font-medium text-gray-700 mb-2">
                                    City *
                                </label>
                                <Input
                                    id="city"
                                    name="city"
                                    type="text"
                                    value={newAddress.city}
                                    onChange={handleInputChange}
                                    className="w-full border border-gray-300"
                                    placeholder="Enter City"
                                />

                            </div>

                            {/* State */}
                            <div>
                                <label htmlFor="state" className="block text-sm font-medium text-gray-700 mb-2">
                                    State *
                                </label>
                                <Input
                                    id="state"
                                    name="state"
                                    type="text"
                                    value={newAddress.state}
                                    onChange={handleInputChange}
                                    className="w-full border border-gray-300"
                                    placeholder="Enter State"
                                />
                            </div>

                            {/* Zip Code */}
                            <div>
                                <label htmlFor="zipCode" className="block text-sm font-medium text-gray-700 mb-2">
                                    Zip Code *
                                </label>
                                <Input
                                    id="zip"
                                    name="zip"
                                    type="text"
                                    value={newAddress.zip}
                                    onChange={handleInputChange}
                                    className="w-full border border-gray-300"
                                    placeholder="Enter Zip Code"
                                />
                            </div>
                        </div>

                        {/* Phone */}
                        <div>
                            <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
                                Phone *
                            </label>
                            <Input
                                id="phone"
                                name="phone"
                                type="text"
                                value={newAddress.phone}
                                onChange={handleInputChange}
                                className="w-full border border-gray-300"
                                placeholder="Enter Phone Number"
                            />
                        </div>



                        {/* Add Address Button */}
                        <div className="pt-4">
                            <Button
                                onClick={handleAddAddress}
                                className="bg-green-600 hover:bg-green-700 text-white px-8 py-3 rounded-lg font-medium"
                            >
                                Add Address
                            </Button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}
