import React from 'react';
import { BrowserRouter as Router, Route, Link, Routes } from 'react-router-dom';

const SecurityPolicy = () => {
  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h1 style={styles.heading}>**Security & Compliance Policy**</h1>
        <h3 style={styles.subHeading}>**Effective Date:** [15-Feb-2025]</h3>
        <h3 style={styles.subHeading}>**Last Updated:** [15-Feb-2025]</h3>

        <h2 style={styles.sectionTitle}> **1. Introduction**</h2>
        <p style={styles.text}>
          At SwasthyaPro, we are committed to maintaining the highest standards of security and compliance to protect user data and ensure secure transactions. This policy outlines our approach to data protection, risk management, and regulatory compliance.
        </p>

        <h2 style={styles.sectionTitle}> **2. Compliance Standards**</h2>
        <p style={styles.text}>
          SwasthyaPro adheres to the following security and compliance frameworks:
        </p>
        <ul style={styles.list}>
          <li>**Digital Personal Data Protection (DPDP) Act, 2023** (India)</li>
          <li>**Information Technology Act, 2000** (India)</li>
          <li>**ISO 27001** (Information Security Management System)</li>
          <li>**NABL & NABH Compliance** (For partnered laboratories)</li>
          <li>**Payment Card Industry Data Security Standard (PCI-DSS)** (Through Razorpay)</li>
        </ul>

        <h2 style={styles.sectionTitle}> **3. Data Security Measures**</h2>
        <h3 style={styles.subSectionTitle}># **A. Encryption & Data Protection**</h3>
        <p style={styles.text}>
          - All personal and sensitive data, including prescriptions and reports, are encrypted **in transit and at rest**.
        </p>
        <p style={styles.text}>
          - User reports are delivered as password-protected PDFs.
        </p>
        <p style={styles.text}>
          - Access to sensitive data requires explicit user consent via **OTP validation**.
        </p>

        <h3 style={styles.subSectionTitle}># **B. Access Control & Authentication**</h3>
        <p style={styles.text}>
          - Multi-factor authentication (MFA) for administrative access.
        </p>
        <p style={styles.text}>
          - Strict role-based access control (RBAC) for employees and support teams.
        </p>
        <p style={styles.text}>
          - Regular security audits to review data access logs and mitigate risks.
        </p>

        <h3 style={styles.subSectionTitle}># **C. Secure Payments**</h3>
        <p style={styles.text}>
          - Payments are processed through **Razorpay**, which complies with **PCI-DSS security standards**.
        </p>
        <p style={styles.text}>
          - SwasthyaPro **does not store credit/debit card details**.
        </p>

        <h3 style={styles.subSectionTitle}># **D. Data Retention & Deletion**</h3>
        <p style={styles.text}>
          - **Prescriptions remain encrypted** and are accessible only to users. Users may delete them anytime.
        </p>
        <p style={styles.text}>
          - **Reports are stored securely for 7 days (extendable to 30 days on request), after which they are permanently deleted**.
        </p>
        <p style={styles.text}>
          - **User accounts inactive for 12 months** may be subject to deletion for security purposes.
        </p>

        <h2 style={styles.sectionTitle}> **4. Third-Party Security & Data Sharing**</h2>
        <p style={styles.text}>
          - **Partnered NABL/NABH labs** receive reports solely for test processing purposes.
        </p>
        <p style={styles.text}>
          - **Payment transactions** are securely processed via **Razorpay**.
        </p>
        <p style={styles.text}>
          - No user data is shared with advertisers, marketers, or unauthorized third parties.
        </p>

        <h2 style={styles.sectionTitle}> **5. Incident Response & Reporting**</h2>
        <p style={styles.text}>
          SwasthyaPro follows a structured approach to handle security incidents:
        </p>
        <ul style={styles.list}>
          <li>**Continuous Monitoring:** Security logs are monitored to detect unauthorized access.</li>
          <li>**Incident Response Plan:** A dedicated team investigates breaches and mitigates risks.</li>
          <li>**User Notifications:** Affected users are informed promptly in case of a security breach.</li>
          <li>**Legal Compliance:** Data breaches, if any, will be reported to relevant authorities as per Indian laws.</li>
        </ul>

        <h2 style={styles.sectionTitle}> **6. User Responsibilities & Best Practices**</h2>
        <p style={styles.text}>
          Users are responsible for:
        </p>
        <ul style={styles.list}>
          <li>Keeping their account credentials secure and **not sharing passwords with anyone**.</li>
          <li>Reporting suspicious activities to our **support team** immediately.</li>
          <li>Using **updated browsers and security software** to enhance personal data security.</li>
        </ul>

        <h2 style={styles.sectionTitle}> **7. Dispute Resolution & Governing Law**</h2>
        <p style={styles.text}>
          - Any disputes regarding security matters will first be resolved via **arbitration**, as per the **Arbitration and Conciliation Act, 1996**.
        </p>
        <p style={styles.text}>
          - Legal matters will be subject to the **exclusive jurisdiction of the courts in [City/State], India**.
        </p>
        <p style={styles.text}>
          - Users outside India agree that **Indian security and compliance laws apply exclusively**.
        </p>

        <h2 style={styles.sectionTitle}> **8. Updates to this Policy**</h2>
        <p style={styles.text}>
          SwasthyaPro may update this Security & Compliance Policy periodically. Continued use of the platform constitutes agreement with any modifications.
        </p>

        <h2 style={styles.sectionTitle}> **9. Contact Information**</h2>
        <p style={styles.text}>
          For security concerns or compliance inquiries, please contact:
        </p>
        <ul style={styles.list}>
          <li>📧 **Email:** [Support Email]</li>
          <li>📞 **Phone:** [Support Contact Number]</li>
          <li>🌐 **Website:** [Portal URL]</li>
        </ul>

        <p style={styles.text}>
          By using SwasthyaPro, you acknowledge and agree to this Security & Compliance Policy.
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

export default SecurityPolicy;