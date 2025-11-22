import { useAuth } from '@/hooks/useAuth';

export const ProfilePage = () => {
  const { admin } = useAuth();

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-white pt-20">
      <div className="max-w-4xl mx-auto p-6">
        <h1 className="text-3xl font-bold text-green-800 mb-6">Mi Perfil</h1>
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold mb-4">Información del Administrador</h2>
          <div className="space-y-3">
            <p><strong>Email:</strong> {admin?.email}</p>
            <p><strong>Usuario:</strong> {admin?.usuario}</p>
            <p><strong>Rol:</strong> {admin?.rol}</p>
          </div>
        </div>
      </div>
    </div>
  );
};
