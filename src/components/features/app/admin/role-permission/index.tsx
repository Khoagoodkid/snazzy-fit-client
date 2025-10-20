"use client"

import React, { useEffect, useState, useMemo } from "react"
import { useRoleService } from "@/services/client/role-permission/useRoleService"
import { usePermissionService } from "@/services/client/role-permission/usePermissionService"
import { useRolePermissionService } from "@/services/client/role-permission/useRolePermissionService"
import { Role } from "@/types/role-permission/role.interface"
import { Permission } from "@/types/role-permission/permission.interface"
import type { RolePermission } from "@/types/role-permission/role-permission.interface"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Shield, Key, Users, CheckCircle, Save, Sparkles, AlertCircle } from "lucide-react"
import { toast } from "react-toastify"

interface RolePermissionState {
    [roleId: string]: {
        [permissionId: string]: boolean
    }
}

export default function RolePermission() {
    const { getRoles } = useRoleService()
    const { getPermissions } = usePermissionService()
    const { getRolePermissions, upsertRolePermission, isLoading } = useRolePermissionService()

    const [roles, setRoles] = useState<Role[]>([])
    const [permissions, setPermissions] = useState<Permission[]>([])
    const [rolePermissions, setRolePermissions] = useState<RolePermission[]>([])
    const [localState, setLocalState] = useState<RolePermissionState>({})
    const [hasChanges, setHasChanges] = useState(false)
    const [saveSuccess, setSaveSuccess] = useState(false)
    const [saveError, setSaveError] = useState("")

    // Fetch data on mount
    useEffect(() => {
        const fetchData = async () => {
            try {
                const [rolesRes, permissionsRes, rolePermissionsRes] = await Promise.all([
                    getRoles(),
                    getPermissions(),
                    getRolePermissions(),
                ])

                if (rolesRes?.data) setRoles(rolesRes.data.filter((role) => role.name !== "SUPER_ADMIN"))
                if (permissionsRes?.data) setPermissions(permissionsRes.data)
                if (rolePermissionsRes?.data) setRolePermissions(rolePermissionsRes.data)
            } catch (error) {
                toast.error((error as Error).message)
            }
        }

        fetchData()
    }, [getRoles, getPermissions, getRolePermissions])

    // Initialize local state from fetched role-permissions
    useEffect(() => {
        if (roles.length && permissions.length && rolePermissions.length) {
            const initialState: RolePermissionState = {}

            roles.forEach((role) => {
                initialState[role.id] = {}
                permissions.forEach((permission) => {
                    const existingRP = rolePermissions.find(
                        (rp) => rp.role_id === role.id && rp.permission_id === permission.id
                    )
                    initialState[role.id][permission.id] = existingRP?.status === 1
                })
            })

            setLocalState(initialState)
        }
    }, [roles, permissions, rolePermissions])

    // Toggle permission for a role
    const togglePermission = (roleId: string, permissionId: string) => {
        setLocalState((prev) => ({
            ...prev,
            [roleId]: {
                ...prev[roleId],
                [permissionId]: !prev[roleId]?.[permissionId],
            },
        }))
        setHasChanges(true)
        setSaveSuccess(false)
        setSaveError("")
    }

    // Save changes
    const handleSave = async () => {
        try {
            setSaveError("")
            setSaveSuccess(false)

            const payload = []

            for (const roleId in localState) {
                for (const permissionId in localState[roleId]) {
                    payload.push({
                        roleId: roleId,
                        permissionId: permissionId,
                        status: localState[roleId][permissionId] ? 1 : 0,
                    })
                }
            }

            await upsertRolePermission({ payload })

            // Refresh data
            const rolePermissionsRes = await getRolePermissions()
            if (rolePermissionsRes?.data) {
                setRolePermissions(rolePermissionsRes.data)
            }

            setHasChanges(false)
            setSaveSuccess(true)

            // Auto-hide success message after 3 seconds
            setTimeout(() => setSaveSuccess(false), 3000)
        } catch (error) {
            console.error("Error saving permissions:", error)
            setSaveError("Failed to save permissions. Please try again.")
        }
    }

    // Group permissions by prefix (part before the dot)
    const groupedPermissions = useMemo(() => {
        const groups: { [key: string]: Permission[] } = {}

        permissions.forEach((permission) => {
            const prefix = permission.name.includes('.')
                ? permission.name.split('.')[0]
                : 'General'

            if (!groups[prefix]) {
                groups[prefix] = []
            }
            groups[prefix].push(permission)
        })

        return groups
    }, [permissions])

    // Calculate statistics
    const stats = useMemo(() => {
        const totalRoles = roles.length
        const totalPermissions = permissions.length
        const totalAssignments = Object.values(localState).reduce(
            (sum, rolePerms) =>
                sum + Object.values(rolePerms).filter((val) => val).length,
            0
        )

        const activeRoles = roles.filter((role) =>
            Object.values(localState[role.id] || {}).some((val) => val)
        ).length

        const totalGroups = Object.keys(groupedPermissions).length

        return {
            totalRoles,
            totalPermissions,
            totalAssignments,
            activeRoles,
            totalGroups,
        }
    }, [roles, permissions, localState, groupedPermissions])

    return (
        <div className="space-y-6">
            {/* Page Header */}
            <div>
                <div className="flex items-center gap-2 mb-2">
                    <Shield className="w-6 h-6 text-cyan-600" />
                    <h1 className="text-3xl font-bold bg-gradient-to-r from-cyan-600 via-teal-600 to-emerald-600 bg-clip-text text-transparent">
                        Role & Permission Management
                    </h1>
                </div>
                <p className="text-gray-600">
                    Manage role permissions and access control for your application
                </p>
            </div>

            {/* Statistics Dashboard */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {/* Total Roles */}
                <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg hover:shadow-xl transition-all">
                    <CardContent className="p-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm text-gray-600 mb-1">Total Roles</p>
                                <p className="text-3xl font-bold text-slate-900">
                                    {stats.totalRoles}
                                </p>
                            </div>
                            <div className="w-12 h-12 bg-gradient-to-br from-cyan-400 to-teal-500 rounded-xl flex items-center justify-center shadow-lg">
                                <Users className="w-6 h-6 text-white" />
                            </div>
                        </div>
                    </CardContent>
                </Card>

                {/* Total Permissions */}
                <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg hover:shadow-xl transition-all">
                    <CardContent className="p-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm text-gray-600 mb-1">Total Permissions</p>
                                <p className="text-3xl font-bold text-slate-900">
                                    {stats.totalPermissions}
                                </p>
                            </div>
                            <div className="w-12 h-12 bg-gradient-to-br from-emerald-400 to-green-500 rounded-xl flex items-center justify-center shadow-lg">
                                <Key className="w-6 h-6 text-white" />
                            </div>
                        </div>
                    </CardContent>
                </Card>

                {/* Active Assignments */}
                <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg hover:shadow-xl transition-all">
                    <CardContent className="p-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm text-gray-600 mb-1">
                                    Active Assignments
                                </p>
                                <p className="text-3xl font-bold text-slate-900">
                                    {stats.totalAssignments}
                                </p>
                            </div>
                            <div className="w-12 h-12 bg-gradient-to-br from-amber-400 to-orange-500 rounded-xl flex items-center justify-center shadow-lg">
                                <CheckCircle className="w-6 h-6 text-white" />
                            </div>
                        </div>
                    </CardContent>
                </Card>

                {/* Active Roles */}
                <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg hover:shadow-xl transition-all">
                    <CardContent className="p-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm text-gray-600 mb-1">Active Roles</p>
                                <p className="text-3xl font-bold text-slate-900">
                                    {stats.activeRoles}
                                </p>
                            </div>
                            <div className="w-12 h-12 bg-gradient-to-br from-pink-400 to-purple-500 rounded-xl flex items-center justify-center shadow-lg">
                                <Sparkles className="w-6 h-6 text-white" />
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>

            {/* Alert Messages */}
            {saveSuccess && (
                <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-4 flex items-start gap-3">
                    <CheckCircle className="h-5 w-5 text-emerald-600 flex-shrink-0 mt-0.5" />
                    <p className="text-sm font-medium text-emerald-900">
                        Success! Permissions have been saved successfully.
                    </p>
                </div>
            )}

            {saveError && (
                <div className="bg-red-50 border border-red-200 rounded-xl p-4 flex items-start gap-3">
                    <AlertCircle className="h-5 w-5 text-red-600 flex-shrink-0 mt-0.5" />
                    <p className="text-sm font-medium text-red-900">{saveError}</p>
                </div>
            )}

            {/* Role-Permission Matrix */}
            <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-xl">
                <CardContent className="p-0">
                    {/* Card Header */}
                    <div className="bg-gradient-to-r from-slate-800 to-slate-700 p-6 rounded-t-xl">
                        <div className="flex items-center justify-between">
                            <div>
                                <h3 className="text-xl font-bold text-white mb-1">
                                    Permission Matrix
                                </h3>
                                <p className="text-slate-300 text-sm">
                                    Check or uncheck to assign permissions to roles
                                </p>
                            </div>
                            <Button
                                onClick={handleSave}
                                disabled={!hasChanges || isLoading}
                                className={`
                                    ${
                                        hasChanges
                                            ? "bg-gradient-to-r from-cyan-600 to-teal-600 hover:from-cyan-700 hover:to-teal-700"
                                            : "bg-slate-600"
                                    }
                                    text-white font-semibold px-6 py-3 rounded-xl shadow-lg transition-all
                                `}
                            >
                                <Save className="w-4 h-4 mr-2" />
                                {isLoading ? "Saving..." : "Save Changes"}
                            </Button>
                        </div>
                        {hasChanges && (
                            <div className="mt-3 text-amber-300 text-sm flex items-center gap-2">
                                <AlertCircle className="w-4 h-4" />
                                You have unsaved changes
                            </div>
                        )}
                    </div>

                    {/* Table */}
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead>
                                <tr className="border-b border-gray-200">
                                    <th className="sticky left-0 bg-slate-50 px-6 py-4 text-left text-sm font-semibold text-slate-900 z-10">
                                        Permissions / Roles
                                    </th>
                                    {roles.map((role) => (
                                        <th
                                            key={role.id}
                                            className="px-6 py-4 text-center text-sm font-semibold text-slate-900 bg-gradient-to-b from-cyan-50 to-teal-50"
                                        >
                                            <div className="flex flex-col items-center gap-1">
                                                <div className="w-8 h-8 bg-gradient-to-br from-cyan-400 to-teal-500 rounded-lg flex items-center justify-center">
                                                    <Shield className="w-4 h-4 text-white" />
                                                </div>
                                                <span>{role.name}</span>
                                            </div>
                                        </th>
                                    ))}
                                </tr>
                            </thead>
                            <tbody>
                                {Object.entries(groupedPermissions).map(([groupName, groupPermissions], groupIdx) => (
                                    <React.Fragment key={`group-${groupName}`}>
                                        {/* Group Header Row */}
                                        <tr key={`group-${groupName}`} className="bg-gradient-to-r from-slate-100 to-slate-50">
                                            <td 
                                                colSpan={roles.length + 1} 
                                                className="sticky left-0 px-6 py-3 text-sm font-bold text-slate-900 uppercase tracking-wide border-b-2 border-slate-300"
                                            >
                                                <div className="flex items-center gap-2">
                                                    <div className="w-6 h-6 bg-gradient-to-br from-emerald-400 to-green-500 rounded-lg flex items-center justify-center">
                                                        <span className="text-xs font-bold text-white">{groupName[0]}</span>
                                                    </div>
                                                    {groupName}
                                                    <span className="ml-2 text-xs font-normal text-slate-500 normal-case">
                                                        ({groupPermissions.length} {groupPermissions.length === 1 ? 'permission' : 'permissions'})
                                                    </span>
                                                </div>
                                            </td>
                                        </tr>

                                        {/* Permission Rows */}
                                        {groupPermissions.map((permission, idx) => {
                                            const permissionSuffix = permission.name.includes('.')
                                                ? permission.name.split('.').slice(1).join('.')
                                                : permission.name

                                            return (
                                                <tr
                                                    key={permission.id}
                                                    className={`
                                                        border-b border-gray-100 hover:bg-gradient-to-r hover:from-cyan-50/30 hover:to-teal-50/30 transition-colors
                                                        ${idx % 2 === 0 ? "bg-white" : "bg-slate-50/50"}
                                                    `}
                                                >
                                                    <td className="sticky left-0 bg-inherit px-6 py-4 text-sm font-medium text-slate-900 z-10">
                                                        <div className="flex items-center gap-2 pl-8">
                                                            <Key className="w-4 h-4 text-slate-400" />
                                                            <span className="text-slate-600">{permissionSuffix}</span>
                                                        </div>
                                                    </td>
                                                    {roles.map((role) => (
                                                        <td
                                                            key={`${role.id}-${permission.id}`}
                                                            className="px-6 py-4 text-center"
                                                        >
                                                            <div className="flex justify-center">
                                                                <Checkbox
                                                                    checked={
                                                                        localState[role.id]?.[
                                                                            permission.id
                                                                        ] || false
                                                                    }
                                                                    onCheckedChange={() =>
                                                                        togglePermission(
                                                                            role.id,
                                                                            permission.id
                                                                        )
                                                                    }
                                                                    className="w-5 h-5 data-[state=checked]:bg-gradient-to-r data-[state=checked]:from-cyan-600 data-[state=checked]:to-teal-600 border-2 border-slate-300"
                                                                />
                                                            </div>
                                                        </td>
                                                    ))}
                                                </tr>
                                            )
                                        })}
                                    </React.Fragment>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    {/* Empty State */}
                    {(!roles.length || !permissions.length) && (
                        <div className="p-12 text-center">
                            <Shield className="w-16 h-16 text-slate-300 mx-auto mb-4" />
                            <p className="text-slate-600 text-lg font-medium">
                                No data available
                            </p>
                            <p className="text-slate-400 text-sm mt-2">
                                {!roles.length && "No roles found. "}
                                {!permissions.length && "No permissions found."}
                            </p>
                        </div>
                    )}
                </CardContent>
            </Card>
        </div>
    )
}