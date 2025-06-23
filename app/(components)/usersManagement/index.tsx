"use client";

import { useGetUsersQuery } from "@/state/api";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { UpdateForm } from "@/components/role/update-role_form";
import { useState } from "react";

export default function Role() {

  
  const {
    data: roles,
    isLoading,
    error,
  } = useGetUsersQuery(undefined);

  const [selectedRole, setSelectedRole] = useState<any | null>(null);

  if (isLoading) return <div>Chargement des utilisateurs...</div>;
  if (error) return <div>Erreur lors du chargement des utilisateurs</div>;

  return (
    <div className="p-6">
      {/* ✅ Ce composant n'existera qu'après le clic donc pas de désynchro SSR */}
      {selectedRole && (
        <div className="mb-6">
          <UpdateForm
            initialData={{
              name: selectedRole.name,
              lastname: selectedRole.lastname,
              code: selectedRole.code,
              roleType: selectedRole.roleType,
            }}
          />
        </div>
      )}

      <div className="p-6 grid grid-cols-1 md:grid-cols-4 gap-4">
        {roles?.length > 0 ? (
          roles.map((role: any) => (
            <Card key={role.id}>
              <CardHeader>
                <h3 className="text-xl font-bold">{role.name} {role.lastname}</h3>
              </CardHeader>
              <CardContent>
                <p><strong>Code :</strong> {role.code}</p>
                <p><strong>Rôle :</strong> {role.roleType}</p>
                <Button className="mt-4" onClick={() => setSelectedRole(role)}>
                  UPDATE ROLE
                </Button>
              </CardContent>
            </Card>
          ))
        ) : (
          <p>Aucun utilisateur trouvé.</p>
        )}
      </div>
    </div>
  );
}
