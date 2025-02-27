import React from 'react';
import { BrowserRouter as Router, Route, Link, Routes } from 'react-router-dom';

const PrivacyPolicy = () => {
  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h1 style={styles.heading}>**Privacy Policy**</h1>
        <h3 style={styles.subHeading}>**Effective Date:** [Insert Date]</h3>
        <h3 style={styles.subHeading}>**Last Updated:** [Insert Date]</h3>

        <h2 style={styles.sectionTitle}> **1. Introduction**</h2>
        <p style={styles.text}>
          Welcome to SwasthyaPro. We value your privacy and are committed to protecting your personal data. This Privacy Policy outlines how we collect, use, store, and protect your information while ensuring compliance with applicable data protection laws, including the **Digital Personal Data Protection (DPDP) Act, 2023**, the **Information Technology Act, 2000**, and **ISO 27001 security standards**.
        </p>
        <p style={styles.text}>
          By using SwasthyaPro, you consent to the practices outlined in this Privacy Policy. **Users must be 18 years or older to use this platform or must have parental/legal guardian consent.**
        </p>

        <h2 style={styles.sectionTitle}> **2. Information We Collect**</h2>
        <h3 style={styles.subSectionTitle}># **A. Personal Information**</h3>
        <p style={styles.text}>
          - Name, Email Address, Contact Number (Required for account creation and communication)
          - Home Address (Required for sample collection by the DML person)
          - Date of Birth (To verify age and ensure compliance with applicable policies)
          - Prescription Upload (Encrypted by default, accessible only upon your consent via OTP)
          - Payment Information (Processed securely via Razorpay; we do not store payment details)
          - Test Booking Details (Selected tests, assigned lab, and sample collection details)
        </p>

        <h3 style={styles.subSectionTitle}># **B. Automatically Collected Data**</h3>
        <p style={styles.text}>
          - Device Information (IP address, browser type, operating system)
          - Usage Data (Pages visited, actions performed on the platform)
        </p>

        <h2 style={styles.sectionTitle}> **3. How We Use Your Data**</h2>
        <p style={styles.text}>
          We use your data strictly for service-related purposes:
        </p>
        <ul style={styles.list}>
          <li>To facilitate **test booking and report delivery**.</li>
          <li>To provide **customer support** and process requests.</li>
          <li>To comply with **legal obligations** and security audits.</li>
          <li>To **enhance platform security** by logging decryption requests.</li>
        </ul>
        <p style={styles.text}>
          **We do not sell, share, or use your personal data for marketing purposes.**
        </p>

        <h2 style={styles.sectionTitle}> **4. Data Security & Storage**</h2>
        <p style={styles.text}>
          - **Encryption:** All personal data, including prescriptions and reports, is stored in encrypted format.
        </p>
        <p style={styles.text}>
          - **Access Control:** Only authorized personnel with user consent can decrypt prescription data.
        </p>
        <p style={styles.text}>
          - **Temporary Data Retention:**
        </p>
        <ul style={styles.list}>
          <li>**Prescriptions** remain encrypted and accessible only to users. Users may delete them anytime.</li>
          <li>**Reports** are accessible for 7 days (extendable to 30 days upon request) and then permanently deleted.</li>
          <li>**User Accounts** inactive for over 12 months may be subject to deletion.</li>
        </ul>

        <h2 style={styles.sectionTitle}> **5. Data Sharing & Third-Party Disclosure**</h2>
        <p style={styles.text}>
          - **Laboratories:** User reports are shared only with partnered NABL/NABH-certified labs for test processing.
        </p>
        <p style={styles.text}>
          - **Payment Processors:** Payments are handled securely through Razorpay.
        </p>
        <p style={styles.text}>
          - **Legal Authorities:** We may disclose data if required by law, court orders, or government regulations.
        </p>
        <p style={styles.text}>
          **Your data is not shared with advertisers, marketers, or any unauthorized third parties.**
        </p>

        <h2 style={styles.sectionTitle}> **6. User Rights & Consent**</h2>
        <p style={styles.text}>
          Users have the following rights:
        </p>
        <ul style={styles.list}>
          <li>**Right to Access:** View your personal data stored on SwasthyaPro.</li>
          <li>**Right to Consent:** Explicit approval via OTP is required before support can access encrypted prescriptions.</li>
          <li>**Right to Deletion:** You may request permanent deletion of your data at any time.</li>
          <li>**Right to Withdraw Consent:** You can revoke permissions granted earlier, subject to service limitations.</li>
          <li>**Age Verification & Parental Consent:** Users must confirm they are **18 years or older** or using the platform with **parental/legal guardian consent** during account registration.</li>
        </ul>

        <h2 style={styles.sectionTitle}> **7. International Users**</h2>
        <p style={styles.text}>
          SwasthyaPro follows **Indian laws and compliance standards**. Users accessing the platform from outside India acknowledge that their data is processed per Indian regulations and **waive rights to foreign consumer protection laws**.
        </p>

        <h2 style={styles.sectionTitle}> **8. Dispute Resolution & Governing Law**</h2>
        <p style={styles.text}>
          - Disputes arising from this Privacy Policy shall be first resolved through **mediation or arbitration**, per the **Arbitration and Conciliation Act, 1996**.
        </p>
        <p style={styles.text}>
          - If unresolved, disputes shall be subject to the **exclusive jurisdiction of courts in [City/State], India**.
        </p>

        <h2 style={styles.sectionTitle}> **9. Policy Updates**</h2>
        <p style={styles.text}>
          We may update this Privacy Policy periodically. Continued use of SwasthyaPro after updates constitutes acceptance of the revised terms.
        </p>

        <h2 style={styles.sectionTitle}> **10. Contact Us**</h2>
        <p style={styles.text}>
          For privacy-related inquiries, please contact us at:
        </p>
        <ul style={styles.list}>
          <li>📧 **Email:** [Support Email]</li>
          <li>📞 **Phone:** [Support Contact Number]</li>
          <li>🌐 **Website:** [Portal URL]</li>
        </ul>

        <p style={styles.text}>
          By using SwasthyaPro, you acknowledge and agree to this Privacy Policy.
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

export default PrivacyPolicy;