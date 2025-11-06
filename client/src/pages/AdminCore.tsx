// Admin Core - User management, roles, permissions
import { trpc } from '@/lib/trpc';
import { Button } from '@/components/ui/button';
import { useState } from 'react';

export default function AdminCore() {
  const { data: roles } = trpc.rbac.listRoles.useQuery();
  const [activeTab, setActiveTab] = useState<'users' | 'roles'>('users');

  const mockUsers = [
    { id: '1', name: 'John Doe', email: 'john@example.com', role: 'Admin', status: 'Active' },
    { id: '2', name: 'Jane Smith', email: 'jane@example.com', role: 'User', status: 'Active' },
    { id: '3', name: 'Bob Johnson', email: 'bob@example.com', role: 'User', status: 'Inactive' },
  ];

  return (
    <div className="min-h-screen bg-background p-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold mb-8">Admin Dashboard</h1>

        {/* Tabs */}
        <div className="flex gap-4 mb-6 border-b border-border">
          <button
            onClick={() => setActiveTab('users')}
            className={`pb-2 px-4 ${activeTab === 'users' ? 'border-b-2 border-primary font-semibold' : 'text-muted-foreground'}`}
          >
            Users
          </button>
          <button
            onClick={() => setActiveTab('roles')}
            className={`pb-2 px-4 ${activeTab === 'roles' ? 'border-b-2 border-primary font-semibold' : 'text-muted-foreground'}`}
          >
            Roles & Permissions
          </button>
        </div>

        {/* Users Tab */}
        {activeTab === 'users' && (
          <div>
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-semibold">User Management</h2>
              <Button>Add User</Button>
            </div>
            <div className="border border-border rounded-lg overflow-hidden">
              <table className="w-full">
                <thead className="bg-muted">
                  <tr>
                    <th className="p-3 text-left">Name</th>
                    <th className="p-3 text-left">Email</th>
                    <th className="p-3 text-left">Role</th>
                    <th className="p-3 text-left">Status</th>
                    <th className="p-3 text-left">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {mockUsers.map((user) => (
                    <tr key={user.id} className="border-t border-border">
                      <td className="p-3">{user.name}</td>
                      <td className="p-3">{user.email}</td>
                      <td className="p-3">{user.role}</td>
                      <td className="p-3">
                        <span className={`px-2 py-1 rounded text-xs ${user.status === 'Active' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}`}>
                          {user.status}
                        </span>
                      </td>
                      <td className="p-3">
                        <Button variant="outline" size="sm">Edit</Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Roles Tab */}
        {activeTab === 'roles' && (
          <div>
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-semibold">Roles & Permissions</h2>
              <Button>Create Role</Button>
            </div>
            {roles && roles.length > 0 ? (
              <div className="grid gap-4">
                {roles.map((role) => (
                  <div key={role.id} className="p-6 border border-border rounded-lg">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="text-xl font-semibold">{role.name}</h3>
                        <p className="text-sm text-muted-foreground">{role.description}</p>
                        <div className="mt-2 flex flex-wrap gap-2">
                          {role.permissions && (role.permissions as string[]).map((perm, idx) => (
                            <span key={idx} className="px-2 py-1 bg-muted rounded text-xs">{perm}</span>
                          ))}
                        </div>
                      </div>
                      <Button variant="outline" size="sm">Edit</Button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-muted-foreground">No roles defined yet</p>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
