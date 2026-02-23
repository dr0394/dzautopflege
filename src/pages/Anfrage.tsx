import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, ArrowRight, User, Phone, MapPin, MessageSquare, Mail, CheckCircle, Shield, Clock, X, AlertCircle, ThumbsUp, Car, Sparkles, Brush, SprayCan as Spray, Home, Calendar, Heart, CreditCard, Wrench } from 'lucide-react';
import Header from '../components/Header';
import VehicleSelection from '../components/VehicleSelection';
import { supabase, LeadData } from '../lib/supabase';
import { sendEmail, emailTemplates } from '../lib/email';
import { notificationManager } from '../lib/notifications';

const primaryGradient = 'linear-gradient(135deg, #9CA3AF, #6B7280)';
const primaryColor = '#9CA3AF';

const Anfrage: React.FC = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [formData, setFormData] = useState<Record<string, any>>({});
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('+49');
  const [postalCode, setPostalCode] = useState('');
  const [city, setCity] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formProgress, setFormProgress] = useState(0);
  const [showTips, setShowTips] = useState(true);
  const [validationErrors, setValidationErrors] = useState<Record<string, string>>({});
  const [qualificationScore, setQualificationScore] = useState(0);
  const [readyToBook, setReadyToBook] = useState(false);
  const [showSubmissionProgress, setShowSubmissionProgress] = useState(false);
  const [submissionStep, setSubmissionStep] = useState(1);
  const [submissionProgress, setSubmissionProgress] = useState(50);
  const [recentRequestCount] = useState(Math.floor(Math.random() * 80) + 20);

  const primaryGradient = 'linear-gradient(135deg, #E2E8F0 0%, #CBD5E1 25%, #94A3B8 50%, #64748B 75%, #475569 100%)';
  const primaryColor = '#94A3B8';

  const formFields = [
    {
      type: 'multi-select',
      name: 'service_type',
      label: 'Art der Reinigung',
      options: ['Außenwäsche', 'Innenraumreinigung', 'Polieren & Versiegeln', 'Lederpflege', 'Felgenreinigung'],
      required: true,
      icon: Sparkles
    },
    {
      type: 'button-group',
      name: 'vehicle_type',
      label: 'Fahrzeugtyp',
      options: ['kleinwagen', 'mittelklasse', 'suv', 'transporter', 'luxus', 'motorrad', 'oldtimer', 'campingwagen'],
      required: true,
      icon: Car,
      component: 'vehicle-selection'
    },
    {
      type: 'button-group',
      name: 'vehicle_condition',
      label: 'Verschmutzungsgrad',
      options: ['Leicht verschmutzt', 'Normal verschmutzt', 'Stark verschmutzt', 'Sehr stark verschmutzt'],
      required: true,
      icon: Brush
    },
    {
      type: 'button-group',
      name: 'frequency',
      label: 'Wie oft möchten Sie Ihr Fahrzeug reinigen lassen?',
      options: ['Einmalig', 'Wöchentlich', 'Alle zwei Wochen', 'Monatlich'],
      required: true,
      icon: Calendar
    },
    {
      type: 'button-group',
      name: 'timeframe',
      label: 'Wann soll die Reinigung stattfinden?',
      options: ['So schnell wie möglich', 'In den nächsten 2 Wochen', 'Im nächsten Monat', 'Flexibel'],
      required: true,
      icon: Clock
    },
    {
      type: 'button-group',
      name: 'pets_in_car',
      label: 'Fahren Tiere in Ihrem Fahrzeug mit?',
      options: ['Ja, regelmäßig', 'Ja, gelegentlich', 'Nein, nie'],
      required: true,
      icon: Heart
    },
    {
      type: 'button-group',
      name: 'leasing_vehicle',
      label: 'Ist es ein Leasingfahrzeug?',
      options: ['Ja, Leasing', 'Nein, Eigentum', 'Firmenwagen'],
      required: true,
      icon: CreditCard
    },
    {
      type: 'button-group',
      name: 'smart_repair_needed',
      label: 'Benötigen Sie Smart Repair (kleine Lackschäden)?',
      options: ['Ja, definitiv', 'Vielleicht, bitte prüfen', 'Nein, nicht nötig'],
      required: true,
      icon: Wrench
    }
  ];

  // Update form progress
  useEffect(() => {
    if (currentStep === 1) {
      const totalQuestions = formFields.length;
      const progress = totalQuestions > 0 
        ? ((currentQuestionIndex + 1) / totalQuestions) * 50 
        : 10;
      setFormProgress(progress);
    } else if (currentStep === 2) {
      setFormProgress(80);
    }
  }, [currentStep, currentQuestionIndex]);

  // Calculate qualification score
  useEffect(() => {
    let score = 0;
    const totalFields = Object.keys(formData).length;
    
    if (totalFields === 0) return;
    
    const filledFields = Object.entries(formData).filter(([key, value]) => {
      if (Array.isArray(value)) return value.length > 0;
      if (typeof value === 'boolean') return value;
      return value !== '';
    }).length;
    
    score = Math.round((filledFields / totalFields) * 100);
    
    // Bonus for luxury vehicles
    if (formData.vehicle_type && 
        (formData.vehicle_type.includes('Luxusfahrzeug') || 
         formData.vehicle_type.includes('SUV'))) {
      score += 10;
    }
    
    // Bonus for very dirty vehicles
    if (formData.vehicle_condition && 
        (formData.vehicle_condition.includes('Stark verschmutzt') || 
         formData.vehicle_condition.includes('Sehr stark verschmutzt'))) {
      score += 10;
    }
    
    // Bonus for frequent cleaning
    if (formData.frequency && 
        (formData.frequency.includes('Wöchentlich') || 
         formData.frequency.includes('Alle zwei Wochen'))) {
      score += 10;
    }
    
    // Bonus for pets (special cleaning needed)
    if (formData.pets_in_car && 
        (formData.pets_in_car.includes('regelmäßig') || 
         formData.pets_in_car.includes('gelegentlich'))) {
      score += 5;
    }
    
    // Bonus for leasing (higher standards)
    if (formData.leasing_vehicle && 
        formData.leasing_vehicle.includes('Leasing')) {
      score += 5;
    }
    
    // Bonus for smart repair (additional service)
    if (formData.smart_repair_needed && 
        formData.smart_repair_needed.includes('definitiv')) {
      score += 10;
    }
    
    setQualificationScore(Math.min(score, 100));
  }, [formData]);

  // Manage submission progress
  useEffect(() => {
    if (showSubmissionProgress) {
      const timer = setTimeout(() => {
        handleSubmit();
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [showSubmissionProgress]);

  const handleFieldChange = (name: string, value: any) => {
    // Handle multi-select for service_type
    if (name === 'service_type' && Array.isArray(formData[name])) {
      const currentValues = formData[name] || [];
      let newValues;
      
      if (currentValues.includes(value)) {
        // Remove if already selected
        newValues = currentValues.filter((v: string) => v !== value);
      } else {
        // Add if not selected
        newValues = [...currentValues, value];
      }
      
      setFormData(prev => ({
        ...prev,
        [name]: newValues
      }));
    } else if (name === 'service_type') {
      // Initialize as array for multi-select
      setFormData(prev => ({
        ...prev,
        [name]: [value]
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
    }
    
    if (validationErrors[name]) {
      setValidationErrors(prev => {
        const newErrors = {...prev};
        delete newErrors[name];
        return newErrors;
      });
    }
  };

  const validatePhone = (phoneNumber: string) => {
    const phoneRegex = /^\+49[1-9]\d{9,10}$/;
    return phoneRegex.test(phoneNumber.replace(/\s/g, ''));
  };

  const validateCurrentQuestion = (): boolean => {
    setError('');
    const newErrors: Record<string, string> = {};

    const currentField = formFields[currentQuestionIndex];
    if (currentField && currentField.required) {
      const fieldValue = formData[currentField.name];
      if (!fieldValue || (Array.isArray(fieldValue) && fieldValue.length === 0)) {
        newErrors[currentField.name] = 'Bitte wähle eine Option aus.';
      }
    }

    setValidationErrors(newErrors);
    
    if (Object.keys(newErrors).length > 0) {
      setError('Bitte wähle eine Option aus.');
      return false;
    }
    
    return true;
  };

  const validateStep2 = (): boolean => {
    setError('');
    const newErrors: Record<string, string> = {};

    if (!firstName.trim()) {
      newErrors.firstName = 'Bitte gib deinen Vornamen ein.';
    }
    if (!lastName.trim()) {
      newErrors.lastName = 'Bitte gib deinen Nachnamen ein.';
    }
    if (!email.trim()) {
      newErrors.email = 'Bitte gib deine E-Mail-Adresse ein.';
    } else if (!email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
      newErrors.email = 'Bitte gib eine gültige E-Mail-Adresse ein.';
    }
    if (!phone.trim()) {
      newErrors.phone = 'Bitte gib deine Telefonnummer ein.';
    } else if (!validatePhone(phone)) {
      newErrors.phone = 'Bitte gib eine gültige deutsche Telefonnummer ein (+49...).';
    }
    if (!postalCode.trim()) {
      newErrors.postalCode = 'Bitte gib deine Postleitzahl ein.';
    }
    if (!city.trim()) {
      newErrors.city = 'Bitte gib deinen Ort ein.';
    }
    if (!formData.privacy_policy) {
      newErrors.privacy_policy = 'Bitte stimme der Datenschutzerklärung zu.';
    }

    setValidationErrors(newErrors);
    
    if (Object.keys(newErrors).length > 0) {
      setError('Bitte korrigiere die markierten Felder.');
      return false;
    }
    
    return true;
  };

  const handleNext = () => {
    if (currentStep === 1) {
      if (validateCurrentQuestion()) {
        const fields = formFields;
        if (currentQuestionIndex < fields.length - 1) {
          setCurrentQuestionIndex(prev => prev + 1);
        } else {
          setCurrentStep(2);
        }
      }
    } else if (currentStep === 2) {
      if (validateStep2()) {
        setShowSubmissionProgress(true);
      }
    }
  };

  const handleBack = () => {
    if (currentStep === 1) {
      if (currentQuestionIndex > 0) {
        setCurrentQuestionIndex(prev => prev - 1);
      }
    } else if (currentStep === 2) {
      setCurrentStep(1);
      setCurrentQuestionIndex(formFields.length - 1);
    }
    
    setError('');
  };

  const handleSubmit = async () => {
    if (!validateStep2()) return;

    setIsSubmitting(true);
    try {
      const completeFormData = { 
        ...formData,
        first_name: firstName,
        last_name: lastName,
        email: email,
        postal_code: postalCode,
        city: city,
        message: message.trim() || undefined,
        qualification_score: qualificationScore,
        ready_to_book: readyToBook
      };

      const { data, error } = await supabase
        .from('leads')
        .insert({
          postal_code: postalCode,
          services: Array.isArray(formData.service_type) ? formData.service_type : (formData.service_type ? [formData.service_type] : []),
          urgency: formData.timeframe || 'Flexibel',
          first_name: firstName,
          last_name: lastName,
          phone: phone.replace(/\s/g, ''),
          email: email,
          status: 'Neu',
          notes: message,
          answers: formData
        })
        .select()
        .single();

      if (error) throw error;

      // Send confirmation email to customer
      if (email) {
        const confirmationTemplate = emailTemplates.confirmation(data);
        await sendEmail(email, confirmationTemplate, data.id, 'confirmation');
      }

      // Send notifications (Telegram + Email)
      await notificationManager.sendLeadNotification(data);
      
      navigate('/danke');
      
    } catch (error) {
      console.error('Error submitting form:', error);
      setError('Fehler beim Speichern. Bitte versuche es erneut.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const getScoreColor = (score: number): string => {
    if (score >= 80) return '#10B981';
    if (score >= 60) return '#3B82F6';
    if (score >= 40) return '#F59E0B';
    return '#EF4444';
  };

  const getScoreMessage = (score: number): string => {
    if (score >= 80) return 'Hervorragend! Deine Anfrage ist sehr detailliert.';
    if (score >= 60) return 'Gut! Deine Anfrage enthält wichtige Details.';
    if (score >= 40) return 'Ausreichend. Mehr Details könnten zu passenderen Angeboten führen.';
    return 'Bitte vervollständige deine Angaben für passendere Angebote.';
  };

  const getTips = () => {
    if (currentStep === 1) {
      const currentField = formFields[currentQuestionIndex];
      if (!currentField) return '';
      
      switch(currentField.name) {
        case 'service_type':
          return 'Du kannst mehrere Reinigungsarten auswählen. Je genauer deine Angaben, desto passender die Angebote.';
        case 'vehicle_type':
          return 'Der Fahrzeugtyp hilft uns, die passenden Reinigungsexperten zu vermitteln.';
        case 'vehicle_condition':
          return 'Der Verschmutzungsgrad ist wichtig für die Kalkulation des Reinigungsaufwands und der benötigten Zeit.';
        case 'frequency':
          return 'Die Häufigkeit der Reinigung beeinflusst die Preisgestaltung und Verfügbarkeit.';
        case 'cleaning_location':
          return 'Mobile Reinigung ist oft teurer, aber bequemer. Beim Anbieter ist meist günstiger.';
        case 'budget':
          return 'Deine Budgetangabe hilft uns, passende Angebote zu finden, die deinen finanziellen Vorstellungen entsprechen.';
        case 'timeframe':
          return 'Je flexibler du bist, desto bessere Preise können wir oft vermitteln.';
        case 'pets_in_car':
          return 'Tierhaare und Gerüche erfordern spezielle Reinigungstechniken und -produkte.';
        case 'leasing_vehicle':
          return 'Bei Leasingfahrzeugen gelten oft besondere Rückgabebedingungen für den Zustand.';
        case 'smart_repair_needed':
          return 'Smart Repair kann kleine Kratzer und Dellen kostengünstig beseitigen.';
        default:
          return 'Beantworte alle Fragen ehrlich, damit wir dir die besten Angebote vermitteln können.';
      }
    } else if (currentStep === 2) {
      return 'Deine Kontaktdaten werden nur an geprüfte Anbieter weitergegeben und sind durch unsere Datenschutzrichtlinien geschützt.';
    }
    return '';
  };

  const ButtonGroupField = ({ field, value, onChange }: any) => (
    <div className="space-y-4">
      <div className="flex items-center gap-3 mb-6 relative">
        <div className="absolute inset-0 bg-gradient-glow opacity-50 blur-xl"></div>
        <div 
          className="w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0 relative bg-gradient-metallic shadow-silver-lg animate-glow"
        >
          <field.icon className="w-6 h-6 text-slate-700 drop-shadow-sm" />
          <div className="absolute inset-0 bg-gradient-shimmer animate-shimmer rounded-full"></div>
        </div>
        <div>
          <h3 className="text-2xl font-bold bg-gradient-to-r from-slate-700 to-slate-900 bg-clip-text text-transparent">{field.label}</h3>
          <p className="text-sm text-slate-600 font-medium">
            {field.type === 'multi-select' ? 'Wähle alle passenden Optionen' : 'Wähle die passende Option'}
          </p>
        </div>
      </div>
      
      <div className="grid grid-cols-1 gap-4">
        {field.options.map((option: string) => {
          const isSelected = field.type === 'multi-select' 
            ? Array.isArray(value) && value.includes(option)
            : value === option;
            
          return (
            <button
              key={option}
              type="button"
              onClick={() => onChange(option)}
              className={`group relative p-6 rounded-2xl border-2 text-left transition-all duration-300 hover:shadow-silver-lg hover:scale-[1.02] overflow-hidden ${
                isSelected
                  ? 'border-transparent text-white shadow-silver-xl animate-glow'
                  : 'border-slate-200 text-slate-700 hover:border-slate-300 bg-white/80 backdrop-blur-sm'
              }`}
              style={{
                background: isSelected ? primaryGradient : undefined
              }}
            >
              {isSelected && (
                <>
                  <div className="absolute inset-0 bg-gradient-shimmer animate-shimmer"></div>
                  <div className="absolute inset-0 bg-gradient-glow opacity-30"></div>
                </>
              )}
              <div className="flex items-center justify-between">
                <span className={`font-semibold text-base relative z-10 ${isSelected ? 'drop-shadow-sm' : ''}`}>{option}</span>
                {field.type === 'multi-select' ? (
                  <div className={`w-6 h-6 rounded-lg border-2 flex items-center justify-center transition-all duration-300 relative z-10 ${
                    isSelected ? 'border-white bg-white shadow-inner-silver' : 'border-slate-300 bg-white/50'
                  }`}>
                    {isSelected && (
                      <svg className="w-3 h-3 text-slate-700" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                        <polyline points="20 6 9 17 4 12" />
                      </svg>
                    )}
                  </div>
                ) : (
                  <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all duration-300 relative z-10 ${
                    isSelected ? 'border-white shadow-inner-silver' : 'border-slate-300'
                  }`}>
                    {isSelected && (
                      <div className="w-2 h-2 bg-white rounded-full shadow-sm"></div>
                    )}
                  </div>
                )}
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );

  const MultiSelectField = ({ field, value, onChange }: any) => (
    <div className="space-y-4">
      <div className="flex items-center gap-3 mb-6 relative">
        <div className="absolute inset-0 bg-gradient-glow opacity-50 blur-xl"></div>
        <div 
          className="w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0 relative bg-gradient-metallic shadow-silver-lg animate-glow"
        >
          <field.icon className="w-6 h-6 text-slate-700 drop-shadow-sm" />
          <div className="absolute inset-0 bg-gradient-shimmer animate-shimmer rounded-full"></div>
        </div>
        <div>
          <h3 className="text-2xl font-bold bg-gradient-to-r from-slate-700 to-slate-900 bg-clip-text text-transparent">{field.label}</h3>
          <p className="text-sm text-slate-600 font-medium">Wähle alle passenden Optionen (mehrere möglich)</p>
        </div>
      </div>
      
      <div className="grid grid-cols-1 gap-4">
        {field.options.map((option: string) => {
          const isSelected = Array.isArray(value) && value.includes(option);
            
          return (
            <button
              key={option}
              type="button"
              onClick={() => onChange(option)}
              className={`group relative p-6 rounded-2xl border-2 text-left transition-all duration-300 hover:shadow-silver-lg hover:scale-[1.02] overflow-hidden ${
                isSelected
                  ? 'border-transparent text-white shadow-silver-xl animate-glow'
                  : 'border-slate-200 text-slate-700 hover:border-slate-300 bg-white/80 backdrop-blur-sm'
              }`}
              style={{
                background: isSelected ? primaryGradient : undefined
              }}
            >
              {isSelected && (
                <>
                  <div className="absolute inset-0 bg-gradient-shimmer animate-shimmer"></div>
                  <div className="absolute inset-0 bg-gradient-glow opacity-30"></div>
                </>
              )}
              <div className="flex items-center justify-between">
                <span className={`font-semibold text-base relative z-10 ${isSelected ? 'drop-shadow-sm' : ''}`}>{option}</span>
                <div className={`w-6 h-6 rounded-lg border-2 flex items-center justify-center transition-all duration-300 relative z-10 ${
                  isSelected ? 'border-white bg-white shadow-inner-silver' : 'border-slate-300 bg-white/50'
                }`}>
                  {isSelected && (
                    <svg className="w-3 h-3 text-slate-700" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                  )}
                </div>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );

  const ProgressBar = ({ progress }: { progress: number }) => (
    <div className="w-full bg-gradient-to-r from-slate-200 to-slate-300 rounded-full h-2 shadow-inner-silver overflow-hidden">
      <div 
        className="h-2 rounded-full transition-all duration-500 relative overflow-hidden" 
        style={{ 
          width: `${progress}%`,
          background: primaryGradient
        }}
      >
        <div className="absolute inset-0 bg-gradient-shimmer animate-shimmer"></div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-brand-black via-accent-dark/20 to-brand-black text-brand-white relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-20 left-10 w-96 h-96 bg-gradient-glow rounded-full blur-3xl animate-float"></div>
        <div className="absolute bottom-20 right-10 w-80 h-80 bg-gradient-glow rounded-full blur-3xl animate-float" style={{ animationDelay: '2s' }}></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-gradient-glow rounded-full blur-3xl animate-pulse-slow"></div>
      </div>
      
      <Header minimal />
      <Header minimal darkBackground />
      
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-16 relative z-10">
        <div className="bg-white/95 backdrop-blur-xl rounded-3xl shadow-2xl overflow-hidden border border-white/60 relative max-w-2xl mx-auto">
          <div className="absolute inset-0 bg-gradient-shimmer opacity-20 animate-shimmer"></div>
          {/* Progress steps */}
          <div className="p-6 border-b border-slate-200/50 bg-gradient-to-r from-white/90 to-slate-50/90 backdrop-blur-sm relative">
            <div className="flex justify-between mb-4">
              {[1, 2, 3].map((step) => (
                <div 
                  key={step} 
                  className="flex flex-col items-center relative"
                >
                  <div 
                    className={`w-12 h-12 rounded-full flex items-center justify-center mb-3 transition-all duration-300 relative overflow-hidden ${
                      (currentStep >= step || (step === 3 && showSubmissionProgress))
                        ? 'text-white shadow-silver-lg animate-glow' 
                        : 'text-slate-500 bg-slate-200/80 backdrop-blur-sm border border-slate-300'
                    }`}
                    style={{ 
                      background: (currentStep >= step || (step === 3 && showSubmissionProgress)) ? primaryGradient : undefined 
                    }}
                  >
                    {(currentStep >= step || (step === 3 && showSubmissionProgress)) && (
                      <>
                        <div className="absolute inset-0 bg-gradient-shimmer animate-shimmer"></div>
                        <div className="absolute inset-0 bg-gradient-glow opacity-30"></div>
                      </>
                    )}
                    {step === 1 ? (
                      <Car className="w-5 h-5 relative z-10" />
                    ) : step === 2 ? (
                      <User className="w-5 h-5 relative z-10" />
                    ) : (
                      <CheckCircle className="w-5 h-5 relative z-10" />
                    )}
                  </div>
                  <span className={`text-sm font-semibold transition-colors duration-300 text-center ${
                    (currentStep >= step || (step === 3 && showSubmissionProgress)) ? 'text-slate-900' : 'text-slate-400'
                  }`}>
                    {step === 1 
                      ? 'Fahrzeugreinigung' 
                      : step === 2 
                        ? 'Kontaktdaten' 
                        : 'Abschluss'}
                  </span>
                </div>
              ))}
            </div>
            <ProgressBar progress={formProgress} />
          </div>

          <div className="p-6 relative">
            {/* Step 1: Form Fields */}
            {currentStep === 1 && !showSubmissionProgress && (
              <AnimatePresence mode="wait">
                <motion.div
                  key={`question-${currentQuestionIndex}`}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3 }}
                  className="space-y-6"
                >
                  <div className="bg-gradient-to-br from-white/90 to-slate-50/90 backdrop-blur-xl p-6 rounded-2xl shadow-silver-lg border border-white/60 relative overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-shimmer opacity-10 animate-shimmer"></div>
                    {formFields[currentQuestionIndex] && (
                      <>
                        {formFields[currentQuestionIndex].component === 'vehicle-selection' ? (
                          <div className="space-y-6">
                            <div className="flex items-center gap-3 mb-6 relative">
                              <div className="absolute inset-0 bg-gradient-glow opacity-50 blur-xl"></div>
                              <div 
                                className="w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0 relative bg-gradient-metallic shadow-silver-lg animate-glow"
                              >
                                <Car className="w-6 h-6 text-slate-700 drop-shadow-sm" />
                                <div className="absolute inset-0 bg-gradient-shimmer animate-shimmer rounded-full"></div>
                              </div>
                              <div>
                                <h3 className="text-2xl font-bold bg-gradient-to-r from-slate-700 to-slate-900 bg-clip-text text-transparent font-poppins">
                                  {formFields[currentQuestionIndex].label}
                                </h3>
                                <p className="text-xs text-slate-600 font-medium font-montserrat">
                                  Wähle deinen Fahrzeugtyp aus
                                </p>
                              </div>
                            </div>
                            <VehicleSelection
                              selectedVehicle={formData[formFields[currentQuestionIndex].name] || ''}
                              onVehicleSelect={(vehicle) => handleFieldChange(formFields[currentQuestionIndex].name, vehicle)}
                            />
                          </div>
                        ) : formFields[currentQuestionIndex].type === 'multi-select' ? (
                          <MultiSelectField
                            field={formFields[currentQuestionIndex]}
                            value={formData[formFields[currentQuestionIndex].name] || []}
                            onChange={(value: any) => handleFieldChange(formFields[currentQuestionIndex].name, value)}
                          />
                        ) : (
                          <ButtonGroupField
                            field={formFields[currentQuestionIndex]}
                            value={formData[formFields[currentQuestionIndex].name] || ''}
                            onChange={(value: any) => handleFieldChange(formFields[currentQuestionIndex].name, value)}
                          />
                        )}
                      </>
                    )}
                    {validationErrors[formFields[currentQuestionIndex]?.name] && (
                      <div className="mt-4 p-3 bg-red-50/80 backdrop-blur-sm text-red-600 text-sm rounded-lg border border-red-200/50">
                        {validationErrors[formFields[currentQuestionIndex].name]}
                      </div>
                    )}
                  </div>
                  
                  {/* Progress indicator */}
                  <div className="flex items-center justify-between text-sm text-slate-600 font-medium">
                    <div className="text-xs">Frage {currentQuestionIndex + 1} von {formFields.length}</div>
                    <div className="flex items-center gap-2">
                      {formFields.map((_, index) => (
                        <div 
                          key={index} 
                          className={`w-3 h-3 rounded-full transition-all duration-300 ${
                            index === currentQuestionIndex 
                              ? 'shadow-silver animate-glow' 
                              : index < currentQuestionIndex 
                                ? 'bg-slate-400' 
                                : 'bg-slate-200'
                          }`}
                          style={{ 
                            background: index === currentQuestionIndex ? primaryGradient : undefined 
                          }}
                        />
                      ))}
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>
            )}

            {/* Step 2: Contact Information */}
            {currentStep === 2 && !showSubmissionProgress && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
                className="space-y-6"
              >
                <div className="flex items-center gap-3 mb-2">
                  <div 
                    className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0"
                    style={{ backgroundColor: `${primaryColor}15` }}
                  >
                    <User className="w-5 h-5" style={{ color: primaryColor }} />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-slate-900 font-poppins">Ihre Kontaktdaten</h3>
                    <p className="text-sm text-slate-600 font-montserrat">
                      Damit wir dich erreichen können
                    </p>
                  </div>
                </div>
                
                <div className="bg-white/90 backdrop-blur-sm p-6 rounded-2xl shadow-silver border border-slate-200/50">
                  <div className="grid grid-cols-2 gap-4 mb-6">
                    <div>
                      <label className="block text-sm font-semibold text-slate-700 mb-2 font-poppins">
                        <div className="flex items-center gap-2">
                          <User className="w-4 h-4 text-slate-500" />
                          <span>Vorname</span>
                        </div>
                      </label>
                      <input
                        type="text"
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                        className={`w-full px-4 py-3 rounded-xl border-2 focus:outline-none transition-all duration-300 font-montserrat ${
                          validationErrors.firstName 
                            ? 'border-red-400 bg-red-50/50' 
                            : 'border-slate-200 focus:border-slate-400 bg-white/80 hover:bg-white'
                        }`}
                        placeholder="Max"
                      />
                      {validationErrors.firstName && (
                        <p className="mt-2 text-red-500 text-sm font-medium">{validationErrors.firstName}</p>
                      )}
                    </div>
                    
                    <div>
                      <label className="block text-sm font-semibold text-slate-700 mb-2 font-poppins">
                        <div className="flex items-center gap-2">
                          <User className="w-4 h-4 text-slate-500" />
                          <span>Nachname</span>
                        </div>
                      </label>
                      <input
                        type="text"
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)}
                        className={`w-full px-4 py-3 rounded-xl border-2 focus:outline-none transition-all duration-300 font-montserrat ${
                          validationErrors.lastName 
                            ? 'border-red-400 bg-red-50/50' 
                            : 'border-slate-200 focus:border-slate-400 bg-white/80 hover:bg-white'
                        }`}
                        placeholder="Mustermann"
                      />
                      {validationErrors.lastName && (
                        <p className="mt-2 text-red-500 text-sm font-medium">{validationErrors.lastName}</p>
                      )}
                    </div>
                  </div>

                  <div className="mb-6">
                    <label className="block text-sm font-semibold text-slate-700 mb-2 font-poppins">
                      <div className="flex items-center gap-2">
                        <Mail className="w-4 h-4 text-slate-500" />
                        <span>E-Mail</span>
                      </div>
                    </label>
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className={`w-full px-4 py-3 rounded-xl border-2 focus:outline-none transition-all duration-300 font-montserrat ${
                        validationErrors.email 
                          ? 'border-red-400 bg-red-50/50' 
                          : 'border-slate-200 focus:border-slate-400 bg-white/80 hover:bg-white'
                      }`}
                      placeholder="max@beispiel.de"
                    />
                    {validationErrors.email && (
                      <p className="mt-2 text-red-500 text-sm font-medium">{validationErrors.email}</p>
                    )}
                  </div>

                  <div className="mb-6">
                    <label className="block text-sm font-semibold text-slate-700 mb-2 font-poppins">
                      <div className="flex items-center gap-2">
                        <Phone className="w-4 h-4 text-slate-500" />
                        <span>Telefonnummer</span>
                      </div>
                    </label>
                    <div className={`flex items-center w-full rounded-xl border-2 focus-within:ring-2 focus-within:ring-opacity-20 transition-all duration-300 ${
                      validationErrors.phone 
                        ? 'border-red-400 bg-red-50/50' 
                        : 'border-slate-200 focus-within:border-slate-400 bg-white/80 hover:bg-white'
                    }`}
                    >
                      <div className="bg-slate-100 px-3 py-3 rounded-l-xl text-slate-700 font-semibold border-r border-slate-200 text-sm font-poppins">
                        +49
                      </div>
                      <input
                        type="tel"
                        value={phone.startsWith('+49') ? phone.substring(3) : phone}
                        onChange={(e) => {
                          const value = e.target.value.replace(/\D/g, '');
                          setPhone(`+49${value}`);
                        }}
                        className="flex-1 px-4 py-3 rounded-r-xl focus:outline-none bg-transparent font-montserrat"
                        placeholder="1701234567"
                      />
                    </div>
                    {validationErrors.phone && (
                      <p className="mt-2 text-red-500 text-sm font-medium">{validationErrors.phone}</p>
                    )}
                  </div>

                  <div className="grid grid-cols-3 gap-4 mb-6">
                    <div>
                      <label className="block text-sm font-semibold text-slate-700 mb-2 font-poppins">
                        <div className="flex items-center gap-2">
                          <MapPin className="w-4 h-4 text-slate-500" />
                          <span>PLZ</span>
                        </div>
                      </label>
                      <input
                        type="text"
                        value={postalCode}
                        onChange={(e) => setPostalCode(e.target.value)}
                        className={`w-full px-4 py-3 rounded-xl border-2 focus:outline-none transition-all duration-300 font-montserrat ${
                          validationErrors.postalCode 
                            ? 'border-red-400 bg-red-50/50' 
                            : 'border-slate-200 focus:border-slate-400 bg-white/80 hover:bg-white'
                        }`}
                        placeholder="12345"
                      />
                      {validationErrors.postalCode && (
                        <p className="mt-2 text-red-500 text-sm font-medium">{validationErrors.postalCode}</p>
                      )}
                    </div>
                    
                    <div className="col-span-2">
                      <label className="block text-sm font-semibold text-slate-700 mb-2 font-poppins">
                        <div className="flex items-center gap-2">
                          <MapPin className="w-4 h-4 text-slate-500" />
                          <span>Ort</span>
                        </div>
                      </label>
                      <input
                        type="text"
                        value={city}
                        onChange={(e) => setCity(e.target.value)}
                        className={`w-full px-4 py-3 rounded-xl border-2 focus:outline-none transition-all duration-300 font-montserrat ${
                          validationErrors.city 
                            ? 'border-red-400 bg-red-50/50' 
                            : 'border-slate-200 focus:border-slate-400 bg-white/80 hover:bg-white'
                        }`}
                        placeholder="Musterstadt"
                      />
                      {validationErrors.city && (
                        <p className="mt-2 text-red-500 text-sm font-medium">{validationErrors.city}</p>
                      )}
                    </div>
                  </div>

                  <div className="mb-6">
                    <h4 className="text-lg font-bold text-slate-900 mb-4 font-poppins">Deine Dringlichkeit</h4>
                    <div className="mb-6">
                      <label className="flex items-center gap-3 cursor-pointer">
                        <div
                          className={`w-6 h-6 rounded-lg border-2 flex items-center justify-center transition-all duration-300 ${
                            readyToBook ? 'border-transparent shadow-lg' : 'border-slate-300'
                          }`}
                          style={{
                            backgroundColor: readyToBook ? primaryColor : 'transparent'
                          }}
                          onClick={() => setReadyToBook(!readyToBook)}
                        >
                          {readyToBook && (
                            <svg className="w-4 h-4 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                              <polyline points="20 6 9 17 4 12" />
                            </svg>
                          )}
                        </div>
                        <span className="text-sm font-semibold text-slate-700 font-poppins">
                          Ich bin bereit, sofort einen Termin zu vereinbaren
                        </span>
                      </label>
                    </div>
                  </div>

                  <div className="mb-6">
                    <label className="block text-sm font-semibold text-slate-700 mb-2 font-poppins">
                      <div className="flex items-center gap-2">
                        <MessageSquare className="w-4 h-4 text-slate-500" />
                        <span>Anmerkungen (optional)</span>
                      </div>
                    </label>
                    <textarea
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      className="w-full px-4 py-3 rounded-xl border-2 border-slate-200 focus:border-slate-400 focus:outline-none transition-all duration-300 bg-white/80 hover:bg-white font-montserrat resize-none"
                      rows={4}
                      placeholder="Haben Sie besondere Wünsche oder Anforderungen? Warum ist diese Fahrzeugreinigung besonders wichtig für Sie?"
                    />
                  </div>

                  <div className="flex items-start gap-3 mb-6">
                    <div 
                      className={`w-6 h-6 rounded-lg border-2 flex items-center justify-center transition-all duration-300 cursor-pointer ${
                        formData.privacy_policy 
                          ? 'border-transparent shadow-lg' 
                          : validationErrors.privacy_policy 
                            ? 'border-red-400' 
                            : 'border-slate-300'
                      }`}
                      style={{
                        backgroundColor: formData.privacy_policy ? primaryColor : 'transparent'
                      }}
                      onClick={() => handleFieldChange('privacy_policy', !formData.privacy_policy)}
                    >
                      {formData.privacy_policy && (
                        <svg className="w-4 h-4 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                          <polyline points="20 6 9 17 4 12" />
                        </svg>
                      )}
                    </div>
                    <label className="text-sm text-slate-600 cursor-pointer font-montserrat leading-relaxed" onClick={() => handleFieldChange('privacy_policy', !formData.privacy_policy)}>
                      Ich stimme der <Link to="/datenschutz" className="underline text-slate-700 hover:text-slate-900 font-semibold">Datenschutzerklärung</Link> zu und akzeptiere, dass meine Daten zur Bearbeitung meiner Anfrage verwendet werden.
                    </label>
                  </div>
                  {validationErrors.privacy_policy && (
                    <p className="mt-2 text-red-500 text-sm font-medium ml-9">{validationErrors.privacy_policy}</p>
                  )}
                  
                  {/* Qualification Score */}
                  <div className="p-4 rounded-xl border bg-gradient-to-r from-slate-50 to-slate-100" style={{ borderColor: `${primaryColor}30` }}>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-semibold text-slate-700 font-poppins">Auftragswert</span>
                      <span className="text-sm font-bold" style={{ color: getScoreColor(qualificationScore) }}>
                        {qualificationScore}%
                      </span>
                    </div>
                    <div className="w-full h-2 bg-slate-200 rounded-full overflow-hidden mb-3">
                      <div 
                        className="h-full rounded-full" 
                        style={{ 
                          width: `${qualificationScore}%`,
                          backgroundColor: getScoreColor(qualificationScore)
                        }}
                      ></div>
                    </div>
                    <p className="text-sm text-slate-600 text-center font-montserrat">
                      {getScoreMessage(qualificationScore)}
                    </p>
                  </div>
                </div>
              </motion.div>
            )}

            {/* Submission Progress */}
            {showSubmissionProgress && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
                className="text-center py-12"
              >
                <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-gradient-metallic shadow-silver-lg flex items-center justify-center relative overflow-hidden animate-glow">
                  <div className="absolute inset-0 bg-gradient-shimmer animate-shimmer"></div>
                  <Clock className="w-10 h-10 text-slate-700 relative z-10" />
                </div>
                <h3 className="text-2xl font-bold text-slate-900 mb-4 font-poppins">Ihre Anfrage wird abgesendet...</h3>
                <p className="text-slate-600 mb-6 font-montserrat">Bitte warten Sie einen Moment</p>
                
                <div className="max-w-md mx-auto">
                  <div className="h-3 bg-slate-200 rounded-full overflow-hidden shadow-inner">
                    <div 
                      className="h-full rounded-full transition-all duration-1000 relative overflow-hidden" 
                      style={{ 
                        width: `100%`,
                        background: primaryGradient
                      }}
                    >
                      <div className="absolute inset-0 bg-gradient-shimmer animate-shimmer"></div>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {/* Error Message */}
            {error && (
              <div className="mt-6 p-4 bg-red-50/80 backdrop-blur-sm text-red-700 rounded-xl flex items-center text-sm border border-red-200/50">
                <AlertCircle className="w-5 h-5 mr-2" />
                <p>{error}</p>
              </div>
            )}

            {/* Navigation Buttons */}
            {!showSubmissionProgress && (
              <div className="mt-8 flex justify-between">
                <button
                  type="button"
                  onClick={handleBack}
                  className="px-6 py-3 rounded-xl border-2 border-slate-300 text-slate-700 font-semibold hover:bg-slate-50 hover:border-slate-400 transition-all duration-300 flex items-center font-poppins"
                >
                  <ArrowLeft className="w-5 h-5 mr-2" />
                  Zurück
                </button>
                
                <button
                  type="button"
                  onClick={handleNext}
                  disabled={isSubmitting}
                  className="px-8 py-3 rounded-xl text-white font-bold transition-all duration-300 flex items-center shadow-lg hover:shadow-xl transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed font-poppins"
                  style={{ background: primaryGradient }}
                >
                  {isSubmitting ? (
                    <>
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                      Wird gesendet...
                    </>
                  ) : currentStep === 2 ? (
                    <>
                      <span>Anfrage senden</span>
                      <ArrowRight className="w-5 h-5 ml-2" />
                    </>
                  ) : (
                    <>
                      Weiter
                      <ArrowRight className="w-5 h-5 ml-2" />
                    </>
                  )}
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Anfrage;