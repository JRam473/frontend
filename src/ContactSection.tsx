import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './components/ui/card';
import { Button } from './components/ui/button';
import { Input } from './components/ui/input';
import { Textarea } from './components/ui/textarea';
import { MapPin, Phone, Mail, Clock, AlertCircle, CheckCircle } from 'lucide-react';
import { ImageWithFallback } from './components/figma/ImageWithFallback';
import { useTranslation } from './contexts/TranslationContext';
import { useState, useRef } from 'react';

export function ContactSection() {
  const { t } = useTranslation();
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const formRef = useRef<HTMLFormElement>(null);

  const contactInfo = [
    {
      icon: MapPin,
      title: t('contact.contactItems.location.title'),
      content: t('contact.contactItems.location.content'),
      details: t('contact.contactItems.location.details')
    },
    {
      icon: Phone,
      title: t('contact.contactItems.phone.title'),
      content: t('contact.contactItems.phone.content'),
      details: t('contact.contactItems.phone.details')
    },
    {
      icon: Mail,
      title: t('contact.contactItems.email.title'),
      content: t('contact.contactItems.email.content'),
      details: t('contact.contactItems.email.details')
    },
    {
      icon: Clock,
      title: t('contact.contactItems.hours.title'),
      content: t('contact.contactItems.hours.content'),
      details: t('contact.contactItems.hours.details')
    }
  ];

  // Función de validación robusta
  const validateForm = (formData: FormData) => {
    const errors: Record<string, string> = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phoneRegex = /^[\+]?[0-9\s\-\(\)]{10,}$/;

    // Validar nombre (requerido, mínimo 2 caracteres)
    const name = formData.get('nombre') as string;
    if (!name || name.trim().length < 2) {
      errors.nombre = t('contact.validation.nameRequired') || 'El nombre debe tener al menos 2 caracteres';
    }

    // Validar email (requerido, formato válido)
    const email = formData.get('email') as string;
    if (!email) {
      errors.email = t('contact.validation.emailRequired') || 'El email es requerido';
    } else if (!emailRegex.test(email)) {
      errors.email = t('contact.validation.emailInvalid') || 'El formato del email no es válido';
    }

    // Validar teléfono (opcional pero si se proporciona, debe ser válido)
    const phone = formData.get('telefono') as string;
    if (phone && phone.trim() !== '' && !phoneRegex.test(phone.replace(/\s/g, ''))) {
      errors.telefono = t('contact.validation.phoneInvalid') || 'El formato del teléfono no es válido';
    }

    // Validar asunto (requerido, mínimo 5 caracteres)
    const subject = formData.get('asunto') as string;
    if (!subject || subject.trim().length < 5) {
      errors.asunto = t('contact.validation.subjectRequired') || 'El asunto debe tener al menos 5 caracteres';
    }

    // Validar mensaje (requerido, mínimo 10 caracteres)
    const message = formData.get('mensaje') as string;
    if (!message || message.trim().length < 10) {
      errors.mensaje = t('contact.validation.messageRequired') || 'El mensaje debe tener al menos 10 caracteres';
    } else if (message.trim().length > 1000) {
      errors.mensaje = t('contact.validation.messageTooLong') || 'El mensaje no puede exceder los 1000 caracteres';
    }

    return errors;
  };

const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  setIsSubmitting(true);
  setSubmitStatus('idle');
  
  if (!formRef.current) return;
  
  const formData = new FormData(formRef.current);
  const errors = validateForm(formData);
  
  if (Object.keys(errors).length > 0) {
    setFormErrors(errors);
    setIsSubmitting(false);
    return;
  }
  
  setFormErrors({});
  
  try {
    // ENVÍO COMPATIBLE CON NETLIFY010
    
    await fetch('/', {
      method: 'POST',
      body: formData,
      headers: {
        'Accept': 'application/json'
      }
    });
    
    // Éxito - redirigir después de mostrar mensaje
    setSubmitStatus('success');
    formRef.current.reset();
    
    // Redirigir después de 3 segundos
    setTimeout(() => {
      window.location.href = '/success.html';
    }, 2000);
    
  } catch (error) {
    console.error('Error enviando el formulario:', error);
    setSubmitStatus('error');
  } finally {
    setIsSubmitting(false);
  }
};

  // Función para limpiar error de un campo específico al modificar
  const clearFieldError = (fieldName: string) => {
    if (formErrors[fieldName]) {
      setFormErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[fieldName];
        return newErrors;
      });
    }
  };

  return (
    <section id="contacto" className="relative py-20 overflow-hidden bg-gray-50">
      {/* 🔹 Fondo con imagen y gradiente (solo mitad superior) */}
      <div
        className="absolute inset-0 bg-[url('https://res.cloudinary.com/dinsl266g/image/upload/v1763072851/Tradiciones_h6vn7b.jpg')]
                   bg-cover bg-center opacity-85"
        style={{
          clipPath: 'polygon(0 0, 100% 0, 100% 50%, 0 100%)',
          filter: 'blur(1.5px) brightness(0.75)',
        }}
      ></div>
      
      {/* Capa de sombra para mejorar legibilidad */}
      <div className="absolute inset-0 bg-gradient-to-b from-gray-900/30 via-gray-800/10 to-transparent"></div>

      {/* Contenido principal */}
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl text-white font-semibold font-serif mb-4">
            {t('contact.title')}
          </h2>
          <p className="text-xl text-amber-200 max-w-3xl mx-auto">
            {t('contact.subtitle')}
          </p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
          {/* Columna izquierda */}
          <div>
            <h3 className="text-2xl text-white font-medium font-serif mb-8">
              {t('contact.contactInfo')}
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {contactInfo.map((info, index) => (
                <Card key={index} className="group hover:shadow-lg transition-shadow duration-300 bg-white/80 backdrop-blur-sm">
                  <CardHeader className="flex flex-row items-center space-y-0 pb-2">
                    <div className="bg-blue-100 p-2 rounded-lg mr-3 group-hover:bg-blue-200 transition-colors duration-300">
                      <info.icon className="h-5 w-5 text-blue-600" />
                    </div>
                    <CardTitle className="text-lg font-medium font-serif text-gray-900">{info.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-900 mb-1">{info.content}</p>
                    <CardDescription className="text-sm">{info.details}</CardDescription>
                  </CardContent>
                </Card>
              ))}
            </div>
            
            <div className="mt-8">
              <h4 className="text-xl text-white font-bold font-serif mb-4">
                {t('contact.howToGetThere')}
              </h4>
              <div className="bg-white/90 p-6 rounded-lg shadow-md backdrop-blur-sm">
                <ImageWithFallback
                  src="https://res.cloudinary.com/dinsl266g/image/upload/v1763052576/hero-home-image_anavv1.png"
                  alt="Mapa de ubicación de San Juan Tahitic"
                  className="w-full h-48 object-cover rounded-lg mb-4"
                />
                <p className="text-gray-600 text-sm">
                  {t('contact.mapDescription')}
                </p>
              </div>
            </div>
          </div>
          
          {/* Columna derecha */}
          <div>
            <h3 className="text-2xl text-white font-bold font-serif mb-8">
              {t('contact.sendMessage')}
            </h3>
            
            {/* Mensajes de estado del envío */}
            {submitStatus === 'success' && (
              <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg flex items-center">
                <CheckCircle className="h-5 w-5 text-green-500 mr-2" />
                <span className="text-green-700 font-medium">
                  {t('contact.contactForm.successMessage') || '¡Mensaje enviado! Redirigiendo...'}
                </span>
              </div>
            )}
            
            {submitStatus === 'error' && (
              <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg flex items-center">
                <AlertCircle className="h-5 w-5 text-red-500 mr-2" />
                <span className="text-red-700 font-medium">
                  {t('contact.contactForm.errorMessage') || 'Error al enviar el mensaje. Por favor, inténtalo de nuevo.'}
                </span>
              </div>
            )}
            
            <Card className="shadow-lg bg-white/90 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-gray-900 font-bold font-serif">
                  {t('contact.contactForm.title')}
                </CardTitle>
                <CardDescription>
                  {t('contact.contactForm.description')}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form 
                  ref={formRef} 
                  onSubmit={handleSubmit} 
                  className="space-y-6" 
                  noValidate
                  name="contacto-sanjuantahitic"
                  method="POST"
                  data-netlify="true"
                  data-netlify-honeypot="bot-field"
                >
                  {/* CAMPOS OCULTOS REQUERIDOS POR NETLIFY */}
                  <input type="hidden" name="form-name" value="contacto-sanjuantahitic" />
                  <input type="hidden" name="subject" value="Nuevo mensaje de contacto - San Juan Tahitic" />
                  
                  {/* CAMPO HONEYPOT PARA SPAM */}
                  <div className="hidden">
                    <label>
                      No llenar este campo si eres humano: 
                      <input name="bot-field" />
                    </label>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="nombre" className="block text-sm text-gray-700 mb-2">
                        {t('contact.contactForm.name')} *
                      </label>
                      <Input 
                        id="nombre" 
                        name="nombre" 
                        required 
                        placeholder={t('contact.contactForm.namePlaceholder')}
                        className={`w-full ${formErrors.nombre ? 'border-red-500 focus:ring-red-500' : ''}`}
                        onChange={() => clearFieldError('nombre')}
                      />
                      {formErrors.nombre && (
                        <p className="mt-1 text-sm text-red-600 flex items-center">
                          <AlertCircle className="h-4 w-4 mr-1" />
                          {formErrors.nombre}
                        </p>
                      )}
                    </div>
                    
                    <div>
                      <label htmlFor="email" className="block text-sm text-gray-700 mb-2">
                        {t('contact.contactForm.email')} *
                      </label>
                      <Input 
                        id="email" 
                        name="email" 
                        type="email" 
                        required 
                        placeholder={t('contact.contactForm.emailPlaceholder')}
                        className={`w-full ${formErrors.email ? 'border-red-500 focus:ring-red-500' : ''}`}
                        onChange={() => clearFieldError('email')}
                      />
                      {formErrors.email && (
                        <p className="mt-1 text-sm text-red-600 flex items-center">
                          <AlertCircle className="h-4 w-4 mr-1" />
                          {formErrors.email}
                        </p>
                      )}
                    </div>
                  </div>
                  
                  <div>
                    <label htmlFor="telefono" className="block text-sm text-gray-700 mb-2">
                      {t('contact.contactForm.phone')}
                    </label>
                    <Input 
                      id="telefono" 
                      name="telefono" 
                      type="tel" 
                      placeholder={t('contact.contactForm.phonePlaceholder')}
                      className={`w-full ${formErrors.telefono ? 'border-red-500 focus:ring-red-500' : ''}`}
                      onChange={() => clearFieldError('telefono')}
                    />
                    {formErrors.telefono && (
                      <p className="mt-1 text-sm text-red-600 flex items-center">
                        <AlertCircle className="h-4 w-4 mr-1" />
                        {formErrors.telefono}
                      </p>
                    )}
                  </div>
                  
                  <div>
                    <label htmlFor="asunto" className="block text-sm text-gray-700 mb-2">
                      {t('contact.contactForm.subject')} *
                    </label>
                    <Input 
                      id="asunto" 
                      name="asunto" 
                      required 
                      placeholder={t('contact.contactForm.subjectPlaceholder')}
                      className={`w-full ${formErrors.asunto ? 'border-red-500 focus:ring-red-500' : ''}`}
                      onChange={() => clearFieldError('asunto')}
                    />
                    {formErrors.asunto && (
                      <p className="mt-1 text-sm text-red-600 flex items-center">
                        <AlertCircle className="h-4 w-4 mr-1" />
                        {formErrors.asunto}
                      </p>
                    )}
                  </div>
                  
                  <div>
                    <label htmlFor="mensaje" className="block text-sm text-gray-700 mb-2">
                      {t('contact.contactForm.message')} *
                    </label>
                    <Textarea
                      id="mensaje"
                      name="mensaje"
                      required
                      rows={5}
                      placeholder={t('contact.contactForm.messagePlaceholder')}
                      className={`w-full ${formErrors.mensaje ? 'border-red-500 focus:ring-red-500' : ''}`}
                      onChange={() => clearFieldError('mensaje')}
                    />
                    {formErrors.mensaje && (
                      <p className="mt-1 text-sm text-red-600 flex items-center">
                        <AlertCircle className="h-4 w-4 mr-1" />
                        {formErrors.mensaje}
                      </p>
                    )}
                  </div>
                  
                  <Button 
                    type="submit" 
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold font-serif disabled:opacity-50 disabled:cursor-not-allowed"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      <>
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                        {t('contact.contactForm.sending') || 'Enviando...'}
                      </>
                    ) : (
                      t('contact.contactForm.submit')
                    )}
                  </Button>
                </form>
              </CardContent>
            </Card>
            
            <div className="mt-8 bg-blue-50 p-6 rounded-lg">
              <h4 className="text-lg text-gray-900 font-bold font-serif mb-3">
                {t('contact.additionalInfo')}
              </h4>
              <ul className="space-y-2 text-sm font-medium font-serif text-gray-600">
                {(t('contact.additionalItems') as unknown as string[]).map((item, index) => (
                  <li key={index}>• {item}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}