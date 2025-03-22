import React from 'react';
import { BrowserRouter as Router, Route, Link, Routes } from 'react-router-dom';

const PaymentPolicy = () => {
  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h1 style={styles.heading}>Payment Policy</h1>
        <h3 style={styles.subHeading}>Effective Date: [15-Feb-2025]</h3>
        <h3 style={styles.subHeading}>Last Updated: [15-Feb-2025]</h3>

        <h2 style={styles.sectionTitle}>1. Payment Terms</h2>
        <p style={styles.text}>
          a) All payments on SwasthyaPro are processed securely through Razorpay and other authorized payment gateways.
        </p>
        <p style={styles.text}>
          b) Users must ensure they provide correct payment details. SwasthyaPro is not responsible for failed transactions due to incorrect information or insufficient funds.
        </p>
        <p style={styles.text}>
          c) Charges for tests are displayed transparently at the time of booking. No hidden charges apply unless explicitly stated.
        </p>

        <h2 style={styles.sectionTitle}>2. Payment Confirmation</h2>
        <p style={styles.text}>
          a) A confirmation receipt will be sent via email and WhatsApp after a successful payment.
        </p>
        <p style={styles.text}>
          b) If you do not receive a confirmation within 30 minutes of payment, contact SwasthyaPro support.
        </p>

        <h2 style={styles.sectionTitle}>3. Refund & Cancellation Policy</h2>
        <h3 style={styles.subSectionTitle}>A. Full Refund Eligibility:</h3>
        <p style={styles.text}>
          A user is eligible for a full refund only if:
        </p>
        <ul style={styles.list}>
          <li>The DML person has not yet been assigned at the time of cancellation.</li>
          <li>The test booking is canceled within 2 hours of booking (Example: If booked at 10:00 AM, cancellation must occur by 11:59 AM).</li>
        </ul>

        <h3 style={styles.subSectionTitle}>B. Partial Refund Eligibility:</h3>
        <p style={styles.text}>
          A partial refund will be issued if:
        </p>
        <ul style={styles.list}>
          <li>The DML person has already been assigned, but the test is still canceled within 2 hours of booking.</li>
          <li>The test booking exceeds 2 hours, in which case no full refund will be issued.</li>
        </ul>
        <p style={styles.text}>
          The partial refund will deduct:
        </p>
        <ul style={styles.list}>
          <li>Processing charges (5%-10%) depending on the type of test.</li>
          <li>DML person charges (if applicable based on location).</li>
        </ul>

        <h3 style={styles.subSectionTitle}>C. No Refund Scenarios:</h3>
        <p style={styles.text}>
          If the sample collection is completed, no refund will be processed.
        </p>
        <p style={styles.text}>
          If the test is canceled after the sample is collected, no refund is applicable.
        </p>
        <p style={styles.text}>
          If the cancellation is beyond the 2-hour window and the DML person is already assigned, no full refund will be given.
        </p>

        <h2 style={styles.sectionTitle}>4. Payment Disputes & Chargebacks</h2>
        <p style={styles.text}>
          a) If a user initiates a chargeback without valid grounds, SwasthyaPro reserves the right to suspend the user's account and pursue legal action.
        </p>
        <p style={styles.text}>
          b) All disputes regarding transactions must be directed to the payment gateway (Razorpay) first. SwasthyaPro is not liable for delayed or failed refunds caused by payment processors.
        </p>
        <p style={styles.text}>
          c) Fraudulent transactions, unauthorized chargebacks, or misuse of the platform may lead to legal action under applicable Indian laws.
        </p>

        <h2 style={styles.sectionTitle}>5. Taxes & Compliance</h2>
        <p style={styles.text}>
          a) All payments are subject to applicable taxes (GST, if applicable) and government regulations.
        </p>
        <p style={styles.text}>
          b) Users are responsible for ensuring compliance with local tax laws if they require tax invoices for reimbursement or business purposes.
        </p>

        <h2 style={styles.sectionTitle}>6. Force Majeure Clause</h2>
        <p style={styles.text}>
          SwasthyaPro shall not be held liable for service disruptions, payment failures, or refund delays due to reasons beyond our control, including but not limited to:
        </p>
        <ul style={styles.list}>
          <li>Natural disasters (earthquakes, floods, pandemics, etc.).</li>
          <li>Cyber-attacks, system failures, or hacking incidents.</li>
          <li>Regulatory changes or new government policies affecting online payments.</li>
          <li>Bank or payment processor outages.</li>
        </ul>

        <h2 style={styles.sectionTitle}>7. Jurisdiction & Legal Recourse</h2>
        <p style={styles.text}>
          a) Any disputes related to payments shall be governed under Indian law.
        </p>
        <p style={styles.text}>
          b) All payment disputes must undergo mediation/arbitration under the Arbitration and Conciliation Act, 1996 before seeking judicial intervention.
        </p>
        <p style={styles.text}>
          c) Any legal proceedings shall be subject to the exclusive jurisdiction of courts in [City/State], India.
        </p>

        <h2 style={styles.sectionTitle}>8. Updates to Payment Policy</h2>
        <p style={styles.text}>
          SwasthyaPro reserves the right to update or modify this Payment Policy at any time. Continued use of the platform constitutes acceptance of the revised terms. Users are responsible for reviewing updates periodically.
        </p>

        <p style={styles.text}>
          By using SwasthyaPro, you acknowledge and agree to this Payment Policy and all applicable legal terms herein.
        </p>
      </div>
    </div>
  );
};

const styles = {
  container: { padding: '20px', backgroundColor: '#fff' },
  card: { padding: '20px', border: '1px solid #ddd', borderRadius: '8px', maxWidth: '800px', margin: 'auto' },
  heading: { fontSize: '24px', fontWeight: 'bold', textAlign: 'center', marginBottom: '10px' },
  subHeading: { fontSize: '18px', textAlign: 'center', marginBottom: '10px' },
  sectionTitle: { fontSize: '20px', fontWeight: 'bold', marginTop: '15px' },
  subSectionTitle: { fontSize: '18px', fontWeight: 'bold', marginTop: '10px' },
  text: { fontSize: '16px', textAlign: 'justify', marginTop: '5px' },
  list: { fontSize: '16px', textAlign: 'justify', marginTop: '5px', listStyleType: 'disc', paddingLeft: '20px' },
};

export default PaymentPolicy;