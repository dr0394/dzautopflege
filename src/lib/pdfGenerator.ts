import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import { LeadData } from './supabase';

export interface QuoteData {
  leadId: string;
  items: QuoteItem[];
  validUntil: string;
  notes?: string;
}

export interface QuoteItem {
  description: string;
  quantity: number;
  unit: string;
}

export const generateQuotePDF = async (lead: LeadData, quote: QuoteData): Promise<Blob> => {
  // Create a temporary div for the quote content
  const quoteElement = document.createElement('div');
  quoteElement.style.position = 'absolute';
  quoteElement.style.left = '-9999px';
  quoteElement.style.width = '210mm';
  quoteElement.style.padding = '20mm';
  quoteElement.style.fontFamily = 'Arial, sans-serif';
  quoteElement.style.fontSize = '12px';
  quoteElement.style.lineHeight = '1.4';
  quoteElement.style.backgroundColor = 'white';

  quoteElement.innerHTML = `
    <div style="max-width: 170mm; margin: 0 auto;">
      <!-- Header -->
      <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 30px; border-bottom: 2px solid #1E40AF; padding-bottom: 20px;">
        <div>
          <div style="display: flex; align-items: center; margin-bottom: 10px;">
            <div style="width: 40px; height: 40px; background: #1E40AF; border-radius: 8px; display: flex; align-items: center; justify-content: center; margin-right: 15px;">
              <span style="color: white; font-size: 20px;">🚗</span>
            </div>
            <div>
              <h1 style="margin: 0; font-size: 24px; color: #1E40AF; font-weight: bold;">Fahrzeugpflege Chouman</h1>
              <p style="margin: 0; color: #666; font-size: 14px;">Ihr Auto in Profihänden</p>
            </div>
          </div>
        </div>
        <div style="text-align: right; color: #666; font-size: 12px;">
          <p style="margin: 2px 0;"><strong>Fahrzeugpflege Chouman</strong></p>
          <p style="margin: 2px 0;">Scheffelstr. 2</p>
          <p style="margin: 2px 0;">45468 Mülheim/Ruhr</p>
          <p style="margin: 2px 0;">Tel: 0163 621 84 90</p>
          <p style="margin: 2px 0;">kfz.service.chouman@gmail.com</p>
        </div>
      </div>

      <!-- Quote Title -->
      <div style="text-align: center; margin-bottom: 30px;">
        <h2 style="margin: 0; font-size: 28px; color: #1E40AF; font-weight: bold;">KOSTENVORANSCHLAG</h2>
        <p style="margin: 5px 0 0 0; color: #666; font-size: 14px;">Angebot-Nr: ${Date.now()}</p>
      </div>

      <!-- Customer Info -->
      <div style="display: flex; justify-content: space-between; margin-bottom: 30px;">
        <div style="width: 48%;">
          <h3 style="margin: 0 0 10px 0; font-size: 16px; color: #1E40AF; border-bottom: 1px solid #ddd; padding-bottom: 5px;">Kunde</h3>
          <p style="margin: 2px 0;"><strong>${lead.first_name} ${lead.last_name}</strong></p>
          <p style="margin: 2px 0;">PLZ: ${lead.postal_code}</p>
          <p style="margin: 2px 0;">Tel: ${lead.phone}</p>
          ${lead.email ? `<p style="margin: 2px 0;">E-Mail: ${lead.email}</p>` : ''}
        </div>
        <div style="width: 48%;">
          <h3 style="margin: 0 0 10px 0; font-size: 16px; color: #1E40AF; border-bottom: 1px solid #ddd; padding-bottom: 5px;">Fahrzeugdetails</h3>
          <p style="margin: 2px 0;"><strong>Fahrzeugtyp:</strong> ${lead.vehicle_type || 'Nicht angegeben'}</p>
          <p style="margin: 2px 0;"><strong>Gewünschte Leistungen:</strong></p>
          <ul style="margin: 5px 0; padding-left: 20px;">
            ${lead.services?.map(service => `<li style="margin: 2px 0;">${service}</li>`).join('') || ''}
          </ul>
          <p style="margin: 2px 0;"><strong>Datum:</strong> ${new Date().toLocaleDateString('de-DE')}</p>
          <p style="margin: 2px 0;"><strong>Gültig bis:</strong> ${quote.validUntil}</p>
        </div>
      </div>

      <!-- Quote Items -->
      <div style="margin-bottom: 30px;">
        <h3 style="margin: 0 0 15px 0; font-size: 16px; color: #1E40AF; border-bottom: 1px solid #ddd; padding-bottom: 5px;">Leistungen</h3>
        <table style="width: 100%; border-collapse: collapse; font-size: 12px;">
          <thead>
            <tr style="background: #f8f9fa;">
              <th style="border: 1px solid #ddd; padding: 8px; text-align: left;">Beschreibung</th>
              <th style="border: 1px solid #ddd; padding: 8px; text-align: center; width: 60px;">Menge</th>
              <th style="border: 1px solid #ddd; padding: 8px; text-align: center; width: 60px;">Einheit</th>
            </tr>
          </thead>
          <tbody>
            ${quote.items.map(item => `
              <tr>
                <td style="border: 1px solid #ddd; padding: 8px;">${item.description}</td>
                <td style="border: 1px solid #ddd; padding: 8px; text-align: center;">${item.quantity}</td>
                <td style="border: 1px solid #ddd; padding: 8px; text-align: center;">${item.unit}</td>
              </tr>
            `).join('')}
          </tbody>
        </table>
      </div>

      ${quote.notes ? `
        <!-- Notes -->
        <div style="margin-bottom: 30px;">
          <h3 style="margin: 0 0 10px 0; font-size: 16px; color: #1E40AF; border-bottom: 1px solid #ddd; padding-bottom: 5px;">Anmerkungen</h3>
          <p style="margin: 0; color: #666; line-height: 1.6;">${quote.notes}</p>
        </div>
      ` : ''}

      <!-- Terms -->
      <div style="margin-bottom: 20px; font-size: 11px; color: #666;">
        <h3 style="margin: 0 0 10px 0; font-size: 14px; color: #1E40AF; border-bottom: 1px solid #ddd; padding-bottom: 5px;">Allgemeine Bedingungen</h3>
        <ul style="margin: 0; padding-left: 20px; line-height: 1.6;">
          <li>Dieses Angebot ist ${quote.validUntil} gültig.</li>
          <li>Die Preise werden nach Besichtigung individuell kalkuliert.</li>
          <li>Die Fahrzeugreinigung wird nach professionellen Standards ausgeführt.</li>
          <li>Zahlungsbedingungen: 30 Tage netto nach Rechnungsstellung.</li>
          <li>Bei Auftragserteilung gelten unsere allgemeinen Geschäftsbedingungen.</li>
        </ul>
      </div>

      <!-- Footer -->
      <div style="text-align: center; border-top: 1px solid #ddd; padding-top: 15px; font-size: 10px; color: #666;">
        <p style="margin: 0;">Fahrzeugpflege Chouman | Inhaber: Hassan Chouman | Steuernr.: 120 504 021 48 | USt-IdNr.: DE278 208 292</p>
        <p style="margin: 5px 0 0 0;">Scheffelstr. 2 | 45468 Mülheim/Ruhr | Tel: 0163 621 84 90 | kfz.service.chouman@gmail.com</p>
      </div>
    </div>
  `;

  document.body.appendChild(quoteElement);

  try {
    // Convert HTML to canvas
    const canvas = await html2canvas(quoteElement, {
      scale: 2,
      useCORS: true,
      allowTaint: true,
      backgroundColor: '#ffffff'
    });

    // Create PDF
    const pdf = new jsPDF('p', 'mm', 'a4');
    const imgData = canvas.toDataURL('image/png');
    
    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = pdf.internal.pageSize.getHeight();
    const imgWidth = canvas.width;
    const imgHeight = canvas.height;
    const ratio = Math.min(pdfWidth / imgWidth, pdfHeight / imgHeight);
    const imgX = (pdfWidth - imgWidth * ratio) / 2;
    const imgY = 0;

    pdf.addImage(imgData, 'PNG', imgX, imgY, imgWidth * ratio, imgHeight * ratio);

    // Return PDF as blob
    return pdf.output('blob');
  } finally {
    document.body.removeChild(quoteElement);
  }
};

export const getDefaultQuoteItems = (lead: LeadData): QuoteItem[] => {
  const items: QuoteItem[] = [];
  
  if (lead.services?.includes('Außenwäsche')) {
    items.push({
      description: 'Außenwäsche komplett',
      quantity: 1,
      unit: 'Stück',
    });
  }
  
  if (lead.services?.includes('Innenraumreinigung')) {
    items.push({
      description: 'Innenraumreinigung komplett',
      quantity: 1,
      unit: 'Stück',
    });
  }
  
  if (lead.services?.includes('Polieren & Versiegeln')) {
    items.push({
      description: 'Polieren und Versiegeln',
      quantity: 1,
      unit: 'Stück',
    });
  }
  
  if (lead.services?.includes('Motorwäsche')) {
    items.push({
      description: 'Motorwäsche',
      quantity: 1,
      unit: 'Stück',
    });
  }
  
  if (lead.services?.includes('Lederpflege')) {
    items.push({
      description: 'Lederpflege und -schutz',
      quantity: 1,
      unit: 'Stück',
    });
  }

  // Add default car cleaning if no specific services
  if (items.length === 0) {
    items.push({
      description: 'Grundreinigung Fahrzeug',
      quantity: 1,
      unit: 'Stück',
    });
  }

  return items;
};