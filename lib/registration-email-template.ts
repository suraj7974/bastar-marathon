export type RegistrationEmailData = {
  participantName: string;
  identificationNumber: string;
  eventName?: string;
  eventDate?: string;
};

const DEFAULT_EVENT_NAME = "Bastar Marathon";
const DEFAULT_EVENT_DATE = "Event Day";

export function getRegistrationEmailHtml(data: RegistrationEmailData): string {
  const {
    participantName,
    identificationNumber,
    eventName = DEFAULT_EVENT_NAME,
    eventDate = DEFAULT_EVENT_DATE,
  } = data;

  return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Registration Confirmed</title>
</head>
<body style="margin:0; padding:0; background-color:#f0f9f9; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;">
  <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background-color:#f0f9f9; padding: 32px 16px;">
    <tr>
      <td align="center">
        <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="max-width: 560px; background-color:#ffffff; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 6px rgba(0,0,0,0.06);">
          <!-- Header -->
          <tr>
            <td style="background: linear-gradient(135deg, #0d9488 0%, #0f766e 100%); padding: 32px 24px; text-align: center;">
              <h1 style="margin:0; color:#ffffff; font-size: 24px; font-weight: 700; letter-spacing: -0.5px;">
                ${escapeHtml(eventName)}
              </h1>
              <p style="margin: 8px 0 0 0; color: rgba(255,255,255,0.9); font-size: 14px;">
                Registration confirmed
              </p>
            </td>
          </tr>
          <!-- Body -->
          <tr>
            <td style="padding: 32px 24px;">
              <p style="margin:0 0 16px 0; color:#1e293b; font-size: 16px; line-height: 1.6;">
                Hello <strong>${escapeHtml(participantName)}</strong>,
              </p>
              <p style="margin:0 0 24px 0; color:#475569; font-size: 15px; line-height: 1.6;">
                Your registration for <strong>${escapeHtml(eventName)}</strong> is confirmed. Please save your identification number for check-in and event day.
              </p>
              <!-- ID number box -->
              <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background-color:#ccfbf1; border: 2px solid #0d9488; border-radius: 8px; margin-bottom: 24px;">
                <tr>
                  <td style="padding: 20px 24px; text-align: center;">
                    <p style="margin:0 0 6px 0; color:#0f766e; font-size: 12px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.5px;">Identification number</p>
                    <p style="margin:0; color:#134e4a; font-size: 22px; font-weight: 700; letter-spacing: 2px; font-family: ui-monospace, monospace;">${escapeHtml(identificationNumber)}</p>
                  </td>
                </tr>
              </table>
              <p style="margin:0 0 8px 0; color:#64748b; font-size: 14px; line-height: 1.5;">
                Event: <strong style="color:#0d9488;">${escapeHtml(eventName)}</strong><br/>
                Date: ${escapeHtml(eventDate)}
              </p>
              <p style="margin: 24px 0 0 0; color:#64748b; font-size: 13px; line-height: 1.5;">
                If you have any questions, please contact the event organisers.
              </p>
            </td>
          </tr>
          <!-- Footer -->
          <tr>
            <td style="background-color:#f0fdfa; padding: 20px 24px; text-align: center; border-top: 1px solid #ccfbf1;">
              <p style="margin:0; color:#0f766e; font-size: 12px;">
                Run strong. See you at the finish line.
              </p>
              <p style="margin: 8px 0 0 0; color:#5eead4; font-size: 11px;">
                — ${escapeHtml(eventName)} Team
              </p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>
`.trim();
}

function escapeHtml(text: string): string {
  const map: Record<string, string> = {
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#039;",
  };
  return text.replace(/[&<>"']/g, (ch) => map[ch] ?? ch);
}
