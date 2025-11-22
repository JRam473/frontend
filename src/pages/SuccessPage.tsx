// SuccessPage.tsx
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { CheckCircle, ArrowLeft } from 'lucide-react';
import { Button } from '../components/ui/button';
import { useNavigate } from 'react-router-dom';

export function SuccessPage() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-md text-center">
        <CardHeader>
          <div className="flex justify-center mb-4">
            <CheckCircle className="h-16 w-16 text-green-500" />
          </div>
          <CardTitle className="text-2xl font-bold text-gray-900">
            ¡Mensaje Enviado!
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-gray-600">
            Gracias por contactarnos. Hemos recibido tu mensaje y te responderemos pronto.
          </p>
          <Button 
            onClick={() => navigate('/')}
            className="w-full bg-blue-600 hover:bg-blue-700"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Volver al Inicio
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}