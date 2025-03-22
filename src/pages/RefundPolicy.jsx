import React from 'react';
import { BrowserRouter as Router, Route, Link, Routes } from 'react-router-dom';

const RefundPolicy = () => {
  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h1 style={styles.heading}>Refund Policy</h1>
        <h3 style={styles.subHeading}>Effective Date: [15-Feb-2025]</h3>
        <h3 style={styles.subHeading}>Last Updated: [15-Feb-2025]</h3>

        <h2 style={styles.sectionTitle}>1. General Refund Policy</h2>
        <p style={styles.text}>
          SwasthyaPro strives to provide a seamless experience for booking medical tests. Due to the nature of our services, refunds are granted only under limited and specific conditions as outlined below. By using our platform, you expressly acknowledge and agree to abide by this Refund Policy, which forms an integral part of SwasthyaPro’s Terms & Conditions.
        </p>

        <h2 style={styles.sectionTitle}>2. Refund Eligibility</h2>
        <h3 style={styles.subSectionTitle}>A. Full Refund Eligibility</h3>
        <p style={styles.text}>
          A user is eligible for a full refund if:
        </p>
        <ul style={styles.list}>
          <li>The DML person has not been assigned at the time of cancellation.</li>
          <li>The cancellation is made within 2 hours of booking.</li>
          <li>(Example: If booked at 10:00 AM, cancellation must occur by 11:59 AM).</li>
        </ul>

        <h3 style={styles.subSectionTitle}>B. Partial Refund Eligibility</h3>
        <p style={styles.text}>
          A partial refund will be processed if:
        </p>
        <ul style={styles.list}>
          <li>The DML person has already been assigned, but the test is canceled within 2 hours of booking.</li>
          <li>The cancellation is beyond the 2-hour window, and the DML person has been assigned. In this case, a partial refund will be issued after deductions, including:</li>
          <li>5%-10% processing charges, depending on the location.</li>
        </ul>

        <h3 style={styles.subSectionTitle}>C. Refund Request Procedure</h3>
        <p style={styles.text}>
          All refund requests must be made through the official SwasthyaPro platform, customer support email, support phone number, or verified WhatsApp number.
        </p>
        <p style={styles.text}>
          Refunds will not be processed for cancellations made via unverified or unauthorized channels.
        </p>

        <h2 style={styles.sectionTitle}>3. Non-Refundable Cases</h2>
        <p style={styles.text}>
          Refunds will not be granted under the following circumstances:
        </p>
        <ul style={styles.list}>
          <li>Failure to appear for sample collection at the scheduled time.</li>
          <li>Incorrect or incomplete information provided by the user, leading to an inability to conduct the test.</li>
          <li>Tests booked under promotional offers, discounts, or bundled packages are strictly non-refundable.</li>
          <li>If the test has already been processed by the lab, irrespective of whether the report has been delivered.</li>
          <li>Technical issues or failures on the user’s end that prevent them from utilizing the service.</li>
          <li>Payment failures or stuck transactions due to third-party payment gateway issues (e.g., Razorpay). Users must directly coordinate with the payment gateway provider.</li>
          <li>Sample collection has been completed. Once collected, no refunds will be processed, regardless of cancellation or report delivery status.</li>
        </ul>

        <h2 style={styles.sectionTitle}>4. Refund Process & Timelines</h2>
        <p style={styles.text}>
          Refunds will be processed within 7-10 business days after successful cancellation and eligibility verification.
        </p>
        <p style={styles.text}>
          Refunds will be credited to the original payment method.
        </p>
        <p style={styles.text}>
          SwasthyaPro is not responsible for any delays caused by banks, payment processors, or third-party financial institutions.
        </p>
        <p style={styles.text}>
          Users must contact their respective bank or payment service provider before reaching out to SwasthyaPro support if a refund has not been received within the stipulated period.
        </p>

        <h2 style={styles.sectionTitle}>5. Chargebacks & Disputes</h2>
        <p style={styles.text}>
          Users must first attempt to resolve refund disputes through SwasthyaPro’s customer support before initiating chargebacks with their bank.
        </p>
        <p style={styles.text}>
          Any fraudulent or misleading chargeback claims will be contested, and users filing false claims may be permanently blacklisted from SwasthyaPro.
        </p>

        <h2 style={styles.sectionTitle}>6. Cancellation by SwasthyaPro or Labs</h2>
        <p style={styles.text}>
          In rare cases where SwasthyaPro or its partnered labs cancel a test due to operational or unforeseen issues, users will be given the option to:
        </p>
        <ul style={styles.list}>
          <li>Receive a full refund.</li>
          <li>Reschedule the test at no additional cost.</li>
        </ul>
        <p style={styles.text}>
          Possible Cancellation Reasons:
        </p>
        <ul style={styles.list}>
          <li>Operational failures from the lab’s end (e.g., unavailability of test kits, equipment malfunction).</li>
          <li>Service disruptions beyond SwasthyaPro’s control.</li>
          <li>Force Majeure events (e.g., natural disasters, government restrictions, pandemics, or emergencies).</li>
        </ul>

        <h2 style={styles.sectionTitle}>7. Legal Compliance & Disclaimers</h2>
        <h3 style={styles.subSectionTitle}>A. Compliance with Indian Laws</h3>
        <p style={styles.text}>
          This policy adheres to:
        </p>
        <ul style={styles.list}>
          <li>The Consumer Protection Act, 2019.</li>
          <li>The Information Technology Act, 2000 (including IT Rules for digital transactions).</li>
          <li>The Arbitration and Conciliation Act, 1996, in case of disputes.</li>
        </ul>
        <p style={styles.text}>
          Users accessing SwasthyaPro services from outside India acknowledge that our refund policy follows Indian laws and waive any rights to claim refunds under foreign consumer protection laws.
        </p>

        <h3 style={styles.subSectionTitle}>B. Limitation of Liability</h3>
        <p style={styles.text}>
          SwasthyaPro is not liable for refund issues caused by:
        </p>
        <ul style={styles.list}>
          <li>Third-party payment gateway failures.</li>
          <li>Banking system delays.</li>
          <li>User negligence in providing correct booking details.</li>
        </ul>
        <p style={styles.text}>
          Under no circumstances shall SwasthyaPro, its affiliates, employees, or partners be held liable for indirect, incidental, punitive, or consequential damages arising from refund-related claims.
        </p>
        <p style={styles.text}>
          Users agree that refund claims shall not exceed the actual amount paid for the test.
        </p>

        <h3 style={styles.subSectionTitle}>C. Dispute Resolution & Jurisdiction</h3>
        <p style={styles.text}>
          All disputes related to refunds shall be resolved first through mediation or arbitration before any legal action.
        </p>
        <p style={styles.text}>
          If unresolved, disputes fall under the exclusive jurisdiction of the courts in [City/State], India.
        </p>
        <p style={styles.text}>
          SwasthyaPro reserves the right to modify or update this policy at any time without prior notice.
        </p>

        <h2 style={styles.sectionTitle}>8. Contact Us</h2>
        <p style={styles.text}>
          For refund-related queries, users may contact:
        </p>
        <ul style={styles.list}>
          <li>📧 Email: support@swasthyapro.com</li>
          <li>📞 Phone: [Customer Care Number]</li>
          <li>🌐 Website: [Portal URL]</li>
        </ul>

        <p style={styles.text}>
          Final Disclaimer
        </p>
        <p style={styles.text}>
          By using SwasthyaPro’s services, users acknowledge and agree to this Refund Policy, including all terms, conditions, and legal limitations.
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

export default RefundPolicy;