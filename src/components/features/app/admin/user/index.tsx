"use client"

import React, { useEffect, useState } from "react"
import { useUserService } from "@/services/client/user/useUserService"
import { User } from "@/types/user/user.interface"
import { DataTable } from "@/components/ui/data-table/data-table"
import { ColumnDef } from "@tanstack/react-table"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
    Users as UsersIcon,
    Shield,
    UserCheck,
    UserX,
    Eye,
    Trash2,
    BarChart3
} from "lucide-react"
import { toast } from "react-toastify"
import { format } from "date-fns"
import UserAvatar from "@/components/ui/user-avatar"

export default function UserManagement() {
    const { getAllUsersForAdmin, isLoading } = useUserService()
    const [users, setUsers] = useState<User[]>([])
    const [searchValue, setSearchValue] = useState("")

    // Fetch users on mount
    useEffect(() => {
        fetchUsers()
    }, [])

    // Fetch users function
    const fetchUsers = async () => {
        try {
            const response = await getAllUsersForAdmin()
            setUsers(response?.data || [])
        } catch (error) {
            toast.error((error as Error).message || "Failed to fetch users")
        }
    }

    // Handle delete selected users
    const handleDeleteSelected = async (selectedUsers: User[]) => {
        toast.info("Delete functionality will be implemented soon")
        console.log("Delete users:", selectedUsers)
    }

    // Handle view user
    const handleViewUser = (userId: string) => {
        window.open(`/admin/user/${userId}`, '_blank')
    }

    // Get role badge styling
    const getRoleBadge = (role: string) => {
        const roleColors: Record<string, string> = {
            ADMIN: "bg-gradient-to-r from-purple-500 to-pink-500 text-white hover:from-purple-600 hover:to-pink-600",
            USER: "bg-gradient-to-r from-cyan-500 to-teal-500 text-white hover:from-cyan-600 hover:to-teal-600",
            MODERATOR: "bg-gradient-to-r from-amber-500 to-orange-500 text-white hover:from-amber-600 hover:to-orange-600",
        }

        return (
            <Badge className={roleColors[role] || "bg-slate-500 text-white hover:bg-slate-600"}>
                <Shield className="w-3 h-3 mr-1" />
                {role}
            </Badge>
        )
    }

    // Get provider badge
    const getProviderBadge = (provider: string) => {
        const providerColors: Record<string, string> = {
            LOCAL: "bg-slate-100 text-slate-800 border-slate-200",
            GOOGLE: "bg-red-50 text-red-700 border-red-200",
            FACEBOOK: "bg-blue-50 text-blue-700 border-blue-200",
        }

        return (
            <Badge variant="outline" className={providerColors[provider] || "bg-gray-100 text-gray-800 border-gray-200"}>
                {provider}
            </Badge>
        )
    }

    // Calculate statistics
    const stats = {
        total: users.length,
        admin: users.filter(u => u.role?.name === "ADMIN").length,
        user: users.filter(u => u.role?.name === "USER").length,
        google: users.filter(u => u.provider === "GOOGLE").length,
    }

    // Define columns
    const columns: ColumnDef<User>[] = [
        {
            accessorKey: "avatar",
            header: "Avatar",
            cell: ({ row }) => (
                <div className="w-10 h-10 rounded-full overflow-hidden shadow-md ring-2 ring-slate-200">
                    <UserAvatar user={row.original} className="w-full h-full" />
                </div>
            ),
        },
        {
            accessorKey: "name",
            header: "Name",
            cell: ({ row }) => (
                <div className="min-w-[150px]">
                    <p className="font-semibold text-slate-900">{row.original.name}</p>
                    <p className="text-sm text-slate-500">{row.original.email}</p>
                </div>
            ),
        },
        {
            accessorKey: "phone",
            header: "Phone",
            cell: ({ row }) => (
                <span className="text-slate-700">{row.original.phone || "N/A"}</span>
            ),
        },
        {
            accessorKey: "gender",
            header: "Gender",
            cell: ({ row }) => (
                <span className="text-slate-700 capitalize">{row.original.gender || "N/A"}</span>
            ),
        },
        {
            accessorKey: "role",
            header: "Role",
            cell: ({ row }) => getRoleBadge(row.original.role?.name || "USER"),
        },
        {
            accessorKey: "provider",
            header: "Provider",
            cell: ({ row }) => getProviderBadge(row.original.provider),
        },
        {
            id: "actions",
            header: "Actions",
            cell: ({ row }) => (
                <div className="flex items-center gap-2">
                    <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleViewUser(row.original.id)}
                        className="hover:bg-cyan-50 hover:text-cyan-600"
                        title="View Details"
                    >
                        <Eye className="w-4 h-4" />
                    </Button>
                    <Button
                        variant="ghost"
                        size="sm"
                        onClick={async () => {
                            toast.info("Delete functionality will be implemented soon")
                        }}
                        className="hover:bg-red-50 hover:text-red-600"
                        title="Delete User"
                    >
                        <Trash2 className="w-4 h-4" />
                    </Button>
                </div>
            ),
        },
    ]

    return (
        <>
            <div className="space-y-6">
                {/* Page Header */}
                <div>
                    <div className="flex items-center gap-2 mb-2">
                        <UsersIcon className="w-6 h-6 text-cyan-600" />
                        <h1 className="text-3xl font-bold bg-gradient-to-r from-cyan-600 via-teal-600 to-emerald-600 bg-clip-text text-transparent">
                            User Management
                        </h1>
                    </div>
                    <p className="text-gray-600">
                        View and manage all registered users
                    </p>
                </div>

                {/* Statistics Dashboard */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                    {/* Total Users */}
                    <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg hover:shadow-xl transition-all">
                        <CardContent className="p-6">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-sm text-gray-600 mb-1">Total Users</p>
                                    <p className="text-3xl font-bold text-slate-900">
                                        {stats.total}
                                    </p>
                                </div>
                                <div className="w-12 h-12 bg-gradient-to-br from-cyan-400 to-teal-500 rounded-xl flex items-center justify-center shadow-lg">
                                    <UsersIcon className="w-6 h-6 text-white" />
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Admin Users */}
                    <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg hover:shadow-xl transition-all">
                        <CardContent className="p-6">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-sm text-gray-600 mb-1">Admins</p>
                                    <p className="text-3xl font-bold text-slate-900">
                                        {stats.admin}
                                    </p>
                                </div>
                                <div className="w-12 h-12 bg-gradient-to-br from-purple-400 to-pink-500 rounded-xl flex items-center justify-center shadow-lg">
                                    <Shield className="w-6 h-6 text-white" />
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Regular Users */}
                    <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg hover:shadow-xl transition-all">
                        <CardContent className="p-6">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-sm text-gray-600 mb-1">Regular Users</p>
                                    <p className="text-3xl font-bold text-slate-900">
                                        {stats.user}
                                    </p>
                                </div>
                                <div className="w-12 h-12 bg-gradient-to-br from-emerald-400 to-green-500 rounded-xl flex items-center justify-center shadow-lg">
                                    <UserCheck className="w-6 h-6 text-white" />
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Google Users */}
                    <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg hover:shadow-xl transition-all">
                        <CardContent className="p-6">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-sm text-gray-600 mb-1">Google Sign-in</p>
                                    <p className="text-3xl font-bold text-slate-900">
                                        {stats.google}
                                    </p>
                                </div>
                                <div className="w-12 h-12 bg-gradient-to-br from-red-400 to-pink-500 rounded-xl flex items-center justify-center shadow-lg">
                                    <BarChart3 className="w-6 h-6 text-white" />
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </div>

                {/* Data Table */}
                <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-xl">
                    <CardContent className="p-0">
                        {/* Card Header */}
                        <div className="bg-gradient-to-r from-slate-800 to-slate-700 p-6 rounded-t-xl">
                            <h3 className="text-xl font-bold text-white mb-1">
                                All Users
                            </h3>
                            <p className="text-slate-300 text-sm">
                                Manage and monitor all registered users
                            </p>
                        </div>

                        {/* Table */}
                        <div className="p-6">
                            <DataTable
                                columns={columns}
                                data={users}
                                searchValue={searchValue}
                                onSearchChange={setSearchValue}
                                searchPlaceholder="Search users by name, email, or phone..."
                                loading={isLoading}
                                emptyMessage="No users found"
                                onDeleteSelected={handleDeleteSelected}
                                showCheckboxColumn={true}
                            />
                        </div>
                    </CardContent>
                </Card>
            </div>
        </>
    )
}
