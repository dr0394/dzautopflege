import React, { useState, useEffect } from 'react';
import { X, Plus, Trash2, FileText, Send, Calculator } from 'lucide-react';
import { LeadData } from '../lib/supabase';
import { QuoteData, QuoteItem, generateQuotePDF, getDefaultQuoteItems } from '../lib/pdfGenerator';
import { sendEmail, emailTemplates } from '../lib/email';

interface QuoteModalProps {
  lead: LeadData;
  isOpen: boolean;
  onClose: () => void;
  onQuoteSent: () => void;
}

const QuoteModal: React.FC<QuoteModalProps> = ({ lead, isOpen, onClose, onQuoteSent }) => {
  const [quoteItems, setQuoteItems] = useState<QuoteItem[]>([]);
  const [notes, setNotes] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [isSending, setIsSending] = useState(false);

  useEffect(() => {
    if (isOpen && lead) {
      setQuoteItems(getDefaultQuoteItems(lead));
      setNotes('');
    }
  }, [isOpen, lead]);

  const addQuoteItem = () => {
    setQuoteItems([
      ...quoteItems,
      {
        description: '',
        quantity: 1,
        unit: 'Stück',
        unitPrice: 0,
        total: 0
      }
    ]);
  };

  const updateQuoteItem = (index: number, field: keyof QuoteItem, value: string | number) => {
    const updatedItems = [...quoteItems];
    updatedItems[index] = { ...updatedItems[index], [field]: value };
    setQuoteItems(updatedItems);
  };

  const removeQuoteItem = (index: number) => {
    setQuoteItems(quoteItems.filter((_, i) => i !== index));
  };

  const calculateTotals = () => {
    return { subtotal: 0, tax: 0, total: 0 };
  };

  const generateAndSendQuote = async () => {
    if (!lead.email) {
      alert('Kunde hat keine E-Mail-Adresse angegeben.');
      return;
    }

    setIsGenerating(true);
    setIsSending(true);

    try {
      const validUntil = new Date();
      validUntil.setDate(validUntil.getDate() + 30);

      const quoteData: QuoteData = {
        leadId: lead.id!,
        items: quoteItems,
        validUntil: validUntil.toLocaleDateString('de-DE'),
        notes
      };

      // Generate PDF
      const pdfBlob = await generateQuotePDF(lead, quoteData);
      
      // Convert blob to base64 for email attachment
      const reader = new FileReader();
      reader.onloadend = async () => {
        const base64data = reader.result as string;
        
        // Send email with PDF attachment
        const emailTemplate = {
          subject: `Ihr Kostenvoranschlag von Fahrze Meister - ${lead.first_name} ${lead.last_name}`,
          html: `
            <!DOCTYPE html>
            <html>
            <head>
              <meta charset="utf-8">
              <style>
                body { font-family: 'Inter', Arial, sans-serif; line-height: 1.6; color: #333; }
                .container { max-width: 600px; margin: 0 auto; padding: 20px; }
                .header { background: linear-gradient(135deg, #2E7D32, #388E3C); color: white; padding: 30px; text-align: center; border-radius: 8px 8px 0 0; }
                .logo { font-size: 24px; font-weight: bold; margin-bottom: 10px; }
                .content { background: white; padding: 30px; border: 1px solid #e0e0e0; }
                .footer { background: #f5f5f5; padding: 20px; text-align: center; border-radius: 0 0 8px 8px; }
                .highlight { background: #e8f5e8; padding: 15px; border-radius: 6px; margin: 15px 0; }
                .total { font-size: 18px; font-weight: bold; color: #2E7D32; }
              </style>
            </head>
            <body>
              <div class="container">
                <div class="header">
                  <div class="logo">🌿 GaLaBau Meister</div>
                  <p>Ihr Kostenvoranschlag ist da!</p>
                </div>
                
                <div class="content">
                  <h2>Liebe/r ${lead.first_name} ${lead.last_name},</h2>
                  
                  <p>vielen Dank für Ihr Interesse an unseren Gartenpflegeleistungen. Gerne übersenden wir Ihnen hiermit Ihren persönlichen Kostenvoranschlag.</p>
                  
                  <div class="highlight">
                    <h3>Ihr Angebot im Überblick:</h3>
                    <ul>
                      ${quoteItems.map(item => `<li>${item.description} (${item.quantity} ${item.unit})</li>`).join('')}
                    </ul>
                    <p class="total">Individuelle Preisgestaltung nach Besichtigung</p>
                  </div>
                  
                  <p><strong>Das Angebot ist gültig bis: ${quoteData.validUntil}</strong></p>
                  
                  <p>Den detaillierten Kostenvoranschlag finden Sie im Anhang als PDF-Datei.</p>
                  
                  ${notes ? `<p><strong>Zusätzliche Hinweise:</strong><br>${notes}</p>` : ''}
                  
                  <p><strong>Nächste Schritte:</strong></p>
                  <ol>
                    <li>Prüfen Sie unser Angebot in Ruhe</li>
                    <li>Bei Fragen stehen wir Ihnen gerne zur Verfügung</li>
                    <li>Bei Interesse können Sie den Auftrag direkt erteilen</li>
                  </ol>
                  
                  <p>Wir freuen uns auf Ihre Rückmeldung und darauf, Ihren Garten in eine grüne Oase zu verwandeln!</p>
                  
                  <p>Bei Fragen erreichen Sie uns jederzeit unter:</p>
                  <p>📞 <strong>+49 (0) 123 456 789</strong><br>
                  📧 <strong>info@galabau-meister.de</strong></p>
                  
                  <p>Mit freundlichen Grüßen<br>
                  Ihr GaLaBau Meister Team</p>
                </div>
                
                <div class="footer">
                  <p>GaLaBau Meister | Musterstraße 123 | 12345 Musterstadt</p>
                  <p>© 2024 GaLaBau Meister. Alle Rechte vorbehalten.</p>
                </div>
              </div>
            </body>
            </html>
          `,
          text: `
Liebe/r ${lead.first_name} ${lead.last_name},

vielen Dank für Ihr Interesse an unseren Gartenpflegeleistungen. Gerne übersenden wir Ihnen hiermit Ihren persönlichen Kostenvoranschlag.

Individuelle Preisgestaltung nach Besichtigung
Gültig bis: ${quoteData.validUntil}

Den detaillierten Kostenvoranschlag finden Sie im Anhang als PDF-Datei.

${notes ? `Zusätzliche Hinweise: ${notes}` : ''}

Bei Fragen erreichen Sie uns jederzeit unter:
Telefon: +49 (0) 123 456 789
E-Mail: info@galabau-meister.de

Mit freundlichen Grüßen
Ihr GaLaBau Meister Team
          `
        };

        // In a real implementation, you would send the email with the PDF attachment
        // For now, we'll simulate this and log the action
        console.log('Sending quote email to:', lead.email);
        console.log('PDF generated, size:', pdfBlob.size, 'bytes');
        
        await sendEmail(lead.email!, emailTemplate, lead.id, 'quote');
        
        // Download PDF for admin (optional)
        const url = URL.createObjectURL(pdfBlob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `Kostenvoranschlag_${lead.first_name}_${lead.last_name}_${Date.now()}.pdf`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);

        onQuoteSent();
        onClose();
        alert('Kostenvoranschlag wurde erfolgreich erstellt und per E-Mail versendet!');
      };
      
      reader.readAsDataURL(pdfBlob);
    } catch (error) {
      console.error('Error generating quote:', error);
      alert('Fehler beim Erstellen des Kostenvoranschlags. Bitte versuchen Sie es erneut.');
    } finally {
      setIsGenerating(false);
      setIsSending(false);
    }
  };

  const { subtotal, tax, total } = calculateTotals();

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center p-6 border-b">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Kostenvoranschlag erstellen</h2>
            <p className="text-gray-600">für {lead.first_name} {lead.last_name}</p>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <X className="h-6 w-6" />
          </button>
        </div>

        <div className="p-6">
          {/* Customer Info */}
          <div className="bg-gray-50 rounded-lg p-4 mb-6">
            <h3 className="font-semibold mb-2">Kundeninformationen</h3>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <p><strong>Name:</strong> {lead.first_name} {lead.last_name}</p>
                <p><strong>PLZ:</strong> {lead.postal_code}</p>
                <p><strong>Telefon:</strong> {lead.phone}</p>
                {lead.email && <p><strong>E-Mail:</strong> {lead.email}</p>}
              </div>
              <div>
                <p><strong>Fahrzeugtyp:</strong> {lead.vehicle_type}</p>
                <p><strong>Gewünschte Leistungen:</strong> {lead.services?.join(', ')}</p>
                <p><strong>Zeitpunkt:</strong> {
                  lead.urgency === 'asap' ? 'So schnell wie möglich' :
                  lead.urgency === '1-2-weeks' ? 'In 1-2 Wochen' : 'Später'
                }</p>
              </div>
            </div>
          </div>

          {/* Quote Items */}
          <div className="mb-6">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold">Leistungen</h3>
              <button
                onClick={addQuoteItem}
                className="flex items-center px-3 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors"
              >
                <Plus className="h-4 w-4 mr-2" />
                Position hinzufügen
              </button>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full border-collapse border border-gray-300">
                <thead>
                  <tr className="bg-gray-50">
                    <th className="border border-gray-300 px-4 py-2 text-left">Beschreibung</th>
                    <th className="border border-gray-300 px-4 py-2 text-center w-20">Menge</th>
                    <th className="border border-gray-300 px-4 py-2 text-center w-20">Einheit</th>
                    <th className="border border-gray-300 px-4 py-2 text-center w-12">Aktion</th>
                  </tr>
                </thead>
                <tbody>
                  {quoteItems.map((item, index) => (
                    <tr key={index}>
                      <td className="border border-gray-300 px-2 py-1">
                        <input
                          type="text"
                          value={item.description}
                          onChange={(e) => updateQuoteItem(index, 'description', e.target.value)}
                          className="w-full px-2 py-1 border-0 focus:ring-1 focus:ring-primary"
                          placeholder="Leistungsbeschreibung"
                        />
                      </td>
                      <td className="border border-gray-300 px-2 py-1">
                        <input
                          type="number"
                          value={item.quantity}
                          onChange={(e) => updateQuoteItem(index, 'quantity', parseFloat(e.target.value) || 0)}
                          className="w-full px-2 py-1 border-0 focus:ring-1 focus:ring-primary text-center"
                          min="0"
                          step="0.1"
                        />
                      </td>
                      <td className="border border-gray-300 px-2 py-1">
                        <select
                          value={item.unit}
                          onChange={(e) => updateQuoteItem(index, 'unit', e.target.value)}
                          className="w-full px-2 py-1 border-0 focus:ring-1 focus:ring-primary"
                        >
                          <option value="Stück">Stück</option>
                          <option value="m²">m²</option>
                          <option value="lfd. m">lfd. m</option>
                          <option value="Std">Std</option>
                          <option value="Tag">Tag</option>
                          <option value="Pauschal">Pauschal</option>
                        </select>
                      </td>
                      <td className="border border-gray-300 px-2 py-1 text-center">
                        <button
                          onClick={() => removeQuoteItem(index)}
                          className="text-red-600 hover:text-red-800 p-1"
                          title="Position löschen"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Notes */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Anmerkungen (optional)
            </label>
            <textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
              rows={3}
              placeholder="Zusätzliche Hinweise zum Angebot..."
            />
          </div>

          {/* Actions */}
          <div className="flex justify-end space-x-4">
            <button
              onClick={onClose}
              className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
            >
              Abbrechen
            </button>
            
            <button
              onClick={generateAndSendQuote}
              disabled={isGenerating || isSending || !lead.email || quoteItems.length === 0}
              className="flex items-center px-6 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isGenerating ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                  Erstelle PDF...
                </>
              ) : isSending ? (
                <>
                  <Send className="h-4 w-4 mr-2" />
                  Sende E-Mail...
                </>
              ) : (
                <>
                  <FileText className="h-4 w-4 mr-2" />
                  PDF erstellen & senden
                </>
              )}
            </button>
          </div>

          {!lead.email && (
            <div className="mt-4 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
              <p className="text-yellow-800 text-sm">
                <strong>Hinweis:</strong> Kunde hat keine E-Mail-Adresse angegeben. 
                Das PDF kann erstellt, aber nicht automatisch versendet werden.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default QuoteModal;