import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Car, LogOut, Search, Filter, Phone, Mail, CreditCard as Edit3, Save, X, Users, Clock, CheckCircle, AlertCircle, FileText, MapPin, Calendar, Home, Sparkles, Brush, SprayCan as Spray, Building, Star, Eye, Calculator, Send, Heart, CreditCard, Wrench } from 'lucide-react';
import { adminAuth } from '../lib/auth';
import { supabase, LeadData } from '../lib/supabase';
import QuoteModal from '../components/QuoteModal';

const AdminDashboard: React.FC = () => {
  const navigate = useNavigate();
  const [leads, setLeads] = useState<LeadData[]>([]);
  const [filteredLeads, setFilteredLeads] = useState<LeadData[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [serviceFilter, setServiceFilter] = useState('');
  const [editingNotes, setEditingNotes] = useState<string | null>(null);
  const [noteText, setNoteText] = useState('');
  const [viewMode, setViewMode] = useState<'cards' | 'table'>('cards');
  const [selectedLeadForQuote, setSelectedLeadForQuote] = useState<LeadData | null>(null);
  const [isQuoteModalOpen, setIsQuoteModalOpen] = useState(false);

  const currentUser = adminAuth.getCurrentUser();

  const statusOptions = ['Neu', 'Kontaktiert', 'Angebot', 'Beauftragt', 'Abgelehnt'];
  const serviceOptions = ['Außenwäsche', 'Innenraumreinigung', 'Polieren & Versiegeln', 'Motorwäsche', 'Lederpflege'];

  useEffect(() => {
    checkAuthAndFetchLeads();
  }, []);

  const checkAuthAndFetchLeads = async () => {
    const isAuthenticated = await adminAuth.checkAuthStatus();
    if (!isAuthenticated) {
      navigate('/admin/login');
      return;
    }
    fetchLeads();
  };

  useEffect(() => {
    filterLeads();
  }, [leads, searchTerm, statusFilter, serviceFilter]);

  const fetchLeads = async () => {
    try {
      const { data, error } = await supabase
        .from('leads')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setLeads(data || []);
    } catch (error) {
      console.error('Error fetching leads:', error);
      // If it's an auth error, redirect to login
      if (error.message?.includes('JWT') || error.message?.includes('auth')) {
        adminAuth.logout();
        navigate('/admin/login');
      }
    } finally {
      setLoading(false);
    }
  };

  const filterLeads = () => {
    let filtered = leads;

    if (searchTerm) {
      filtered = filtered.filter(lead => 
        lead.postal_code?.includes(searchTerm) ||
        lead.first_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        lead.last_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        lead.phone?.includes(searchTerm)
      );
    }

    if (statusFilter) {
      filtered = filtered.filter(lead => lead.status === statusFilter);
    }

    if (serviceFilter) {
      filtered = filtered.filter(lead => 
        lead.services?.includes(serviceFilter)
      );
    }

    setFilteredLeads(filtered);
  };

  const updateLeadStatus = async (leadId: string, newStatus: string) => {
    try {
      // Check auth status before making the request
      const isAuthenticated = await adminAuth.checkAuthStatus();
      if (!isAuthenticated) {
        navigate('/admin/login');
        return;
      }

      const { error } = await supabase
        .from('leads')
        .update({ status: newStatus })
        .eq('id', leadId);

      if (error) throw error;

      setLeads(leads.map(lead => 
        lead.id === leadId ? { ...lead, status: newStatus } : lead
      ));
    } catch (error) {
      console.error('Error updating status:', error);
      // If it's an auth error, redirect to login
      if (error.message?.includes('JWT') || error.message?.includes('auth')) {
        adminAuth.logout();
        navigate('/admin/login');
      }
    }
  };

  const updateLeadNotes = async (leadId: string, notes: string) => {
    try {
      // Check auth status before making the request
      const isAuthenticated = await adminAuth.checkAuthStatus();
      if (!isAuthenticated) {
        navigate('/admin/login');
        return;
      }

      const { error } = await supabase
        .from('leads')
        .update({ notes })
        .eq('id', leadId);

      if (error) throw error;

      setLeads(leads.map(lead => 
        lead.id === leadId ? { ...lead, notes } : lead
      ));
      setEditingNotes(null);
    } catch (error) {
      console.error('Error updating notes:', error);
      // If it's an auth error, redirect to login
      if (error.message?.includes('JWT') || error.message?.includes('auth')) {
        adminAuth.logout();
        navigate('/admin/login');
      }
    }
  };

  const handleLogout = async () => {
    await adminAuth.logout();
    navigate('/admin/login');
  };

  const handleContactLead = (lead: LeadData, type: 'phone' | 'email') => {
    if (type === 'phone') {
      window.open(`tel:${lead.phone}`);
    } else if (type === 'email' && lead.email) {
      window.open(`mailto:${lead.email}?subject=Ihre Anfrage bei GaLaBau Meister`);
    }
  };

  const handleCreateQuote = (lead: LeadData) => {
    setSelectedLeadForQuote(lead);
    setIsQuoteModalOpen(true);
  };

  const handleQuoteSent = () => {
    // Refresh leads to update any status changes
    fetchLeads();
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Neu': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'Kontaktiert': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'Angebot': return 'bg-purple-100 text-purple-800 border-purple-200';
      case 'Beauftragt': return 'bg-green-100 text-green-800 border-green-200';
      case 'Abgelehnt': return 'bg-red-100 text-red-800 border-red-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getUrgencyColor = (urgency: string) => {
    switch (urgency) {
      case 'asap': return 'text-red-600 bg-red-50';
      case '1-2-weeks': return 'text-yellow-600 bg-yellow-50';
      case 'later': return 'text-green-600 bg-green-50';
      default: return 'text-gray-600 bg-gray-50';
    }
  };

  const getUrgencyText = (urgency: string) => {
    switch (urgency) {
      case 'asap': return 'So schnell wie möglich';
      case '1-2-weeks': return 'In 1-2 Wochen';
      case 'later': return 'Später';
      default: return urgency;
    }
  };

  const getServiceIcon = (service: string) => {
    switch (service) {
      case 'Außenwäsche': return Car;
      case 'Innenraumreinigung': return Sparkles;
      case 'Polieren & Versiegeln': return Brush;
      case 'Motorwäsche': return Spray;
      case 'Lederpflege': return Home;
      default: return Car;
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-gray-600">Lade Dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-3">
              <img
                src="https://i.imgur.com/od6vWRK.jpeg"
                alt="DZ Autopflege Lounge"
                className="h-10 w-auto object-contain"
              />
              <p className="text-sm text-gray-600">Admin Dashboard</p>
            </div>
            
            <div className="flex items-center space-x-4">
              <span className="text-sm text-gray-600">
                Willkommen, {currentUser?.name}
              </span>
              <button
                onClick={handleLogout}
                className="flex items-center space-x-2 text-gray-600 hover:text-red-600 transition-colors"
              >
                <LogOut className="h-5 w-5" />
                <span>Abmelden</span>
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          {[
            { 
              title: 'Gesamt Anfragen', 
              value: leads.length, 
              icon: Users, 
              color: 'bg-primary' 
            },
            { 
              title: 'Neue Anfragen', 
              value: leads.filter(l => l.status === 'Neu').length, 
              icon: AlertCircle, 
              color: 'bg-brand-gold' 
            },
            { 
              title: 'Beauftragt', 
              value: leads.filter(l => l.status === 'Beauftragt').length, 
              icon: CheckCircle, 
              color: 'bg-accent-dark' 
            },
            { 
              title: 'Heute', 
              value: leads.filter(l => 
                new Date(l.created_at!).toDateString() === new Date().toDateString()
              ).length, 
              icon: Clock, 
              color: 'bg-primary-dark' 
            }
          ].map((stat, index) => (
            <div key={index} className="bg-white rounded-lg shadow p-6">
              <div className="flex items-center">
                <div className={`${stat.color} p-3 rounded-lg`}>
                  <stat.icon className="h-6 w-6 text-brand-white" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                  <p className="text-2xl font-bold text-brand-black">{stat.value}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Filters */}
        <div className="bg-white rounded-lg shadow mb-6 p-6">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 mb-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Suchen (PLZ, Name, Telefon)..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary"
                />
              </div>
              
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary"
              >
                <option value="">Alle Status</option>
                {statusOptions.map(status => (
                  <option key={status} value={status}>{status}</option>
                ))}
              </select>
              
              <select
                value={serviceFilter}
                onChange={(e) => setServiceFilter(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary"
              >
                <option value="">Alle Services</option>
                {serviceOptions.map(service => (
                  <option key={service} value={service}>{service}</option>
                ))}
              </select>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => {
                  setSearchTerm('');
                  setStatusFilter('');
                  setServiceFilter('');
                }}
                className="flex items-center justify-center px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
              >
                <Filter className="h-5 w-5 mr-2" />
                Reset
              </button>

              <div className="flex bg-gray-100 rounded-lg p-1">
                <button
                  onClick={() => setViewMode('cards')}
                  className={`px-3 py-1 rounded-md text-sm font-medium transition-colors ${
                    viewMode === 'cards' 
                      ? 'bg-white shadow-sm text-brand-black' 
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  Cards
                </button>
                <button
                  onClick={() => setViewMode('table')}
                  className={`px-3 py-1 rounded-md text-sm font-medium transition-colors ${
                    viewMode === 'table' 
                      ? 'bg-white shadow-sm text-brand-black' 
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  Table
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Leads Display */}
        {viewMode === 'cards' ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredLeads.map((lead) => (
              <div key={lead.id} className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden">
                {/* Card Header */}
                <div className="bg-gradient-primary p-4 text-brand-white">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <h3 className="text-lg font-bold">
                        {lead.first_name} {lead.last_name}
                      </h3>
                      <div className="flex items-center text-brand-white/80">
                        <MapPin className="h-4 w-4 mr-1" />
                        <span className="text-sm">{lead.postal_code}</span>
                      </div>
                    </div>
                    <div className={`px-3 py-1 rounded-full text-xs font-medium border ${getStatusColor(lead.status || 'Neu')}`}>
                      {lead.status || 'Neu'}
                    </div>
                  </div>
                  <div className="flex items-center text-brand-white/80 text-xs">
                    <Calendar className="h-3 w-3 mr-1" />
                    <span>{new Date(lead.created_at!).toLocaleDateString('de-DE')}</span>
                  </div>
                </div>

                {/* Card Body */}
                <div className="p-4 space-y-4">
                  {/* Contact Info */}
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center text-gray-600">
                        <Phone className="h-4 w-4 mr-2" />
                        <span className="text-sm">{lead.phone}</span>
                      </div>
                      <button
                        onClick={() => handleContactLead(lead, 'phone')}
                        className="text-accent-dark hover:text-brand-black p-1 rounded"
                        title="Anrufen"
                      >
                        <Phone className="h-4 w-4" />
                      </button>
                    </div>
                    {lead.email && (
                      <div className="flex items-center justify-between">
                        <div className="flex items-center text-gray-600">
                          <Mail className="h-4 w-4 mr-2" />
                          <span className="text-sm truncate">{lead.email}</span>
                        </div>
                        <button
                          onClick={() => handleContactLead(lead, 'email')}
                          className="text-primary hover:text-primary-dark p-1 rounded"
                          title="E-Mail senden"
                        >
                          <Mail className="h-4 w-4" />
                        </button>
                      </div>
                    )}
                  </div>

                  {/* Services */}
                  <div>
                    <h4 className="text-sm font-medium text-gray-700 mb-2">Gewünschte Leistungen:</h4>
                    <div className="flex flex-wrap gap-1">
                      {lead.services?.map((service, index) => {
                        const ServiceIcon = getServiceIcon(service);
                        return (
                          <div key={index} className="flex items-center bg-primary/10 text-primary px-2 py-1 rounded-full text-xs">
                            <ServiceIcon className="h-3 w-3 mr-1" />
                            <span>{service}</span>
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  {/* Garden Details */}
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="text-gray-500">Fahrzeugtyp:</span>
                      <div className="font-medium">{lead.vehicle_type}</div>
                    </div>
                    <div>
                      <span className="text-gray-500">Zeitpunkt:</span>
                      <div className={`font-medium px-2 py-1 rounded text-xs ${getUrgencyColor(lead.urgency!)}`}>
                        {getUrgencyText(lead.urgency!)}
                      </div>
                    </div>
                  </div>

                  {/* Photo */}
                  {lead.photo_url && (
                    <div>
                      <a
                        href={lead.photo_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center text-brand-gold hover:text-brand-gold/80 text-sm"
                      >
                        <FileText className="h-4 w-4 mr-2" />
                        Foto ansehen
                      </a>
                    </div>
                  )}

                  {/* Status Update */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Status:</label>
                    <select
                      value={lead.status || 'Neu'}
                      onChange={(e) => updateLeadStatus(lead.id!, e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary text-sm"
                    >
                      {statusOptions.map(status => (
                        <option key={status} value={status}>{status}</option>
                      ))}
                    </select>
                  </div>

                  {/* Notes */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Notizen:</label>
                    {editingNotes === lead.id ? (
                      <div className="space-y-2">
                        <textarea
                          value={noteText}
                          onChange={(e) => setNoteText(e.target.value)}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary text-sm"
                          rows={3}
                          placeholder="Notizen hinzufügen..."
                        />
                        <div className="flex gap-2">
                          <button
                            onClick={() => updateLeadNotes(lead.id!, noteText)}
                            className="flex items-center px-3 py-1 bg-accent-dark text-brand-white rounded text-xs hover:bg-brand-black"
                          >
                            <Save className="h-3 w-3 mr-1" />
                            Speichern
                          </button>
                          <button
                            onClick={() => setEditingNotes(null)}
                            className="flex items-center px-3 py-1 bg-accent text-brand-white rounded text-xs hover:bg-accent-dark"
                          >
                            <X className="h-3 w-3 mr-1" />
                            Abbrechen
                          </button>
                        </div>
                      </div>
                    ) : (
                      <div 
                        onClick={() => {
                          setEditingNotes(lead.id!);
                          setNoteText(lead.notes || '');
                        }}
                        className="min-h-[60px] p-3 border border-gray-300 rounded-lg cursor-pointer hover:bg-gray-50 text-sm"
                      >
                        {lead.notes || (
                          <span className="text-gray-400 italic">Klicken Sie hier, um Notizen hinzuzufügen...</span>
                        )}
                      </div>
                    )}
                  </div>

                  {/* Fahrzeug & Services */}
                  <div>
                    <h4 className="text-sm font-medium text-gray-700 mb-2">Fahrzeug & Services:</h4>
                    <div className="flex flex-wrap gap-1">
                      {/* Vehicle Type */}
                      {lead.answers?.vehicle_type && (
                        <div className="flex items-center bg-primary/10 text-primary px-2 py-1 rounded-full text-xs">
                          <Car className="h-3 w-3 mr-1" />
                          <span>{lead.answers.vehicle_type}</span>
                        </div>
                      )}
                      {/* Service Type */}
                      {lead.answers?.service_type && (
                        <div className="flex items-center bg-accent/20 text-accent-dark px-2 py-1 rounded-full text-xs">
                          <Sparkles className="h-3 w-3 mr-1" />
                          <span>{lead.answers.service_type}</span>
                        </div>
                      )}
                      {/* Vehicle Condition */}
                      {lead.answers?.vehicle_condition && (
                        <div className="flex items-center bg-brand-gold/20 text-brand-gold px-2 py-1 rounded-full text-xs">
                          <AlertCircle className="h-3 w-3 mr-1" />
                          <span>{lead.answers.vehicle_condition}</span>
                        </div>
                      )}
                      {/* Pets in Car */}
                      {lead.answers?.pets_in_car && (
                        <div className="flex items-center bg-primary/10 text-primary px-2 py-1 rounded-full text-xs">
                          <Heart className="h-3 w-3 mr-1" />
                          <span>{lead.answers.pets_in_car}</span>
                        </div>
                      )}
                      {/* Leasing Vehicle */}
                      {lead.answers?.leasing_vehicle && (
                        <div className="flex items-center bg-accent/20 text-accent-dark px-2 py-1 rounded-full text-xs">
                          <CreditCard className="h-3 w-3 mr-1" />
                          <span>{lead.answers.leasing_vehicle}</span>
                        </div>
                      )}
                      {/* Smart Repair */}
                      {lead.answers?.smart_repair_needed && (
                        <div className="flex items-center bg-brand-gold/20 text-brand-gold px-2 py-1 rounded-full text-xs">
                          <Wrench className="h-3 w-3 mr-1" />
                          <span>{lead.answers.smart_repair_needed}</span>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Service Details */}
                  <div className="grid grid-cols-1 gap-2 text-sm">
                    <div>
                      <span className="text-gray-500">Häufigkeit:</span>
                      <div className="font-medium">{lead.answers?.frequency || 'Nicht angegeben'}</div>
                    </div>
                    <div>
                      <span className="text-gray-500">Zeitrahmen:</span>
                      <div className={`font-medium px-2 py-1 rounded text-xs ${getUrgencyColor(lead.answers?.timeframe || '')}`}>
                        {lead.answers?.timeframe || 'Nicht angegeben'}
                      </div>
                    </div>
                  </div>

                  {/* Qualification Score */}
                  {lead.answers?.qualification_score && (
                    <div className="bg-accent-light rounded-lg p-3">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm font-medium text-gray-700">Qualifikation</span>
                        <span className="text-sm font-bold" style={{ color: getScoreColor(lead.answers.qualification_score) }}>
                          {lead.answers.qualification_score}%
                        </span>
                      </div>
                      <div className="w-full h-2 bg-accent/30 rounded-full overflow-hidden">
                        <div 
                          className="h-full rounded-full transition-all" 
                          style={{ 
                            width: `${lead.answers.qualification_score}%`,
                            backgroundColor: getScoreColor(lead.answers.qualification_score)
                          }}
                        ></div>
                      </div>
                    </div>
                  )}

                  {/* Ready to Book Indicator */}
                  {lead.answers?.ready_to_book && (
                    <div className="flex items-center gap-2 bg-accent/20 text-accent-dark px-3 py-2 rounded-lg">
                      <CheckCircle className="h-4 w-4" />
                      <span className="text-sm font-medium">Bereit für sofortigen Termin</span>
                    </div>
                  )}

                  {/* Action Buttons */}
                  <div className="flex gap-2 pt-2">
                    <button
                      onClick={() => handleContactLead(lead, 'phone')}
                      className="flex-1 flex items-center justify-center px-3 py-2 bg-accent-dark text-brand-white rounded-lg hover:bg-brand-black text-sm"
                    >
                      <Phone className="h-4 w-4 mr-1" />
                      Anrufen
                    </button>
                    {lead.email && (
                      <button
                        onClick={() => handleCreateQuote(lead)}
                        className="flex-1 flex items-center justify-center px-3 py-2 bg-primary text-brand-white rounded-lg hover:bg-primary-dark text-sm"
                      >
                        <Calculator className="h-4 w-4 mr-1" />
                        Angebot
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          /* Table View */
          <div className="bg-white rounded-lg shadow overflow-hidden">
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Kunde
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Kontakt
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Details
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Notizen
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Aktionen
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {filteredLeads.map((lead) => (
                    <tr key={lead.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div>
                          <div className="text-sm font-medium text-gray-900">
                            {lead.first_name} {lead.last_name}
                          </div>
                          <div className="text-sm text-gray-500 flex items-center">
                            <MapPin className="h-4 w-4 mr-1" />
                            {lead.postal_code}
                          </div>
                          <div className="text-xs text-gray-400">
                            {new Date(lead.created_at!).toLocaleDateString('de-DE')}
                          </div>
                        </div>
                      </td>
                      
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">{lead.phone}</div>
                        {lead.email && (
                          <div className="text-sm text-gray-500">{lead.email}</div>
                        )}
                      </td>
                      
                      <td className="px-6 py-4">
                        <div className="text-sm text-gray-900">
                          <div className="mb-1">
                            <strong>Services:</strong> {lead.services?.join(', ')}
                          </div>
                          <div className="mb-1">
                            <strong>Fahrzeug:</strong> {lead.vehicle_type}
                          </div>
                          <div className={`text-sm ${getUrgencyColor(lead.urgency!)}`}>
                            <strong>Zeitpunkt:</strong> {getUrgencyText(lead.urgency!)}
                          </div>
                        </div>
                        {lead.answers?.vehicle_type && (
                          <div className="mb-1">
                            <strong>Fahrzeug:</strong> {lead.answers.vehicle_type}
                          </div>
                        )}
                        {lead.answers?.service_type && (
                          <div className="mb-1">
                            <strong>Service:</strong> {lead.answers.service_type}
                          </div>
                        )}
                        {lead.answers?.vehicle_condition && (
                          <div className="mb-1">
                            <strong>Zustand:</strong> {lead.answers.vehicle_condition}
                          </div>
                        )}
                        {lead.answers?.frequency && (
                          <div className="mb-1">
                            <strong>Häufigkeit:</strong> {lead.answers.frequency}
                          </div>
                        )}
                        {lead.answers?.pets_in_car && (
                          <div className="mb-1">
                            <strong>Tiere:</strong> {lead.answers.pets_in_car}
                          </div>
                        )}
                        {lead.answers?.leasing_vehicle && (
                          <div className="mb-1">
                            <strong>Fahrzeug:</strong> {lead.answers.leasing_vehicle}
                          </div>
                        )}
                        {lead.answers?.smart_repair_needed && (
                          <div className="mb-1">
                            <strong>Smart Repair:</strong> {lead.answers.smart_repair_needed}
                          </div>
                        )}
                        {lead.answers?.timeframe && (
                          <div className={`text-sm ${getUrgencyColor(lead.answers.timeframe)}`}>
                            <strong>Zeitrahmen:</strong> {lead.answers.timeframe}
                          </div>
                        )}
                      </td>
                      
                      <td className="px-6 py-4 whitespace-nowrap">
                        <select
                          value={lead.status || 'Neu'}
                          onChange={(e) => updateLeadStatus(lead.id!, e.target.value)}
                          className={`text-sm px-3 py-1 rounded-full border ${getStatusColor(lead.status || 'Neu')}`}
                        >
                          {statusOptions.map(status => (
                            <option key={status} value={status}>{status}</option>
                          ))}
                        </select>
                      </td>
                      
                      <td className="px-6 py-4">
                        {editingNotes === lead.id ? (
                          <div className="space-y-2">
                            <textarea
                              value={noteText}
                              onChange={(e) => setNoteText(e.target.value)}
                              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary text-sm"
                              rows={2}
                              placeholder="Notizen hinzufügen..."
                            />
                            <div className="flex space-x-2">
                              <button
                                onClick={() => updateLeadNotes(lead.id!, noteText)}
                                className="text-accent-dark hover:text-brand-black"
                              >
                                <Save className="h-4 w-4" />
                              </button>
                              <button
                                onClick={() => setEditingNotes(null)}
                                className="text-accent hover:text-accent-dark"
                              >
                                <X className="h-4 w-4" />
                              </button>
                            </div>
                          </div>
                        ) : (
                          <div className="flex items-center space-x-2">
                            <div className="text-sm text-gray-600 max-w-xs truncate">
                              {lead.notes || 'Keine Notizen'}
                            </div>
                            <button
                              onClick={() => {
                                setEditingNotes(lead.id!);
                                setNoteText(lead.notes || '');
                              }}
                              className="text-gray-400 hover:text-gray-600"
                            >
                              <Edit3 className="h-4 w-4" />
                            </button>
                          </div>
                        )}
                      </td>
                      
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex space-x-2">
                          <button
                            onClick={() => handleContactLead(lead, 'phone')}
                            className="text-accent-dark hover:text-brand-black"
                            title="Anrufen"
                          >
                            <Phone className="h-5 w-5" />
                          </button>
                          {lead.email && (
                            <button
                              onClick={() => handleContactLead(lead, 'email')}
                              className="text-primary hover:text-primary-dark"
                              title="E-Mail senden"
                            >
                              <Mail className="h-5 w-5" />
                            </button>
                          )}
                          {lead.photo_url && (
                            <a
                              href={lead.photo_url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-brand-gold hover:text-brand-gold/80"
                              title="Foto ansehen"
                            >
                              <FileText className="h-5 w-5" />
                            </a>
                          )}
                          <button
                            onClick={() => handleCreateQuote(lead)}
                            disabled={!lead.email}
                            className="text-primary hover:text-primary-dark disabled:opacity-50 disabled:cursor-not-allowed"
                            title={!lead.email ? 'Kunde hat keine E-Mail-Adresse' : 'Kostenvoranschlag erstellen'}
                          >
                            <Calculator className="h-5 w-5" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            
            {filteredLeads.length === 0 && (
              <div className="text-center py-12">
                <Users className="h-12 w-12 text-accent mx-auto mb-4" />
                <p className="text-gray-500">Keine Anfragen gefunden</p>
              </div>
            )}
          </div>
        )}

        {filteredLeads.length === 0 && viewMode === 'cards' && (
          <div className="text-center py-12">
            <Users className="h-12 w-12 text-accent mx-auto mb-4" />
            <p className="text-gray-500">Keine Anfragen gefunden</p>
            <p className="text-sm text-gray-400 mt-2">
              Sobald Kunden das Formular ausfüllen, erscheinen die Anfragen hier als detaillierte Karten.
            </p>
          </div>
        )}
      </div>

      {/* Quote Modal */}
      {selectedLeadForQuote && (
        <QuoteModal
          lead={selectedLeadForQuote}
          isOpen={isQuoteModalOpen}
          onClose={() => {
            setIsQuoteModalOpen(false);
            setSelectedLeadForQuote(null);
          }}
          onQuoteSent={handleQuoteSent}
        />
      )}
    </div>
  );
};

// Helper function to get score color
const getScoreColor = (score: number): string => {
  if (score >= 80) return '#8C8C8C'; // accent-dark
  if (score >= 60) return '#E10600'; // primary
  if (score >= 40) return '#D4AF37'; // brand-gold
  return '#BFBFBF'; // accent
};

export default AdminDashboard;